import { useState, useMemo } from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface PatchData {
  title: string;
  slug: string;
  game: string;
  version: string;
  patchType: string;
  description: string;
  image: string;
  publishedAt: string;
  lastUpdateAt?: string;
  tickerHighlights?: string[];
}

export default function PatchLogGrid({ patches = [], accentColor }: { patches: PatchData[], accentColor: string }) {
  const [activeFilter, setActiveFilter] = useState('TODOS');

  // ─── LÓGICA DEL TICKER (Marquee) ───
  const allHighlights = useMemo(() => {
    let highlights: string[] = [];
    patches.forEach(p => {
      if (p.tickerHighlights && p.tickerHighlights.length > 0) {
        highlights = [...highlights, ...p.tickerHighlights];
      }
    });
    if (highlights.length === 0) highlights = ["SISTEMA OPERATIVO OPTIMIZADO", "SIN CAMBIOS CRÍTICOS RECIENTES"];
    return [...highlights, ...highlights, ...highlights, ...highlights];
  }, [patches]);

  const filters = ['TODOS', 'BUFF', 'NERF', 'NEW CONTENT', 'HOTFIX', 'BALANCE'];

  const filteredPatches = useMemo(() => {
    if (activeFilter === 'TODOS') return patches;
    return patches.filter(p => {
      const pt = p.patchType?.toUpperCase() || '';
      if (activeFilter === 'BALANCE') return pt.includes('BAL');
      return pt.includes(activeFilter);
    });
  }, [patches, activeFilter]);

  // 🧠 FUNCIÓN HELPER PARA REESCALAR EL TITULO POR SU LONGITUD EN EL BENTO
  const getFontSize = (title: string, isBig: boolean) => {
    const length = title?.length || 0;
    if (isBig) {
      if (length > 50) return 'text-3xl sm:text-4xl md:text-5xl';
      if (length > 30) return 'text-4xl sm:text-5xl md:text-6xl';
      return 'text-5xl md:text-7xl';
    } else {
      if (length > 45) return 'text-lg md:text-xl';
      if (length > 25) return 'text-xl md:text-2xl';
      return 'text-2xl md:text-3xl';
    }
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* ─── TICKER BAR ─── */}
      <div className="w-full border-y border-white/10 overflow-hidden py-3 bg-white/[0.02] flex items-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-pangea-neutral to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-pangea-neutral to-transparent z-10"></div>
        
        <div className="whitespace-nowrap animate-[ticker_40s_linear_infinite] flex gap-12 items-center">
          {allHighlights.map((text, i) => (
            <span key={i} className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-6" style={{ color: accentColor }}>
              <span className="drop-shadow-[0_0_8px_currentColor] opacity-80">{text}</span>
              <span className="w-1 h-1 bg-white/20"></span>
            </span>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </div>

      {/* ─── FILTROS ─── */}
      <div className="flex flex-wrap items-center gap-4">
        {filters.map(f => {
          const isActive = activeFilter === f;
          return (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-8 py-3.5 font-headline text-[11px] md:text-[13px] font-black uppercase tracking-widest italic transition-all border rounded-sm focus:outline-none ${isActive ? 'bg-white/[0.05]' : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white/60'}`}
              style={{ 
                borderColor: isActive ? accentColor : '',
                color: isActive ? accentColor : '',
                boxShadow: isActive ? `0 0 20px ${accentColor}20` : ''
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* ─── GRID DE CARDS (BENTO GRID CLÁSICO CON DISEÑO RESTAURADO) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
        {filteredPatches.map((patch, i) => {
          const isBig = i === 0;
          
          return (
            <a 
              key={patch.slug} 
              href={`/patchLog/${patch.slug}`}
              className={`group relative bg-pangea-card/40 backdrop-blur-xl border border-white/5 rounded-[1.8rem] overflow-hidden transition-all duration-500 shadow-2xl flex flex-col lg:hover:-translate-y-2 ${isBig ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.boxShadow = `0 0 25px ${accentColor}60, inset 0 0 10px ${accentColor}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* IMAGEN DE FONDO RESPONSIVA */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src={patch.image} 
                  alt={patch.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-80 transition-all duration-700 z-0" 
                />
                <div className="absolute h-[60%] bottom-0 inset-x-0 bg-gradient-to-t from-[#020202] via-[#020202]/95 to-transparent z-10 transition-all duration-500" />
              </div>

              {/* TOP BAR (Tags y Diseño Chiludo Restaurado) */}
              <div className="relative z-20 p-6 md:p-8 flex justify-between items-start w-full">
                <div className="flex flex-col items-start">
                  <span 
                    className="font-mono text-[8px] font-black px-2 py-1 rounded-sm border bg-black/50 uppercase tracking-widest backdrop-blur-md w-fit mb-2 inline-block transition-colors duration-500" 
                    style={{ borderColor: `${accentColor}40`, color: accentColor }}
                  >
                    {patch.patchType}
                  </span>
                  
                  {/* 🔥 AQUÍ ESTÁ EL DISEÑO DEL JUEGO Y VERSIÓN QUE TE GUSTÓ 🔥 */}
                  <div className="flex items-center gap-2 mt-1 font-mono">
                    <span className="text-[9px] text-white/70 font-bold uppercase tracking-[0.3em] drop-shadow-md">
                      {patch.game}
                    </span>
                    <span className="text-white/20 text-[10px] font-black italic">/</span>
                    <span 
                      className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm bg-black/60 border backdrop-blur-md transition-all duration-500 group-hover:scale-105"
                      style={{ color: accentColor, borderColor: `${accentColor}40`, boxShadow: `0 0 10px ${accentColor}20` }}
                    >
                      V_{patch.version}
                    </span>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-2">
                  {patch.lastUpdateAt && (
                    <div className="text-white/40 font-mono text-[7px] uppercase tracking-[0.3em] font-black bg-black/50 px-2 py-1 border border-white/10 rounded-sm backdrop-blur-md">
                      LAST: {new Date(patch.lastUpdateAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* BOTTOM BAR (Título y Descripción) */}
              <div className="relative z-20 p-6 md:p-8 flex flex-col w-full mt-auto">
                <h3 
                  className={`font-headline font-black text-white uppercase italic tracking-tighter leading-[0.9] mb-2 break-words hyphens-auto transition-all duration-300 ${getFontSize(patch.title, isBig)}`}
                  style={{ textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}
                >
                  {patch.title}
                </h3>
                
                {/* ANIMACIÓN RESPONSIVA DE DESCRIPCIÓN */}
                <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                  <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white/70 text-[11px] md:text-xs italic leading-relaxed line-clamp-2 mt-2 break-words">
                      {patch.description || 'Consulta los detalles del sistema y las notas completas de la actualización.'}
                    </p>
                  </div>
                </div>

                {/* FOOTER ESTANDARIZADO DEL BENTO (Reloj + Flecha) */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                  <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] font-black uppercase tracking-widest">
                    <Clock size={12} style={{ color: accentColor }} /> 
                    {new Date(patch.publishedAt).toLocaleDateString('es-MX', { month: 'short', day: '2-digit' })}
                  </div>
                  <ArrowRight size={18} className="text-white/40 -translate-x-2 group-hover:text-white group-hover:translate-x-0 transition-all duration-500" style={{ color: accentColor }} />
                </div>
              </div>

              {/* 🔥 BARRA INFERIOR NEÓN ESTANDARIZADA 🔥 */}
              <div 
                className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30" 
                style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}