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
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
  ],
});