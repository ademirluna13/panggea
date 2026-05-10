import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Nota',
      type: 'string',
    }),
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
      title: 'Descripción Corta (Bento Grid)',
      type: 'text',
      description: 'Resumen impacto que saldrá en el inicio.',
    }),
    defineField({
      name: 'platform',
      title: 'Plataforma Principal',
      type: 'string',
      description: 'Esta es la que sale en el tag del inicio.',
      options: {
        list: [
          {title: 'PS5', value: 'PS5'},
          {title: 'Xbox Series', value: 'XBOX'},
          {title: 'PC Master Race', value: 'PC'},
          {title: 'Nintendo Switch', value: 'SWITCH'},
          {title: 'Multiplataforma', value: 'MULTI'},
          {title: 'Prueba', value: 'test'},
        ]
      }
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    {
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
    },
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Contenido de la Nota',
      type: 'blockContent',
    }),
    defineField({
      name: 'specs',
      title: 'Ficha Técnica (Sidebar)',
      type: 'object',
      fields: [
        { name: 'platform', title: 'Plataforma Detallada', type: 'string' },
        { name: 'version', title: 'Versión / Build', type: 'string' },
        { name: 'status', title: 'Estado del Review', type: 'string' },
      ]
    }),
    defineField({
      name: 'isDeepDive',
      title: '¿Es Deep Dive?',
      type: 'boolean',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de Lectura',
      type: 'string',
      description: 'Ej: 20 MIN',
    }),
    
    // 👇 AQUI QUEDARON LOS BUENOS (Limpios y con todas sus descripciones)
    defineField({
      name: 'isLegendary',
      title: '¿Es la Nota Legendaria?',
      type: 'boolean',
      description: 'Activa esto para que aparezca arriba en la Home. Recuerda apagarlo en la anterior.',
      initialValue: false,
    }),
    defineField({
      name: 'sectionBg',
      title: 'Fondo de Inmersión (Manual)',
      type: 'image',
      description: 'Sube la foto que quieres que bañe el "cacho" superior del lore.',
      options: { hotspot: true }
    }),
    // En tu esquema de Sanity (post.js / post.ts)
    defineField({
      name: 'isFeatured',
      title: '¿Nota Destacada? (Carrusel)',
      type: 'boolean',
      initialValue: false,
      description: 'Si se activa, aparecerá en el carrusel principal de la Home.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})