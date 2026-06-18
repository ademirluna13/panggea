import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

interface Post {
  title: string;
  slug: string;
  heroImage: string;
  category: string;
  description: string;
}

interface FeaturedCarouselProps {
  posts: Post[];
}

export default function FeaturedCarousel({ posts = [] }: FeaturedCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🧠 ALGORITMO LÍQUIDO: Encoge la fuente dinámicamente según los caracteres para evitar cortes con tres puntos
  const calculateFontSize = (text: string) => {
    const len = text?.length || 0;
    const baseSize = 26; // Tamaño ideal base en px para los h3 de este feed
    
    if (len <= 16) return `${baseSize}px`;
    
    const reductionFactor = 0.28;
    const scaledSize = baseSize - (len - 16) * reductionFactor;
    const minSize = 14; // Suelo mínimo de lectura legible
    
    return `${Math.max(minSize, scaledSize)}px`;
  };

  // Duplicamos los items para que el carrusel infinito nunca se corte
  const marqueeItems = useMemo(() => {
    if (posts.length === 0) return [];
    return [...posts, ...posts, ...posts];
  }, [posts]);

  if (!isMounted || posts.length === 0) return null;

  return (
    <section className="py-16 bg-pangea-neutral border-b border-white/5 relative flex justify-center overflow-hidden w-full mt-4 transition-colors duration-500">
      
      {/* GLOW DE FONDO DE SECCIÓN MAGENTA */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: `radial-gradient(circle at 50% 0%, var(--color-brand-magenta)15 0%, transparent 70%)` }} 
      />

      <div className="flex flex-col w-full max-w-[1600px] justify-center items-start px-4 sm:px-6 relative z-10">
        
        {/* ─── HEADER DE LA SECCIÓN CONSERVANDO IDENTIDAD CROMÁTICA ─── */}
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 w-full">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-brand-magenta shadow-[0_0_15px_var(--color-brand-magenta)]" />
              <span className="font-mono text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic text-brand-magenta">
                Priority_Feed // System
              </span>
            </div>
            <h2 className="font-headline text-pangea-text text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl transition-all duration-500">
              TOP <span className="text-transparent" style={{ WebkitTextStroke: `2px var(--color-brand-magenta)` }}>STORIES</span>
            </h2>
          </div>
          
          <div className="max-w-xs text-left lg:text-right hidden md:block">
            <p className="text-white/60 text-xs md:text-sm italic mb-2 leading-relaxed drop-shadow-md">
              "Transmisión directa de alto voltaje. Notas prioritarias escaneadas en la red."
            </p>
          </div>
        </div>

        {/* ─── CARRUSEL INFINITO AUTOMÁTICO ─── */}
        <div className="flex relative w-full overflow-hidden pb-10 rounded-[1.8rem]">
          <motion.div 
            className="flex gap-6 md:gap-8"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {marqueeItems.map((post, i) => {
              const isCardHovered = hoveredIndex === i;

              return (
                <a 
                  href={`/news/${post.slug}`}
                  key={`${post.slug}-${i}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative w-[320px] md:w-[400px] h-[450px] bg-pangea-card/40 backdrop-blur-xl border rounded-[1.8rem] overflow-hidden flex flex-col shrink-0 transition-all duration-500 z-30 shadow-2xl"
                  style={{
                    borderColor: isCardHovered ? 'var(--color-brand-magenta)' : 'rgba(255, 255, 255, 0.05)',
                    boxShadow: isCardHovered ? `0 0 25px rgba(255, 0, 255, 0.25), inset 0 0 10px rgba(255, 0, 255, 0.15)` : 'none'
                  }}
                >
                  {/* FOTO DE FONDO RESPONSIVA */}
                  {post.heroImage && (
                    <img 
                      src={post.heroImage} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-50 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-700 z-0" 
                    />
                  )}
                  
                  {/* Máscara gradiente lineal de Tailwind v4 */}
                  <div className="absolute h-[55%] bottom-0 inset-x-0 bg-linear-to-t from-[#020202] via-[#020202]/95 to-transparent z-10 transition-all duration-500" />

                  <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between w-full">
                    
                    {/* Etiqueta Superior Modificada */}
                    <div className="flex items-center justify-between w-full gap-4">
                      <div 
                        className="px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] border-l-4 border-brand-magenta bg-brand-magenta/10 text-brand-magenta shrink-0"
                      >
                        <span className="flex items-center gap-2"><Zap size={10} /> FEATURED</span>
                      </div>
                      
                      {/* 🛡️ BADGE PREMIUM OPTIMIZADO: Sin barras y con alto contraste */}
                      <span 
                        className="font-mono text-[8px] md:text-[9px] font-black px-2 py-1 rounded-sm border bg-black/60 text-white/80 uppercase tracking-widest backdrop-blur-md transition-all duration-300 group-hover:text-white truncate"
                        style={{ 
                          borderColor: isCardHovered ? 'rgba(255, 0, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                          boxShadow: isCardHovered ? '0 0 10px rgba(255, 0, 255, 0.1)' : 'none'
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Contenido Inferior Flexible */}
                    <div className="flex flex-col justify-end w-full">
                      <h3 
                        className="font-headline text-white font-black uppercase italic leading-[0.95] tracking-tighter transition-all duration-300 break-words hyphens-auto mb-2"
                        style={{ 
                          fontSize: calculateFontSize(post.title),
                          textShadow: isCardHovered ? '0 0 20px rgba(255,0,255,0.6)' : '0 2px 10px rgba(0,0,0,0.5)'
                        }}
                      >
                        {post.title}
                      </h3>

                      {/* Despliegue animado al Hover protegido */}
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                        <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5 w-full">
                            <p className="text-white/70 text-[11px] md:text-xs font-body italic leading-relaxed line-clamp-3 break-words">
                              "{post.description}"
                            </p>

                            <div className="flex justify-between items-center group/btn mt-2 w-full">
                              <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-brand-magenta">Leer Reporte</span>
                              <ArrowRight size={14} className="text-brand-magenta lg:group-hover/btn:translate-x-2 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Barra de progreso de neón inferior */}
                  <div 
                    className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 lg:group-hover:w-full bg-brand-magenta z-30" 
                    style={{ boxShadow: isCardHovered ? '0 0 15px var(--color-brand-magenta)' : 'none' }}
                  />
                </a>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}