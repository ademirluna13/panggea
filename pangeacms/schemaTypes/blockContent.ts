import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Estilos de jerarquía H1, H2, etc.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Cita', value: 'blockquote'},
      ],
      lists: [{title: 'Lista', value: 'bullet'}],
      marks: {
        // BOTONES DE ALINEACIÓN (Decorators)
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Cursiva', value: 'em'},
          {title: 'Centrar', value: 'center', icon: () => 'C'},
          {title: 'Justificar', value: 'justify', icon: () => 'J'},
          {title: 'Derecha', value: 'right', icon: () => 'D'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{ title: 'URL', name: 'href', type: 'url' }],
          },
          // SELECTOR DE COLORES PROFESIONAL
          {
            title: 'Color de Texto',
            name: 'textColor',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'color',
              }
            ]
          }
        ],
      },
    }),
    
    // 🖼️ IMAGEN SUELTA (Con Wrap-around)
    defineArrayMember({ 
      type: 'image', 
      options: {hotspot: true},
      fields: [
        {
          name: 'layout',
          title: 'Alineación de la Imagen',
          type: 'string',
          options: {
            list: [
              { title: 'Izquierda (Texto la rodea)', value: 'left' },
              { title: 'Derecha (Texto la rodea)', value: 'right' },
              { title: 'Centro (Bloque independiente)', value: 'center' }
            ],
            layout: 'radio'
          },
          initialValue: 'center'
        },
        {
          name: 'size',
          title: 'Tamaño',
          type: 'string',
          options: {
            list: [
              { title: 'Chica', value: 'small' },
              { title: 'Mediana', value: 'medium' },
              { title: 'Grande', value: 'large' },
              { title: 'Ancho Total', value: 'full' }
            ],
            layout: 'radio'
          },
          initialValue: 'medium'
        },
        { name: 'alt', type: 'string', title: 'Texto Alternativo (SEO)' }
      ]
    }),
    
    // ⚡ BLOQUE ESPECIAL MEDIA (ZIGZAG)
    defineArrayMember({ type: 'mediaBlock' }),

    // 💰 BLOQUE DE PUBLICIDAD (BitXolo Billing System)
    defineArrayMember({
      type: 'object',
      name: 'adBlock',
      title: 'Bloque de Publicidad',
      fields: [
        {
          name: 'adType',
          title: 'Tipo de Anuncio',
          type: 'string',
          options: {
            list: [
              { title: 'Banner Horizontal', value: 'banner' },
              { title: 'Cuadrado (Flotante)', value: 'square' }
            ],
            layout: 'radio'
          },
          initialValue: 'banner'
        }
      ]
    }),

    // 📺 BLOQUE DE YOUTUBE
    defineArrayMember({
      type: 'object',
      name: 'youtube',
      title: 'YouTube Video',
      fields: [
        { name: 'url', type: 'url', title: 'URL del video' },
        {
          name: 'layout',
          title: 'Posición',
          type: 'string',
          options: {
            list: [
              { title: 'Izquierda', value: 'left' },
              { title: 'Derecha', value: 'right' },
              { title: 'Centro', value: 'center' }
            ],
            layout: 'radio'
          },
          initialValue: 'center'
        }
      ]
    }),

    // 🎵 BLOQUE DE SPOTIFY (New Luxury Feature)
    defineArrayMember({
      type: 'object',
      name: 'spotify',
      title: 'Spotify Embed',
      fields: [
        { name: 'url', type: 'url', title: 'URL de Spotify (Track/Album/Playlist)' },
        {
          name: 'layout',
          title: 'Posición',
          type: 'string',
          options: {
            list: [
              { title: 'Izquierda (Compacto)', value: 'left' },
              { title: 'Derecha (Compacto)', value: 'right' },
              { title: 'Centro (Largo)', value: 'center' }
            ],
            layout: 'radio'
          },
          initialValue: 'center'
        }
      ]
    }),
  ],
})