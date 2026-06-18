import { useRef, useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader'; // 🔥 ARQUITECTURA LIMPIA
import PangeaCard from '../ui/PanggeaCard';       // 🔥 ARQUITECTURA LIMPIA

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
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <section ref={container} className="bg-pangea-neutral font-body w-full overflow-hidden pt-16 md:pt-24 pb-16 md:pb-20 transition-colors duration-500">
      
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-6 lg:gap-12 px-4 sm:px-6 mx-auto relative z-10">
        
        {/* ─── CONTENIDO CENTRAL ─── */}
        <div className="max-w-[1200px] w-full flex flex-col gap-8 md:gap-10">

          {/* --- CACHO 1: ZONA DE INMERSIÓN CONTENIDA --- */}
          <div className="immersion-zone relative w-full min-h-[500px] md:min-h-[600px] rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-pangea-card/20">
            
            {/* 🌌 CAPA DE FONDO */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {bgToUse && (
                <div 
                  className="immersion-bg-layer absolute -top-[10%] left-0 w-full h-[120%] bg-cover bg-center blur-[2px] opacity-100 md:opacity-75"
                  style={{ backgroundImage: `url(${bgToUse})` }}
                />
              )}
              <div className="absolute inset-0 bg-transparent md:bg-black/20" />
              <div className="absolute inset-0 bg-pangea-mask z-10 transition-all duration-500" />
            </div>

            {/* CONTENIDO INTERNO */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full min-h-[500px] md:min-h-[600px]">
              
              {/* 🔥 HEADER EDITORIAL ESTANDARIZADO */}
              <div className="dd-reveal w-full">
                <SectionHeader 
                  tag="SISTEMA_CRÍTICO"
                  titleSolid="DEEP"
                  titleOutline="DIVES"
                  description="Análisis de largo aliento. Sin prisa, sin clickbait. Solo las ideas que merecen tu tiempo."
                  ctaText="EXPLORAR LORE"
                  ctaHref="/lore"
                  accentColor="var(--color-brand-gold)"
                />
              </div>

              {/* 🏆 NOTA LEGENDARIA ESTANDARIZADA AL NEÓN REAL */}
              <a 
                href={`/lore/${legendaryPost.slug}`} 
                className="dd-reveal group relative bg-pangea-card/40 backdrop-blur-xl border border-transparent rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] lg:hover:border-[#FFD700] lg:hover:shadow-[0_0_25px_rgba(255,215,0,0.6),inset_0_0_10px_rgba(255,215,0,0.3)] transition-all duration-500 w-full mt-auto"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full">
                    <div className="relative flex-shrink-0">
                      <span className="bg-brand-gold text-black text-[9px] md:text-[10px] font-black px-4 md:px-6 py-2 md:py-3 tracking-[0.4em] rounded-md relative z-10 shadow-gold-glow">ULTRA READ</span>
                      <div className="absolute inset-0 bg-brand-gold blur-xl opacity-20 animate-pulse" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                        <span className="text-brand-gold font-label text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-brand-gold/10 px-2 md:px-3 py-1 md:py-1.5 rounded border border-brand-gold/30">
                          {legendaryPost.category || 'ENTRETENIMIENTO'}
                        </span>
                        {legendaryPost.platform && (
                          <span className="flex items-center gap-1.5 text-white/80 font-mono text-[8px] md:text-[9px] font-black tracking-widest uppercase bg-black/50 border border-white/10 px-2 md:px-3 py-1 md:py-1.5 rounded">
                            <Monitor size={10} className="md:w-3 md:h-3" /> {legendaryPost.platform}
                          </span>
                        )}
                      </div>

                      <h3 className="font-headline text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] transition-all duration-300 mb-2 md:mb-3 italic drop-shadow-lg break-words lg:group-hover:[text-shadow:0_0_20px_#FFD700,0_0_40px_#FFD700]">
                        {legendaryPost.title}
                      </h3>
                      
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white/70 text-xs md:text-sm line-clamp-2 max-w-2xl mb-4 drop-shadow-md">
                            "{legendaryPost.description || 'Accede al archivo confidencial para leer el análisis completo y detallado.'}"
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-brand-gold font-label text-[9px] md:text-[10px] font-black tracking-widest uppercase">
                          <Clock size={12} /> {legendaryPost.readTime || '25 MIN'}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:flex relative w-16 h-16 rounded-full border border-white/20 items-center justify-center text-white lg:group-hover:border-[#FFD700] lg:group-hover:text-[#FFD700] lg:group-hover:shadow-[0_0_20px_#FFD700] transition-all duration-700 flex-shrink-0 bg-pangea-neutral/20 backdrop-blur-md">
                      <BookOpen size={24} />
                    </div>
                 </div>
              </a>
            </div>
          </div>

          {/* --- CACHO 2: GRID SECUNDARIO ESTANDARIZADO --- */}
          {/* 🔥 SE LE AGREGÓ LA ALTURA EN AUTO-ROWS PARA QUE NO SE VEAN CHAPARRAS 🔥 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[380px] md:auto-rows-[450px]">
            {gridPosts.map((article, i) => (
              <PangeaCard
                key={article.slug}
                title={article.title}
                slug={article.slug}
                description={article.description}
                category={article.category}
                heroImage={article.heroImage}
                publishedAt={article.publishedAt}
                baseHref="/lore"
                readTime={article.readTime}
                platform={article.platform} // 🔥 SE PASA LA NUEVA PROP
                accentColor="var(--color-brand-gold)" // Corona de oro
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}