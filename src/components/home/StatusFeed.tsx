import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Terminal, Clock } from 'lucide-react';


// 1. SISTEMA DE COLORES SEMÁNTICOS (Tags internos)
const SYS_COLORS = {
  'NEW CONTENT': { label: 'NEW CONTENT', hex: '#00EEFF', bg: 'bg-[#00EEFF]/10', border: 'border-[#00EEFF]/30', text: 'text-[#00EEFF]' },
  'BUFF':        { label: 'BUFF',        hex: '#00FF66', bg: 'bg-[#00FF66]/10', border: 'border-[#00FF66]/30', text: 'text-[#00FF66]' },
  'NERF':        { label: 'NERF',        hex: '#FF0033', bg: 'bg-[#FF0033]/10', border: 'border-[#FF0033]/30', text: 'text-[#FF0033]' },
  'HOTFIX':      { label: 'HOTFIX',      hex: '#FFCC00', bg: 'bg-[#FFCC00]/10', border: 'border-[#FFCC00]/30', text: 'text-[#FFCC00]' },
  'BALANCE':     { label: 'BALANCE',     hex: '#A020F0', bg: 'bg-[#A020F0]/10', border: 'border-[#A020F0]/30', text: 'text-[#A020F0]' },
  'BAL':         { label: 'BALANCE',     hex: '#A020F0', bg: 'bg-[#A020F0]/10', border: 'border-[#A020F0]/30', text: 'text-[#A020F0]' },
};

const FILTERS = ['TODOS', 'BUFF', 'NERF', 'NEW CONTENT', 'HOTFIX', 'BALANCE'];

