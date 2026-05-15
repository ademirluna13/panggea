import { defineType, defineField } from 'sanity';
import { Target } from 'lucide-react';

export default defineType({
  name: 'tierEntry',
  title: 'Tier Arsenal',
  type: 'document',
  icon: Target,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre (Ej. VENOM, HOMELANDER)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    
    // ─── EL NUEVO CAMPO DE REFERENCIA AL JUEGO ───
    defineField({
      name: 'game',
      title: 'Juego',
      type: 'reference',
      to: [{ type: 'game' }], // Conecta directo con tu schema game.ts
      description: 'Selecciona a qué juego pertenece este personaje',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rank',
      title: 'Rango (Tier)',
      type: 'string',
      options: {
        list: ['S+', 'S', 'A', 'B', 'C', 'F'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rankScore',
      title: 'Puntuación Interna (Para ordenar: S+=100, S=90, A=80)',
      type: 'number',
      description: 'Sirve para que Sanity siempre mande los mejores hasta arriba.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Justificación del Tier (Para la card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Fondo / Render del Personaje',
      type: 'image',
      options: { hotspot: true },
    }),
    {
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
    },
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Clasificación',
      type: 'datetime',
    }),
    defineField({
      name: 'longDescription', 
      title: 'Descripción Larga (Análisis de Meta)',
      type: 'blockContent', // 🚀 Ascendido al Luxury Editor
      description: 'Explayate con el análisis. Recuerda usar el botón de Pantalla Completa para escribir más cómodo, puedes meter videos y fotos aquí.'
    }),
    
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'game.name', // Leemos el nombre a través de la referencia
      rank: 'rank',
      media: 'mainImage', // Para que veas la foto en la lista de Sanity
    },
    prepare(selection) {
      const { title, subtitle, rank, media } = selection;
      return {
        title: `[${rank}] ${title}`,
        subtitle: subtitle || 'Juego no asignado',
        media: media,
      };
    }
  },
});