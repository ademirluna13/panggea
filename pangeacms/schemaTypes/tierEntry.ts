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
      validation: (Rule) => Rule.required().error('El nombre del personaje/arma es obligatorio, pa.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Dale al botón "Generate" para crear la URL de este tier.'),
    }),
    
    // ─── REFERENCIA AL JUEGO ───
    defineField({
      name: 'game',
      title: 'Juego',
      type: 'reference',
      to: [{ type: 'game' }], 
      description: 'Selecciona a qué juego pertenece este personaje o pick.',
      validation: (Rule) => Rule.required().error('Debes enlazar este elemento con un juego de la base de datos.'),
    }),

    defineField({
      name: 'rank',
      title: 'Rango (Tier)',
      type: 'string',
      options: {
        list: ['S+', 'S', 'A', 'B', 'C', 'F'],
      },
      validation: (Rule) => Rule.required().error('Asigna un rango en el meta para esta clasificación.'),
    }),
    defineField({
      name: 'rankScore',
      title: 'Puntuación Interna (Para ordenar: S+=100, S=90, A=80)',
      type: 'number',
      description: 'Sirve para que Sanity siempre mande los mejores hasta arriba en tus bento grids.',
      validation: (Rule) => Rule.required().error('Ponle un score numérico para poder ordenar la cuadrícula en el front.'),
    }),
    defineField({
      name: 'description',
      title: 'Justificación del Tier (Para la card)',
      type: 'text',
      rows: 3,
      description: 'Pequeño extracto impacto que saldrá al pasar el mouse por la tarjeta.',
      validation: (Rule) => Rule.required().error('La descripción de la tarjeta es necesaria, bro.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Fondo / Render del Personaje',
      type: 'image',
      options: { hotspot: true },
      // 🔥 FILTRO CADENERO: Bloqueo absoluto de archivos pesados crudos
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value || !value.asset) return true;
        const ref = value.asset._ref || '';
        if (!ref.endsWith('-webp')) {
          return '🚨 ¡PROHIBIDO SUBIR RENDERS CRUDOS! Pásalo por el optimizador y usa la "Subida Optimizada 🚀" para cuidar el servidor.';
        }
        return true;
      }),
    }),
    // 🛡️ CORREGIDO: Envoltura tipada estándar con defineField
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
      description: 'Texto secundario de accesibilidad o créditos del render.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Clasificación',
      type: 'datetime',
      // Auto-rellena con la estampa de tiempo exacta de creación
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('La fecha es obligatoria para el histórico del Arsenal.'),
    }),
    defineField({
      name: 'longDescription', 
      title: 'Descripción Larga (Análisis de Meta)',
      type: 'blockContent', 
      description: 'Explayate con el análisis detallado. Recuerda usar el botón de Pantalla Completa para escribir más cómodo, puedes meter videos y fotos aquí.'
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'game.name', 
      rank: 'rank',
      media: 'mainImage', 
    },
    prepare(selection) {
      const { title, subtitle, rank, media } = selection;
      return {
        title: `[${rank || '?'}] ${title}`,
        subtitle: subtitle || 'Juego no asignado // Alerta',
        media: media,
      };
    }
  },
});