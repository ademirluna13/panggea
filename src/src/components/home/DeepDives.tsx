import { useRef, useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SanityPost {
  title: string;
  slug: string;
  heroImage: string;
  manualBg?: string; 
  description: string;
  publishedAt: string;
  category: string;
  platform?: string; 
  readTime: string;
  isLegendary?: boolean;
}

export default function DeepDives({ posts = [] }: { posts?: SanityPost[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const legendaryPost = posts.find(p => p.isLegendary === true) || posts[0];
  const gridPosts = posts.filter(p => p.slug !== legendaryPost?.slug).slice(0, 3);
  
  const bgToUse = legendaryPost?.manualBg || legendaryPost?.heroImage;

  useEffect(() => {
    if (posts.length > 0) {
      setIsReady(true);
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  }, [posts]);

  useGSAP(() => {
    if (!isReady || !legendaryPost) return;

    gsap.to(".immersion-bg-layer", {
      scrollTrigger: {
        trigger: ".immersion-zone",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      yPercent: 15,
      ease: "none"
    });

    gsap.fromTo(".dd-reveal", 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: ".immersion-zone", start: "top 85%" },
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
      }
    );
  }, { scope: container, dependencies: [isReady, legendaryPost] });

  if (!legendaryPost) return null;

  return (
    <section ref={container} className="bg-black font-body w-full overflow-hidden pt-16 md:pt-24 pb-16 md:pb-20">
      
      {/* --- CACHO 1: ZONA DE INMERSIÓN CONTENIDA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-6 md:mb-8">
        <div className="immersion-zone relative w-full min-h-[500px] md:min-h-[600px] rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          
          {/* 🌌 CAPA DE FONDO */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {bgToUse && (
              <div 
                className="immersion-bg-layer absolute -top-[10%] left-0 w-full h-[120%] bg-cover bg-center blur-[2px] opacity-100 md:opacity-75"
                style={{ backgroundImage: `url(${bgToUse})` }}
              />
            )}
            {/* 🔥 FIX: Quitamos la capa oscura extra en móvil (bg-transparent) */}
            <div className="absolute inset-0 bg-transparent md:bg-black/20" />
            <div className="absolute inset-x-0 bottom-0 h-3/4 md:h-2/3 bg-gradient-to-t from-black via-black/40 md:via-black/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/20 md:from-black/60 to-transparent" />
          </div>

          {/* CONTENIDO INTERNO */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full min-h-[500px] md:min-h-[600px]">
            
            {/* HEADER EDITORIAL */}
            <div className="dd-reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="flex flex-col items-start w-full lg:w-auto">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-12 h-1 bg-pangea-tertiary shadow-[0_0_20px_#FFD700]"></div>
                  <span className="font-label text-pangea-tertiary text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic drop-shadow-md">SISTEMA_CRÍTICO</span>
                </div>
                <h2 className="font-headline text-white text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                  DEEP <br className="hidden sm:block" />
                  <span className="text-transparent break-words sm:inline-block mt-2 sm:mt-0" style={{ WebkitTextStroke: '2px var(--color-pangea-tertiary)' }}> DIVES</span>
                </h2>
              </div>
              <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
                <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed drop-shadow-md">
                  "Análisis de largo aliento. Sin prisa, sin clickbait. Solo las ideas que merecen tu tiempo."
                </p>
                <a href="/lore" className="inline-flex items-center gap-3 md:gap-4 font-label text-pangea-tertiary hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md">
                  EXPLORAR LORE <ArrowRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            {/* 🏆 NOTA LEGENDARIA */}
            <a 
              href={`/news/${legendaryPost.slug}`} 
              className="dd-reveal group relative bg-black/40 md:bg-white/[0.02] backdrop-blur-lg md:backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-pangea-tertiary/50 transition-all duration-500 w-full mt-auto"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-pangea-tertiary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full">
                  <div className="relative flex-shrink-0">
                    <span className="bg-pangea-tertiary text-black text-[9px] md:text-[10px] font-black px-4 md:px-6 py-2 md:py-3 tracking-[0.4em] rounded-md relative z-10 shadow-[0_0_20px_#FFD700]">ULTRA READ</span>
                    <div className="absolute inset-0 bg-pangea-tertiary blur-xl opacity-20 animate-pulse" />
                  </div>
                  
                  <div className="flex-grow">
                    {/* TAGS */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                      <span className="text-pangea-tertiary font-label text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-pangea-tertiary/10 px-2 md:px-3 py-1 md:py-1.5 rounded border border-pangea-tertiary/30">
                        {legendaryPost.category || 'ENTRETENIMIENTO'}
                      </span>
                      {legendaryPost.platform && (
                        <span className="flex items-center gap-1.5 text-white/60 font-label text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-white/5 border border-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded">
                          <Monitor size={10} className="md:w-3 md:h-3" /> {legendaryPost.platform}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] group-hover:text-pangea-tertiary transition-colors mb-2 md:mb-3 italic drop-shadow-lg">
                      {legendaryPost.title}
                    </h3>
                    
                    <p className="text-white/60 text-xs md:text-sm line-clamp-2 max-w-2xl mb-4 drop-shadow-md">
                      {legendaryPost.description || 'Accede al archivo confidencial para leer el análisis completo y detallado.'}
                    </p>

                    {/* TIEMPO DE LECTURA */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <span className="flex items-center gap-1.5 text-pangea-tertiary font-label text-[9px] md:text-[10px] font-black tracking-widest uppercase">
                        <Clock size={12} /> {legendaryPost.readTime || '25 MIN'}
                      </span>
                    </div>
                  </div>

                  {/* 🔥 FIX: ICONO LIBRITO (hidden en móvil, flex en Desktop) */}
                  <div className="hidden md:flex relative w-16 h-16 rounded-full border border-white/20 items-center justify-center text-white group-hover:bg-pangea-tertiary group-hover:text-black group-hover:border-pangea-tertiary transition-all duration-700 group-hover:shadow-[0_0_30px_#FFD700] flex-shrink-0 bg-black/20 backdrop-blur-md">
                    <BookOpen size={24} />
                  </div>
               </div>
            </a>
          </div>
        </div>
      </div>

      {/* --- CACHO 2: GRID SECUNDARIO --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {gridPosts.map((article, i) => (
            <a 
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group relative bg-[#050505] h-[380px] md:h-[500px] border border-white/5 rounded-2xl md:rounded-[1.5rem] overflow-hidden block transition-all duration-700 hover:border-pangea-tertiary/30 hover:-translate-y-2"
            >
              <div className="absolute inset-0 z-0">
                {/* 🔥 FIX: Más brillo y sin escala de grises en móvil (opacity-70 grayscale-0) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-10 grayscale-0 md:grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 scale-110 group-hover:scale-100"
                  style={{ backgroundImage: `url(${article.heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:via-black/50 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10">
                {/* LÍNEA DECORATIVA */}
                <div className="h-1 w-12 md:w-8 bg-pangea-tertiary mb-5 md:mb-6 shadow-[0_0_15px_#FFD700] md:group-hover:w-16 transition-all duration-500" />
                
                {/* TAGS */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-pangea-tertiary font-label text-[7px] md:text-[8px] font-black tracking-widest uppercase bg-black/40 md:bg-pangea-tertiary/10 px-2 py-1 rounded border border-pangea-tertiary/30 backdrop-blur-sm md:backdrop-blur-none">
                    {article.category || 'LORE'}
                  </span>
                  {article.platform && (
                    <span className="flex items-center gap-1.5 text-white/80 md:text-white/60 font-label text-[7px] md:text-[8px] font-black tracking-widest uppercase bg-black/40 md:bg-white/5 border border-white/10 px-2 py-1 rounded backdrop-blur-sm md:backdrop-blur-none">
                      <Monitor size={10} /> {article.platform}
                    </span>
                  )}
                </div>

                <h3 className="font-headline text-white text-2xl md:text-3xl font-black uppercase tracking-tighter md:group-hover:text-pangea-tertiary transition-colors italic leading-none drop-shadow-lg">
                  {article.title}
                </h3>

                {/* DESCRIPCIÓN */}
                <div className="overflow-hidden drop-shadow-md">
                  <p className="text-white/80 md:text-white/60 text-xs line-clamp-2 max-h-20 opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100 mt-3 md:mt-0 md:group-hover:mt-4 transition-all duration-500">
                    {article.description || 'Descubre los detalles de este análisis técnico en nuestra base de datos.'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-5 md:pt-6 mt-5 md:mt-6 text-white/50 md:text-white/40 font-label text-[9px] md:text-[10px] font-black tracking-widest md:group-hover:text-pangea-tertiary transition-colors drop-shadow-md">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="md:w-[14px] md:h-[14px]" /> {article.readTime || '25 MIN'}
                  </div>
                  <ArrowRight size={18} className="md:w-5 md:h-5 text-white/40 md:text-white/20 md:group-hover:text-pangea-tertiary transition-all" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      
    </section>
  );
}