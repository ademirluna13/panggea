import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Radio, Terminal, Clock, History } from 'lucide-react';

// 1. SISTEMA DE COLORES SEMÁNTICOS (Tags internos)
const SYS_COLORS = {
  NEW:  { label: 'NEW CONTENT', hex: '#00EEFF', bg: 'bg-[#00EEFF]/10', border: 'border-[#00EEFF]/30', text: 'text-[#00EEFF]' },
  BUFF: { label: 'BUFF',        hex: '#00FF66', bg: 'bg-[#00FF66]/10', border: 'border-[#00FF66]/30', text: 'text-[#00FF66]' },
  NERF: { label: 'NERF',        hex: '#FF0033', bg: 'bg-[#FF0033]/10', border: 'border-[#FF0033]/30', text: 'text-[#FF0033]' },
  HOT:  { label: 'HOTFIX',      hex: '#FFCC00', bg: 'bg-[#FFCC00]/10', border: 'border-[#FFCC00]/30', text: 'text-[#FFCC00]' },
  BAL:  { label: 'BALANCE',     hex: '#A020F0', bg: 'bg-[#A020F0]/10', border: 'border-[#A020F0]/30', text: 'text-[#A020F0]' },
};

const FILTERS = ['TODOS', 'BUFF', 'NERF', 'NEW CONTENT', 'HOTFIX', 'BALANCE'];

// 2. DATA (6 tarjetas para el Bento Grid)
const PATCH_GRID = [
  {
    id: '1', game: 'MARVEL RIVALS', version: 'V1.0.5', platforms: ['PC', 'PS5'],
    title: 'THE PURPLE REIGN PROTOCOL', type: 'BAL',
    desc: 'Análisis profundo del rework a Psylocke y el nuevo mapa de Latveria bajo el dominio de Doom.',
    currentDate: '05 MAY 2026', lastUpdate: '20 ABR 2026',
    img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200',
    grid: 'lg:col-span-8 lg:row-span-2'
  },
  {
    id: '2', game: 'ELDEN RING', version: 'v1.12', platforms: ['PC', 'XBOX'],
    title: 'BUFF MASIVO A MAGIAS', type: 'BUFF',
    desc: 'Bloodflame Blade y magias de gravedad reciben +15% de daño base.',
    currentDate: '04 MAY 2026', lastUpdate: '10 MAR 2026',
    grid: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: '3', game: 'VALORANT', version: 'v9.08', platforms: ['PC'],
    title: 'NERF A REYNA Y JETT', type: 'NERF',
    desc: 'Ajuste de hitbox en el dash y cambios en la economía de pistol rounds.',
    currentDate: '03 MAY 2026', lastUpdate: '15 ABR 2026',
    grid: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: '4', game: 'MK1', version: 'KHAOS_02', platforms: ['MULTI'],
    title: 'HOTFIX: KAMEO SYNC', type: 'HOT',
    desc: 'Corregido error de desincronización en combos aéreos de Cyrax.',
    currentDate: '02 MAY 2026', lastUpdate: '01 MAY 2026',
    grid: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: '5', game: 'DBD', version: 'v8.2.0', platforms: ['PC', 'PS5'],
    title: 'CASTLEVANIA CONTENT', type: 'NEW',
    desc: 'Drácula llega como nuevo Killer. Nuevo mapa: Castillo de Trevor.',
    currentDate: '01 MAY 2026', lastUpdate: '12 ABR 2026',
    grid: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: '6', game: 'HARDWARE', version: 'LEAK', platforms: ['PC'],
    title: 'RTX 5090 PERFORMANCE', type: 'BAL',
    desc: 'Nuevos drivers optimizan el trazado de rayos en un 20% global.',
    currentDate: '30 ABR 2026', lastUpdate: '01 ENE 2026',
    grid: 'lg:col-span-4 lg:row-span-1'
  }
];

const TICKER_DATA = [
  { game: 'MARVEL RIVALS', change: 'Venom — Shield cooldown +1.5s', type: 'NERF' },
  { game: 'ELDEN RING',    change: 'Bloodflame Blade +12% dmg', type: 'BUFF' },
  { game: 'MK1',           change: 'Kameo system — balance pass', type: 'HOT' },
];

