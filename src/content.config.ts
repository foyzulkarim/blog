import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// docs/AUTHORING.md explains the folder layout.
//
// One folder per post, so images live next to the prose that uses them:
//   src/content/posts/my-post/index.mdx  ->  /my-post/
//   src/content/posts/my-post/chart.png  ->  ![](./chart.png)
//
// A flat file still works (src/content/posts/my-post.mdx -> /my-post/).
// Anything under a leading-underscore folder is ignored, which is what makes
// _TEMPLATE/ a scratch area rather than a published post.
const posts = defineCollection({
  loader: glob({
    pattern: ['**/[^_]*.{md,mdx}', '!**/_*/**'],
    base: './src/content/posts',
    generateId: ({ entry }) =>
      entry
        .replace(/(^|\/)index\.mdx?$/, '')
        .replace(/\.mdx?$/, '')
        .replace(/\/$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // Spec §5.2: exactly one concise description, rendered on the index.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drives lang= on the index entry and <article>, the Noto Sans Bengali
    // swap, and the বাংলা chip. Deliberately not a magic tag string.
    lang: z.enum(['en', 'bn']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
