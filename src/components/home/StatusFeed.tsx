import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader'; 
import PatchCard from '../ui/PatchCard'; 

const SYS_COLORS = {
  'NEW CONTENT': { label: 'NEW CONTENT', hex: '#00f0ff', bg: 'bg-[#00f0ff]/10', border: 'border-[#00f0ff]/30', text: 'text-[#00f0ff]' },
  'BUFF':        { label: 'BUFF',        hex: '#00ff41', bg: 'bg-[#00ff41]/10', border: 'border-[#00ff41]/30', text: 'text-[#00ff41]' },
  'NERF':        { label: 'NERF',        hex: '#FF0033', bg: 'bg-[#FF0033]/10', border: 'border-[#FF0033]/30', text: 'text-[#FF0033]' },
  'HOTFIX':      { label: 'HOTFIX',      hex: '#FFD700', bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', text: 'text-[#FFD700]' },
  'BALANCE':     { label: 'BALANCE',     hex: '#A020F0', bg: 'bg-[#A020F0]/10', border: 'border-[#A020F0]/30', text: 'text-[#A020F0]' },
  'BAL':         { label: 'BALANCE',     hex: '#A020F0', bg: 'bg-[#A020F0]/10', border: 'border-[#A020F0]/30', text: 'text-[#A020F0]' },
};

const FILTERS = ['TODOS', 'BUFF', 'NERF', 'NEW CONTENT', 'HOTFIX', 'BALANCE'];

export function StatusFeed({ patches = [], tickerItems = [] }: { patches?: any[], tickerItems?: any[] }) {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 🔥 ELIMINADO EL LISTENER DE RESIZE QUE CONSUMÍA MEMORIA A LO MENSO 🔥
  
  // Solo duplicamos una vez porque la animación de CSS lo necesita
  const displayTicker = [...tickerItems, ...tickerItems];
  
  const filteredPatches = activeFilter === 'TODOS' 
    ? patches 
    : patches.filter(p => {
        const typeKey = p.type?.toUpperCase() || 'BAL';
        return SYS_COLORS[typeKey as keyof typeof SYS_COLORS]?.label === activeFilter;
      });

  return (
    <section ref={containerRef} className="py-24 bg-pangea-neutral relative overflow-hidden flex flex-col items-center border-y border-white/5 transition-colors duration-500">
      
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6">
        <div className="max-w-[1200px] w-full relative z-10">
          
          <div className="mb-14">
            <SectionHeader 
              tag="Sync_Stream // v.2.6"
              titleSolid="PATCH"
              titleOutline="LOG"
              description="Buffs, nerfs y hotfixes de largo aliento. Todos los cambios del meta que merecen tu tiempo."
              ctaText="Explorar actualizaciones"
              ctaHref="/patchLog"
              accentColor="var(--color-brand-purple)"
            />

            <div className="relative border-y border-brand-purple/20 bg-brand-purple/5 py-3 overflow-hidden flex mt-12 rounded-sm">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-pangea-neutral to-transparent z-10 pointer-events-none transition-colors duration-500" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-pangea-neutral to-transparent z-10 pointer-events-none transition-colors duration-500" />
              
              {/* 🔥 REEMPLAZADO framer-motion POR CSS NATIVO DE TAILWIND (animate-pangea-marquee) 🔥 */}
              <div className="animate-pangea-marquee flex whitespace-nowrap gap-10 hover:[animation-play-state:paused]">
                {displayTicker.map((t, i) => {
                  const tagColor = SYS_COLORS[t.type?.toUpperCase() as keyof typeof SYS_COLORS] || SYS_COLORS['BAL'];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-black text-white/60 uppercase tracking-widest">{t.game}</span>
                      <span className="text-brand-purple/40">·</span>
                      <span className="font-mono text-[10px] font-black uppercase tracking-widest" style={{ color: tagColor.hex }}>{t.change}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-14">
            {FILTERS.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)} 
                className={`font-headline text-xs md:text-sm font-black tracking-widest uppercase px-6 py-2.5 border rounded-[0.8rem] transition-all duration-300 ${activeFilter === f ? 'border-brand-purple bg-brand-purple/10 text-brand-purple shadow-purple-sm' : 'border-white/10 text-white/50 lg:hover:text-white bg-pangea-card/50 backdrop-blur-sm'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="updates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            <AnimatePresence mode="popLayout">
              {filteredPatches.map((item, index) => {
                const isBig = index === 0 && activeFilter === 'TODOS';
                const tagColor = SYS_COLORS[item.type?.toUpperCase() as keyof typeof SYS_COLORS] || SYS_COLORS['BAL'];

                return (
                  <PatchCard 
                    key={item.id || index} 
                    item={item} 
                    index={index} 
                    isBig={isBig} 
                    tagColor={tagColor} 
                    accentColor="var(--color-brand-purple)" 
                  />
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}