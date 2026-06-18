import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  
  // 🔥 MEJORA 1: Agrupamos los campos secundarios en "cajitas" para limpiar la interfaz del editor
  fieldsets: [
    { 
      name: 'layoutOptions', 
      title: 'Opciones de Posicionamiento (Home)', 
      options: { collapsible: true, collapsed: false } 
    },
    { 
      name: 'reviewOptions', 
      title: 'Configuración de Reviews', 
      options: { collapsible: true, collapsed: true } // Colapsado por defecto para no estorbar
    }
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Nota',
      type: 'string',
      validation: Rule => Rule.required().error('El título no puede ir vacío, pa.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // 🔥 MEJORA 2: Blindaje de URL. Si se les olvida picar "Generate", no los deja publicar
      validation: Rule => Rule.required().error('¡Obligatorio! Dale al botón de "Generate" para crear la URL.'),
    }),

    // ─── EL NUEVO MERO JEFE: CONEXIÓN CON JUEGOS ───
    defineField({
      name: 'game',
      title: 'Juego Relacionado',
      type: 'reference',
      to: [{type: 'game'}], 
      description: 'Linckea esta nota con su juego para que aparezca en el feed del juego.',
    }),

    defineField({
      name: 'description',
      title: 'Descripción Corta (Bento Grid)',
      type: 'text',
      description: 'Resumen impacto que saldrá en el inicio.',
      validation: Rule => Rule.required(),
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
          {title: 'Movil', value: 'Movil'},
          {title: 'Multiplataforma', value: 'MULTI'},
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
      // 🔥 MEJORA 3: EL CADENERO DE PLOMO. Mata el Drag & Drop de archivos pesados.
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value || !value.asset) return true;
        const ref = value.asset._ref || '';
        
        if (!ref.endsWith('-webp')) {
          return '🚨 ¡PROHIBIDO ARRASTRAR IMÁGENES CRUDAS! Usa el botón "Select" y elige la "Subida Optimizada 🚀" para no tumbar el servidor.';
        }
        return true;
      }),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: Rule => Rule.required().min(1).error('Mínimo ponle una categoría, no seas así.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      // 🔥 MEJORA 4: Evita el bug del "ARCHIVO_ACTIVO" haciendo la fecha obligatoria
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de Lectura',
      type: 'string',
      description: 'Ej: 20 MIN. Si lo dejas vacío, el front-end usa el default.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    // ─── CAJITA: CONFIGURACIÓN DE REVIEWS ───
    defineField({
      name: 'isReview',
      title: '¿Es Review?',
      type: 'boolean',
      initialValue: false,
      fieldset: 'reviewOptions', // Lo metimos a su cajita
    }),
    defineField({
      name: 'reviewStats',
      title: 'Estadísticas del Review',
      type: 'object',
      fieldset: 'reviewOptions', // Lo metimos a su cajita
      hidden: ({document}) => !document?.isReview,
      fields: [
        { name: 'score', title: 'Calificación (0-10)', type: 'string' },
        { name: 'status', title: 'Estado del Review', type: 'string' },
      ]
    }),

    // ─── CAJITA: OPCIONES DE POSICIONAMIENTO LUXURY (Home) ───
    defineField({
      name: 'isFeatured',
      title: '¿Nota Destacada? (Carrusel)',
      type: 'boolean',
      initialValue: false,
      description: 'Si se activa, aparecerá en el carrusel de destacados (No olvides quitar la anterior)',
      fieldset: 'layoutOptions',
    }),
    defineField({
      name: 'isDeepDive',
      title: '¿Es Deep Dive?',
      type: 'boolean',
      fieldset: 'layoutOptions', // Lo metimos a su cajita
      initialValue: false,
    }),
    defineField({
      name: 'isLegendary',
      title: '¿Es la destacada de Deep dives?',
      type: 'boolean',
      description: 'Activa esto para que aparezca arriba en la sección. Recuerda apagarlo en la anterior.',
      initialValue: false,
      fieldset: 'layoutOptions', 
    }),
    defineField({
      name: 'sectionBg',
      title: 'Fondo de Inmersión (Deep Dives)',
      type: 'image',
      description: 'Sube la foto que quieres que bañe el "cacho" superior de los deep dives.',
      fieldset: 'layoutOptions',
      options: { hotspot: true }
    }),
  ],

  // 🚀 PREVIEW ACTUALIZADO PARA VER EL JUEGO
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      gameName: 'game.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, gameName} = selection
      return {...selection, subtitle: `${author ? `by ${author}` : ''} ${gameName ? `| ${gameName}` : ''}`}
    },
  },
})