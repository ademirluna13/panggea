import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Flame } from 'lucide-react';


interface RadarEvent {
  id: string;
  title: string;
  slug: string;
  category: string;
  platform: string;
  hypeLevel: number;
  description: string;
  img: string | null;
  day: string;
  month: string;
}

interface RadarProps {
  events: RadarEvent[];
}

const ACCENT = "#00F0FF";
const FILTERS = ['TODO', 'GAMING', 'TECH', 'CINE/TV', 'ANIME', 'MÚSICA'];

function getHypeColor(hype: number) {
  if (hype >= 95) return '#FF0055'; 
  if (hype >= 85) return '#FF5500'; 
  if (hype >= 75) return '#00FF66'; 
  return '#00F0FF'; 
}

export default function Radar({ events = [] }: { events: RadarEvent[] }) {
  const [activeFilter, setActiveFilter] = useState('TODO');
  const [isMounted, setIsMounted] = useState(false);

  // 🔥 ESCUDO ANTI-CRASH DE ADSENSE 🔥
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🛡️ FILTRO DE FECHA + FILTRO DE CATEGORÍA PARA EL PRIMER CARRUSEL
  const filteredEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // 1. Mandamos al carajo los eventos pasados
    const upcoming = events.filter(ev => {
      const mStr = String(ev.month).toUpperCase().trim();
      let monthIndex = 0;
      if (mStr.includes('ENE') || mStr.includes('JAN')) monthIndex = 0;
      else if (mStr.includes('FEB')) monthIndex = 1;
      else if (mStr.includes('MAR')) monthIndex = 2;
      else if (mStr.includes('ABR') || mStr.includes('APR')) monthIndex = 3;
      else if (mStr.includes('MAY')) monthIndex = 4;
      else if (mStr.includes('JUN')) monthIndex = 5;
      else if (mStr.includes('JUL')) monthIndex = 6;
      else if (mStr.includes('AGO') || mStr.includes('AUG')) monthIndex = 7;
      else if (mStr.includes('SEP')) monthIndex = 8;
      else if (mStr.includes('OCT')) monthIndex = 9;
      else if (mStr.includes('NOV')) monthIndex = 10;
      else if (mStr.includes('DIC') || mStr.includes('DEC')) monthIndex = 11;

      const dayNum = parseInt(ev.day, 10) || 1;
      const eventDate = new Date(now.getFullYear(), monthIndex, dayNum);
      eventDate.setHours(23, 59, 59, 999);
      return eventDate >= now;
    });

    // 2. Aplicamos el filtro por pestaña
    return activeFilter === 'TODO' 
      ? upcoming 
      : upcoming.filter(e => e.category?.toUpperCase() === activeFilter);
  }, [activeFilter, events]);

  // Triplicamos los items para el efecto infinito del primer carrusel
  const marqueeItems = useMemo(() => {
    return [...filteredEvents, ...filteredEvents, ...filteredEvents];
  }, [filteredEvents]);

  // 🛡️ FILTRO DE FECHA (EVENTOS FUTUROS O ACTUALES) + SORT POR HYPE PARA EL SEGUNDO CARRUSEL
  const topHype = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return [...events]
      .filter(ev => {
        const mStr = String(ev.month).toUpperCase().trim();
        let monthIndex = 0;
        if (mStr.includes('ENE') || mStr.includes('JAN')) monthIndex = 0;
        else if (mStr.includes('FEB')) monthIndex = 1;
        else if (mStr.includes('MAR')) monthIndex = 2;
        else if (mStr.includes('ABR') || mStr.includes('APR')) monthIndex = 3;
        else if (mStr.includes('MAY')) monthIndex = 4;
        else if (mStr.includes('JUN')) monthIndex = 5;
        else if (mStr.includes('JUL')) monthIndex = 6;
        else if (mStr.includes('AGO') || mStr.includes('AUG')) monthIndex = 7;
        else if (mStr.includes('SEP')) monthIndex = 8;
        else if (mStr.includes('OCT')) monthIndex = 9;
        else if (mStr.includes('NOV')) monthIndex = 10;
        else if (mStr.includes('DIC') || mStr.includes('DEC')) monthIndex = 11;

        const dayNum = parseInt(ev.day, 10) || 1;
        const eventDate = new Date(now.getFullYear(), monthIndex, dayNum);
        eventDate.setHours(23, 59, 59, 999);
        return eventDate >= now;
      })
      .sort((a, b) => b.hypeLevel - a.hypeLevel);
  }, [events]);

  // Triplicamos los items para el efecto infinito del carrusel de Hype
  const hypeMarqueeItems = useMemo(() => {
    const filtered = topHype.filter((ev) => ev.hypeLevel >= 90);
    return [...filtered, ...filtered, ...filtered];
  }, [topHype]);

  if (!isMounted) return null; 

  return (
    <section className="py-24 bg-[#020202] border-t border-white/5 relative flex justify-center overflow-hidden w-full">
      
      {/* GLOW DE FONDO */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${ACCENT}08 0%, transparent 70%)` }} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-6 lg:gap-12 px-4 sm:px-6 relative z-10">
        
        {/* ─── CONTENEDOR CENTRAL ─── */}
        <div className="max-w-[1200px] w-full flex flex-col overflow-hidden">
          
          {/* ─── HEADER ─── */}
          <div className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-[#00F0FF] shadow-[0_0_20px_#00F0FF]" />
                <span className="font-mono text-[#00F0FF] text-[11px] font-black tracking-[0.5em] uppercase italic">
                  Pangea_Radar // Signal_Stream
                </span>
              </div>
              <h2 className="font-headline text-white text-5xl md:text-8xl lg:text-[115px] font-black tracking-tighter leading-[0.8] uppercase italic">
                EL <span className="text-transparent" style={{ WebkitTextStroke: '2px #00F0FF' }}>RADAR</span>
              </h2>
            </div>
            
            <div className="max-w-xs text-left lg:text-right">
               <p className="text-white/60 text-xs md:text-sm italic mb-6 leading-relaxed">
                  "Escaneo global de lanzamientos y eventos. Si genera ruido, el radar lo tiene en la mira."
               </p>
               <a href="/radar" className="inline-flex items-center gap-4 font-mono text-[#00F0FF] lg:hover:text-white text-[10px] font-black tracking-[0.4em] uppercase transition-all group">
                  Calendario Completo <ChevronRight size={18} className="lg:group-hover:translate-x-2 transition-transform" />
               </a>
            </div>
          </div>

          {/* ─── FILTROS ─── */}
          <div className="flex flex-wrap gap-3 mb-16">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-7 py-2.5 border font-headline text-[10px] font-black italic tracking-[0.2em] uppercase transition-all duration-300
                ${activeFilter === f ? 'bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'bg-transparent border-white/10 text-white/40 lg:hover:text-white lg:hover:border-white/30'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* ─── CARRUSEL INFINITO PRINCIPAL (CLICK EN CUALQUIER PARTE ACTIVO) ─── */}
          <div className="flex relative w-full mb-28 overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {marqueeItems.map((ev, i) => {
                const badgeColor = getHypeColor(ev.hypeLevel);
                return (
                  <a 
                    key={`${ev.id}-${i}`}
                    href={`/radar/${ev.slug}`}
                    className="group relative w-[320px] md:w-[400px] h-[400px] bg-[#050505] border border-white/10 overflow-hidden flex flex-col shrink-0 transition-all duration-500 lg:hover:border-[#00F0FF]/60"
                  >
                    {/* FOTO ESTÁTICA Y RESPONSIVA */}
                    {ev.img && (
                      <img src={ev.img} className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-1000 z-0" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/95 via-[#020202]/40 to-transparent z-0 lg:group-hover:via-[#020202]/90 transition-all duration-500" />

                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                      <div>
                        <span className="font-headline text-5xl md:text-6xl text-white font-[950] italic leading-none block">{ev.day}</span>
                        <span className="font-mono text-[10px] md:text-[11px] text-[#00F0FF] uppercase tracking-[0.4em] font-black mt-1 ml-1">{ev.month}</span>
                      </div>

                      <div className="flex flex-col justify-end">
                        <h3 className="font-headline text-xl md:text-2xl text-white font-black uppercase italic leading-[0.85] tracking-tighter lg:group-hover:text-[#00F0FF] transition-colors break-words">
                          {ev.title}
                        </h3>

                        {/* DESCRIPCIÓN RESPONSIVA */}
                        <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                            
                            <div className="flex flex-col gap-1.5 mt-1.5">
                              <p className="text-white/80 text-[11px] italic leading-tight line-clamp-3 break-words break-all">
                                "{ev.description || 'Analizando señal de lanzamiento...'}"
                              </p>

                              <div className="flex flex-col gap-0.5 mt-2">
                                <div className="flex justify-between items-end">
                                   <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest font-black">Hype Meter</span>
                                   <span className="font-headline text-sm font-black italic" style={{ color: badgeColor }}>{ev.hypeLevel}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full transition-all duration-1000 shadow-[0_0_10px_currentColor]" style={{ width: `${ev.hypeLevel}%`, backgroundColor: badgeColor, color: badgeColor }} />
                                </div>
                              </div>

                              <div className="flex justify-between items-center group/btn mt-2">
                                 <span className="font-mono text-[10px] text-[#00F0FF] font-black uppercase tracking-[0.3em]">Abrir Expediente</span>
                                 <ArrowRight size={16} className="text-[#00F0FF] lg:group-hover/btn:translate-x-2 transition-transform" />
                              </div>
                            </div>

                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-white/5 justify-between items-center hidden lg:flex lg:group-hover:hidden">
                           <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] font-bold">Signal Detected</span>
                           <ChevronRight size={14} className="text-white/10" />
                        </div>

                      </div>
                    </div>
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ─── SECCIÓN: LO MÁS HYPEADOTE (CARRUSEL INFINITO IDÉNTICO) ─── */}
          <div className="w-full relative z-10 overflow-hidden">
            <div className="flex items-center gap-4 mb-12">
              <Flame size={32} className="text-[#FF0055] animate-pulse" />
              <h3 className="font-headline text-4xl md:text-5xl text-white font-[950] italic uppercase tracking-tighter">
                LO MÁS <span className="text-[#FF0055]">HYPEADOTE</span>
              </h3>
            </div>

            <div className="flex relative w-full overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {hypeMarqueeItems.map((ev, i) => (
                  <a 
                    href={`/radar/${ev.slug}`} 
                    key={`top-${ev.id}-${i}`} 
                    className="group relative w-[300px] md:w-[380px] bg-[#080808] border border-white/5 p-6 md:p-10 overflow-hidden transition-all lg:hover:border-[#FF0055]/50 h-[380px] flex flex-col justify-end shrink-0"
                  >
                    {/* FOTO ESTÁTICA Y RESPONSIVA */}
                    {ev.img && <img src={ev.img} className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-30 lg:grayscale lg:opacity-10 lg:group-hover:grayscale-0 lg:group-hover:opacity-30 transition-all duration-700" />}
                    
                    <div className="relative z-10">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-[2px] bg-[#FF0055]" />
                          <span className="text-[#FF0055] font-mono text-[10px] font-black uppercase tracking-[0.4em]">Critical_Event</span>
                       </div>
                       
                       <h4 
                         className="font-headline text-3xl md:text-4xl text-white font-black uppercase italic leading-tight mb-0 lg:group-hover:text-[#FF0055] transition-colors break-words line-clamp-2" 
                         title={ev.title}
                       >
                         {ev.title}
                       </h4>
                       
                       {/* DESCRIPCIÓN RESPONSIVA AL HOVER */}
                       <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                              <div className="flex flex-col gap-1.5 mt-1.5">
                                 <p className="text-white/60 md:text-white/40 text-[11px] italic leading-tight line-clamp-2 break-words break-all">
                                   "{ev.description}"
                                 </p>
                                 
                                 <div className="flex flex-col gap-0.5 mt-2">
                                    <div className="flex items-center justify-between">
                                       <span className="font-mono text-[9px] text-[#FF0055] font-black uppercase tracking-widest">{ev.hypeLevel}% Hype Meter</span>
                                       <ArrowRight size={18} className="text-[#FF0055] lg:group-hover:translate-x-2 transition-transform" />
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                       <div className="h-full bg-[#FF0055] transition-all duration-1000 shadow-[0_0_10px_#FF0055]" style={{ width: `${ev.hypeLevel}%` }} />
                                    </div>
                                 </div>
                              </div>
                          </div>
                       </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1.5 bg-[#FF0055] transition-all duration-1000 lg:group-hover:shadow-[0_0_20px_#FF0055]" style={{ width: `${ev.hypeLevel}%` }} />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}