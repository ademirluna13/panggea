import { defineType, defineField } from 'sanity';
import { Tag } from 'lucide-react';

export default defineType({
  name: 'gearCategory',
  title: 'Categorías de Hardware',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // 🚀 EL SLUG ES VITAL: Para rutas como /hardware/categoria/teclados
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { 
        source: 'title', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  // Preview para identificar rápido en el Studio
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Categoría de Hardware'
      }
    }
  }
});