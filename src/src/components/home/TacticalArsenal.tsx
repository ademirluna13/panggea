import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Zap, Swords, Activity, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. TIPADO PARA EVITAR ERRORES
interface Subject {
  name: string;
  tier: string;
  role: string;
  intel: string;
  gameName?: string; // Solo para el Global Scan
}

interface GameNode {
  id: string;
  name: string;
  short: string;
  cat: string;
  logo: string;
  top3: Subject[];
}

// 2. DATA (Incluyendo el GLOBAL_SCAN como estado inicial)
const ARSENAL_DATA: GameNode[] = [
  {
    id: 'global',
    name: 'GLOBAL_SCAN',
    short: 'ALL',
    cat: 'ESTADO_DEL_META',
    logo: 'https://cdn-icons-png.flaticon.com/512/3665/3665923.png',
    top3: [
      { name: "VENOM", tier: "S+", role: "VANGUARD", gameName: "MARVEL RIVALS", intel: "Dominación absoluta en control de puntos. El pick más seguro del meta actual." },
      { name: "HOMELANDER", tier: "S", role: "ZONER", gameName: "MK1", intel: "Control de aire imbatible. Sus mix-ups siguen siendo la pesadilla del online." },
      { name: "THE LICH", tier: "S", role: "KILLER", gameName: "DBD", intel: "Versatilidad de hechizos que anula cualquier estrategia de looping estándar." }
    ]
  },
  { 
    id: 'mr', 
    name: "MARVEL RIVALS", 
    short: "MR", 
    cat: "HERO SHOOTER", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Marvel_Cinematic_Universe_logo.svg/1200px-Marvel_Cinematic_Universe_logo.svg.png",
    top3: [
      { name: "VENOM", tier: "S+", role: "VANGUARD", intel: "Dominación absoluta en control de puntos. El pick más seguro del meta actual." },
      { name: "HELA", tier: "S", role: "DUELIST", intel: "Daño explosivo constante. Requiere precisión quirúrgica para capitalizar el meta." },
      { name: "DR. STRANGE", tier: "A", role: "STRAT", intel: "Utilidad táctica máxima con portales interdimensionales y escudos de energía." }
    ]
  },
  { 
    id: 'mk1', 
    name: "MORTAL KOMBAT 1", 
    short: "MK1", 
    cat: "FIGHTING", 
    logo: "https://logos-world.net/wp-content/uploads/2021/03/Mortal-Kombat-Logo.png",
    top3: [
      { name: "HOMELANDER", tier: "S", role: "ZONER", intel: "Control de aire imbatible. Sus mix-ups siguen siendo la pesadilla del online." },
      { name: "SCORPION", tier: "A", role: "RUSH", intel: "Castigo excelente en errores de recuperación del rival. Daño consistente." },
      { name: "PEACEMAKER", tier: "A", role: "MIX-UP", intel: "Proyectiles y antiaéreos sólidos. Versatilidad en cualquier matchup." }
    ]
  },
  { 
    id: 'dbd', 
    name: "DEAD BY DAYLIGHT", 
    short: "DBD", 
    cat: "HORROR", 
    logo: "https://logos-world.net/wp-content/uploads/2021/02/Dead-by-Daylight-Logo.png",
    top3: [
      { name: "THE LICH", tier: "S", role: "KILLER", intel: "Versatilidad de hechizos que anula cualquier estrategia de looping estándar." },
      { name: "NURSE", tier: "S", role: "KILLER", intel: "Mecánicamente perfecta. Capaz de ignorar cualquier obstáculo del mapa." },
      { name: "BLIGHT", tier: "A", role: "MOBILITY", intel: "Movilidad extrema. Requiere precisión milimétrica tras los últimos ajustes." }
    ]
  }
];

