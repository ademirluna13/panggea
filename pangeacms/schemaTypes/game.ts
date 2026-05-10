import { defineType, defineField } from 'sanity';
import { Gamepad2 } from 'lucide-react'; // O el icono que prefieras

export default defineType({
  name: 'game',
  title: 'Juegos (Base de Datos)',
  type: 'document',
  icon: Gamepad2,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Juego',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Juego (Para filtros)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});