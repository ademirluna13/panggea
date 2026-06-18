import { defineType, defineField } from 'sanity';
import { Terminal } from 'lucide-react'; 

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
      validation: (Rule) => Rule.required().error('El título del parche es obligatorio, pa.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('¡Obligatorio! Dale a "Generate" para no romper los enlaces del front.'),
    }),
    
    // ─── REFERENCIA AL JUEGO ───
    defineField({
      name: 'game',
      title: 'Juego',
      type: 'reference',
      to: [{ type: 'game' }], 
      description: 'Selecciona a qué juego pertenece este parche',
      validation: (Rule) => Rule.required().error('Debes enlazar este parche con un juego de la base de datos.'),
    }),

    defineField({
      name: 'version',
      title: 'Versión del Parche (Ej. V1.0.5)',
      type: 'string',
      validation: (Rule) => Rule.required().error('La versión es clave para el histórico de cambios.'),
    }),
    defineField({
      name: 'patchType',
      title: 'Tipo de Parche / Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Balance ⚖️', value: 'BAL' },
          { title: 'Buff 📈', value: 'BUFF' },
          { title: 'Nerf 📉', value: 'NERF' },
          { title: 'New Content 🚀', value: 'NEW CONTENT' },
          { title: 'Hotfix 🔧', value: 'HOTFIX' },
        ],
      },
      validation: (Rule) => Rule.required().error('Selecciona el tipo de impacto del parche.'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta (Para la Card)',
      type: 'text',
      rows: 3,
      description: 'Breve resumen de los cambios más pesados.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen de Fondo (Solo para la card grande)',
      type: 'image',
      options: { hotspot: true },
      // 🔥 FILTRO CADENERO: Mismo bloqueo anti-archivos pesados de tu post.ts
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value || !value.asset) return true;
        const ref = value.asset._ref || '';
        if (!ref.endsWith('-webp')) {
          return '🚨 ¡PROHIBIDO SUBIR IMÁGENES CRUDAS! Usa el botón "Select" y elige la "Subida Optimizada 🚀".';
        }
        return true;
      }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha del Parche',
      type: 'datetime',
      // Auto-rellena con la hora exacta de creación del documento
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('La fecha es obligatoria para evitar fallos en el timeline.'),
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
      type: 'blockContent', 
      description: 'Aquí va toda la biblia de cambios. Puedes meter videos de los buffs/nerfs, imágenes y hasta código.'
    }),
  ],

  // 🚀 PREVIEW ACTUALIZADO: Ahora combina versión y juego para un escaneo visual perfecto
  preview: {
    select: {
      title: 'title',
      version: 'version',
      gameName: 'game.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { version, gameName } = selection;
      return {
        ...selection,
        subtitle: `${version ? `${version}` : ''} ${gameName ? `| ${gameName}` : ''}`
      };
    },
  },
});