import { defineType, defineField } from 'sanity';
import { Monitor } from 'lucide-react';

export default defineType({
  name: 'gear',
  title: 'The Vault (Hardware)',
  type: 'document',
  icon: Monitor,
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Modelo del Producto', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    
    // 🔥 ¡ESTE CAMPO ES VITAL! Para tus rutas [slug].astro
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // Genera el slug automático basado en el nombre
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'gearCategory' }],
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'brand',
      title: 'Marca / Fabricante',
      type: 'reference',
      to: [{ type: 'gearBrand' }],
      validation: (Rule) => Rule.required(),
    }),

    // 🚀 AÑADIDO: Conexión con el autor que probó el hardware
    defineField({
      name: 'author',
      title: 'Autor de la Reseña',
      type: 'reference',
      to: [{ type: 'author' }],
      description: '¿Quién probó este hardware?'
    }),

    // 🚀 AÑADIDO: Conexión con el juego (si es edición especial)
    defineField({
      name: 'relatedGame',
      title: 'Juego Relacionado (Opcional)',
      type: 'reference',
      to: [{ type: 'game' }],
      description: 'Si es hardware edición especial de algún juego.'
    }),

    defineField({ name: 'price', title: 'Precio (Ej. $159)', type: 'string' }),
    
    // 🔥 TUS SPECS INTACTOS
    defineField({ 
      name: 'specs', 
      title: 'Especificaciones Rápidas', 
      type: 'array', 
      of: [{ type: 'string' }],
      description: 'Tags cortos como "24GB", "8K DPI", "WIRELESS"' 
    }),

    defineField({ 
      name: 'mainImage', 
      title: 'Foto del Producto', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    {
      name: 'caption',
      type: 'string',
      title: 'Pie de foto',
    },

    defineField({ 
      name: 'isHero', 
      title: '¿Es el producto destacado?', 
      type: 'boolean', 
      initialValue: false 
    }),

    defineField({ name: 'buyLink', title: 'Link de Compra / Review', type: 'url' }),
    
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'string',
      description: 'Máximo 80 caracteres para que quepa en la card.',
      validation: Rule => Rule.max(80)
    }),

    // 🔥 MODIFICADO: A blockContent para que use el Luxury Editor
    defineField({
      name: 'description',
      title: 'Descripción Completa / Análisis',
      type: 'blockContent', 
      description: 'Aquí te puedes explayar con todo el lore del hardware.'
    }),
  ],
  
  // 🔥 TU PREVIEW INTACTO
  preview: {
    select: { 
      title: 'name', 
      brandName: 'brand.name', // Accedemos al nombre dentro de la referencia
      media: 'mainImage' 
    },
    prepare(selection) {
      const { title, brandName, media } = selection;
      return {
        title: title,
        subtitle: brandName ? `Marca: ${brandName}` : 'Sin marca asignada',
        media: media
      }
    }
  }
});