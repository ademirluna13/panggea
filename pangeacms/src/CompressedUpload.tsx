import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { Button, Card, Flex, Text, Box } from '@sanity/ui'

export const CompressedUpload = ({ onSelect, onClose }: any) => {
  const [isCompressing, setIsCompressing] = useState(false)

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    setIsCompressing(true)

    try {
      // 🔥 CONFIGURACIÓN PERRONA: Exprime sin piedad pero mantiene calidad visual
      const options = {
        maxSizeMB: 0.3, // Máximo 300kb de peso final
        maxWidthOrHeight: 1920, // Lo capea a Full HD
        useWebWorker: true, // Usa workers para no trabar el navegador del editor
        fileType: 'image/webp', // Lo convierte a WebP a huevo
      }

      const compressedBlob = await imageCompression(file, options)

      // Sanity es especial y necesita que le entreguemos un objeto 'File' con nombre
      const finalFile = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
        type: "image/webp",
      })

      // Le entregamos el archivo ya flaco a Sanity para que lo suba a la base
      onSelect([{ kind: 'file', value: finalFile }])
      onClose()
    } catch (error) {
      console.error("Error comprimiendo alvvvv:", error)
      setIsCompressing(false)
    }
  }

  return (
    <Card padding={4}>
      <Flex direction="column" align="center" gap={4}>
        <Text size={2} weight="bold">
          Subida Optimizada (Convierte a WebP automáticamente)
        </Text>
        <Box>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isCompressing}
            style={{ display: 'none' }}
            id="compressed-upload-input"
          />
          <label htmlFor="compressed-upload-input">
            <Button 
              as="span" 
              text={isCompressing ? "Explotando y comprimiendo... ⚙️" : "Seleccionar Imagen 🚀"} 
              tone="primary" 
              loading={isCompressing}
            />
          </label>
        </Box>
        <Text size={1} muted>
          El archivo se comprimirá a menos de 300kb en formato WebP ANTES de tocar la base de datos.
        </Text>
      </Flex>
    </Card>
  )
}

// Exportamos la configuración que Sanity necesita para inyectarlo en la UI
export const CompressedAssetSource = {
  name: 'compressed-upload',
  title: 'Subida Optimizada 🚀',
  component: CompressedUpload,
  icon: () => <span>🗜️</span>,
}