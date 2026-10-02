/* The subset of the Umami tracker API we use
   (docs.umami.is/docs/tracker-functions). The tracker is a third-party
   `defer` script, so it may be missing entirely (ad-blocker, offline) —
   every call site must treat it as optional. */
type UmamiTracker = {
  track: (name: string, data?: Record<string, string | number>) => void;
};

/* Best-effort: analytics must never break the thing being tracked. */
export function track(name: string, data?: Record<string, string | number>): void {
  const umami = (window as Window & { umami?: UmamiTracker }).umami;
  if (!umami?.track) return;
  try {
    umami.track(name, data);
  } catch {
    /* ignore — tracking is best-effort */
  }
}

/* The last path segment of the current URL — the post/deck id, matching the
   public routes served by src/pages/[...slug].astro. */
export function pageSlug(): string {
  return window.location.pathname.split('/').filter(Boolean).pop() ?? '';
}
