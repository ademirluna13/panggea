import { useState, useMemo } from 'react';
import { Clock, ChevronRight } from 'lucide-react';

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
  // Extrae todos los highlights de todos los parches y los junta
  const allHighlights = useMemo(() => {
    let highlights: string[] = [];
    patches.forEach(p => {
      if (p.tickerHighlights && p.tickerHighlights.length > 0) {
        highlights = [...highlights, ...p.tickerHighlights];
      }
    });
    // Fallback por si no has llenado el campo en Sanity
    if (highlights.length === 0) highlights = ["SISTEMA OPERATIVO OPTIMIZADO", "SIN CAMBIOS CRÍTICOS RECIENTES"];
    // Lo triplicamos para que el scroll infinito no se corte de golpe
    return [...highlights, ...highlights, ...highlights, ...highlights];
  }, [patches]);

  // Filtros idénticos a los de tu imagen
  const filters = ['TODOS', 'BUFF', 'NERF', 'NEW CONTENT', 'HOTFIX', 'BALANCE'];

  // Filtrado de parches
  const filteredPatches = useMemo(() => {
    if (activeFilter === 'TODOS') return patches;
    return patches.filter(p => {
      const pt = p.patchType?.toUpperCase() || '';
      // Si el filtro es BALANCE, busca "BAL" (como está en tus opciones de Sanity)
      if (activeFilter === 'BALANCE') return pt.includes('BAL');
      return pt.includes(activeFilter);
    });
  }, [patches, activeFilter]);

  return (
    <div className="flex flex-col gap-10">
      
      {/* ─── TICKER BAR ─── */}
      <div className="w-full border-y border-white/10 overflow-hidden py-3 bg-white/[0.02] flex items-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* Máscaras de degradado en las orillas para el efecto fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020202] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020202] to-transparent z-10"></div>
        
        {/* Contenedor animado */}
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
              className={`px-8 py-3.5 font-headline text-[11px] md:text-[13px] font-black uppercase tracking-widest italic transition-all border rounded-sm ${isActive ? 'bg-white/[0.05]' : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white/60'}`}
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

      {/* ─── GRID DE CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPatches.map((patch, i) => {
          const isBig = i === 0;
          
          return (
            <a 
              key={patch.slug} 
              href={`/patchLog/${patch.slug}`}
              className={`group relative bg-[#050505] overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-2 flex flex-col ${isBig ? 'md:col-span-2 h-[450px]' : 'col-span-1 h-[400px]'}`}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${accentColor}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000 scale-105 group-hover:scale-100"
                  style={{ backgroundImage: `url(${patch.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent opacity-90" />
              </div>

              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-full">
                  
                {/* PARTE SUPERIOR (Tags y Fechas) */}
                <div className="flex justify-between items-start w-full">
                  <div>
                    <span className="font-mono text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 bg-[#020202] border border-white/10 rounded-sm mb-3 inline-block" style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}` }}>
                      {patch.patchType}
                    </span>
                    <div className="font-mono text-[8px] text-white/50 uppercase tracking-[0.3em]">
                      SYSTEM // {patch.version}
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-white/80 font-mono text-[9px] font-bold uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 border border-white/10 rounded-sm backdrop-blur-sm">
                      <Clock size={12} style={{ color: accentColor }} />
                      {new Date(patch.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                    </div>
                    {patch.lastUpdateAt && (
                      <div className="text-white/30 font-mono text-[7px] uppercase tracking-[0.3em]">
                        LAST: {new Date(patch.lastUpdateAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* CENTRO (Título y descripción) */}
                <div className="mt-auto mb-6 md:mb-8">
                  <h3 className={`font-headline font-black text-white uppercase italic tracking-tighter leading-[0.85] drop-shadow-2xl transition-colors ${isBig ? 'text-5xl sm:text-6xl md:text-8xl' : 'text-4xl md:text-5xl'}`}>
                    {/* Da prioridad al nombre del juego si existe, si no usa el título del parche */}
                    {patch.game || patch.title}
                  </h3>
                  <div className="overflow-hidden mt-4 max-w-xl">
                    <p className="text-white/50 text-xs md:text-sm italic leading-relaxed line-clamp-2 break-words">
                      {patch.description || 'Consulta los detalles del sistema y las notas completas de la actualización.'}
                    </p>
                  </div>
                </div>

                {/* INFERIOR (Botón) */}
                <div className="flex items-center justify-between border-t border-white/10 pt-5 md:pt-6">
                  <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 transition-colors group-hover:text-white">
                    &gt;_ VER PARCHE COMPLETO
                  </span>
                  <ChevronRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}