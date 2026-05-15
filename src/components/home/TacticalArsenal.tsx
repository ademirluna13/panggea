import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, ChevronRight, ArrowRight, ShieldAlert, BarChart3 } from 'lucide-react';


const ACCENT = "#00FF66";

interface TierEntry {
  title: string;
  slug: string;
  image?: string;
  img?: string;        // Fallback
  heroImage?: string;  // Fallback
  description?: string;
  desc?: string;       // Fallback
  rank: string;
  rankScore: number;
  gameName: string;
  gameLogo?: string;
}

interface TacticalArsenalProps {
  entries?: TierEntry[];
  accentColor?: string;
}

export function TacticalArsenal({ entries = [], accentColor = ACCENT }: TacticalArsenalProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔥 ESCUDO ANTI-CRASH DE ADSENSE 🔥
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filters = useMemo(() => {
    const uniqueGames = new Map();
    entries.forEach(e => {
      const gameUpper = e.gameName?.toUpperCase() || 'UNKNOWN';
      if (!uniqueGames.has(gameUpper)) {
          uniqueGames.set(gameUpper, e.gameLogo || null); 
      }
    });
    return [
      { name: 'ALL', logo: null },
      ...Array.from(uniqueGames.entries()).map(([name, logo]) => ({ name, logo }))
    ];
  }, [entries]);

  const filteredEntries = activeFilter === 'ALL' 
    ? entries 
    : entries.filter(e => e.gameName?.toUpperCase() === activeFilter);

  // 🚨 SE ELIMINÓ useGSAP PARA LOS HOVERS. AHORA TODO ES PURO CSS TAILWIND 🚨

  return (
    <section ref={containerRef} className="py-24 bg-[#020202] relative overflow-hidden flex flex-col items-center w-full">
      
      {/* GLOW DE FONDO */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}08 0%, transparent 70%)` }} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6 relative z-10">

        {/* ─── CONTENIDO CENTRAL ─── */}
        <div className="max-w-[1200px] w-full">
          
          {/* HEADER */}
          <div className="mb-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
              <div className="flex flex-col items-start w-full lg:w-auto">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-12 h-1" style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}80` }} />
                  <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic" style={{ color: accentColor }}>
                    System_Scanning // v.2.6
                  </span>
                </div>
                <h2 className="font-headline text-white text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-[950] tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                  TIER <br className="hidden sm:block" />
                  <span className="text-transparent" style={{ WebkitTextStroke: `2px ${accentColor}` }}>
                    ARSENAL
                  </span>
                </h2>
              </div>

              <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
                <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed">
                  "Clasificación de élite y análisis del meta actual. Los picks que definen la victoria."
                </p>
                <a href="/tier" className="inline-flex items-center gap-3 md:gap-4 font-mono hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group" style={{ color: accentColor }}>
                  Revisa los tiers <ChevronRight size={18} className="md:w-[22px] md:h-[22px] lg:group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* FILTROS CIRCULARES */}
          <div className="flex items-center gap-6 sm:gap-8 mb-16 overflow-x-auto no-scrollbar py-4">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.name;
              return (
                <button key={filter.name} onClick={() => setActiveFilter(filter.name)} className="group flex flex-col items-center gap-4 min-w-[80px]">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden
                    ${isActive ? '' : 'border-white/10 bg-[#050505] lg:hover:border-white/30 lg:hover:scale-110'}`}
                    style={{ 
                      borderColor: isActive ? accentColor : '',
                      boxShadow: isActive ? `0 0 20px ${accentColor}40` : ''
                    }}>
                    
                    {filter.logo ? (
                      <img src={filter.logo} alt={filter.name} className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-100 scale-110' : 'opacity-30 grayscale lg:group-hover:grayscale-0 lg:group-hover:opacity-100'}`} />
                    ) : (
                      <Target size={20} style={{ color: isActive ? accentColor : 'rgba(255,255,255,0.2)' }} />
                    )}
                  </div>
                  <span className={`font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase transition-colors text-center
                    ${isActive ? '' : 'text-white/20 lg:group-hover:text-white'}`}
                    style={{ color: isActive ? accentColor : '' }}>
                    {filter.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ─── GRID DE CARDS CON TAILWIND ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, i) => {
                
                // Fallbacks
                const imageUrl = entry.image || entry.img || entry.heroImage;
                const entryText = entry.description || entry.desc;

                return (
                  <motion.a 
                    layout
                    href={`/tier/${entry.slug}`}
                    key={entry.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="tier-card group relative bg-[#050505] border border-white/5 overflow-hidden transition-all duration-500 flex flex-col shadow-2xl h-[480px] lg:hover:-translate-y-2"
                    onMouseOver={(e) => {
                      if(window.innerWidth >= 1024){
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 10px 30px -10px ${accentColor}40`;
                      }
                    }}
                    onMouseOut={(e) => {
                      if(window.innerWidth >= 1024){
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    
                    {/* 🔥 IMAGEN ESTÁTICA Y RESPONSIVA: Color en móvil, Gris en PC, Cero Zoom 🔥 */}
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={entry.title} 
                        className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-70 lg:grayscale lg:opacity-30 lg:group-hover:grayscale-0 lg:group-hover:opacity-70 transition-all duration-1000 z-0"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent z-10 lg:group-hover:from-[#020202]/90 transition-all duration-500"></div>

                    {/* Badge Rango */}
                    <div className="absolute top-6 right-6 w-14 h-14 border-2 bg-black/40 backdrop-blur-md flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500"
                         style={{ borderColor: accentColor }}>
                      <span className="font-headline text-3xl font-black italic" style={{ color: accentColor }}>{entry.rank}</span>
                    </div>

                    {/* Contenido */}
                    <div className="relative z-20 flex flex-col justify-end p-8 h-full mt-auto">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <ShieldAlert size={12} style={{ color: accentColor }} />
                           <span className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{ color: accentColor }}>{entry.gameName}</span>
                        </div>
                        <h3 className="font-headline text-4xl sm:text-5xl text-white font-[950] uppercase italic tracking-tighter transition-colors leading-[0.8] drop-shadow-lg">
                          {entry.title}
                        </h3>
                      </div>

                      {/* 🔥 MAGIA RESPONSIVA TAILWIND 🔥 */}
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                        <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                          <div className="pt-6 mt-4 border-t border-white/10 flex flex-col">
                             <p className="text-white/80 md:text-white/60 text-sm italic leading-relaxed line-clamp-3">
                               "{entryText || 'Explora el análisis táctico de este agente en nuestro tier list detallado.'}"
                             </p>
                             <div className="mt-6 flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                               <span>Analizar Expediente</span>
                               <ArrowRight size={14} className="lg:group-hover:translate-x-2 transition-transform" />
                             </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,102,0.06),rgba(0,255,102,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-30"></div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}