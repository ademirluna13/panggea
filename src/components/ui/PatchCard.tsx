import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Terminal, Clock } from 'lucide-react';

interface PatchCardProps {
  item: any;
  index: number;
  isBig: boolean;
  tagColor: { hex: string; bg: string; border: string; text: string };
  accentColor: string; 
}

export default function PatchCard({ item, index, isBig, tagColor, accentColor }: PatchCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 🔥 MEJORA TÁCTICA: Soporte para textos ultra-masivos (>100 caracteres)
  const getAdaptiveFontSize = (text: string, heroMode: boolean) => {
    const len = text?.length || 0;
    if (heroMode) {
      if (len > 100) return 'text-lg sm:text-xl md:text-2xl'; 
      if (len > 55) return 'text-xl sm:text-2xl md:text-3xl';
      return 'text-2xl sm:text-3xl md:text-4xl';
    } else {
      if (len > 80) return 'text-xs md:text-sm';
      if (len > 45) return 'text-sm md:text-base';
      if (len > 25) return 'text-base md:text-lg';
      return 'text-lg md:text-xl';
    }
  };

  const gridClass = isBig ? 'lg:col-span-8 lg:row-span-2' : 'lg:col-span-4 lg:row-span-1';

  return (
    <motion.a 
      href={`/patchLog/${item.slug}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`trending-card group relative flex flex-col justify-between overflow-hidden border border-transparent rounded-[1.8rem] bg-pangea-card/40 backdrop-blur-xl z-30 shadow-2xl transition-all duration-500 min-h-[250px] w-full h-full lg:hover:-translate-y-2 ${gridClass}`}
      style={{
        borderColor: isHovered ? accentColor : 'transparent',
        boxShadow: isHovered ? `0 0 25px ${accentColor}60, inset 0 0 10px ${accentColor}30` : 'none'
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {item.img && (
          <img 
            src={item.img} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-80 transition-all duration-700" 
          />
        )}
        {/* FIX TAILWIND v4: bg-linear-to-t */}
        <div className="absolute h-[55%] bottom-0 inset-x-0 bg-linear-to-t from-[#020202] via-[#020202]/95 to-transparent z-10 transition-all duration-500" />
      </div>

      <div className="relative z-20 p-5 md:p-7 flex justify-between items-start w-full">
        <div className="flex flex-col gap-2">
           <span 
             className="font-mono text-[8px] md:text-[11px] font-black px-2 py-1 rounded-sm border bg-black/50 uppercase tracking-widest backdrop-blur-md w-fit" 
             style={{ borderColor: `${tagColor.hex}40`, color: tagColor.hex }}
           >
             {item.type}
           </span>
           <span className="font-mono text-[8px] font-black px-2 py-1 rounded-sm border border-white/10 bg-black/50 text-white/80 uppercase tracking-widest backdrop-blur-md w-fit">
             {item.game} // {item.version}
           </span>
        </div>

        {item.lastUpdate && (
          <span className="flex items-center gap-1.5 font-label text-white/50 text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-black/30 px-2 py-1 rounded-md backdrop-blur-md">
            <Clock size={10} style={{ color: accentColor }} /> LAST: {item.lastUpdate}
          </span>
        )}
      </div>

      <div className="relative z-20 p-5 md:p-7 flex flex-col justify-end w-full mt-auto">
        
        {/* Título con hyphens-auto para el español */}
        <h3 
          className={`font-headline font-[950] uppercase italic tracking-tighter leading-[0.95] mb-2 transition-all duration-300 break-words hyphens-auto ${getAdaptiveFontSize(item.title, isBig)}`}
          style={{ 
            color: '#ffffff', 
            textShadow: isHovered ? `0 0 20px ${accentColor}, 0 0 40px ${accentColor}` : 'none' 
          }}
        >
          {item.title}
        </h3>

        {/* 🔥 LA BARRITA CORTITA MURIÓ AQUÍ 🔥 */}

        <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
          <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white/70 text-[11px] md:text-xs font-body italic leading-relaxed line-clamp-2 mb-3 pt-2 break-words">
              {item.desc || 'Desclasificando información del parche, proceda con precaución.'}
            </p>
          </div>
        </div>

        {/* Footer Ultra Limpio (Igual al PanggeaCard) */}
        <div className="pt-3 flex items-center justify-between font-mono text-[9px] font-black uppercase mt-1 text-white/40">
          <span>{item.currentDate}</span>
          <ChevronRight 
            size={18} 
            className="transition-transform lg:group-hover:translate-x-2" 
            style={{ color: isHovered ? accentColor : 'rgba(255,255,255,0.4)' }}
          />
        </div>
      </div>

      {/* 🔥 NUEVA BARRA DE NEÓN INFERIOR ABSOLUTA 🔥 */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30" 
        style={{ 
          backgroundColor: accentColor,
          boxShadow: isHovered ? `0 0 15px ${accentColor}` : 'none' 
        }}
      />
    </motion.a>
  );
}