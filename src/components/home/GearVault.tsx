import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';


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

  // 🔥 ESCUDO ANTI-CRASH DE ADSENSE 🔥
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  const filteredItems = activeFilter === 'TODO' 
    ? items 
    : items.filter(i => i.category?.toUpperCase() === activeFilter.toUpperCase());

  const heroItem = filteredItems.find(i => i.isHero) || filteredItems[0];
  const gridItems = heroItem ? filteredItems.filter(i => i.id !== heroItem.id) : filteredItems;

  return (
    <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center border-t border-white/5 font-sans">
      
      {/* ─── NÚCLEO RGB BITXOLO ─── */}
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
          background: linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,255,0,0.05), rgba(0,255,255,0.05));
          background-size: 200% 200%;
          animation: rgb-move 6s ease infinite;
        }
      `}} />

      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 xl:gap-12 px-4 xl:px-6 relative z-10">
        
      
        <div className="max-w-[1200px] w-full relative z-10">
          
          {/* HEADER */}
          <div className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-10 bg-gradient-to-r from-red-500 via-green-500 to-blue-500"></div>
                <span className="font-mono text-white/40 text-[10px] font-black tracking-[0.5em] uppercase italic">Pangea_Elite // V.2.6</span>
              </div>
              <h2 className="font-headline text-white text-6xl md:text-8xl lg:text-[100px] font-[950] tracking-tighter leading-[0.8] uppercase italic">
                THE <span className="text-rgb">VAULT</span>
              </h2>
            </div>
            <div className="max-w-xs text-left lg:text-right">
              <p className="text-white/40 text-xs italic mb-6 leading-relaxed">"Hardware de largo aliento. Sin prisa, sin clickbait. Solo las máquinas que merecen tu tiempo."</p>
              <a href="/vault" className="inline-flex items-center gap-3 font-mono text-white/60 hover:text-white text-[10px] font-black tracking-[0.4em] uppercase transition-all group">
                Explorar Inventario <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* FILTROS CON RGB AL ACTIVARSE */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 border font-headline text-[9px] font-black italic tracking-[0.2em] uppercase transition-all duration-300 group
                ${activeFilter === cat ? 'border-white/40 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-transparent border-white/5 text-white/30 hover:border-white/20'}`}>
                <span className={activeFilter === cat ? "text-rgb" : "group-hover:text-white transition-colors"}>{cat}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            
            {/* HERO CARD */}
            {heroItem && (
              <div className="lg:col-span-12 group relative bg-[#080808] border border-white/5 overflow-hidden h-[450px] flex flex-col lg:flex-row hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-rgb-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="lg:w-2/3 relative overflow-hidden z-10">
                  {/* 🔥 FOTO ESTÁTICA Y RESPONSIVA 🔥 */}
                  <img src={heroItem.image} alt={heroItem.name} className="w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
                </div>
                
                <div className="lg:w-1/3 p-10 flex flex-col justify-center relative z-10 bg-black/40">
                  
                  <div className="flex items-center gap-3 mb-4">
                    {heroItem.brandLogo ? (
                      <img src={heroItem.brandLogo} alt={heroItem.brand} className="h-5 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all" />
                    ) : (
                      <Zap size={16} className="text-white/20 group-hover-text-rgb transition-colors" />
                    )}
                    <span className="text-white/40 font-mono text-[9px] font-black uppercase tracking-widest">{heroItem.brand}</span>
                    <span className="text-rgb font-mono text-[8px] font-black uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/10 rounded-sm">
                      {heroItem.category}
                    </span>
                  </div>
                  
                  <h3 className="font-headline text-4xl text-white font-black uppercase italic leading-none mb-4 group-hover-text-rgb transition-all duration-300">
                      {heroItem.name}
                  </h3>
                  
                  {/* 🔥 MAGIA RESPONSIVA TAILWIND 🔥 */}
                  <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white/50 text-[11px] italic line-clamp-3 mt-0 mb-4 lg:mb-0 lg:group-hover:mb-6 pt-2">
                          {heroItem.shortDescription || "Unidad táctica bajo análisis de rendimiento."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {heroItem.specs?.map((s) => <span key={s} className="spec-tag-rgb font-mono text-[8px] px-2 py-1 uppercase tracking-tighter">{s}</span>)}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                     <span className="font-headline text-4xl text-white font-black italic group-hover-text-rgb transition-all duration-300">{heroItem.price}</span>
                     
                     <a href={`/vault/${heroItem.slug}`} className="px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2 hover:border-white/40 transition-all bg-white/5 shadow-lg">
                        <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white group-hover-text-rgb transition-colors">Expediente</span>
                        <ChevronRight size={16} className="text-white" />
                     </a>
                  </div>
                </div>
              </div>
            )}

            {/* GRID CARDS */}
            <AnimatePresence mode='popLayout'>
              {gridItems.map((item) => (
                <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="lg:col-span-4 group relative bg-[#080808] border border-white/5 overflow-hidden flex flex-col h-[400px] hover:border-white/20 transition-all">
                  
                  <div className="absolute inset-0 bg-rgb-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="h-1/2 relative overflow-hidden bg-zinc-900/10 z-10 flex items-center justify-center">
                    {/* 🔥 FOTO ESTÁTICA Y RESPONSIVA 🔥 */}
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain p-4 grayscale-0 opacity-80 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <div className="p-8 flex flex-col h-1/2 justify-between relative z-10 bg-black/90">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
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
                      
                      <h4 className="font-headline text-2xl text-white font-black uppercase italic leading-none group-hover-text-rgb transition-all duration-300">
                          {item.name}
                      </h4>

                      {/* 🔥 MAGIA RESPONSIVA TAILWIND 🔥 */}
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                          <p className="text-white/50 text-[10px] italic line-clamp-2 leading-tight mt-3">
                            {item.shortDescription || "Unidad táctica lista para despliegue."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-4">
                        {item.specs?.slice(0, 3).map((s) => (
                          <span key={s} className="spec-tag-rgb font-mono text-[7px] px-1.5 py-0.5 uppercase tracking-tighter">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                      <span className="font-headline text-3xl text-white font-black italic group-hover-text-rgb transition-all duration-300">
                        {item.price}
                      </span>
                      
                      <a href={`/vault/${item.slug}`} className="px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 hover:border-white/40 transition-all bg-white/5 shadow-lg">
                        <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase text-white group-hover-text-rgb transition-colors">Analizar</span>
                        <ChevronRight size={14} className="text-white" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>


        </div>

      </div>
    </section>
  );
}