export function TacticalArsenal() {
  const [active, setActive] = useState<GameNode>(ARSENAL_DATA[0]);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de los datos al montar la sección
    gsap.from(".header-arsenal", {
      scrollTrigger: { trigger: container.current, start: "top 80%" },
      opacity: 0, y: -20, duration: 1, ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center">
      
      {/* ─── ESTRUCTURA DE TRES COLUMNAS (ADS + CONTENT PROTEGIDO) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6">
        
        {/* PUBLICIDAD IZQUIERDA */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#00FF66]/10 flex-col items-center justify-center relative group">
          <span className="font-mono text-[9px] text-[#00FF66]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_LEFT</span>
          <div className="absolute inset-0 border border-[#00FF66]/5 group-hover:border-[#00FF66]/30 transition-colors duration-500 pointer-events-none" />
        </aside>

        {/* ─── MARGEN DE 1200PX (CONTENIDO CENTRAL) ─── */}
        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER */}
          <header className="header-arsenal mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6 text-[#00FF66]">
                <Cpu size={18} className="animate-pulse" />
                <span className="font-mono text-[10px] font-black tracking-[0.5em] uppercase italic text-[#00FF66]">
                  {active.id === 'global' ? 'System_Scanning_All_Nodes' : `Direct_Link: ${active.name}`}
                </span>
              </div>
              <h2 className="font-headline text-7xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-[0.7]">
                TIER<br /><span className="text-transparent" style={{ WebkitTextStroke: '2px #00FF66' }}>ARSENAL</span>
              </h2>
            </div>
            <div className="hidden lg:block text-right opacity-40">
               <div className="flex items-center gap-4 justify-end mb-2">
                  <span className="h-[1px] w-12 bg-[#00FF66]/30"></span>
                  <span className="font-mono text-[10px] font-black tracking-widest uppercase text-[#00FF66]">Database_2026</span>
               </div>
               <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-white">Security_Level: Admin</p>
            </div>
          </header>

          {/* ─── SELECTOR DE NODOS (ORBITAL CIRCLES) ─── */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-24">
            {ARSENAL_DATA.map((game, i) => (
              <motion.div
                key={game.id}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="relative"
              >
                <button
                  onClick={() => setActive(game)}
                  className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center p-6 border-2 transition-all duration-500 group
                    ${active.id === game.id 
                      ? 'border-[#00FF66] bg-[#00FF66]/10 shadow-[0_0_35px_rgba(0,255,102,0.25)]' 
                      : 'border-white/10 bg-[#080808] hover:border-[#00FF66]/40 hover:scale-110'}
                  `}
                >
                  {game.id === 'global' ? (
                    <Globe size={40} className={`transition-colors ${active.id === 'global' ? 'text-[#00FF66]' : 'text-white/20'}`} />
                  ) : (
                    <img 
                      src={game.logo} 
                      alt={game.name} 
                      className={`w-full h-full object-contain transition-all duration-500 
                        ${active.id === game.id ? 'opacity-100 grayscale-0' : 'opacity-20 grayscale group-hover:opacity-60'}
                      `} 
                    />
                  )}
                  
                  <div className={`absolute -bottom-6 whitespace-nowrap font-mono text-[8px] font-black tracking-[0.3em] transition-colors
                    ${active.id === game.id ? 'text-[#00FF66]' : 'text-white/20 group-hover:text-white/40'}
                  `}>
                    {game.short}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* ─── DISPLAY DE DATOS (PANEL DE INTELIGENCIA) ─── */}
          <div className="data-panel grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {active.top3.map((char, idx) => (
                <motion.div 
                  key={`${active.id}-${char.name}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="group relative bg-[#050505] border border-white/5 p-8 overflow-hidden hover:border-[#00FF66]/40 transition-all h-full flex flex-col shadow-lg"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-white pointer-events-none group-hover:text-[#00FF66] transition-colors">
                    {char.tier.includes('S') ? <Swords size={80} /> : <Target size={60} />}
                  </div>

                  <div className="flex justify-between items-start mb-10">
                    <span className="font-mono text-[9px] text-white/20 font-black tracking-widest uppercase italic">
                      {active.id === 'global' ? 'Top_Entry' : `Data_0${idx + 1}`}
                    </span>
                    <div className={`w-14 h-14 flex items-center justify-center font-headline text-4xl font-black italic border-2 transition-all
                      ${char.tier.includes('S') ? 'border-[#00FF66] text-[#00FF66] bg-[#00FF66]/5 shadow-[0_0_15px_rgba(0,255,102,0.2)]' : 'border-white/10 text-white/20 group-hover:border-[#00FF66]/30'}
                    `}>
                      {char.tier}
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                         <Zap size={12} className="text-[#00FF66]" />
                         <span className="font-mono text-[9px] text-[#00FF66]/70 tracking-[0.3em] uppercase font-black">
                          {active.id === 'global' ? char.gameName : char.role}
                         </span>
                      </div>
                      <h3 className="font-headline text-3xl md:text-4xl text-white font-black italic uppercase leading-none tracking-tighter group-hover:text-[#00FF66] transition-colors">
                        {char.name}
                      </h3>
                    </div>
                    <p className="text-white/40 text-xs font-body italic leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#00FF66]/30 transition-colors">
                      "{char.intel}"
                    </p>
                  </div>

                  <a href="/tierlist" className="relative z-10 mt-8 pt-6 border-t border-white/5 flex justify-between items-center group/btn">
                    <span className="font-mono text-[9px] text-white/20 uppercase font-black group-hover/btn:text-[#00FF66] transition-colors">Abrir Expediente</span>
                    <ChevronRight size={18} className="text-[#00FF66] group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  
                  {/* Neón Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* FOOTER DEL ARSENAL */}
          <div className="mt-12 flex justify-center lg:justify-end">
             <div className="flex items-center gap-4 text-[#00FF66]/40 font-mono text-[8px] tracking-[0.4em] uppercase">
                <span>Sincronizado_Con_Meta_Core_v2.6</span>
                <Activity size={12} className="animate-pulse text-[#00FF66]" />
             </div>
          </div>

        </div>

        {/* PUBLICIDAD DERECHA */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#00FF66]/10 flex-col items-center justify-center relative group">
          <span className="font-mono text-[9px] text-[#00FF66]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_RIGHT</span>
          <div className="absolute inset-0 border border-[#00FF66]/5 group-hover:border-[#00FF66]/30 transition-colors duration-500 pointer-events-none" />
        </aside>

      </div>

      {/* DECORACIÓN BACKGROUND (FUERA DE LOS 1200PX) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 hidden 2xl:block select-none pointer-events-none">
        <span className="font-black italic text-[20vw] text-white leading-none tracking-tighter uppercase">ARSENAL</span>
      </div>

    </section>
  );
}