export function StatusFeed() {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const tickerItems = [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA];
  
  const filteredPatches = activeFilter === 'TODOS' 
    ? PATCH_GRID 
    : PATCH_GRID.filter(p => SYS_COLORS[p.type as keyof typeof SYS_COLORS]?.label === activeFilter);

  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden flex flex-col items-center border-y border-white/5">
      
      {/* ─── ESTRUCTURA TRES COLUMNAS (ADS DOBLES + CONTENT) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6">
        
        {/* ADS IZQUIERDA (STACK) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 flex-col gap-6 h-fit">
          {[1, 2].map(i => (
            <div key={`left-${i}`} className="w-full h-[600px] bg-white/[0.02] border border-[#A020F0]/10 flex flex-col items-center justify-center relative group">
              <span className="font-mono text-[9px] text-[#A020F0]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS</span>
            </div>
          ))}
        </aside>

        {/* ─── CONTENEDOR CENTRAL 1200PX ─── */}
        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER (CON TAMAÑOS INSPIRADOS EN DEEP DIVES) */}
          <div className="mb-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
              
              {/* Título Monumental (Izquierda) */}
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

              {/* Frase y CTA (Derecha) */}
              <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
                <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed drop-shadow-md">
                  "Buffs, nerfs y hotfixes de largo aliento. Todos los cambios del meta que merecen tu tiempo."
                </p>
                <a href="/archivos" className="inline-flex items-center gap-3 md:gap-4 font-mono text-[#A020F0] hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md">
                  Explorar Archivo Maestro <ChevronRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-2 transition-transform" />
                </a>
              </div>

            </div>

            {/* CARRUSEL TICKER */}
            <div className="relative border-y border-[#A020F0]/20 bg-[#A020F0]/5 py-3 overflow-hidden flex mt-12 mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
              <motion.div className="flex whitespace-nowrap gap-10" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }}>
                {tickerItems.map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-black text-white/60 uppercase tracking-widest">{t.game}</span>
                    <span className="text-[#A020F0]/40">·</span>
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest" style={{ color: SYS_COLORS[t.type as keyof typeof SYS_COLORS]?.hex }}>{t.change}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* FILTROS RADAR STYLE */}
          <div className="flex flex-wrap gap-4 mb-14">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`font-headline text-sm md:text-base font-black tracking-widest uppercase px-10 py-4 border rounded-sm transition-all duration-300 ${activeFilter === f ? 'border-[#A020F0] bg-[#A020F0]/10 text-[#A020F0] shadow-[0_0_20px_rgba(160,32,240,0.3)]' : 'border-white/10 text-white/50 hover:text-white bg-[#050505]'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* GRID BENTO (FLEX-GROW EN CARDS Y FRAMER MOTION SEGURO) */}
          <div className="updates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-fr">
            {filteredPatches.map((item, index) => (
              <motion.a 
                href={`/logs/${item.id}`}
                key={item.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className={`group relative overflow-hidden bg-[#080808] border border-white/10 transition-all duration-500 rounded-sm ${item.grid} flex flex-col hover:border-[#A020F0]/50 shadow-2xl min-h-[300px] md:min-h-[350px]`}
              >
                
                {/* GLOW MORADO FIJO EN HOVER */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_80px_-20px_rgba(160,32,240,0.2)]" />

                {/* IMAGEN FONDO (Solo para la card gigante) */}
                {item.img && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />
                  </div>
                )}

                {/* CONTENIDO (Aseguramos que el botón baje) */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col flex-grow">
                  
                  {/* TOP DATA */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                       <span className="font-mono text-[10px] md:text-[11px] font-black text-[#A020F0] tracking-widest uppercase italic">{item.type}</span>
                       <span className="text-white/60 font-mono text-[9px] uppercase tracking-tighter">{item.game} // {item.version}</span>
                    </div>
                    <div className="text-right hidden sm:block">
                       <div className="flex items-center gap-2 text-[#A020F0] font-mono text-[9px] font-black"><Clock size={10} /> {item.currentDate}</div>
                       <div className="text-white/40 font-mono text-[7px] mt-1 italic">Last: {item.lastUpdate}</div>
                    </div>
                  </div>

                  {/* TÍTULO Y DESC */}
                  <div className="mb-8 flex-grow">
                    <h3 className={`font-headline font-black italic text-white uppercase leading-[0.9] tracking-tighter group-hover:text-[#A020F0] transition-colors ${item.grid.includes('8') ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-3xl sm:text-4xl'}`}>
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm font-body italic mt-4 leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA "VER PARCHE COMPLETO" PARA TODAS LAS CARDS */}
                  <div className="mt-auto pt-5 border-t border-white/10 flex justify-between items-center group/btn">
                    <div className="flex items-center gap-3">
                      <Terminal size={14} className="text-[#A020F0] md:w-4 md:h-4" />
                      <span className="font-mono text-[10px] md:text-[11px] font-black tracking-widest uppercase text-white group-hover/btn:text-[#A020F0] transition-colors">
                        Ver Parche Completo
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-[#A020F0] md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </div>

                </div>
              </motion.a>
            ))}
          </div>

        </div>

        {/* ADS DERECHA (STACK) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 flex-col gap-6 h-fit">
          {[1, 2].map(i => (
            <div key={`right-${i}`} className="w-full h-[600px] bg-white/[0.02] border border-[#A020F0]/10 flex flex-col items-center justify-center relative group">
              <span className="font-mono text-[9px] text-[#A020F0]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS</span>
            </div>
          ))}
        </aside>

      </div>
    </section>
  );
}