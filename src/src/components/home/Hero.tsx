import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import SpaceHeroScene from './SpaceHeroScene';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(headlineRef.current, { y: 50, opacity: 0, duration: 0.8, ease: 'power4.out' })
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
  }, { scope: container });

  return (
    // 🔥 FIX 1: Quitamos los "justify" y "items-center" del contenedor padre para que no afecten al 3D
    <section ref={container} className="relative h-[100svh] w-full bg-black overflow-hidden flex flex-col">
      
      {/* 🔥 FIX 2: Contenedor ABSOLUTO ESTRICTO. Esto garantiza que el 3D ocupe toda la pantalla y no sea aplastado */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <SpaceHeroScene />
      </div>

      {/* Glow Central */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* 🔥 FIX 3: El contenedor del texto. 
          En celular (mt-auto y pb-24) se va hasta abajo. 
          En Desktop (md:my-auto md:pb-0) se centra perfectamente en la pantalla. 
      */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-auto pb-24 md:my-auto md:pb-0">
        
        {/* TEXTO 1: Headline */}
        <h1 ref={headlineRef} className="font-['Inter'] font-[900] text-5xl sm:text-6xl md:text-7xl lg:text-[105px] leading-[0.9] md:leading-[1.1] uppercase tracking-tighter text-white mb-6 md:mb-8 drop-shadow-2xl">
          LA ESENCIA DE <br />
          {/* DEGRADADO MAMALÓN CON TU PALETA */}
          <span className="bg-gradient-to-r from-pangea-primary via-pangea-secondary to-pangea-tertiary text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            LA CULTURA GAMER
          </span>
        </h1>
        
        {/* TEXTO 2: Descripción */}
        <p className="text-white/80 font-normal text-xs md:text-lg max-w-[280px] sm:max-w-sm md:max-w-3xl leading-relaxed mb-8 md:mb-12 drop-shadow-md">
          Revelando la próxima generación de entretenimiento interactivo. Análisis profundos y la absoluta vanguardia tecnológica.
        </p>

        {/* BOTONES */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Botón Primario */}
          <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-pangea-primary text-black h-14 px-8 md:px-10 rounded-sm font-label text-[10px] md:text-[11px] font-[900] tracking-widest uppercase cursor-pointer transition-all duration-500 hover:bg-pangea-secondary hover:shadow-pangea-neon hover:scale-[1.03] active:scale-95">
            ÚLTIMOS LANZAMIENTOS 
            <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          {/* Botón Secundario */}
          <button className="w-full sm:w-auto flex items-center justify-center border-2 border-pangea-primary/40 text-pangea-primary bg-black/40 backdrop-blur-md h-14 px-8 md:px-10 rounded-sm font-label text-[10px] md:text-[11px] font-[900] tracking-widest uppercase cursor-pointer transition-all duration-500 hover:border-pangea-primary hover:bg-pangea-primary/10 hover:shadow-[0_0_15px_rgba(255,69,0,0.2)] active:scale-95">
            CATEGORÍAS
          </button>
        </div>
      </div>

      {/* Gradiente de cierre inferior */}
      <div className="absolute bottom-0 w-full h-40 md:h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}