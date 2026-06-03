import { useState, useMemo, useEffect } from 'react';
import { Target, Radio, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RadarCalendar({ events }: { events: any[] }) {
  // 🚀 REPARADO: Arranca con la fecha real del sistema operativo
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // 🚀 ESCUDO DEL CLIENTE: Sincroniza el mes exacto en tiempo real al cargar la página
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // Lógica matemática para saber cuántos días tiene el mes y en qué día de la semana empieza
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // ─── FUNCIONES TÁCTICAS PARA LAS FLECHAS ───
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null); // Limpiamos el escáner al cambiar de mes
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  // Filtrar eventos del día seleccionado
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
    <div className="flex flex-col xl:flex-row gap-10 mt-10">
      
      {/* ─── CALENDARIO GIGANTE ─── */}
      <div className="flex-1">
        <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-5xl text-white font-black italic uppercase tracking-tighter">
              LOG_<span className="text-[#00F0FF]">{currentDate.toLocaleString('es-MX', { month: 'long' }).toUpperCase()}</span>
              <span className="text-white/20 ml-4 text-3xl">{currentDate.getFullYear()}</span>
            </h2>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-3 border border-white/10 hover:border-[#00F0FF] text-white/40 hover:text-[#00F0FF] transition-all bg-white/[0.02]">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextMonth} className="p-3 border border-white/10 hover:border-[#00F0FF] text-white/40 hover:text-[#00F0FF] transition-all bg-white/[0.02]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5">
            {['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(d => (
              <div key={d} className="bg-[#020202] py-4 text-center font-mono text-[10px] text-[#00F0FF] tracking-[0.3em] font-bold">
                {d}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-[#020202] h-28 lg:h-36 opacity-20" />
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
                  className={`relative h-28 lg:h-36 bg-[#020202] p-4 text-left transition-all duration-300 group
                    ${selectedDay === day ? 'ring-2 ring-inset ring-[#00F0FF] bg-[#00F0FF]/5' : 'hover:bg-white/[0.03]'}`}
                >
                  <span className={`font-headline text-3xl font-black italic transition-colors ${hasEvents ? 'text-white group-hover:text-[#00F0FF]' : 'text-white/20'}`}>
                    {day < 10 ? `0${day}` : day}
                  </span>
                  
                  {hasEvents && (
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                      {dayEvts.slice(0, 2).map((ev, idx) => (
                        <div key={idx} className="truncate font-mono text-[8px] text-white/60 uppercase bg-white/5 px-1 py-0.5 border border-white/10">
                          {ev.title}
                        </div>
                      ))}
                      {dayEvts.length > 2 && <span className="font-mono text-[8px] text-[#00F0FF]">+ {dayEvts.length - 2} DROPS</span>}
                    </div>
                  )}

                  {selectedDay === day && (
                    <div className="absolute top-0 right-0 w-6 h-6 bg-[#00F0FF]/20 flex items-center justify-center">
                      <Target size={10} className="text-[#00F0FF]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── SIDEBAR (Se queda igual, ya funciona cabrón) ─── */}
      <aside className="w-full xl:w-[450px] flex flex-col gap-6">
        <div className="bg-white/[0.01] border border-white/5 p-8 h-full min-h-[600px] relative">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
            <Radio size={18} className="text-[#00F0FF] animate-pulse" />
            <h3 className="font-mono text-[10px] font-bold text-white/40 tracking-[0.4em] uppercase">Scan_Result</h3>
          </div>

          {selectedDay ? (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col">
                <span className="font-headline text-8xl font-black italic text-white leading-none">{selectedDay}</span>
                <span className="font-mono text-[10px] text-[#00F0FF] tracking-[0.5em] uppercase mt-2">SEÑALES CONFIRMADAS</span>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                {dayEvents.length > 0 ? (
                  dayEvents.map((e, idx) => {
                    const hypeColor = getHypeColor(e.hypeLevel);
                    return (
                      <div key={idx} className="bg-[#050505] border border-white/10 p-6 group hover:border-[#00F0FF]/40 transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <span className="px-2 py-1 bg-white/5 border border-white/10 text-white/60 font-mono text-[8px] font-bold uppercase tracking-widest">{e.category}</span>
                        </div>
                        <h4 className="font-headline text-3xl font-black text-white italic uppercase leading-[0.9] group-hover:text-[#00F0FF] transition-colors">{e.title}</h4>
                        
                        <div className="mt-6 flex flex-col gap-2">
                          <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-white/40">
                            <span>Hype Meter</span>
                            <span style={{ color: hypeColor }}>{e.hypeLevel}%</span>
                          </div>
                          <div className="h-1 bg-white/5 w-full">
                            <div className="h-full" style={{ width: `${e.hypeLevel}%`, backgroundColor: hypeColor, boxShadow: `0 0 10px ${hypeColor}50` }} />
                          </div>
                        </div>

                        <a href={`/radar/${e.slug}`} className="mt-6 flex items-center justify-between group/link">
                          <span className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-[0.2em]">Abrir Expediente</span>
                          <ArrowRight size={14} className="text-[#00F0FF] group-hover/link:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    )
                  })
                ) : (
                  <div className="py-10 border border-dashed border-white/10 text-center opacity-40">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white">Zona Despejada // Sin Eventos</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
              <Zap size={40} className="mb-4" />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] max-w-[200px]">Selecciona un día en el mapa táctico para escanear</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}