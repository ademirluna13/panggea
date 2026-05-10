import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // 👈 1. Importamos el buscador de Astro 5

const blog = defineCollection({
	// 2. Le decimos EXACTAMENTE dónde están tus archivos Markdown
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		specs: z.object({
			platform: z.string().optional(),
			version: z.string().optional(),
			status: z.string().optional(),
		}).optional(),
	}),
});

export const collections = { blog };