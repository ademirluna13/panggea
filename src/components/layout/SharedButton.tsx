import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareProps) {
  const [copied, setCheck] = useState(false);

  const handleShare = async () => {
    // Si el navegador soporta compartir nativo (Móvil)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log("Error compartiendo:", err);
      }
    } else {
      // Si es PC, copiamos el link y damos feedback visual
      navigator.clipboard.writeText(url);
      setCheck(true);
      setTimeout(() => setCheck(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="group relative w-full md:w-max flex items-center justify-between gap-8 px-8 py-4 bg-[#050505] border border-white/5 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#FF4500]/50"
    >
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-[#FF4500]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <span className="relative z-10 font-mono text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/70 group-hover:text-white transition-colors">
        {copied ? "ENLACE_COPIADO_AL_SISTEMA" : "COMPARTIR DATOS"}
      </span>

      <div className="relative z-10">
        {copied ? (
          <Check size={18} className="text-[#00FF66] animate-pulse" />
        ) : (
          <Share2 size={18} className="text-[#FF4500] group-hover:scale-110 transition-transform" />
        )}
      </div>

      {/* Barra inferior decorativa */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF4500] shadow-[0_0_15px_#FF4500] transition-all duration-500" />
    </button>
  );
}