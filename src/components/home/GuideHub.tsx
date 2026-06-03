import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Filter, ChevronRight, SignalHigh, Gamepad2, Target } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const SECTION_COLOR = "#94A3B8"; // GRIS PLATEADO

interface SanityGuide {
  title: string;
  slug: string;
  heroImage: string;
  publishedAt: string;
  gameName: string;
  guideType: string;
  difficulty: string;
  description: string;
}

export default function GuideHub({ guides = [], types = [] }: { guides?: SanityGuide[], types?: string[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredGuides = activeFilter === 'TODOS' 
    ? guides 
    : guides.filter(g => g.guideType === activeFilter);

  const displayGuides = filteredGuides.slice(0, 7);

  useGSAP(() => {
    if (!displayGuides.length) return;

    // 🚀 FIX TS: Casting a HTMLElement para evitar error de 'style'
    const cards = gsap.utils.toArray<HTMLElement>('.guide-card');
    
    gsap.set(cards, { clipPath: 'inset(100% 0% 0% 0%)', y: 50, opacity: 0 });

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
          onComplete: () => { gsap.set(elements as HTMLElement[], { clearProps: "clipPath,y" }); }
        });
      },
    });
  }, { scope: container, dependencies: [displayGuides, activeFilter] });

  // 🧠 FUNCIÓN HELPER PARA REESCALAR EL TITULO POR SU LONGITUD
  const getFontSize = (title: string, isBig: boolean) => {
    const length = title.length;
    if (isBig) {
      if (length > 50) return 'text-xl sm:text-3xl md:text-4xl';
      if (length > 30) return 'text-2xl sm:text-4xl md:text-5xl';
      return 'text-3xl md:text-6xl';
    } else {
      if (length > 45) return 'text-base md:text-lg';
      if (length > 25) return 'text-lg md:text-xl';
      return 'text-xl md:text-2xl';
    }
  };

  if (!guides.length) return null;

  return (
    <section ref={container} className="relative py-24 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center">
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        
        <div className="max-w-[1200px] w-full">
          
          <header className="mb-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-12">
              <div className="flex flex-col items-start w-full lg:w-auto">
                <div className="flex items-center gap-3 mb-6 text-[#94A3B8]">
                  <div className="w-12 h-1 bg-[#94A3B8] shadow-[0_0_20px_#94A3B8]"></div>
                  <span className="font-mono text-[11px] font-black tracking-[0.5em] uppercase italic">Pangea_Files // Strategy</span>
                </div>
                <h2 className="font-headline text-white text-6xl md:text-[8rem] lg:text-[110px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl">
                  GUIDES & <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: `2px ${SECTION_COLOR}` }}>TRICKS</span>
                </h2>
              </div>

              <div className="flex flex-col items-end max-w-sm text-right">
                <p className="text-white/80 text-xs md:text-sm italic mb-4 md:mb-8 leading-relaxed drop-shadow-md">
                  "Protocolos de ejecución, secretos de nivel legendario y tácticas de campo. Todo el saber para dominar el sistema."
                </p>
                <a href="/guide" className="inline-flex items-center gap-3 md:gap-4 font-mono text-[#94A3B8] lg:hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md">
                  REVISA LAS GUÍAS <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 mr-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                <Filter size={14} />
                <span>Archive_Filter:</span>
              </div>
              <button 
                onClick={() => setActiveFilter('TODOS')}
                className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === 'TODOS' ? 'bg-[#94A3B8] text-black border-[#94A3B8]' : 'bg-white/5 text-white/40 border-white/10'}`}
              >
                TODOS
              </button>
              {types.map((type: string) => (
                <button 
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === type ? 'bg-[#94A3B8] text-black border-[#94A3B8]' : 'bg-white/5 text-white/40 border-white/10'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[320px]">
            {displayGuides.map((guide, index: number) => {
              const isBig = index === 0;
              const sizeClass = isBig ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1';
              
              return (
                <a key={guide.slug} href={`/guide/${guide.slug}`} className={`guide-card block relative overflow-hidden group border border-white/10 rounded-sm bg-[#050505] transition-all duration-500 ${sizeClass}`}>
                  <div className="absolute inset-0 z-0 bg-[#020202]">
                    <div className="absolute inset-0 bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000" style={{ backgroundImage: `url(${guide.heroImage})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#020202]/90 to-transparent z-10" />
                  </div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                    {/* 🚀 NUEVOS DATOS MAPEADOS: CATEGORÍA Y JUEGO */}
                    <div className="flex flex-wrap gap-2">
                      <span className="font-mono text-[8px] font-black px-2 py-1 bg-white/10 text-white/70 border border-white/10 uppercase tracking-widest backdrop-blur-sm">
                        {guide.guideType}
                      </span>
                      <span className="font-mono text-[8px] font-black px-2 py-1 bg-[#94A3B8]/20 text-[#94A3B8] border border-[#94A3B8]/30 uppercase tracking-widest backdrop-blur-sm">
                        {guide.gameName}
                      </span>
                    </div>

                    <div className="flex flex-col justify-end">
                      {/* 🔥 APLICADO EL REESCALADO DINÁMICO AQUÍ 🔥 */}
                      <h3 className={`font-headline text-white font-black uppercase italic tracking-tighter leading-[0.95] mb-2 group-hover:text-[#94A3B8] transition-colors ${getFontSize(guide.title, isBig)}`}>
                        {guide.title}
                      </h3>

                      {/* 🚀 DESCRIPCIÓN EN HOVER */}
                      <div className="grid transition-all duration-500 ease-in-out grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white/60 text-[11px] md:text-xs italic line-clamp-2 leading-relaxed mb-4 pt-1">
                            "{guide.description}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[#94A3B8] font-mono text-[9px] font-black uppercase mt-1">
                        <div className="flex items-center gap-2">
                           <SignalHigh size={12} className="text-[#94A3B8]" />
                           <span>LEVEL: {guide.difficulty}</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}