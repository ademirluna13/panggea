import { defineType, defineField } from 'sanity';
import { Terminal } from 'lucide-react'; // Icono opcional para Sanity

export default defineType({
  name: 'patchNote',
  title: 'Patch Logs',
  type: 'document',
  icon: Terminal,
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Parche',
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
    
    // ─── EL NUEVO CAMPO DE REFERENCIA AL JUEGO ───
    defineField({
      name: 'game',
      title: 'Juego',
      type: 'reference',
      to: [{ type: 'game' }], // Conecta directo con tu schema game.ts
      description: 'Selecciona a qué juego pertenece este parche',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'version',
      title: 'Versión del Parche (Ej. V1.0.5)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'patchType',
      title: 'Tipo de Parche / Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Balance', value: 'BAL' },
          { title: 'Buff', value: 'BUFF' },
          { title: 'Nerf', value: 'NERF' },
          { title: 'New Content', value: 'NEW CONTENT' },
          { title: 'Hotfix', value: 'HOTFIX' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta (Para la Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Fondo (Solo para la card grande)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha del Parche',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdateAt',
      title: 'Fecha del Parche Anterior (Opcional para el "Last: ...")',
      type: 'datetime',
    }),
    defineField({
      name: 'tickerHighlights',
      title: 'Cambios Rápidos para el Ticker (Opcional)',
      description: 'Añade textos cortos como "VENOM - SHIELD +1.5S" para que salgan en la barra en movimiento arriba.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo del Parche (Detalles Completos)',
      type: 'array',
      of: [{ type: 'block' }], // Aquí metes tu PortableText normal
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'game.name', // <--- Actualizado para leer el nombre a través de la referencia
      media: 'mainImage',
    },
  },
});