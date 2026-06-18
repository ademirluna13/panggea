import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader'; 

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

const ACCENT = "#00F0FF"; // 🔵 El Azul Cyan original

function getHypeColor(hype: number) {
  if (hype >= 95) return '#FF0055'; 
  if (hype >= 85) return '#FF5500'; 
  if (hype >= 75) return '#00FF66'; 
  return '#00F0FF'; 
}

export default function Radar({ events = [] }: { events: RadarEvent[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateFontSize = (text: string, isHypeSection: boolean) => {
    const len = text?.length || 0;
    const baseSize = isHypeSection ? 36 : 26; 
    
    if (len <= 14) return `${baseSize}px`;
    
    const reductionFactor = isHypeSection ? 0.42 : 0.28;
    const scaledSize = baseSize - (len - 14) * reductionFactor;
    const minSize = isHypeSection ? 18 : 13; 
    
    return `${Math.max(minSize, scaledSize)}px`;
  };

  const filteredEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return events.filter(ev => {
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
  }, [events]);

  const marqueeItems = useMemo(() => {
    if (!filteredEvents.length) return [];
    return [...filteredEvents, ...filteredEvents, ...filteredEvents];
  }, [filteredEvents]);

  const topHype = useMemo(() => {
    return [...filteredEvents].sort((a, b) => b.hypeLevel - a.hypeLevel);
  }, [filteredEvents]);

  const hypeMarqueeItems = useMemo(() => {
    const filtered = topHype.filter((ev) => ev.hypeLevel >= 90);
    if (!filtered.length) return [];
    return [...filtered, ...filtered, ...filtered];
  }, [topHype]);

  if (!isMounted) return null; 

  return (
    <section className="py-24 bg-pangea-neutral border-y border-white/5 relative flex flex-col items-center w-full transition-colors duration-500">
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${ACCENT}08 0%, transparent 70%)` }} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-6 lg:gap-12 px-4 sm:px-6 relative z-10">
        <div className="max-w-[1200px] w-full flex flex-col">
          
          <SectionHeader 
            tag="Pangea_Radar // Signal_Stream"
            titleSolid="EL"
            titleOutline="RADAR"
            description="Escaneo global de lanzamientos y eventos del ecosistema. Si genera ruido en el meta, el radar lo tiene en la mira."
            ctaText="Calendario Completo"
            ctaHref="/radar"
            accentColor={ACCENT}
          />

          {/* ─── CARRUSEL PRINCIPAL (GLOW AZUL CONSTANTE) ─── */}
          <div className="flex relative w-full mb-28 min-h-[410px] overflow-hidden rounded-[1.8rem]">
            {marqueeItems.length > 0 ? (
              <motion.div 
                className="flex gap-8"
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                whileHover={{ animationPlayState: "paused" }}
              >
                {marqueeItems.map((ev, i) => {
                  const badgeColor = getHypeColor(ev.hypeLevel);
                  const isCardHovered = hoveredSlug === `${ev.id}-${i}`;

                  return (
                    <a 
                      key={`${ev.id}-${i}`}
                      href={`/radar/${ev.slug}`}
                      onMouseEnter={() => setHoveredSlug(`${ev.id}-${i}`)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      className="group relative w-[350px] md:w-[420px] h-[410px] bg-pangea-card/40 backdrop-blur-xl border rounded-[1.8rem] overflow-hidden flex flex-col shrink-0 transition-all duration-500 z-30 shadow-2xl"
                      style={{
                        // 🔥 FIX: Regresamos al ACCENT (Azul) para el borde de la tarjeta exterior
                        borderColor: isCardHovered ? ACCENT : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: isCardHovered ? `0 0 25px ${ACCENT}40, inset 0 0 10px ${ACCENT}20` : 'none'
                      }}
                    >
                      {ev.img && (
                        <img src={ev.img} alt={ev.title} className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-40 lg:group-hover:grayscale-0 lg:group-hover:opacity-80 transition-all duration-700 z-0" />
                      )}
                      
                      <div className="absolute h-[50%] bottom-0 inset-x-0 bg-linear-to-t from-[#020202] via-[#020202]/95 to-transparent z-10" />

                      <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between">
                        <div>
                          <span className="font-headline text-5xl md:text-6xl text-white font-[950] italic leading-none block">{ev.day}</span>
                          <span className="font-mono text-[10px] md:text-[11px] text-[#00F0FF] uppercase tracking-[0.4em] font-black mt-1 ml-1 block">{ev.month}</span>
                        </div>

                        <div className="flex flex-col justify-end w-full">
                          <h3 
                            className="font-headline text-white font-black uppercase italic leading-[0.95] tracking-tighter transition-all duration-300 mb-4 break-words hyphens-auto"
                            style={{
                              fontSize: calculateFontSize(ev.title, false),
                              // 🔥 FIX: Glow del texto en azul
                              textShadow: isCardHovered ? `0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}` : '0 2px 10px rgba(0,0,0,0.5)'
                            }}
                          >
                            {ev.title}
                          </h3>

                          <div className="pt-2 border-t border-white/5 flex flex-col mb-1">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Hype Meter</span>
                                {/* El color individual del hype SÍ se queda para los números internos */}
                                <span className="font-headline text-xs font-black italic" style={{ color: badgeColor }}>{ev.hypeLevel}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                {/* Y para la barrita de progreso interna */}
                                <div className="h-full transition-all duration-1000" style={{ width: `${ev.hypeLevel}%`, backgroundColor: badgeColor }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 🔥 FIX: La barra inferior de neón regresa a ser azul para este carrusel */}
                      <div 
                        className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30" 
                        style={{ 
                          backgroundColor: ACCENT,
                          boxShadow: isCardHovered ? `0 0 15px ${ACCENT}` : 'none' 
                        }}
                      />
                    </a>
                  );
                })}
              </motion.div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center border border-white/5 bg-pangea-card/20 rounded-[1.8rem] p-12 text-center">
                <span className="font-mono text-[10px] text-[#00F0FF] font-black tracking-[0.4em] uppercase mb-2">Signal_Lost // 404_Events</span>
                <p className="text-white/40 text-xs italic font-body max-w-xs">"No hay transmisiones entrantes para el radar en los próximos días."</p>
              </div>
            )}
          </div>

          {/* ─── SECCIÓN: LO MÁS HYPEADOTE (GLOW DINÁMICO ROJO/NARANJA) ─── */}
          {hypeMarqueeItems.length > 0 && (
            <div className="w-full relative z-10 overflow-hidden flex flex-col">
              <div className="flex items-center gap-4 mb-12">
                <Flame size={32} className="text-[#FF0055] animate-pulse" />
                <h3 className="font-headline text-4xl md:text-5xl text-white font-[950] italic uppercase tracking-tighter">
                  LO MÁS <span className="text-[#FF0055]">HYPEADOTE</span>
                </h3>
              </div>

              <div className="flex relative w-full overflow-hidden rounded-[1.8rem]">
                <motion.div 
                  className="flex gap-6"
                  animate={{ x: ["0%", "-33.33%"] }}
                  transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                  whileHover={{ animationPlayState: "paused" }}
                >
                  {hypeMarqueeItems.map((ev, i) => {
                    const badgeColor = getHypeColor(ev.hypeLevel);
                    const isHypeCardHovered = hoveredSlug === `top-${ev.id}-${i}`;
                    
                    return (
                      <a 
                        href={`/radar/${ev.slug}`} 
                        key={`top-${ev.id}-${i}`}
                        onMouseEnter={() => setHoveredSlug(`top-${ev.id}-${i}`)}
                        onMouseLeave={() => setHoveredSlug(null)}
                        className="group relative w-[350px] md:w-[420px] h-[410px] bg-pangea-card/40 backdrop-blur-xl border rounded-[1.8rem] overflow-hidden flex flex-col shrink-0 transition-all duration-500 z-30 shadow-2xl"
                        style={{
                          // AQUÍ SÍ USAMOS EL BADGE COLOR PARA QUE BRILLEN ROJAS
                          borderColor: isHypeCardHovered ? badgeColor : 'rgba(255, 255, 255, 0.05)',
                          boxShadow: isHypeCardHovered ? `0 0 25px ${badgeColor}40, inset 0 0 10px ${badgeColor}20` : 'none'
                        }}
                      >
                        {ev.img && <img src={ev.img} alt={ev.title} className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-40 lg:grayscale lg:opacity-10 lg:group-hover:grayscale-0 lg:group-hover:opacity-40 transition-all duration-700 z-0" />}
                        <div className="absolute h-[50%] bottom-0 inset-x-0 bg-linear-to-t from-[#020202] via-[#020202]/95 to-transparent z-10" />
                        
                        <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between">
                          <div>
                            <span className="font-headline text-5xl md:text-6xl text-white font-[950] italic leading-none block">{ev.day}</span>
                            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black mt-1 ml-1 block" style={{ color: badgeColor }}>{ev.month}</span>
                          </div>
                          
                          <div className="flex flex-col justify-end w-full mt-auto">
                            <h4 
                              className="font-headline text-white font-black uppercase italic leading-[0.95] tracking-tighter mb-4 transition-all duration-300 break-words hyphens-auto" 
                              style={{
                                fontSize: calculateFontSize(ev.title, true),
                                textShadow: isHypeCardHovered ? `0 0 20px ${badgeColor}, 0 0 40px ${badgeColor}` : '0 2px 10px rgba(0,0,0,0.5)'
                              }}
                            >
                              {ev.title}
                            </h4>
                            
                            <div className="pt-2 border-t border-white/5 flex flex-col mb-1">
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center justify-between">
                                     <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Hype Meter</span>
                                     <span className="font-headline text-xs font-black italic" style={{ color: badgeColor }}>{ev.hypeLevel}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full transition-all duration-1000" style={{ width: `${ev.hypeLevel}%`, backgroundColor: badgeColor }} />
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>

                        {/* BARRA NEÓN ROJA/DINÁMICA */}
                        <div 
                          className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30" 
                          style={{ 
                            backgroundColor: badgeColor,
                            boxShadow: isHypeCardHovered ? `0 0 15px ${badgeColor}` : 'none' 
                          }}
                        />
                      </a>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}