import { defineType, defineField } from 'sanity';
import { Award } from 'lucide-react';

export default defineType({
  name: 'gearBrand',
  title: 'Marcas de Hardware',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // 🚀 EL SLUG ES VITAL: Para rutas como /hardware/marca/logitech
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { 
        source: 'name', 
        maxLength: 96 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la Marca',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Sitio Web Oficial',
      type: 'url',
    }),
  ],
  // Preview para que en la lista de Sanity se vea el logo y el nombre
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
});