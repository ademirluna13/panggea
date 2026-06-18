import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader'; 
import PangeaCard from '../ui/PanggeaCard'; 

const ACCENT = "#00FF66";

interface TierEntry {
  title: string;
  slug: string;
  image?: string;
  img?: string; 
  heroImage?: string; 
  description?: string;
  desc?: string; 
  rank: string;
  rankScore: number;
  gameName: string;
  gameLogo?: string;
  publishedAt?: string; // 🔥 FIXED: Added to interface
}

interface TacticalArsenalProps {
  entries?: TierEntry[];
  accentColor?: string;
}

export function TacticalArsenal({ entries = [], accentColor = ACCENT }: TacticalArsenalProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={containerRef} className="py-24 bg-pangea-neutral relative overflow-hidden flex flex-col items-center w-full transition-colors duration-500">
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}08 0%, transparent 70%)` }} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6 relative z-10">
        <div className="max-w-[1200px] w-full">
          
          <SectionHeader 
            tag="System_Scanning // v.2.6"
            titleSolid="TIER"
            titleOutline="ARSENAL"
            description="Clasificación de élite y análisis del meta actual. Los picks que definen la victoria."
            ctaText="Revisa los tiers"
            ctaHref="/tier"
            accentColor={accentColor}
          />

          <div className="flex items-center gap-6 sm:gap-8 mb-16 overflow-x-auto no-scrollbar py-4">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.name;
              return (
                <button 
                  key={filter.name} 
                  onClick={() => setActiveFilter(filter.name)} 
                  className="group flex flex-col items-center gap-4 min-w-[80px] focus:outline-none"
                >
                  <div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative overflow-hidden
                      ${isActive ? '' : 'border-white/10 bg-pangea-card lg:hover:border-white/30 lg:hover:scale-110'}`}
                    style={{ 
                      borderColor: isActive ? accentColor : '',
                      boxShadow: isActive ? `0 0 20px ${accentColor}40` : ''
                    }}
                  >
                    {filter.logo ? (
                      <img 
                        src={filter.logo} 
                        alt={filter.name} 
                        className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-100 scale-110' : 'opacity-30 grayscale lg:group-hover:grayscale-0 lg:group-hover:opacity-100'}`} 
                      />
                    ) : (
                      <Target size={20} style={{ color: isActive ? accentColor : 'rgba(255,255,255,0.2)' }} />
                    )}
                  </div>
                  <span 
                    className={`font-mono text-[8px] sm:text-[9px] font-bold tracking-widest uppercase transition-colors text-center
                      ${isActive ? '' : 'text-white/20 lg:group-hover:text-white'}`}
                    style={{ color: isActive ? accentColor : '' }}
                  >
                    {filter.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, i) => {
                const imageUrl = entry.heroImage || entry.image || entry.img || '';
                const entryText = entry.description || entry.desc || '';

                return (
                  <motion.div 
                    layout
                    key={entry.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative group/tier h-[410px] w-full"
                  >
                    <PangeaCard
                      title={entry.title}
                      slug={entry.slug}
                      description={entryText}
                      category={entry.gameName} 
                      heroImage={imageUrl}
                      baseHref="/tier"
                      accentColor={accentColor}
                      publishedAt={entry.publishedAt} // 🔥 FIXED: Changed 'item' to 'entry'
                    />

                    <div 
                      className="absolute top-6 right-6 w-12 h-12 border-2 bg-black/50 backdrop-blur-md rounded-xl flex items-center justify-center z-40 pointer-events-none transition-transform duration-500 group-hover/tier:scale-105"
                      style={{ 
                        borderColor: accentColor,
                        boxShadow: `0 0 15px ${accentColor}30`
                      }}
                    >
                      <span className="font-headline text-2xl font-[950] italic tracking-tighter" style={{ color: accentColor }}>
                        {entry.rank}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}