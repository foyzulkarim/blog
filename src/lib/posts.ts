import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * The single place drafts are filtered and order is decided. Every route,
 * the index count, and RSS go through here so the draft filter cannot be
 * forgotten in one of them (ARCHITECTURE §4).
 *
 * Drafts still render in `astro dev` so you can preview them.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.DEV ? true : !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Spec §8.2: `14 Jul 2026`. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** `2026-07-14` for the datetime attribute. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** URL-safe id for a tag, used by /topics/#<id> and the chips. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\wঀ-৿]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const POSTS_PER_PAGE = 20;

/**
 * Posts live at the bare root (`/<slug>/`, spec §6), so a slug can collide
 * with a static page. Astro resolves static routes before dynamic ones, which
 * means a post named `about.mdx` would silently never render — no error, no
 * page. Asserted at build time instead (ARCHITECTURE §5.1).
 */
export const RESERVED_SLUGS = new Set([
  'about',
  'topics',
  'page',
  'rss.xml',
  'sitemap-index.xml',
  '404',
  '_astro',
  'fonts',
]);

export function assertNoReservedSlugs(posts: Post[]): void {
  for (const post of posts) {
    const head = post.id.split('/')[0]!;
    if (RESERVED_SLUGS.has(head) || RESERVED_SLUGS.has(post.id)) {
      throw new Error(
        `Post "${post.id}" collides with the reserved route "/${head}/". ` +
          `Rename the file — a colliding post would silently never render.`,
      );
    }
  }
}
