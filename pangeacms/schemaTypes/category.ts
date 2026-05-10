import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría',
      type: 'string', // Aquí es donde escribirás "Peliculas", "Series", etc.
    }),
    // 🔥 AGREGA ESTE BLOQUE COMPLETO 🔥
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
  ],
})