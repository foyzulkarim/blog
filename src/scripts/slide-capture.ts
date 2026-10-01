/*
 * slide-capture — export one slide of a .slides-deck as a PNG, fully
 * client-side, no dependencies, no server.
 *
 * There is no API that draws live DOM into a canvas, so we use the
 * standard SVG round-trip: serialize a clone of the slide into an
 * <svg><foreignObject> document, rasterize it through an <img>, draw that
 * onto a canvas, and canvas.toBlob → object URL → <a download>.
 *
 * Rules this design must respect:
 *
 *  1. An SVG loaded as an image cannot fetch ANY external resource — no
 *     stylesheet URLs, no web fonts, no images. Everything must be inlined
 *     before rasterization. Fonts are the critical one: without @font-face
 *     data URLs the text falls back to system faces and the layout shifts.
 *     So we collect every same-document stylesheet's rules verbatim (which
 *     keeps ::before/::after pseudo-element styling that computed-style
 *     copying would lose), then rewrite each url() to a cached base64
 *     data: URL.
 *
 *  2. Cascade fidelity: the clone is not inside <html>, so :root custom
 *     properties must resolve on the <svg> element (":root" matches the SVG
 *     root), and the clone is wrapped in a div carrying the deck's classes
 *     so `.slides-deck .slide …` descendant selectors keep matching. The
 *     blog's theme is driven by `color-scheme` + `light-dark()` (not media
 *     queries), which resolve per-document — we pin the SVG document's
 *     scheme to the scheme the page is actually using at click time.
 *
 *  3. Unit fidelity: slide CSS uses 100vh (min-height) and vw (clamp()
 *     headline sizes). Viewport units inside the SVG image resolve against
 *     the SVG's own viewBox, so viewBox = {window.innerWidth} x
 *     {slide-rect height} reproduces the page's vw sizes exactly, and makes
 *     min(900px, 100vh) converge to the height the slide actually has.
 *     width/height carry a 2× multiplier with the same viewBox: every
 *     length, unit or absolute, rasterizes at 2× with no resampling.
 *
 *  4. The page's background sits *behind* the (transparent) slide, so the
 *     canvas is painted with the first opaque ancestor background before
 *     drawImage, exactly like the browser composites the page.
 */

const XHTML_NS = 'http://www.w3.org/1999/xhtml';
const SVG_NS = 'http://www.w3.org/2000/svg';

/* Base64 payload of every inlined stylesheet (fonts included) — the fonts
   never change between exports, so pay the fetch cost once per page. */
let baseCSS: Promise<string> | null = null;
const assetCache = new Map<string, Promise<string>>();

export async function captureSlideAsPNG(
  deck: HTMLElement,
  slide: HTMLElement,
  index: number,
): Promise<void> {
  const css = (await getBaseCSS()) + pinThemeCSS();
  const clone = await prepareClone(slide);

  const rect = slide.getBoundingClientRect();
  // Outer width: vw units must match the page's. Height: the slide's real
  // height, so 100vh-based min-heights converge on what the page shows.
  const w = window.innerWidth;
  const h = Math.max(1, Math.round(rect.height));
  const scale = exportScale();

  const surface = document.createElementNS(XHTML_NS, 'div');
  surface.setAttribute(
    'style',
    `width:${w}px;height:${h}px;position:relative;-webkit-text-size-adjust:100%;`,
  );
  const style = document.createElementNS(XHTML_NS, 'style');
  style.textContent = css;
  surface.appendChild(style);

  const deckWrap = document.createElementNS(XHTML_NS, 'div');
  deckWrap.setAttribute('class', deck.className.replace('is-presented', ''));
  deckWrap.setAttribute(
    'style',
    // top:0 — we crop the full slide, its scroll position is irrelevant;
    // left keeps page-relative centering intact; margin:0 drops the deck's
    // block margins which would otherwise offset the absolutely positioned
    // wrapper.
    `position:absolute;left:${rect.left}px;top:0;width:${rect.width}px;margin:0;`,
  );
  deckWrap.appendChild(clone);
  surface.appendChild(deckWrap);

  const svgMarkup =
    `<svg xmlns="${SVG_NS}" width="${Math.round(w * scale)}" height="${Math.round(h * scale)}" ` +
    `viewBox="0 0 ${w} ${h}">` +
    `<foreignObject x="0" y="0" width="${w}" height="${h}">` +
    new XMLSerializer().serializeToString(surface) +
    `</foreignObject></svg>`;

  const blob = await rasterize(svgMarkup, rect, w, h, scale, slide);
  await saveBlob(blob, filenameFor(slide, index));
}

