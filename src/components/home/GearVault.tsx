import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, ShieldAlert } from 'lucide-react';

export interface GearItem {
  id: string;
  name: string;      
  brand: string;
  brandLogo?: string; 
  slug: string;
  price: string;
  specs: string[];
  shortDescription: string;
  category: string;
  image: string;     
  isHero: boolean;
  link: string;
}

interface Props {
  items: GearItem[];
  categories: string[];
}

export default function GearVault({ items = [], categories = [] }: Props) {
  const [activeFilter, setActiveFilter] = useState('TODO');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateFontSize = (text: string, isHero: boolean) => {
    const len = text?.length || 0;
    const baseSize = isHero ? 42 : 24; 
    
    if (len <= 14) return `${baseSize}px`;
    
    const reductionFactor = isHero ? 0.45 : 0.32;
    const scaledSize = baseSize - (len - 14) * reductionFactor;
    const minSize = isHero ? 18 : 11; 
    
    return `${Math.max(minSize, scaledSize)}px`;
  };

  const filteredItems = useMemo(() => {
    return activeFilter === 'TODO' 
      ? items 
      : items.filter(i => i.category?.toUpperCase() === activeFilter.toUpperCase());
  }, [activeFilter, items]);

  const heroItem = useMemo(() => {
    return filteredItems.find(i => i.isHero) || filteredItems[0];
  }, [filteredItems]);

  const gridItems = useMemo(() => {
    return heroItem ? filteredItems.filter(i => i.id !== heroItem.id) : filteredItems;
  }, [filteredItems, heroItem]);

  if (!isMounted) return null;

  return (
    <section className="py-24 bg-pangea-neutral relative overflow-hidden flex flex-col items-center border-y border-white/5 w-full transition-colors duration-500">
      
      {/* ─── NÚCLEO RGB BITXOLO ACTUALIZADO ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rgb-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .group:hover .group-hover-text-rgb {
          background: linear-gradient(90deg, #ff0000, #00ff00, #00ffff, #ff00ff, #ff0000);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rgb-move 4s linear infinite;
        }

        .text-rgb {
          background: linear-gradient(90deg, #ff0000, #00ff00, #00ffff, #ff00ff, #ff0000);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rgb-move 4s linear infinite;
        }
        
        .spec-tag-rgb {
          background: linear-gradient(135deg, #0f2a2a 0%, #2a0f2a 50%, #0f1a2a 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.1);
          color: white;
          font-weight: bold;
        }
        
        .bg-rgb-soft {
          background: linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.03), rgba(0,255,255,0.03));
          background-size: 200% 200%;
          animation: rgb-move 6s ease infinite;
        }

        /* 🔥 NUEVA CLASE PARA LA BARRA INFERIOR NEÓN RGB */
        .bg-rgb-bar {
          background: linear-gradient(90deg, #ff0000, #00ff00, #00ffff, #ff00ff, #ff0000);
          background-size: 200% auto;
          animation: rgb-move 4s linear infinite;
        }
      `}} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6 relative z-10">
        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER */}
          <header className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 w-full">
            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="flex items-center gap-3 mb-4 md:mb-6 text-white/40">
                <div className="h-[2px] w-10 bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic">
                  Pangea_Elite // V.2.6
                </span>
              </div>
              <h2 className="font-headline text-white text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl transition-all duration-500">
                THE <span className="text-rgb">VAULT</span>
              </h2>
            </div>

            <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
              <p className="text-white/60 text-xs md:text-sm italic mb-4 md:mb-6 leading-relaxed drop-shadow-md">
                "Hardware de largo aliento. Sin prisa, sin clickbait. Solo las máquinas que merecen tu tiempo."
              </p>
              <a 
                href="/vault" 
                className="inline-flex items-center gap-3 md:gap-4 font-mono text-white/60 lg:hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md"
              >
                Explorar Inventario <ChevronRight size={16} className="transition-transform lg:group-hover:translate-x-2" />
              </a>
            </div>
          </header>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 border font-headline text-[10px] font-black italic tracking-[0.2em] uppercase transition-all duration-300 group focus:outline-none rounded-sm
                ${activeFilter === cat ? 'border-white/40 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 text-white/30 lg:hover:border-white/20'}`}
              >
                <span className={activeFilter === cat ? "text-rgb" : "group-hover:text-white transition-colors"}>
                  {cat}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full relative">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <motion.div 
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full"
                >
                  
                  {/* ─── HERO CARD ─── */}
                  {heroItem && (
                    <div className="lg:col-span-12 group relative bg-pangea-card/40 backdrop-blur-xl border border-white/5 rounded-[1.8rem] overflow-hidden h-auto lg:h-[450px] flex flex-col lg:flex-row lg:hover:border-white/20 transition-all duration-500 z-30 shadow-2xl">
                      <div className="absolute inset-0 bg-rgb-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="w-full lg:w-2/3 relative h-[250px] lg:h-full overflow-hidden z-10 bg-zinc-900/10 flex items-center justify-center">
                        <img src={heroItem.image} alt={heroItem.name} className="w-full h-full object-contain p-8 grayscale-0 opacity-80 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-linear-to-r from-[#020202] via-[#020202]/40 to-transparent hidden lg:block" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-[#020202]/40 to-transparent block lg:hidden" />
                      </div>
                      
                      <div className="w-full lg:w-1/3 p-8 md:p-10 flex flex-col justify-between h-full relative z-10 bg-black/30">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            {heroItem.brandLogo ? (
                              <img src={heroItem.brandLogo} alt={heroItem.brand} className="h-4 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all" />
                            ) : (
                              <Zap size={14} className="text-white/20 group-hover-text-rgb transition-colors" />
                            )}
                            <span className="text-white/40 font-mono text-[9px] font-black uppercase tracking-widest">{heroItem.brand}</span>
                            <span className="text-rgb font-mono text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/10 rounded-sm">
                              {heroItem.category}
                            </span>
                          </div>
                          
                          {/* 🔥 TEXTO FLUIDO CON HYPHENS-AUTO */}
                          <h3 
                            className="font-headline text-white font-black uppercase italic leading-[0.9] mb-4 group-hover-text-rgb transition-all duration-300 break-words hyphens-auto tracking-tighter"
                            style={{ fontSize: calculateFontSize(heroItem.name, true) }}
                          >
                            {heroItem.name}
                          </h3>
                          
                          <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                            <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                              <p className="text-white/50 text-[11px] font-body italic line-clamp-3 mt-0 mb-4 lg:mb-0 lg:group-hover:mb-6 pt-1 break-words">
                                {heroItem.shortDescription || "Unidad táctica bajo análisis de rendimiento."}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-8">
                            {heroItem.specs?.map((s) => <span key={s} className="spec-tag-rgb font-mono text-[8px] px-2 py-1 uppercase tracking-tighter rounded-sm">{s}</span>)}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                           <span className="font-headline text-3xl md:text-4xl text-white font-black italic group-hover-text-rgb transition-all duration-300">{heroItem.price}</span>
                           
                           <a href={`/vault/${heroItem.slug}`} className="px-5 py-2.5 rounded-full border border-white/5 flex items-center gap-2 hover:border-white/20 transition-all bg-white/5 shadow-lg">
                              <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white group-hover-text-rgb transition-colors">Expediente</span>
                              <ChevronRight size={14} className="text-white" />
                           </a>
                        </div>
                      </div>

                      {/* 🔥 BARRA INFERIOR NEÓN RGB PARA LA HERO CARD */}
                      <div className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30 bg-rgb-bar shadow-[0_0_15px_rgba(0,255,255,0.2)]" />
                    </div>
                  )}

                  {/* ─── GRID REUTILIZABLE SECUNDARIO ─── */}
                  {gridItems.map((item) => (
                    <motion.div 
                      layout 
                      key={item.id}
                      className="col-span-1 md:col-span-6 lg:col-span-4 group relative bg-pangea-card/40 backdrop-blur-xl border border-white/5 rounded-[1.8rem] overflow-hidden flex flex-col h-[410px] lg:hover:border-white/20 transition-all duration-500 z-30 shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-rgb-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="h-40 w-full relative overflow-hidden bg-zinc-900/10 z-10 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain p-6 grayscale-0 opacity-80 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-linear-to-t from-[#020202] to-transparent" />
                      </div>

                      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between relative z-10 bg-black/20 overflow-hidden">
                        <div className="w-full">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex flex-wrap items-center gap-2">
                              {item.brandLogo ? (
                                <img src={item.brandLogo} alt={item.brand} className="h-4 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-100 transition-all" />
                              ) : (
                                <Zap size={12} className="text-white/20 group-hover-text-rgb transition-colors" />
                              )}
                              <span className="text-white/40 font-mono text-[8px] font-black uppercase tracking-widest">{item.brand}</span>
                              <span className="text-rgb font-mono text-[6px] font-black uppercase tracking-widest bg-white/5 px-1.5 py-0.5 border border-white/10 rounded-sm">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* 🔥 TEXTO FLUIDO CON HYPHENS-AUTO */}
                          <h4 
                            className="font-headline text-white font-black uppercase italic leading-[0.9] group-hover-text-rgb transition-all duration-300 break-words hyphens-auto tracking-tighter"
                            style={{ fontSize: calculateFontSize(item.name, false) }}
                          >
                            {item.name}
                          </h4>

                          <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                            <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                              <p className="text-white/50 text-[10px] font-body italic line-clamp-2 leading-tight mt-2 break-words">
                                {item.shortDescription || "Unidad táctica lista para despliegue."}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.specs?.slice(0, 2).map((s) => (
                              <span key={s} className="spec-tag-rgb font-mono text-[7px] px-1.5 py-0.5 uppercase tracking-tighter rounded-sm">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 w-full">
                          <span className="font-headline text-2xl md:text-3xl text-white font-black italic group-hover-text-rgb transition-all duration-300">
                            {item.price}
                          </span>
                          
                          <a href={`/vault/${item.slug}`} className="px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 hover:border-white/40 transition-all bg-white/5 shadow-lg shrink-0">
                            <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase text-white group-hover-text-rgb transition-colors">Analizar</span>
                            <ChevronRight size={12} className="text-white" />
                          </a>
                        </div>
                      </div>

                      {/* 🔥 BARRA INFERIOR NEÓN RGB PARA LAS CARDS GRID */}
                      <div className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full z-30 bg-rgb-bar shadow-[0_0_15px_rgba(0,255,255,0.2)]" />
                    </motion.div>
                  ))}

                </motion.div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center border border-white/5 bg-pangea-card/20 rounded-[1.8rem] p-16 text-center">
                  <span className="font-mono text-[10px] text-white/40 font-black tracking-[0.4em] uppercase mb-2">Vault_Locked // Empty_Sector</span>
                  <p className="text-white/30 text-xs italic font-body max-w-xs">"No hay suministros de hardware registrados bajo esta categoría actualmente."</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}