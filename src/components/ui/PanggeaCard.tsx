import { useState } from 'react';
import { Clock, ArrowRight, Monitor } from 'lucide-react'; 

interface PangeaCardProps {
  title: string;
  slug: string;
  description: string;
  category: string;
  heroImage: string;
  publishedAt?: string; 
  baseHref: string;
  readTime?: string;
  platform?: string; 
  accentColor: string;
  className?: string;
  isHero?: boolean;
  customFooterText?: string;
  CustomFooterIcon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; 
}

export default function PangeaCard({
  title,
  slug,
  description,
  category,
  heroImage,
  publishedAt,
  baseHref,
  readTime,
  platform,
  accentColor,
  className = "",
  isHero = false,
  customFooterText,
  CustomFooterIcon
}: PangeaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const formatSanityDate = (dateVal?: string) => {
    if (!dateVal) return 'ARCHIVO_ACTIVO'; 
    try {
      const cleanDate = dateVal.includes(' ') ? dateVal.replace(' ', 'T') : dateVal;
      const d = new Date(cleanDate);
      if (isNaN(d.getTime())) return 'ERROR_FECHA'; 
      return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
    } catch (error) {
      return 'ERROR_FECHA';
    }
  };

  return (
    <a 
      href={`${baseHref}/${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`trending-card group relative flex flex-col justify-between overflow-hidden border border-transparent rounded-[1.8rem] bg-pangea-card/40 backdrop-blur-xl z-30 shadow-2xl transition-all duration-500 w-full h-full lg:hover:-translate-y-2 ${className}`}
      style={{
        borderColor: isHovered ? accentColor : 'transparent',
        boxShadow: isHovered ? `0 0 25px ${accentColor}60, inset 0 0 10px ${accentColor}30` : 'none'
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {heroImage && (
          <img 
            src={heroImage} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-80 transition-all duration-700"
          />
        )}
        <div className="absolute h-[55%] bottom-0 inset-x-0 bg-linear-to-t from-[#020202] via-[#020202]/95 to-transparent z-10 transition-all duration-500" />
      </div>

      <div className="relative z-20 p-5 md:p-7 flex justify-between items-start w-full">
        <div className="flex flex-wrap gap-2">
          <span 
            className="font-mono text-[8px] font-black px-2 py-1 rounded-sm border bg-black/50 uppercase tracking-widest backdrop-blur-md w-fit"
            style={{ borderColor: `${accentColor}40`, color: accentColor }}
          >
            {category}
          </span>
          {platform && (
            <span className="flex items-center gap-1.5 font-mono text-[8px] font-black px-2 py-1 rounded-sm border border-white/10 bg-black/50 text-white/80 uppercase tracking-widest backdrop-blur-md w-fit">
              <Monitor size={10} /> {platform}
            </span>
          )}
        </div>
        
        {readTime && (
          <span className="flex items-center gap-1.5 font-label text-white/50 text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-black/30 px-2 py-1 rounded-md backdrop-blur-md">
            <Clock size={10} style={{ color: accentColor }} /> {readTime}
          </span>
        )}
      </div>

      <div className="relative z-20 p-5 md:p-7 flex flex-col w-full mt-auto">
        <h3 
          className={`font-headline font-[950] uppercase italic tracking-tighter leading-[0.95] mb-2 transition-all duration-300 break-words hyphens-auto ${getAdaptiveFontSize(title, isHero)}`}
          style={{ 
            color: '#ffffff',
            textShadow: isHovered ? `0 0 20px ${accentColor}, 0 0 40px ${accentColor}` : 'none'
          }}
        >
          {title}
        </h3>

        {/* 🔥 LA BARRITA DE EN MEDIO MURIÓ AQUÍ 🔥 */}

        <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white/70 text-[11px] md:text-xs font-body italic line-clamp-2 leading-relaxed mb-3 pt-2 break-words">
              "{description}"
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] font-black uppercase mt-1 text-white/40">
          
          {customFooterText ? (
            <span className="flex items-center gap-1.5">
              {CustomFooterIcon && <CustomFooterIcon size={12} style={{ color: accentColor }} />}
              <span style={{ color: accentColor }}>{customFooterText}</span>
            </span>
          ) : (
            <span>{formatSanityDate(publishedAt)}</span>
          )}

          <ArrowRight 
            size={18} 
            className="transition-transform lg:group-hover:translate-x-2"
            style={{ color: accentColor }}
          />
        </div>
      </div>

      {/* 🔥 NUEVA BARRA DE NEÓN INFERIOR 🔥 */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30" 
        style={{ 
          backgroundColor: accentColor,
          boxShadow: isHovered ? `0 0 15px ${accentColor}` : 'none' 
        }}
      />
    </a>
  );
}