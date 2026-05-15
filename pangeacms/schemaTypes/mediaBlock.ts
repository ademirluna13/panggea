import { defineType } from 'sanity'

export default defineType({
  name: 'mediaBlock',
  title: 'Bloque Zigzag (Imagen + Texto)',
  type: 'object',
  fields: [
    { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
    {
      name: 'layout',
      title: 'Posición de la imagen',
      type: 'string',
      options: { list: [{title: 'Izquierda', value: 'left'}, {title: 'Derecha', value: 'right'}, {title: 'Centro', value: 'center'}], layout: 'radio' },
      initialValue: 'left'
    },
    {
      name: 'text',
      title: 'Texto descriptivo',
      type: 'array',
      of: [{
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}, {title: 'H2', value: 'h2'}],
        marks: {
          decorators: [
            {title: 'Negrita', value: 'strong'},
            {title: 'Centrar', value: 'center'},
            {title: 'Justificar', value: 'justify'},
          ],
          annotations: [
            { title: 'Color', name: 'textColor', type: 'object', fields: [{ name: 'color', type: 'color' }] }
          ]
        }
      }]
    }
  ]
})