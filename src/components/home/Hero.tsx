import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroActions from './HeroActions';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(headlineRef.current, { 
      y: 50, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'power4.out' 
    })
    .from(ctaRef.current, { 
      y: 30, 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power2.out' 
    }, '-=0.4');
  }, { scope: container });

  return (
    <div 
      ref={container} 
      className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
    >
      
      {/* Glow Central - Refuerza la profundidad del meteorito */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_0%,rgba(0,0,0,0.8)_100%)]" />

      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center mt-auto pb-24 md:my-auto md:pb-0">
        
        {/* TEXTO 1: Headline con el degradado de marca */}
        <h1 
          ref={headlineRef} 
          className="font-['Inter'] font-[900] text-5xl sm:text-6xl md:text-7xl lg:text-[105px] leading-[0.9] md:leading-[1.1] uppercase tracking-tighter text-white mb-6 md:mb-8 drop-shadow-2xl pointer-events-auto"
        >
          LA ESENCIA DE <br />
          <span className="bg-gradient-to-r from-pangea-primary via-pangea-secondary to-pangea-tertiary text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            LA CULTURA GAMER
          </span>
        </h1>
        
        {/* TEXTO 2: Descripción con mejor legibilidad */}
        <p className="text-white/80 font-normal text-xs md:text-lg max-w-[280px] sm:max-w-sm md:max-w-3xl leading-relaxed mb-8 md:mb-12 drop-shadow-md pointer-events-auto">
          Revelando la próxima generación de entretenimiento interactivo. <br className="hidden md:block" /> 
          Análisis profundos y la absoluta vanguardia tecnológica.
        </p>

        {/* ACCIONES TÁCTICAS: Lanzamientos y Deep Dives */}
        <div 
          ref={ctaRef} 
          className="pointer-events-auto relative z-50 w-full flex justify-center"
        >
          <HeroActions />
        </div>
        
      </div>
    </div>
  );
}