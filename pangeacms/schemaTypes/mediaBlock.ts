// schemas/mediaBlock.js
export default {
  name: 'mediaBlock',
  title: 'Bloque de Imagen y Texto',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageSize',
      title: 'Tamaño de la Imagen',
      type: 'string',
      description: 'Define qué tanto espacio ocupará la imagen frente al texto.',
      options: {
        list: [
          { title: 'Chica (25%)', value: 'small' },
          { title: 'Mediana (50%)', value: 'medium' },
          { title: 'Grande (75%)', value: 'large' },
          { title: 'Ancho Total', value: 'full' }
        ],
        layout: 'radio'
      },
      initialValue: 'medium'
    },
    {
      name: 'layout',
      title: 'Posición de la imagen',
      type: 'string',
      description: '¿De qué lado quieres la imagen?',
      options: {
        list: [
          { title: 'Izquierda', value: 'left' },
          { title: 'Derecha', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'left'
    },
    {
      name: 'text',
      title: 'Texto descriptivo',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'textAlign',
      title: 'Alineación del Texto',
      type: 'string',
      description: 'Selecciona cómo se debe acomodar el texto al lado de la imagen.',
      options: {
        list: [
          { title: 'Izquierda', value: 'left' },
          { title: 'Centro', value: 'center' },
          { title: 'Derecha', value: 'right' },
          { title: 'Justificado', value: 'justify' }
        ],
        layout: 'radio'
      },
      initialValue: 'justify'
    }
  ]
}