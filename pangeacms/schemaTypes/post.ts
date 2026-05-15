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

    // ─── EL NUEVO MERO JEFE: CONEXIÓN CON JUEGOS ───
    defineField({
      name: 'game',
      title: 'Juego Relacionado',
      type: 'reference',
      to: [{type: 'game'}], // 🚀 Se conecta con tu game.ts
      description: 'Linca esta nota con su juego para que aparezca en el feed del juego.',
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
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    // CAMPOS DE REVIEWS Y DEEP DIVE
    defineField({
      name: 'isReview',
      title: '¿Es Review?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reviewStats',
      title: 'Estadísticas del Review',
      type: 'object',
      hidden: ({document}) => !document?.isReview,
      fields: [
        { name: 'score', title: 'Calificación (0-10)', type: 'string' },
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
    
    // CONFIGURACIÓN DE POSICIONAMIENTO LUXURY
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
    defineField({
      name: 'isFeatured',
      title: '¿Nota Destacada? (Carrusel)',
      type: 'boolean',
      initialValue: false,
      description: 'Si se activa, aparecerá en los destacados de la Home.',
    }),
  ],

  // 🚀 PREVIEW ACTUALIZADO PARA VER EL JUEGO
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      gameName: 'game.name', // Jala el nombre del juego
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, gameName} = selection
      return {...selection, subtitle: `${author ? `by ${author}` : ''} ${gameName ? `| ${gameName}` : ''}`}
    },
  },
})