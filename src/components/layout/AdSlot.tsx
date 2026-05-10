import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  format?: string;
}

export const AdSlot = ({ slot, format = 'auto' }: AdSlotProps) => {
  // Ahora usamos el ref para apuntar directamente a la etiqueta HTML
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Si la etiqueta existe y AÚN NO ha sido procesada por Google...
    if (insRef.current && !insRef.current.getAttribute('data-adsbygoogle-status')) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Error cargando AdSense:", e);
      }
    }
  }, []); // Se ejecuta solo al montar el componente

  return (
    <ins 
      ref={insRef} // Conectamos la etiqueta al ref
      className="adsbygoogle"
      style={{ display: 'block', width: '100%', height: '100%' }}
      data-ad-client="ca-pub-5617654431862522" // 🔥 ¡Ya con el ca-pub-!
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};