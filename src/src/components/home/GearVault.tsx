import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. DATA PREMIUM (Hardcodeada para el Vault)
const CATS = ['TODOS', 'RATONES', 'TECLADOS', 'GPU/CPU', 'MONITORES'];

const PRODUCTS = [
  { 
    id: 1, 
    cat: 'MONITORES', 
    brand: 'LG_ULTRA_GEAR', 
    name: 'OLED 27" 480Hz Edition', 
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3490?w=800', 
    specs: ['0.03ms GTG', '4K_UHD', 'HDR_1000'], 
    price: '$1,299', 
    featured: true,
    intel: "La respuesta más rápida del mercado. Negros perfectos calibrados por ingenieros de grado militar."
  },
  { id: 2, cat: 'RATONES', brand: 'LOGITECH', name: 'G PRO X SUPERLIGHT 2', img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600', specs: ['60G', '32K DPI', 'WIRELESS'], price: '$159' },
  { id: 3, cat: 'TECLADOS', brand: 'WOOTING', name: '60HE+ RAPID TRIGGER', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600', specs: ['ANALOG', '0.1MM', 'HOT-SWAP'], price: '$194' },
  { id: 4, cat: 'GPU/CPU', brand: 'NVIDIA', name: 'RTX 4090 FE 24GB', img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600', specs: ['DLSS 3', '24GB VRAM', '4K ULTRA'], price: '$1,599' },
];

export default function GearVault() {
  const [activeCat, setActiveCat] = useState('TODOS');
  const container = useRef<HTMLDivElement>(null);

  const filteredProducts = activeCat === 'TODOS' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <section ref={container} className="relative py-32 bg-[#020202] overflow-hidden border-y border-white/5 flex justify-center font-body">
      
      {/* ─── HUD GOLD GLIMMER ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(212,175,55,0.05)_0%,transparent_100%)] pointer-events-none" />

      {/* ─── ESTRUCTURA TRES COLUMNAS (ADS + CONTENT) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        
        {/* PUBLICIDAD IZQUIERDA */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#D4AF37]/10 flex flex-col items-center justify-center group">
          <span className="font-mono text-[9px] text-[#D4AF37]/30 uppercase [writing-mode:vertical-lr] tracking-[1em]">PREMIUM_PARTNER</span>
          <div className="absolute inset-0 border border-[#D4AF37]/5 group-hover:border-[#D4AF37]/30 transition-colors duration-500" />
        </aside>

        {/* ─── CONTENEDOR CENTRAL ─── */}
        <div className="max-w-[1200px] w-full">
          
          {/* HEADER (ALINEADO COMO EL PATCH LOG) */}
          <header className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="flex flex-col items-start w-full lg:w-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#D4AF37] to-white"></div>
                <span className="font-mono text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">
                  Pangea_Elite // V.2.6
                </span>
              </div>
              <h2 className="font-headline text-white text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.8] uppercase italic drop-shadow-2xl">
                THE <br className="hidden lg:block" />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #D4AF37' }}>VAULT</span>
              </h2>
            </div>
            
            <div className="max-w-md text-left lg:text-right flex flex-col lg:items-end">
              <p className="font-body text-white/80 text-sm md:text-base italic mb-6 leading-relaxed">
                "Hardware de largo aliento. Sin prisa, sin clickbait. <br className="hidden lg:block" />
                Solo las máquinas que merecen tu tiempo."
              </p>
              <a href="/gear" className="inline-flex items-center gap-4 font-mono text-[#D4AF37] hover:text-white text-[10px] md:text-xs font-black tracking-[0.4em] uppercase transition-all group">
                EXPLORAR INVENTARIO <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </header>

          {/* FILTROS TÁCTICOS */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2.5 font-mono text-[9px] font-black tracking-widest transition-all rounded-sm border 
                  ${activeCat === c  /* 🔥 FIX: CORREGIDO EL TYPO DE activeFilter a activeCat 🔥 */
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'border-white/10 text-white/30 hover:text-white hover:border-[#D4AF37]/40 backdrop-blur-sm'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* GRID DE CARDS CON RGB (PADRÓN BLADE) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative p-[1px] overflow-hidden rounded-sm transition-all duration-500 shadow-2xl flex flex-col ${p.featured ? 'md:col-span-3' : 'md:col-span-1'}`}
                >
                  
                  {/* 🌈 ANILLO RGB GIRATORIO (Activo en Hover) */}
                  <div className="absolute inset-[-300%] bg-[conic-gradient(from_0deg,#ff0044,#ff6600,#ffff00,#00ff88,#00ccff,#5500ff,#ff00cc,#ff0044)] animate-[spin_5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className={`relative z-10 bg-[#050505] flex h-full ${p.featured ? 'flex-col md:flex-row' : 'flex-col'}`}>
                    
                    {/* Visual - Blade Cut */}
                    <div className={`${p.featured ? 'w-full md:w-1/2 h-80 md:h-auto' : 'h-56'} relative overflow-hidden bg-black [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]`}>
                      <img src={p.img} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="font-mono text-[9px] text-[#D4AF37] font-black tracking-widest uppercase block mb-1">{p.brand}</span>
                            <h4 className={`${p.featured ? 'text-4xl md:text-5xl' : 'text-2xl'} font-headline text-white font-black italic uppercase tracking-tighter leading-none group-hover:text-[#D4AF37] transition-colors`}>
                              {p.name}
                            </h4>
                          </div>
                          <Zap size={18} className="text-[#D4AF37] fill-[#D4AF37]" />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {p.specs.map(s => (
                            <span key={s} className="font-mono text-[8px] text-white/30 uppercase tracking-widest border-b border-white/10 pb-1">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="font-headline text-3xl text-white font-black italic">{p.price}</span>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                          <ChevronRight size={24} className="group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

        {/* PUBLICIDAD DERECHA */}
        <aside className="hidden 2xl:flex w-[160px] sticky top-28 h-[600px] bg-white/[0.02] border border-[#D4AF37]/10 flex flex-col items-center justify-center group">
          <span className="font-mono text-[9px] text-[#D4AF37]/30 uppercase [writing-mode:vertical-lr] tracking-[1em]">PREMIUM_PARTNER</span>
          <div className="absolute inset-0 border border-[#D4AF37]/5 group-hover:border-[#D4AF37]/30 transition-colors duration-500" />
        </aside>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
}