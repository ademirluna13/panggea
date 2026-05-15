import { defineType, defineField } from 'sanity';
import { SignalHigh } from 'lucide-react';

export default defineType({
  name: 'guideLevel',
  title: 'Niveles de Dificultad',
  type: 'document',
  icon: SignalHigh,
  fields: [
    defineField({ name: 'title', title: 'Nombre del Nivel', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ 
      name: 'color', 
      title: 'Color Táctico (Hex)', 
      type: 'string', 
      description: 'Ej: #00F0FF para que la card brille de ese color.' 
    }),
  ],
});