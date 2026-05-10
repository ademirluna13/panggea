import { useRef } from 'react';
import { Clock, User, Share2, ArrowLeft, ChevronRight, Monitor } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. INTERFACE ACTUALIZADA: Ahora acepta category y platform
interface ArticleProps {
  title: string;
  date: string; // Cambiado a string porque ya viene formateado de Astro
  heroImage?: any;
  category: string; // ✨ Dinámico
  platform?: string; // ✨ Dinámico
  specs?: {
    platform?: string;
    version?: string;
    status?: string;
  };
  children: React.ReactNode;
}

export default function ArticleTemplate({ 
  title, 
  date, 
  heroImage, 
  category, 
  platform, 
  specs, 
  children 
}: ArticleProps) {
  const container = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  const imageUrl = typeof heroImage === 'object' ? heroImage.src : heroImage;

  // Priorizamos la plataforma de la raíz o la de los specs
  const currentPlatform = platform || specs?.platform || "NOT DEFINED";

  const displaySpecs = [
    { label: "PLATAFORMA", value: currentPlatform },
    { label: "VERSIÓN", value: specs?.version || "PANGEA v2.1" },
    { label: "ESTADO", value: specs?.status || "PROTOCOLO ACTIVO" }
  ];

  useGSAP(() => {
    // Barra de progreso de lectura
    gsap.to(progressBar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    const tl = gsap.timeline();
    tl.from(".article-header", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out"
    })
    .from(".article-image", {
      scale: 1.1,
      filter: "blur(15px)",
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    }, "-=0.8");

  }, { scope: container });

  return (
    <article ref={container} className="bg-black min-h-screen font-body text-zinc-300">
      
      {/* Progreso */}
      <div 
        className="fixed top-0 left-0 w-full h-1 z-[100] origin-left bg-pangea-primary shadow-[0_0_15px_#FF4500]" 
        ref={progressBar} 
        style={{ transform: 'scaleX(0)' }}
      />

      <header className="relative w-full h-[85vh] flex items-end pb-20 px-6 overflow-hidden">
        <div className="article-image absolute inset-0 z-0">
          <img 
            src={imageUrl || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-[0.25]" 
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="article-header max-w-[1440px] mx-auto w-full relative z-10">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* CATEGORÍA DINÁMICA */}
            <span className="bg-pangea-primary text-white text-[10px] font-black px-4 py-1.5 tracking-[0.3em] rounded-sm uppercase shadow-[0_0_20px_rgba(255,69,0,0.3)]">
              {category}
            </span>
            
            {/* PLATAFORMA DINÁMICA */}
            {platform && (
               <span className="bg-white/5 border border-white/10 text-white/70 text-[10px] font-black px-4 py-1.5 tracking-[0.3em] rounded-sm uppercase flex items-center gap-2">
                 <Monitor size={12} className="text-pangea-primary" />
                 {platform}
               </span>
            )}

            <span className="text-zinc-500 font-label text-[10px] tracking-widest uppercase ml-2">
              {date}
            </span>
          </div>

          <h1 className="font-headline text-6xl md:text-[120px] font-black italic text-white leading-[0.8] tracking-tighter uppercase max-w-6xl mb-12">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-12 border-t border-white/10 pt-10">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-pangea-primary group-hover:border-pangea-primary/50 transition-colors">
                <User size={24} />
              </div>
              <div>
                <p className="text-white font-label text-[11px] font-black tracking-widest uppercase">MARLBORO</p>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tight">Lead Content Strategist</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-500 font-label text-[11px] font-bold tracking-widest">
              <Clock size={16} className="text-pangea-primary" />
              <span>12 MIN LECTURA TÉCNICA</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Contenido Principal */}
        <div className="lg:col-span-8 min-w-0">
          <div className="prose prose-invert prose-zinc max-w-none break-words text-zinc-400 text-xl leading-[1.8]
          prose-headings:font-headline prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
          prose-h2:text-4xl prose-h2:mb-8 prose-h2:mt-16
          prose-strong:text-pangea-primary prose-strong:font-black
          prose-p:mb-8">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-sm backdrop-blur-sm">
              <h4 className="font-label text-pangea-primary text-[11px] font-black tracking-[0.4em] uppercase mb-10 flex items-center gap-3">
                <div className="w-4 h-px bg-pangea-primary"></div> SPECS TÉCNICOS
              </h4>
              
              <div className="space-y-6">
                {displaySpecs.map((spec, i) => (
                  <div key={i} className="group">
                    <p className="text-zinc-600 font-label text-[9px] font-black uppercase tracking-widest mb-1 group-hover:text-pangea-primary transition-colors">{spec.label}</p>
                    <p className="text-white font-label text-xs font-black uppercase tracking-[0.1em] border-b border-white/5 pb-3">{spec.value}</p>
                  </div>
                ))}
              </div>

              <button className="mt-12 w-full p-6 border border-white/5 rounded-sm flex items-center justify-between group hover:bg-pangea-primary transition-all duration-500">
                <span className="font-label text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-white text-zinc-400">Compartir Datos</span>
                <Share2 size={18} className="text-pangea-primary group-hover:text-white group-hover:rotate-12 transition-all" />
              </button>
            </div>

            <div className="p-8 border-l-2 border-pangea-primary bg-zinc-900/20">
               <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase mb-2">Protocolo de Seguridad</p>
               <p className="text-xs text-zinc-400 leading-relaxed italic">"Toda la información técnica presentada ha sido verificada bajo los estándares de BitXolo Lab."</p>
            </div>
          </div>
        </aside>
      </main>

      <div className="max-w-[1440px] mx-auto px-6 pb-32">
        <a href="/blog" className="inline-flex items-center gap-4 font-label text-[11px] font-black text-white hover:text-pangea-primary tracking-[0.4em] uppercase transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-3 transition-transform duration-500" /> 
          VOLVER AL CENTRO DE DATOS
        </a>
      </div>

    </article>
  );
}