import { ArrowRight, Terminal } from 'lucide-react';

export default function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 relative z-[100] pointer-events-auto">
      
      {/* BOTÓN 1: LANZAMIENTOS (El clásico naranja) */}
      <a 
        href="#trending" 
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#FF4500] hover:bg-white text-black px-10 py-4 font-headline text-[13px] font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,69,0,0.3)] group"
      >
        Últimos Lanzamientos 
        <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
      </a>

      {/* 🔥 BOTÓN 2: DEEP DIVES (El nuevo amarillo neón) 🔥 */}
      <a 
        href="#deep-dives" 
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#FFD700] hover:bg-white text-black px-10 py-4 font-headline text-[13px] font-black tracking-widest uppercase transition-all duration-300 group shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)]"
      >
        {/* Usamos el ícono Terminal para darle el toque técnico */}
        <Terminal size={18} className="group-hover:animate-pulse" />
        Deep Dives
      </a>

    </div>
  );
}