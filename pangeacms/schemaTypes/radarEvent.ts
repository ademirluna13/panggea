import { defineType, defineField } from 'sanity';
import { Radio } from 'lucide-react';

export default defineType({
  name: 'radarEvent',
  title: 'Radar (Eventos y Drops)',
  type: 'document',
  icon: Radio,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Evento / Drop',
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
    defineField({
      name: 'eventDate',
      title: 'Fecha del Lanzamiento',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: ['GAMING', 'TECH', 'CINE/TV', 'ANIME', 'MÚSICA'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Plataforma (Ej. PS5 / GLOBAL)',
      type: 'string',
    }),
    defineField({
      name: 'hypeLevel',
      title: 'Hype Meter (0 al 100)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Fondo',
      type: 'image',
      options: { hotspot: true },
    }),
    {
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
    },
    defineField({
      name: 'description',
      title: 'Descripción Corta (Para la Card)',
      type: 'text',
      rows: 2,
      description: 'Aparece en el carrusel al hacer hover.',
    }),
    // ─── NUEVO CAMPO PARA LA NOTA COMPLETA ───
    defineField({
      name: 'content',
      title: 'Contenido Detallado',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Toda la información que saldrá cuando abran el expediente.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
});