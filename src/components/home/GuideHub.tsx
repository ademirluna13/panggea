import { useRef, useState, useEffect } from 'react';
import { Filter, SignalHigh } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader'; // 🔥 Componente Maestro
import PangeaCard from '../ui/PanggeaCard';       // 🔥 Componente Maestro

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLOR = "#94A3B8"; // Color Gris Plata Táctico de esta sección

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

    const cards = gsap.utils.toArray<HTMLElement>('.trending-card'); // PangeaCard usa trending-card como identificador base
    
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

  if (!guides.length) return null;

  return (
    <section ref={container} className="relative py-24 bg-pangea-neutral overflow-hidden border-y border-white/5 flex justify-center transition-colors duration-500">
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        
        <div className="max-w-[1200px] w-full">
          
          {/* 🔥 1. HEADER ESTANDARIZADO */}
          <SectionHeader 
            tag="Pangea_Files // Strategy"
            titleSolid="GUIDES &"
            titleOutline="TRICKS"
            description="Protocolos de ejecución, secretos de nivel legendario y tácticas de campo. Todo el saber para dominar el sistema."
            ctaText="REVISA LAS GUÍAS"
            ctaHref="/guide"
            accentColor={ACCENT_COLOR}
          />

          {/* 🔥 2. FILTROS ESTANDARIZADOS (Iguales a los de Patch Log) */}
          <div className="flex flex-wrap gap-3 items-center mb-14">
            <div className="flex items-center gap-2 mr-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
              <Filter size={14} />
              <span>Archive_Filter:</span>
            </div>
            
            <button 
              onClick={() => setActiveFilter('TODOS')}
              className={`font-headline text-xs md:text-sm font-black tracking-widest uppercase px-6 py-2.5 border rounded-[0.8rem] transition-all duration-300 ${activeFilter === 'TODOS' ? 'border-[#94A3B8] bg-[#94A3B8]/10 text-[#94A3B8] shadow-[0_0_15px_rgba(148,163,184,0.3)]' : 'border-white/10 text-white/50 lg:hover:text-white bg-pangea-card/50 backdrop-blur-sm'}`}
            >
              TODOS
            </button>

            {types.map((type: string) => (
              <button 
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`font-headline text-xs md:text-sm font-black tracking-widest uppercase px-6 py-2.5 border rounded-[0.8rem] transition-all duration-300 ${activeFilter === type ? 'border-[#94A3B8] bg-[#94A3B8]/10 text-[#94A3B8] shadow-[0_0_15px_rgba(148,163,184,0.3)]' : 'border-white/10 text-white/50 lg:hover:text-white bg-pangea-card/50 backdrop-blur-sm'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* 🔥 3. GRID BENTO CON PANGEACARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            {displayGuides.map((guide, index: number) => {
              const isBig = index === 0;
              const sizeClass = isBig ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1';
              
              return (
                <div key={guide.slug} className={sizeClass}>
                  <PangeaCard
                    title={guide.title}
                    slug={guide.slug}
                    description={guide.description}
                    category={guide.guideType} // Pasamos el tipo de guía como tag principal
                    heroImage={guide.heroImage}
                    publishedAt={guide.publishedAt}
                    baseHref="/guide"
                    platform={guide.gameName} // Usamos la platform para mostrar el nombre del juego
                    accentColor={ACCENT_COLOR}
                    isHero={isBig}
                    // 🔥 LA MAGIA: Sobrescribimos el footer para mostrar la Dificultad
                    customFooterText={`LEVEL: ${guide.difficulty}`}
                    CustomFooterIcon={SignalHigh}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}