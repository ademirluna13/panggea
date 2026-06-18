import { useState, useMemo, useEffect } from 'react';
import { Target, Radio, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RadarCalendar({ events }: { events: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null); 
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const dayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return events.filter(e => {
      const d = new Date(e.eventDate);
      return d.getDate() === selectedDay && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });
  }, [selectedDay, events, currentDate]);

  const getHypeColor = (level: number) => {
    if (level >= 90) return '#FF0055'; 
    if (level >= 75) return '#00FF66'; 
    return '#00F0FF'; 
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 mt-10 w-full">
      
      {/* ─── CALENDARIO PRINCIPAL ─── */}
      <div className="flex-1 w-full">
        <div className="bg-pangea-card/40 backdrop-blur-xl border border-white/5 p-4 md:p-8 rounded-[1.8rem] relative overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-headline text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">
              LOG_<span className="text-[#00F0FF]">{currentDate.toLocaleString('es-MX', { month: 'long' }).toUpperCase()}</span>
              <span className="text-white/20 ml-2 md:ml-4 text-xl md:text-3xl">{currentDate.getFullYear()}</span>
            </h2>
            <div className="flex gap-2 shrink-0">
              <button onClick={handlePrevMonth} className="p-2 md:p-3 rounded-xl border border-white/10 hover:border-[#00F0FF] text-white/40 hover:text-[#00F0FF] transition-all bg-white/[0.02]">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextMonth} className="p-2 md:p-3 rounded-xl border border-white/10 hover:border-[#00F0FF] text-white/40 hover:text-[#00F0FF] transition-all bg-white/[0.02]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(d => (
              <div key={d} className="bg-[#020202] py-3 md:py-4 text-center font-mono text-[8px] md:text-[10px] text-[#00F0FF] tracking-[0.2em] md:tracking-[0.3em] font-bold">
                {d}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-[#020202] h-16 sm:h-24 lg:h-36 opacity-20" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvts = events.filter(e => {
                const d = new Date(e.eventDate);
                return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
              });
              const hasEvents = dayEvts.length > 0;
              
              return (
                <button 
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative h-20 sm:h-24 lg:h-36 bg-[#020202] p-2 md:p-4 text-left transition-all duration-300 group overflow-hidden
                    ${selectedDay === day ? 'ring-2 ring-inset ring-[#00F0FF] bg-[#00F0FF]/10' : 'hover:bg-white/[0.04]'}`}
                >
                  <span className={`font-headline text-xl sm:text-2xl lg:text-3xl font-black italic transition-colors ${hasEvents ? 'text-white group-hover:text-[#00F0FF]' : 'text-white/20'}`}>
                    {day < 10 ? `0${day}` : day}
                  </span>
                  
                  {hasEvents && (
                    <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 right-2 lg:right-4 flex flex-col gap-1">
                      <div className="flex sm:hidden gap-1 flex-wrap mt-1">
                        {dayEvts.map((ev, idx) => (
                          <div key={idx} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getHypeColor(ev.hypeLevel) }} />
                        ))}
                      </div>

                      {dayEvts.slice(0, 2).map((ev, idx) => (
                        <div key={idx} className="hidden sm:block truncate font-mono text-[7px] md:text-[8px] text-white/60 uppercase bg-white/5 px-1 py-0.5 border border-white/10 rounded-sm">
                          {ev.title}
                        </div>
                      ))}
                      {dayEvts.length > 2 && <span className="hidden sm:block font-mono text-[7px] md:text-[8px] text-[#00F0FF]">+ {dayEvts.length - 2} DROPS</span>}
                    </div>
                  )}

                  {selectedDay === day && (
                    <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 bg-[#00F0FF]/20 flex items-center justify-center rounded-bl-lg">
                      <Target size={10} className="text-[#00F0FF]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── SIDEBAR (RESULTADOS DEL ESCÁNER) ─── */}
      <aside className="w-full xl:w-[450px] flex flex-col gap-6">
        <div className="bg-pangea-card/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 h-full min-h-[600px] relative rounded-[1.8rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
            <Radio size={18} className="text-[#00F0FF] animate-pulse" />
            <h3 className="font-mono text-[10px] font-bold text-white/40 tracking-[0.4em] uppercase">Scan_Result</h3>
          </div>

          {selectedDay ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 h-full">
              <div className="flex flex-col mb-2">
                <span className="font-headline text-7xl md:text-8xl font-black italic text-white leading-none">
                  {selectedDay < 10 ? `0${selectedDay}` : selectedDay}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] text-[#00F0FF] tracking-[0.4em] uppercase mt-2">SEÑALES CONFIRMADAS</span>
              </div>

              <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                {dayEvents.length > 0 ? (
                  dayEvents.map((ev, idx) => {
                    const badgeColor = getHypeColor(ev.hypeLevel);
                    const monthColor = badgeColor === '#FF0055' ? '#ffffff' : badgeColor;
                    
                    const d = new Date(ev.eventDate);
                    const evMonth = d.toLocaleString('es-MX', { month: 'short' }).toUpperCase().replace('.', '');

                    return (
                      <a 
                        key={idx}
                        href={`/radar/${ev.slug}`} 
                        className="radar-card group relative w-full h-[360px] md:h-[400px] bg-black/40 border border-transparent rounded-[1.8rem] overflow-hidden flex flex-col shrink-0 transition-all duration-500 shadow-xl"
                        style={{ '--card-accent': badgeColor, '--card-accent-glow': `${badgeColor}60` } as React.CSSProperties}
                      >
                        <div className="absolute inset-0 z-0 pointer-events-none">
                          <img src={ev.heroImage} alt={ev.title} className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:opacity-30 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:opacity-80 transition-all duration-700" />
                          <div className="absolute h-[50%] bottom-0 inset-x-0 bg-gradient-to-t from-[#020202] via-[#020202]/95 to-transparent z-10" />
                        </div>

                        {/* TOP BAR STANDARDIZED */}
                        <div className="relative z-20 p-5 md:p-6 flex justify-between items-start w-full">
                          <div>
                            <span className="font-headline text-4xl text-white font-[950] italic leading-none block transition-colors">
                              {selectedDay < 10 ? `0${selectedDay}` : selectedDay}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.4em] font-black mt-1 block transition-opacity" style={{ color: monthColor }}>
                              {evMonth}
                            </span>
                          </div>
                          {ev.category && (
                            <span className="font-mono text-[7px] font-black px-2 py-1 rounded-sm bg-black/50 uppercase tracking-widest backdrop-blur-md transition-colors border border-transparent text-white/60 lg:border-white/10 lg:group-hover:text-white/80 lg:group-hover:border-[var(--card-accent)] group-hover:border-[var(--card-accent)]">
                              {ev.category}
                            </span>
                          )}
                        </div>
                        
                        {/* BOTTOM BAR (Responsiva) */}
                        <div className="relative z-20 p-5 md:p-6 flex flex-col w-full mt-auto">
                          {/* 🔥 TÍTULO REPARADO: Sólido, visible y conectado a .neon-title 🔥 */}
                          <h4 className="neon-title font-headline font-black text-white uppercase italic tracking-tighter leading-[0.95] break-words hyphens-auto transition-colors text-2xl md:text-3xl mb-2">
                            {ev.title}
                          </h4>
                          
                          <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                            <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                               <p className="text-[10px] md:text-[11px] text-white/40 italic leading-relaxed line-clamp-2 mb-3 break-words pt-3">
                                 {ev.description || 'Señal archivada de este lanzamiento...'}
                               </p>
                               <div className="pt-2 border-t border-white/5 flex flex-col opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex justify-between items-center">
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
                        </div>

                        <div className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-full lg:w-0 lg:group-hover:w-full z-30" style={{ backgroundColor: badgeColor, boxShadow: `0 -5px 15px ${badgeColor}50` }} />
                      </a>
                    )
                  })
                ) : (
                  <div className="py-12 border border-dashed border-white/10 text-center opacity-40 rounded-2xl bg-black/20">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white">Zona Despejada // Sin Eventos</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-[80%] flex flex-col items-center justify-center text-center opacity-20">
              <Zap size={40} className="mb-4" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] max-w-[200px]">Selecciona un día en el mapa táctico para escanear</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}