export function StatusFeed({ patches = [], tickerItems = [] }: { patches?: any[], tickerItems?: any[] }) {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🔥 ESCUDO ANTI-CRASH DE ADSENSE 🔥
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const displayTicker = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];
  
  const filteredPatches = activeFilter === 'TODOS' 
    ? patches 
    : patches.filter(p => {
        const typeKey = p.type?.toUpperCase() || 'BAL';
        return SYS_COLORS[typeKey as keyof typeof SYS_COLORS]?.label === activeFilter;
      });

  // 🚨 SE ELIMINÓ useGSAP PARA LOS HOVERS. AHORA TODO ES PURO CSS TAILWIND 🚨

  return (
    <section ref={containerRef} className="py-24 bg-[#020202] relative overflow-hidden flex flex-col items-center border-y border-white/5">
      
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6">


        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER Y TICKER */}
          <div className="mb-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
              <div className="flex flex-col items-start w-full lg:w-auto">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-12 h-1 bg-[#A020F0] shadow-[0_0_20px_#A020F0]" />
                  <span className="font-mono text-[#A020F0] text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic drop-shadow-md">
                    Sync_Stream // v.2.6
                  </span>
                </div>
                <h2 className="font-headline text-white text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                  PATCH <br className="hidden sm:block" />
                  <span className="text-transparent break-words sm:inline-block mt-2 sm:mt-0" style={{ WebkitTextStroke: '2px #A020F0' }}>
                    LOG
                  </span>
                </h2>
              </div>

              <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
                <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed drop-shadow-md">
                  "Buffs, nerfs y hotfixes de largo aliento. Todos los cambios del meta que merecen tu tiempo."
                </p>
                <a href="/patchLog" className="inline-flex items-center gap-3 md:gap-4 font-mono text-[#A020F0] lg:hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md">
                  Explorar actualizaciones <ChevronRight size={18} className="md:w-[22px] md:h-[22px] lg:group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            <div className="relative border-y border-[#A020F0]/20 bg-[#A020F0]/5 py-3 overflow-hidden flex mt-12 mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
              <motion.div className="flex whitespace-nowrap gap-10" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
                {displayTicker.map((t, i) => {
                  const tagColor = SYS_COLORS[t.type?.toUpperCase() as keyof typeof SYS_COLORS] || SYS_COLORS['BAL'];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-black text-white/60 uppercase tracking-widest">{t.game}</span>
                      <span className="text-[#A020F0]/40">·</span>
                      <span className="font-mono text-[10px] font-black uppercase tracking-widest" style={{ color: tagColor.hex }}>{t.change}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-3 mb-14">
            {FILTERS.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)} 
                className={`font-headline text-xs md:text-sm font-black tracking-widest uppercase px-6 py-2.5 border rounded-sm transition-all duration-300 ${activeFilter === f ? 'border-[#A020F0] bg-[#A020F0]/10 text-[#A020F0] shadow-[0_0_15px_rgba(160,32,240,0.3)]' : 'border-white/10 text-white/50 lg:hover:text-white bg-[#050505]'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* GRID BENTO DINÁMICO */}
          <div className="updates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-fr">
            {filteredPatches.map((item, index) => {
              const isBig = index === 0 && activeFilter === 'TODOS';
              const gridClass = isBig ? 'lg:col-span-8 lg:row-span-2' : 'lg:col-span-4 lg:row-span-1';
              const tagColor = SYS_COLORS[item.type?.toUpperCase() as keyof typeof SYS_COLORS] || SYS_COLORS['BAL'];

              return (
                <motion.a 
                  href={`/patchLog/${item.slug}`}
                  key={item.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className={`group relative overflow-hidden bg-[#080808] border border-white/10 transition-all duration-500 rounded-sm ${gridClass} flex flex-col lg:hover:border-[#A020F0]/50 shadow-2xl min-h-[300px] md:min-h-[380px] lg:hover:-translate-y-2`}
                >
                  
                  {/* GLOW MORADO */}
                  <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_80px_-20px_rgba(160,32,240,0.2)]" />

                  {/* 🔥 IMAGEN ESTÁTICA RESPONSIVA: Color en móvil, Gris en PC, cero zoom 🔥 */}
                  {item.img && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale-0 opacity-60 lg:grayscale lg:opacity-30 lg:group-hover:grayscale-0 lg:group-hover:opacity-60 transition-all duration-1000" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#080808]/70 to-transparent" />
                    </div>
                  )}

                  {/* CONTENIDO */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
                    
                    {/* TOP DATA (Se queda arriba) */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                         <span className="font-mono text-[10px] md:text-[11px] font-black tracking-widest uppercase italic" style={{ color: tagColor.hex }}>
                           {item.type}
                         </span>
                         <span className="text-white/80 font-mono text-[9px] uppercase tracking-tighter">
                           {item.game} // {item.version}
                         </span>
                      </div>
                      <div className="text-right hidden sm:block">
                         <div className="flex items-center gap-2 text-[#A020F0] font-mono text-[9px] font-black">
                           <Clock size={10} /> {item.currentDate}
                         </div>
                         {item.lastUpdate && (
                           <div className="text-white/40 font-mono text-[7px] mt-1 italic uppercase tracking-widest">
                             Last: {item.lastUpdate}
                           </div>
                         )}
                      </div>
                    </div>

                    {/* 🔥 BOTTOM DATA: Título, Desc y CTA se van al fondo */}
                    <div className="flex flex-col justify-end mt-auto pt-8">
                      {/* TÍTULO MÁS PEQUEÑO */}
                      <h3 className={`font-headline font-black italic text-white uppercase leading-[0.9] tracking-tighter lg:group-hover:text-[#A020F0] transition-colors ${isBig ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-xl sm:text-2xl'}`}>
                        {item.title}
                      </h3>
                      
                      {/* 🔥 MAGIA RESPONSIVA TAILWIND 🔥 */}
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                        <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white/70 text-[11px] md:text-xs italic leading-relaxed max-w-sm line-clamp-2 mt-2">
                            {item.desc || 'Desclasificando información del parche, proceda con precaución.'}
                          </p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center group/btn">
                        <div className="flex items-center gap-3">
                          <Terminal size={14} className="text-[#A020F0] md:w-4 md:h-4" />
                          <span className="font-mono text-[10px] md:text-[11px] font-black tracking-widest uppercase text-white lg:group-hover/btn:text-[#A020F0] transition-colors">
                            Ver Parche Completo
                          </span>
                        </div>
                        <ChevronRight size={18} className="text-[#A020F0] md:w-5 md:h-5 lg:group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>

                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}