import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

// Inicializador directo del cliente de Sanity con tu ID real
const sanityClient = createClient({
  projectId: 'zjxg4fvd', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2024-03-25',
});

export const GET: APIRoute = async () => {
  const baseUrl = 'https://panggea.site';

  try {
    // 1. 🚀 TRAEMOS TODO EL ARSENAL DINÁMICO DESDE SANITY
    // Mapeo corregido: Notas van a /news/, parches a /patchLog/, etc.
    const posts = await sanityClient.fetch(`*[_type == "post" && defined(slug.current)].slug.current`);
    const patchNotes = await sanityClient.fetch(`*[_type in ["patchNote", "patchLog"] && defined(slug.current)].slug.current`);
    const guides = await sanityClient.fetch(`*[_type == "guide" && defined(slug.current)].slug.current`);
    
    // Filtros expansivos para Radar, Vault (Hardware), Tiers y Categorías Temáticas
    const radarEvents = await sanityClient.fetch(`*[_type in ["radarEvent", "radar"] && defined(slug.current)].slug.current`);
    const vaultItems = await sanityClient.fetch(`*[_type in ["gear", "vault", "hardware"] && defined(slug.current)].slug.current`);
    const tierEntries = await sanityClient.fetch(`*[_type in ["tierEntry", "tier"] && defined(slug.current)].slug.current`);
    const categories = await sanityClient.fetch(`*[_type in ["category", "categoria"] && defined(slug.current)].slug.current`);

    // 2. 📂 PÁGINAS ESTÁTICAS FÍSICAS DE TU CARPETA SRC/PAGES
    const staticPages = [
      '',
      'about',
      'blog',
      'guide',
      'lore',
      'patchLog',
      'privacy-policy',
      'radar',
      'tier',
      'updates',
      'vault'
    ];

    // 3. 🛠️ INYECCIÓN Y CONSTRUCCIÓN DE LAS URLs FINALES
    const allUrls = [
      // Estáticas base
      ...staticPages.map(page => `${baseUrl}/${page}`),
      
      // Notas de Blog (Apuntando correctamente a /news/ de acuerdo a tu carpeta)
      ...posts.map((slug: string) => `${baseUrl}/news/${slug}`),
      
      // Parches y Guías
      ...patchNotes.map((slug: string) => `${baseUrl}/patchLog/${slug}`),
      ...guides.map((slug: string) => `${baseUrl}/guide/${slug}`),
      
      // Las secciones tácticas que faltaban
      ...radarEvents.map((slug: string) => `${baseUrl}/radar/${slug}`),
      ...vaultItems.map((slug: string) => `${baseUrl}/vault/${slug}`),
      ...tierEntries.map((slug: string) => `${baseUrl}/tier/${slug}`),
      ...categories.map((slug: string) => `${baseUrl}/categoria/${slug}`)
    ];

    // 4. 🎛️ ESTRUCTURACIÓN COMPLETA DEL XML LEGÍTIMO
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  ${allUrls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>${url.includes('/news/') || url.includes('/patchLog/') ? 'daily' : 'weekly'}</changefreq>
      <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`.trim();

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=14400'
      }
    });

  } catch (error) {
    console.error("Error generando el sitemap dinámico:", error);
    return new Response("Error generando sitemap", { status: 500 });
  }
};