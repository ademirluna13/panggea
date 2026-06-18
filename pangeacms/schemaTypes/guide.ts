import { defineType, defineField } from 'sanity';
import { BookOpen } from 'lucide-react';

export default defineType({
  name: 'guide',
  title: 'Guías y Trucos',
  type: 'document',
  icon: BookOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Guía',
      type: 'string',
      validation: (Rule) => Rule.required().error('El título de la guía es obligatorio, pa.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('¡Obligatorio! Dale a "Generate" para crear la URL de la guía.'),
    }),

    // ─── REFERENCIAS MAESTRAS BLINDADAS ───
    defineField({
      name: 'game',
      title: 'Juego Relacionado',
      type: 'reference',
      to: [{ type: 'game' }],
      validation: (Rule) => Rule.required().error('Debes enlazar esta guía con un juego de la base de datos.'),
    }),
    defineField({
      name: 'category',
      title: 'Categoría Principal (PanGGea)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required().error('Selecciona la categoría editorial del blog.'),
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Guía',
      type: 'reference',
      to: [{ type: 'guideType' }],
      description: 'Ej. Mecánicas, Coleccionables, Logros...',
      validation: (Rule) => Rule.required().error('Especifica qué tipo de guía es para activar los filtros del front.'),
    }),
    defineField({
      name: 'level',
      title: 'Nivel de Dificultad',
      type: 'reference',
      to: [{ type: 'guideLevel' }],
      description: 'Opcional. Ej. Principiante, Avanzado, Hardcore.',
    }),

    // ─── MEDIA Y CONTENIDO ESTANDARIZADO ───
    defineField({
      name: 'mainImage',
      title: 'Imagen Hero',
      type: 'image',
      options: { hotspot: true },
      // 🔥 FILTRO CADENERO: Bloqueo de imágenes pesadas crudas
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value || !value.asset) return true;
        const ref = value.asset._ref || '';
        if (!ref.endsWith('-webp')) {
          return '🚨 ¡PROHIBIDO ARRASTRAR IMÁGENES CRUDAS! Pásala por el optimizador y usa la "Subida Optimizada 🚀" para proteger el servidor.';
        }
        return true;
      }),
    }),
    defineField({
      name: 'description',
      title: 'Resumen Rápido (Card)',
      type: 'text',
      rows: 3,
      description: 'Extracto de impacto que saldrá en las tarjetas antes de abrir la guía.',
      validation: (Rule) => Rule.required().error('La descripción corta es necesaria para el diseño del front, bro.'),
    }),
    defineField({
      name: 'content',
      title: 'Cuerpo de la Guía',
      type: 'blockContent', // Conexión con tu Luxury Editor
      description: 'Escribe aquí el desglose completo. Usa negritas, listas y añade capturas optimizadas para enriquecer el texto.'
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required().error('Asigna qué autor redactó esta guía, no seas gacho.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('La fecha es obligatoria para el ordenamiento cronológico.'),
    }),
  ],

  // 🚀 PREVIEW LIMPIA Y ESCANEABLE
  preview: {
    select: {
      title: 'title',
      game: 'game.name',
      type: 'type.title',
      media: 'mainImage',
    },
    prepare({ title, game, type, media }) {
      return {
        title,
        subtitle: `${game || 'Juego no asignado'} | ${type || 'Sin tipo'}`,
        media,
      };
    },
  },
});