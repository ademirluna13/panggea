import { defineType, defineField } from 'sanity';
import { Tag } from 'lucide-react';

export default defineType({
  name: 'guideType',
  title: 'Tipos de Guía',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({ name: 'title', title: 'Nombre del Tipo', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
  ],
});