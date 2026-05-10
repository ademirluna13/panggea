import { useRef } from 'react';
import { ArrowRight, Clock, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SanityPost {
  title: string;
  slug: string;
  heroImage: string;
  publishedAt: string;
  category: string;
  description: string;
  platform: string;
}

export default function TrendingNow({ posts = [] }: { posts?: SanityPost[] }) {
  const container = useRef<HTMLDivElement>(null);

  // Forzamos a que solo use las primeras 7 para mantener el diseño "Machingun"
  const trendingPosts = posts.slice(0, 7);

  useGSAP(() => {
    if (!trendingPosts.length) return;

    const cards = gsap.utils.toArray<HTMLElement>('.trending-card');
    
    gsap.set(cards, { 
      clipPath: 'inset(100% 0% 0% 0%)', 
      y: 50, 
      opacity: 0 
    });

    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.to(elements, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => {
            gsap.set(elements, { clearProps: "clipPath,y" });
          }
        });
      },
    });

    cards.forEach(card => {
      const img = card.querySelector('.card-bg');
      if (img) {
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

  }, { scope: container, dependencies: [posts] });

  if (!trendingPosts.length) return null;

  return (
    <section ref={container} className="relative py-24 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center">
      
      {/* ─── ESTRUCTURA TRES COLUMNAS (LAYOUT ARSENAL) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        
        {/* ADS IZQUIERDA (Doble Stack) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 flex-col gap-6 h-fit">
          <div className="w-full h-[600px] bg-white/[0.02] border border-[#FF4500]/10 flex flex-col items-center justify-center relative group">
            <span className="font-mono text-[9px] text-[#FF4500]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS</span>
            <div className="absolute inset-0 border border-[#FF4500]/5 group-hover:border-[#FF4500]/30 transition-colors duration-500" />
          </div>
          <div className="w-full h-[600px] bg-white/[0.02] border border-[#FF4500]/10 flex items-center justify-center relative group">
            <span className="font-mono text-[9px] text-[#FF4500]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_BOT</span>
          </div>
        </aside>

        {/* ─── CONTENEDOR CENTRAL 1200PX ─── */}
        <div className="max-w-[1200px] w-full">
          
          {/* HEADER TITÁNICO ESTILO DEEP DIVES */}
          <header className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="flex items-center gap-3 mb-4 md:mb-6 text-[#FF4500]">
                <div className="w-8 md:w-12 h-1 bg-[#FF4500] shadow-[0_0_20px_#FF4500]"></div>
                <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic">Pangea_Core // Trending</span>
              </div>
              <h2 className="font-headline text-white text-6xl md:text-[8rem] lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                TRENDING <br className="hidden sm:block" />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF4500' }}>NOW</span>
              </h2>
            </div>
            
            <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
              <p className="text-white/60 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed">
                "Análisis de impacto inmediato. El pulso de la industria en tiempo real y sin filtros."
              </p>
              <a href="/blog" className="inline-flex items-center gap-3 md:gap-4 font-mono text-[#FF4500] hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group">
                Ver todo el archivo <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </header>

          {/* BENTO GRID 3 COLUMNAS - 7 CARDS TOTAL (Texto abajo) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[300px] md:auto-rows-[320px]">
            {trendingPosts.map((post, index) => {
              // Item 0 es 2x2, los demás 1x1
              const sizeClass = index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1';
              
              return (
                <a 
                  key={post.slug || index}
                  href={`/news/${post.slug}`}
                  className={`trending-card block relative overflow-hidden group border border-white/10 rounded-sm bg-[#050505] z-30 shadow-2xl hover:border-[#FF4500]/50 transition-colors duration-500 ${sizeClass}`}
                >
                  {/* IMAGEN FONDO PARALLAX */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div 
                      className="card-bg absolute inset-0 -top-[10%] -bottom-[10%] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000"
                      style={{ backgroundImage: `url(${post.heroImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                  </div>
                  
                  {/* TEXTO ABAJO */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="font-mono text-[8px] font-black px-2 py-1 rounded-sm border border-[#FF4500]/30 bg-[#FF4500]/10 text-[#FF4500] uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>

                    <h3 className={`font-headline text-white font-black uppercase italic tracking-tighter leading-[0.95] group-hover:text-[#FF4500] transition-colors mb-2
                      ${index === 0 ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-2xl'}
                    `}>
                      {post.title}
                    </h3>

                    <p className="text-white/60 text-[11px] md:text-xs font-body italic line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[#FF4500] font-mono text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center gap-2">
                        <Clock size={12} />
                        <span>{new Date(post.publishedAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</span>
                      </div>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#FF4500] shadow-[0_0_15px_#FF4500] transition-all duration-700" />
                </a>
              );
            })}
          </div>

        </div>

        {/* ADS DERECHA (Doble Stack) */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 flex-col gap-6 h-fit">
          <div className="w-full h-[600px] bg-white/[0.02] border border-[#FF4500]/10 flex flex-col items-center justify-center relative group">
            <span className="font-mono text-[9px] text-[#FF4500]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS</span>
            <div className="absolute inset-0 border border-[#FF4500]/5 group-hover:border-[#FF4500]/30 transition-colors duration-500" />
          </div>
          <div className="w-full h-[600px] bg-white/[0.02] border border-[#FF4500]/10 flex items-center justify-center relative group">
            <span className="font-mono text-[9px] text-[#FF4500]/20 uppercase [writing-mode:vertical-lr] tracking-[1em] select-none">GOOGLE_ADS_BOT</span>
          </div>
        </aside>

      </div>
    </section>
  );
}