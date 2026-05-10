import { useMemo } from 'react';
import { motion } from 'framer-motion';
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

const MAGENTA_NEON = "#FF007F";

export default function FeaturedCarousel({ posts = [] }: FeaturedCarouselProps) {
  // Duplicamos los items para que el carrusel infinito nunca se corte
  const marqueeItems = useMemo(() => {
    if (posts.length === 0) return [];
    return [...posts, ...posts, ...posts];
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-[#020202] border-b border-white/5 relative flex justify-center overflow-hidden w-full mt-4">
      
      {/* GLOW DE FONDO */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: `radial-gradient(circle at 50% 0%, ${MAGENTA_NEON}15 0%, transparent 70%)` }} 
      />

      <div className="flex flex-col w-full max-w-[1600px] justify-center items-start px-4 sm:px-6 relative z-10">
        
        {/* ─── HEADER DE LA SECCIÓN ─── */}
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 w-full">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 shadow-[0_0_20px_#FF007F]" style={{ backgroundColor: MAGENTA_NEON }} />
              <span className="font-mono text-[11px] font-black tracking-[0.5em] uppercase italic" style={{ color: MAGENTA_NEON }}>
                Priority_Feed // System
              </span>
            </div>
            <h2 className="font-headline text-white text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter leading-[0.8] uppercase italic">
              TOP <span className="text-transparent" style={{ WebkitTextStroke: `2px ${MAGENTA_NEON}` }}>STORIES</span>
            </h2>
          </div>
          
          <div className="max-w-xs text-left lg:text-right hidden md:block">
            <p className="text-white/60 text-xs italic mb-2 leading-relaxed">
              "Transmisión directa de alto voltaje. Notas prioritarias escaneadas en la red."
            </p>
          </div>
        </div>

        {/* ─── CARRUSEL INFINITO AUTOMÁTICO ─── */}
        <div className="flex relative w-full overflow-hidden pb-10">
          <motion.div 
            className="flex gap-6 md:gap-8"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {marqueeItems.map((post, i) => (
              <a 
                href={`/blog/${post.slug}`}
                key={`${post.slug}-${i}`}
                className="group relative w-[320px] md:w-[400px] h-[450px] bg-[#050505] border border-white/10 overflow-hidden flex flex-col shrink-0 transition-all duration-500 lg:hover:border-[#FF007F]/60"
              >
                {/* 🔥 FOTO ESTÁTICA Y RESPONSIVA 🔥 */}
                {post.heroImage && (
                  <img 
                    src={post.heroImage} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale-0 opacity-80 lg:grayscale lg:opacity-50 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-1000 z-0" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/95 via-[#020202]/50 to-transparent z-0 lg:group-hover:via-[#020202]/80 transition-all duration-500" />

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                  
                  {/* Etiqueta Superior */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] border-l-4"
                      style={{ color: MAGENTA_NEON, borderColor: MAGENTA_NEON, backgroundColor: `${MAGENTA_NEON}15` }}
                    >
                      <span className="flex items-center gap-2"><Zap size={10} /> FEATURED</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
                      // {post.category}
                    </span>
                  </div>

                  {/* Contenido Inferior */}
                  <div className="flex flex-col justify-end">
                    <h3 className="font-headline text-2xl md:text-3xl text-white font-black uppercase italic leading-[0.9] tracking-tighter lg:group-hover:text-[#FF007F] transition-colors break-words">
                      {post.title}
                    </h3>

                    {/* 🔥 MAGIA RESPONSIVA TAILWIND (Se expande al hover) 🔥 */}
                    <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                          <p className="text-white/70 text-[12px] italic leading-relaxed line-clamp-3 break-words">
                            "{post.description}"
                          </p>

                          <div className="flex justify-between items-center group/btn mt-2">
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: MAGENTA_NEON }}>Leer Reporte</span>
                            <ArrowRight size={16} className="lg:group-hover/btn:translate-x-2 transition-transform" style={{ color: MAGENTA_NEON }} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Borde Inferior Animado */}
                <div 
                  className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 shadow-[0_0_20px_#FF007F] w-0 lg:group-hover:w-full" 
                  style={{ backgroundColor: MAGENTA_NEON }} 
                />
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}