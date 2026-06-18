import {defineField, defineType} from 'sanity'
// 💡 TIP: Importamos un ícono de Lucide para que el sub-objeto se vea pro en el editor
import { Share2 } from 'lucide-react'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().error('El nombre del autor es obligatorio, pa.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('Genera el slug para la URL, bro.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),

    // ─── 🔥 EL NUEVO ARMAMENTO: REDES SOCIALES DINÁMICAS 🔥 ───
    defineField({
      name: 'socials',
      title: 'Redes Sociales',
      type: 'array',
      description: 'Agrega las redes sociales que usa este autor. Elige la plataforma y pega el enlace.',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Enlace Social',
          icon: Share2,
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'TikTok 🎵', value: 'tiktok' },
                  { title: 'Instagram 📸', value: 'instagram' },
                  { title: 'Twitter / X 🐦', value: 'twitter' },
                  { title: 'Facebook 👥', value: 'facebook' },
                  { title: 'YouTube 📺', value: 'youtube' },
                  { title: 'Twitch 💜', value: 'twitch' },
                  { title: 'Discord 👾', value: 'discord' },
                ],
              },
              validation: Rule => Rule.required().error('Tienes que elegir qué red es, pa.'),
            },
            {
              name: 'url',
              title: 'Enlace Completo (URL)',
              type: 'url',
              placeholder: 'https://www.tiktok.com/@pangea',
              validation: Rule => Rule.required().uri({
                scheme: ['http', 'https']
              }).error('Pega un enlace válido completo que empiece con https://'),
            },
          ],
          // Preview interna para que en la lista del panel de Sanity se lea limpio (Ej: "instagram - https://...")
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              const platforms: Record<string, string> = {
                tiktok: 'TikTok 🎵',
                instagram: 'Instagram 📸',
                twitter: 'Twitter/X 🐦',
                facebook: 'Facebook 👥',
                youtube: 'YouTube 📺',
                twitch: 'Twitch 💜',
                discord: 'Discord 👾'
              }
              return {
                title: platforms[title] || title || 'Red Social',
                subtitle: subtitle || 'Sin URL asignada'
              }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})