/* ------------------------------------------------------------------ */

function exportScale(): number {
  const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  // Safari rasterizes SVG images at capped dimensions; keep the SVG's
  // intrinsic size under 4096 on each axis so nothing is silently blurred.
  const fit = 4096 / Math.max(window.innerWidth, window.innerHeight);
  return Math.max(1, Math.min(dpr, fit));
}

/** Whether the page is currently rendering its dark face — the theme toggle
 *  writes <html data-theme>, and with no explicit choice the OS preference
 *  wins. Shared by the SVG document pin and the watermark ink. */
function isDarkTheme(): boolean {
  const explicit = document.documentElement.dataset.theme;
  return explicit
    ? explicit === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** The effective theme at click time, pinned for the SVG document. Written
 *  after the collected CSS so its later `:root` rule wins over the page's
 *  `color-scheme: light dark`. */
function pinThemeCSS(): string {
  return `\n:root{color-scheme:${isDarkTheme() ? 'dark' : 'light'};}\n`;
}

function filenameFor(slide: HTMLElement, index: number): string {
  const slug = window.location.pathname.split('/').filter(Boolean).pop() ?? 'slides';
  const label = slide.getAttribute('aria-label') ?? '';
  const safe = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const num = String(index + 1).padStart(2, '0');
  return safe
    ? `${slug}-slide-${num}-${safe}.png`
    : `${slug}-slide-${num}.png`;
}

/** Detached, self-contained copy of the slide with <img> sources inlined as
 *  data URLs. Ids are deliberately kept: SVG <marker>/<linearGradient> defs
 *  are referenced by `url(#id)` from within the same slide, and the clone is
 *  only ever serialized into a detached data-URL SVG image — never inserted
 *  into the live document — so there is no id for it to collide with. */
async function prepareClone(slide: HTMLElement): Promise<HTMLElement> {
  const clone = slide.cloneNode(true) as HTMLElement;

  const imgs = Array.from(clone.querySelectorAll('img'));
  await Promise.all(
    imgs.map(async (img) => {
      const src = img.getAttribute('src');
      if (!src) return;
      try {
        img.removeAttribute('srcset');
        img.setAttribute('src', await toDataURL(new URL(src, document.baseURI).href));
      } catch {
        /* leave as-is; the image just won't render in the export */
      }
    }),
  );
  return clone;
}

/** All same-document CSS rules, flattened, with url() references replaced
 *  by data URLs. Cached after the first export on the page. */
function getBaseCSS(): Promise<string> {
  if (!baseCSS) {
    baseCSS = (async () => {
      let css = '';
      for (const sheet of document.styleSheets) {
        try {
          css += rulesText(sheet.cssRules) + '\n';
        } catch {
          /* cross-origin sheet (e.g. Google Translate) — not needed for slides */
        }
      }
      return inlineURLs(css);
    })();
  }
  return baseCSS;
}

function rulesText(rules: CSSRuleList): string {
  let out = '';
  for (const rule of rules) {
    // @import's own cssText keeps the url() that can't be fetched from an
    // SVG image; flatten the imported sheet's rules in its place instead.
    if (rule instanceof CSSImportRule && rule.styleSheet) {
      out += rulesText(rule.styleSheet.cssRules);
    } else {
      out += rule.cssText + '\n';
    }
  }
  return out;
}

function inlineURLs(css: string): Promise<string> {
  const URL_PAT = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^"'\s)]*))\s*\)/g;
  const absolute = new Set<string>();
  for (const m of css.matchAll(URL_PAT)) {
    const raw = m[1] ?? m[2] ?? m[3] ?? '';
    if (!raw || raw.startsWith('data:') || raw.startsWith('blob:') || raw.startsWith('#')) continue;
    try {
      const abs = new URL(raw, document.baseURI);
      if (abs.origin === window.location.origin) absolute.add(abs.href);
    } catch {
      /* unparseable url() — leave it alone */
    }
  }
  return Promise.all(
    [...absolute].map((href) =>
      toDataURL(href)
        .then((data) => [href, data] as const)
        .catch(() => null),
    ),
  ).then((pairs) => {
    const map = new Map(pairs.filter((p): p is readonly [string, string] => p !== null));
    return css.replace(URL_PAT, (whole, _a, _b, _c) => {
      const raw = _a ?? _b ?? _c ?? '';
      if (!raw || raw.startsWith('data:')) return whole;
      let abs: string;
      try {
        abs = new URL(raw, document.baseURI).href;
      } catch {
        return whole;
      }
      const data = map.get(abs);
      return data ? `url("${data}")` : whole;
    });
  });
}

function toDataURL(href: string): Promise<string> {
  let cached = assetCache.get(href);
  if (!cached) {
    cached = (async () => {
      const res = await fetch(href);
      if (!res.ok) throw new Error(`fetch failed ${res.status}: ${href}`);
      const type = res.headers.get('content-type') || 'application/octet-stream';
      return `data:${type};base64,${bytesToBase64(await res.arrayBuffer())}`;
    })();
    assetCache.set(href, cached);
  }
  return cached;
}

function bytesToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000; // 32 KiB — keeps String.fromCharCode off the arg-count limit
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

async function rasterize(
  svgMarkup: string,
  rect: DOMRect,
  w: number,
  h: number,
  scale: number,
  slide: HTMLElement,
): Promise<Blob> {
  // Chromium treats an SVG loaded from a blob: URL as cross-origin for
  // canvas-taint purposes — toBlob() then throws SecurityError. The
  // classic HTML→PNG trick relies on data: URLs, which do not taint;
  // everything the SVG needs is inlined (CSS, fonts, images), so it
  // never resolves a base URL anyway.
  const img = await loadImage(
    'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup),
  );
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(rect.width * scale);
  canvas.height = Math.round(rect.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas 2d context unavailable');
  ctx.fillStyle = backgroundBehind(slide);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Destination == the SVG's intrinsic pixel size, so no resampling; the
  // negative x offset crops the full-width surface to the slide's rect.
  ctx.drawImage(
    img,
    -Math.round(rect.left * scale),
    0,
    Math.round(w * scale),
    Math.round(h * scale),
  );
  await drawWatermark(ctx, canvas, rect.width, scale);
  const { promise, resolve, reject } = Promise.withResolvers<Blob>();
  canvas.toBlob(
    (blob) => (blob ? resolve(blob) : reject(new Error('PNG encoding failed'))),
    'image/png',
  );
  return promise;
}

/* Site mark burned into every exported PNG, bottom-right inside the slide's
   own bottom padding so it never sits on content. Theme-aware ink: the deck
   tints are all theme-consistent, so the page's dark/light face is enough to
   pick a legible colour. */
const WATERMARK_TEXT = 'blog.foyzul.com';

async function drawWatermark(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  cssWidth: number,
  scale: number,
): Promise<void> {
  // Canvas has no CSS cascade — wait for the UI face so the mark matches the
  // deck chrome instead of silently falling back to a system font.
  await document.fonts.ready;
  // ~18px on a 1280px slide; clamped so phone-width exports stay legible and
  // ultrawide ones don't shout.
  const size = Math.max(13, Math.min(20, Math.round(cssWidth / 70))) * scale;
  const pad = Math.round(20 * scale);
  ctx.save();
  ctx.font = `600 ${size}px "IBM Plex Sans", system-ui, sans-serif`;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = isDarkTheme()
    ? 'rgba(255, 255, 255, 0.42)'
    : 'rgba(16, 20, 28, 0.42)';
  ctx.fillText(WATERMARK_TEXT, canvas.width - pad, canvas.height - pad);
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  const { promise, resolve, reject } = Promise.withResolvers<HTMLImageElement>();
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => reject(new Error('SVG rasterization failed'));
  img.src = src;
  return promise;
}

/** First opaque background among the slide's ancestors — what the browser
 *  composites behind the slide, which is transparent in the export. */
function backgroundBehind(el: HTMLElement): string {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    const color = getComputedStyle(node).backgroundColor;
    if (color && color !== 'transparent' && !color.endsWith(', 0)')) return color;
  }
  return '#ffffff';
}

async function saveBlob(blob: Blob, name: string): Promise<void> {
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    if ('download' in a) {
      a.href = url;
      a.download = name;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revocation too early breaks Safari's save handoff.
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } else {
      // Old iOS: downloads aren't supported — open the PNG so the reader
      // can share-save it manually.
      window.open(url, '_blank');
    }
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}
