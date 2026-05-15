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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    // 🚀 REFERENCIAS MAESTRAS
    defineField({
      name: 'game',
      title: 'Juego Relacionado',
      type: 'reference',
      to: [{ type: 'game' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría Principal (PanGGea)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Guía',
      type: 'reference',
      to: [{ type: 'guideType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Nivel de Dificultad',
      type: 'reference',
      to: [{ type: 'guideLevel' }],
    }),
    // 📸 MEDIA Y CONTENIDO
    defineField({
      name: 'mainImage',
      title: 'Imagen Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Resumen Rápido (Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Cuerpo de la Guía',
      type: 'blockContent', // Tu editor Luxury
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
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
        subtitle: `${game || 'S/J'} | ${type || 'S/T'}`,
        media,
      };
    },
  },
});