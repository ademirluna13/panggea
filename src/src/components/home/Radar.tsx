import { useRef, useState } from 'react';
import { Monitor, Tv, Cpu, Gamepad2, Headphones, ChevronRight, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// 1. Interfaces limpias para TypeScript
interface ReleaseItem {
  id: number;
  type: string;
  title: string;
  date: string;
  platform: string;
  hype: number;
  color: string;
  icon: LucideIcon;
  image: string;
}

// Data simulada del ecosistema Pangea
const upcomingReleases: ReleaseItem[] = [
  { id: 1, type: "GAMING", title: "RESIDENT EVIL 9", date: "31 OCT", platform: "PS5 / XBOX / PC", hype: 98, color: "#FF0033", icon: Gamepad2, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop" },
  { id: 2, type: "MÚSICA", title: "FENDER STRAT FEST", date: "12 NOV", platform: "EN VIVO", hype: 85, color: "#00FF66", icon: Headphones, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop" },
  { id: 3, type: "ANIME", title: "DANDADAN PT. 2", date: "05 DIC", platform: "CRUNCHYROLL", hype: 92, color: "#FF1493", icon: Tv, image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop" },
  { id: 4, type: "GAMING", title: "MARVEL RIVALS - S2", date: "15 AGO", platform: "PS5 / XBOX / PC", hype: 95, color: "#FF4500", icon: Gamepad2, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
  { id: 5, type: "TECH", title: "HUAWEI GT 7 PRO", date: "02 SEP", platform: "SMARTWEAR", hype: 88, color: "#A020F0", icon: Cpu, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
  { id: 6, type: "CINE/TV", title: "WWE ROYAL RUMBLE", date: "24 ENE", platform: "STREAMING / PPV", hype: 100, color: "#FFD700", icon: Tv, image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop" },
];

const categories: string[] = ["TODO", "GAMING", "TECH", "CINE/TV", "ANIME", "MÚSICA"];

// 🔥 FIX: "export default" para que Astro lo importe sin llaves y no truene 🔥
export default function Radar() {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("TODO");
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Filtramos la data
  const filteredReleases = upcomingReleases.filter((item: ReleaseItem) => 
    activeFilter === "TODO" || item.type === activeFilter
  );

  // LA MAGIA DEL EFECTO INFINITO SEDOSO (GSAP LOOP)
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    if (activeFilter !== "TODO") {
        if (tweenRef.current) tweenRef.current.kill();
        gsap.set(track, { x: 0 }); 
        return;
    }

    const context = gsap.context(() => {
        const trackWidth = track.scrollWidth / 2; 

        tweenRef.current = gsap.to(track, {
            x: `-=${trackWidth}`, 
            ease: "none", 
            duration: 35, 
            repeat: -1, 
            overwrite: true,
            onReverseComplete: () => {
                if (tweenRef.current) tweenRef.current.totalTime(tweenRef.current.rawTime() + trackWidth);
            }
        });
    }, container);

    return () => {
        context.revert();
        if (tweenRef.current) tweenRef.current.kill();
    }
  }, { dependencies: [activeFilter], scope: container });

  const pauseLoop = () => { if (tweenRef.current) tweenRef.current.pause(); };
  const playLoop = () => { if (tweenRef.current) tweenRef.current.play(); };

  return (
    <section ref={container} className="relative py-32 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center">
      
      {/* ─── HUD BACKGROUND CYAN ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00EEFF08_1px,transparent_1px),linear-gradient(to_bottom,#00EEFF08_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 z-0 pointer-events-none"></div>

      {/* ─── ESTRUCTURA DE TRES COLUMNAS (ADS + CONTENT PROTEGIDO) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6">
        
        {/* PUBLICIDAD IZQUIERDA (Tomada directo del Arsenal) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#00EEFF]/10 flex-col items-center justify-center relative group">
          <span className="font-mono text-[9px] text-[#00EEFF]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_LEFT</span>
          <div className="absolute inset-0 border border-[#00EEFF]/5 group-hover:border-[#00EEFF]/30 transition-colors duration-500 pointer-events-none" />
        </aside>

        {/* ─── MARGEN DE 1200PX (CONTENIDO CENTRAL) ─── */}
        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER TITÁNICO (Con el CTA arribita a la derecha) */}
          <header className="radar-header mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="flex items-center gap-3 mb-4 md:mb-6 text-[#00EEFF]">
                <div className="w-8 md:w-12 h-1 bg-[#00EEFF] shadow-[0_0_20px_#00EEFF]"></div>
                <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic drop-shadow-md">
                  Pangea_Radar // Active_Scan
                </span>
              </div>
              <h2 className="font-headline text-white text-6xl md:text-[8rem] lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                EL <br className="hidden sm:block" />
                <span className="text-transparent break-words sm:inline-block mt-2 sm:mt-0" style={{ WebkitTextStroke: '2px #00EEFF' }}>
                  RADAR
                </span>
              </h2>
            </div>
            
            <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
              <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed drop-shadow-md">
                "Lanzamientos, eventos y drops globales. Si va a romper el internet, el radar ya lo detectó."
              </p>
              {/* CTA Arribita a la derecha */}
              <a href="/calendario" className="inline-flex items-center gap-3 md:gap-4 font-mono text-[#00EEFF] hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md">
                Ver Calendario Completo <ChevronRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </header>

          {/* FILTROS TÁCTICOS CYAN (Cajas rectangulares, nada de círculos) */}
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-headline text-xs md:text-sm font-black tracking-widest uppercase px-6 py-2.5 border rounded-sm transition-all duration-300
                  ${activeFilter === cat 
                    ? 'border-[#00EEFF] bg-[#00EEFF]/10 text-[#00EEFF] shadow-[0_0_15px_rgba(0,238,255,0.3)]' 
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/40 bg-[#050505]'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* EL CARRUSEL O GRID DE CARDS (TAMAÑO ORIGINAL COMPACTO) */}
          <div 
            className="radar-viewport overflow-hidden w-full relative pb-4"
            onMouseEnter={pauseLoop}
            onMouseLeave={playLoop}
          >
            {activeFilter === "TODO" && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020202] to-transparent z-30 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020202] to-transparent z-30 pointer-events-none" />
              </>
            )}

            <div 
              ref={trackRef} 
              className={`flex ${activeFilter === "TODO" ? 'w-max gap-6 px-12' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'} hide-scrollbar`}
            >
              <AnimatePresence mode="popLayout">
                {(activeFilter === "TODO" ? [...filteredReleases, ...filteredReleases] : filteredReleases).map((item: ReleaseItem, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a 
                      href={`/radar/${item.id}`} 
                      key={`${item.id}-${index}`} 
                      initial={activeFilter !== "TODO" ? { opacity: 0, scale: 0.95 } : false}
                      animate={activeFilter !== "TODO" ? { opacity: 1, scale: 1 } : false}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      // Tamaño compacto original (w-[290px] md:w-[330px])
                      className="radar-card relative w-[290px] md:w-[330px] bg-[#050505] border border-white/10 rounded-sm overflow-hidden group flex-shrink-0 transition-all duration-500 hover:border-[#00EEFF]/50 shadow-2xl flex flex-col"
                    >
                      {/* Glow Cyan en Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_80px_-20px_rgba(0,238,255,0.2)]" />

                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 z-0" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/90 to-[#020202]/30 z-10"></div>
                      
                      <div className="relative p-8 flex flex-col h-full min-h-[400px] z-20">
                        
                        {/* Top Tag */}
                        <div className="absolute top-6 right-6 bg-[#00EEFF]/10 border border-[#00EEFF]/30 px-3 py-1.5 rounded-sm text-[8px] font-mono font-black text-[#00EEFF] tracking-widest flex items-center gap-2 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,238,255,0.15)]">
                          <Icon size={12} /> {item.type}
                        </div>
                        
                        {/* Fecha Masiva Original */}
                        <div className="mt-6 drop-shadow-2xl">
                          <span className="block font-headline text-white text-7xl font-black italic leading-none group-hover:text-[#00EEFF] transition-colors">{item.date.split(' ')[0]}</span>
                          <span className="font-mono text-white/50 text-[10px] tracking-[0.5em] font-black uppercase mt-2 block">{item.date.split(' ')[1]}</span>
                        </div>

                        {/* Título y Stats */}
                        <div className="mt-auto space-y-6 flex-grow flex flex-col justify-end">
                          <h3 className="font-headline text-white text-3xl font-black uppercase leading-[0.9] italic tracking-tight drop-shadow-lg">{item.title}</h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-white/5 border border-white/10 text-[8px] font-black text-white/40 uppercase tracking-widest">{item.platform}</span>
                          </div>

                          {/* Barra de Hype Individual */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-mono font-black tracking-widest uppercase">
                              <span className="text-white/40">Hype Meter</span>
                              <span style={{ color: item.color }}>{item.hype}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                              <div 
                                className="h-full shadow-[0_0_15px_currentColor] transition-all duration-1000" 
                                style={{ width: `${item.hype}%`, backgroundColor: item.color, color: item.color }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* CTA Interno "Ver Detalles" */}
                        <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center group/btn opacity-70 group-hover:opacity-100 transition-opacity">
                          <span className="font-mono text-[10px] font-black tracking-widest uppercase text-white group-hover/btn:text-[#00EEFF] transition-colors">
                            Ver Detalles
                          </span>
                          <ChevronRight size={16} className="text-[#00EEFF] group-hover/btn:translate-x-1 transition-transform" />
                        </div>

                      </div>
                    </motion.a>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* PUBLICIDAD DERECHA (Tomada directo del Arsenal) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#00EEFF]/10 flex-col items-center justify-center relative group">
          <span className="font-mono text-[9px] text-[#00EEFF]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_RIGHT</span>
          <div className="absolute inset-0 border border-[#00EEFF]/5 group-hover:border-[#00EEFF]/30 transition-colors duration-500 pointer-events-none" />
        </aside>

      </div>
    </section>
  );
}