import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each work is a folder in src/content/artworks/ containing index.md and all
// of that work's images. The markdown body is the article: paragraphs with
// images placed inline (![caption](./01.jpg)) wherever they fit the story.
const artworks = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/artworks',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      // Shown as the square tile on the home page and at the top of the article.
      cover: image(),
      materials: z.string().optional(),
      dimensions: z.string().optional(),
      location: z.string().optional(),
      // Lower numbers appear first in the gallery; ties fall back to newest year.
      order: z.number().default(999),
    }),
});

// Long-form text pages (about, cv) editable as plain markdown.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { artworks, pages };
