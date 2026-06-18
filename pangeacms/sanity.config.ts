import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { colorInput } from '@sanity/color-input'

// 🔥 Tu componente de compresión se queda exactamente igual
import { CompressedAssetSource } from './src/CompressedUpload'

// 💡 Importamos íconos para darle identidad visual premium a cada carpeta
import { 
  FileText, Users, Folder, Gamepad2, Terminal, 
  Disc, Radio, HardDrive, ShieldAlert, Award, 
  BookOpen, Layers, Sliders, LayoutDashboard 
} from 'lucide-react'

export default defineConfig({
  name: 'default',
  title: 'PangeaCMS',

  projectId: 'zjxg4fvd',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Pangea Core // Panel')
          .items([
            
            // ─── GRUPO 1: BLOG / EDITORIAL ───
            S.listItem()
              .title('Blog & Noticias')
              .icon(FileText)
              .child(
                S.list()
                  .title('Contenido Editorial')
                  .items([
                    S.documentTypeListItem('post').title('Posts').icon(FileText),
                    S.documentTypeListItem('author').title('Autores').icon(Users),
                    S.documentTypeListItem('category').title('Categorías de Blog').icon(Folder),
                  ])
              ),
              
            S.divider(), // Línea divisoria estética en la barra lateral

            // ─── GRUPO 2: GAMING BASE DE DATOS ───
            S.listItem()
              .title('Gaming & Meta')
              .icon(Gamepad2)
              .child(
                S.list()
                  .title('Base de Datos de Juegos')
                  .items([
                    S.documentTypeListItem('game').title('Juegos (Base de Datos)').icon(Gamepad2),
                    S.documentTypeListItem('patchNote').title('Patch Logs').icon(Terminal),
                    S.documentTypeListItem('tierEntry').title('Tier Arsenal').icon(Disc),
                    S.documentTypeListItem('radarEvent').title('Radar (Eventos y Drops)').icon(Radio),
                  ])
              ),

            S.divider(),

            // ─── GRUPO 3: THE VAULT ───
            S.listItem()
              .title('The Vault (Hardware)')
              .icon(HardDrive)
              .child(
                S.list()
                  .title('Suministros de Hardware')
                  .items([
                    S.documentTypeListItem('gear').title('The Vault (Hardware)').icon(HardDrive),
                    S.documentTypeListItem('gearCategory').title('Categorías de Hardware').icon(Sliders),
                    S.documentTypeListItem('gearBrand').title('Marcas de Hardware').icon(Award),
                  ])
              ),

            S.divider(),

            // ─── GRUPO 4: GUÍAS Y TRUCOS ───
            S.listItem()
              .title('Guías & Estrategia')
              .icon(BookOpen)
              .child(
                S.list()
                  .title('Sistema de Academia')
                  .items([
                    S.documentTypeListItem('guide').title('Guías y Trucos').icon(BookOpen),
                    S.documentTypeListItem('guideLevel').title('Niveles de Dificultad').icon(Layers),
                    S.documentTypeListItem('guideType').title('Tipos de Guía').icon(ShieldAlert),
                  ])
              ),
          ]),
    }), 
    visionTool(), 
    colorInput()
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    image: {
      // Tu magia de compresión única se mantiene como la fuente principal
      assetSources: () => [
        CompressedAssetSource,
      ],
    },
  },
})