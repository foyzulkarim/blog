// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeFocusableCode } from './src/lib/rehype-focusable-code.mjs';

// Static output (the default). No Cloudflare adapter: the site is prerendered
// and served straight from Workers static assets. See docs/ARCHITECTURE.md §2.
export default defineConfig({
  site: 'https://blog.foyzul.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeFocusableCode],
    shikiConfig: {
      // Dual themes emit --shiki-light/--shiki-dark on every token; blog.css
      // remaps them under prefers-color-scheme. Selector is .astro-code.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
