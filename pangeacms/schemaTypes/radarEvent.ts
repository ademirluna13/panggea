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
      type: 'reference',
      to: [{ type: 'category' }], 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedGame',
      title: 'Juego Relacionado (Opcional)',
      type: 'reference',
      to: [{ type: 'game' }],
    }),
    // 🔥 CORRECCIÓN 1: Plataformas estandarizadas idénticas a las del Post
    defineField({
      name: 'platform',
      title: 'Plataforma Principal',
      type: 'string',
      options: {
        list: [
          {title: 'PS5', value: 'PS5'},
          {title: 'Xbox Series', value: 'XBOX'},
          {title: 'PC Master Race', value: 'PC'},
          {title: 'Nintendo Switch', value: 'SWITCH'},
          {title: 'Multiplataforma', value: 'MULTI'},
          {title: 'Evento Presencial', value: 'IRL'}, // Agregué esta porque es el Radar
        ]
      }
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
      // 🔥 CORRECCIÓN 2: El Cadenero Anti-Imágenes Pesadas
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value || !value.asset) return true;
        const ref = value.asset._ref || '';
        
        if (!ref.endsWith('-webp')) {
          return '🚨 ¡PROHIBIDO ARRASTRAR IMÁGENES CRUDAS! Usa el botón "Select" y elige la "Subida Optimizada 🚀" para no tumbar el servidor.';
        }
        return true;
      }),
    }),
    // 🔥 CORRECCIÓN 3: Sintaxis limpia y envuelta en defineField
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta (Para la Card)',
      type: 'text',
      rows: 2,
      description: 'Aparece en el carrusel al hacer hover.',
    }),
    defineField({
      name: 'content',
      title: 'Contenido Detallado',
      type: 'blockContent', 
      description: 'Toda la información que saldrá cuando abran el expediente.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title', 
      media: 'mainImage',
    },
  },
});