import { ArrowUpRight } from 'lucide-react';

const BrandIcons = {
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-white transition-colors cursor-pointer"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Youtube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#FF0000] transition-colors cursor-pointer"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#E1306C] transition-colors cursor-pointer"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#1877F2] transition-colors cursor-pointer"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )
};

// 🚀 SECCIONES ESPECÍFICAS
const DIR_LINKS = [
  { name: 'TRENDING NOW', color: 'group-hover:text-[#FF4500]', path: '/blog' },
  { name: 'RADAR', color: 'group-hover:text-[#00EEFF]', path: '/radar' },
  { name: 'TIER ARSENAL', color: 'group-hover:text-[#00FF66]', path: '/tier' },
  { name: 'PATCH LOG', color: 'group-hover:text-[#A020F0]', path: '/patchLog' },
  { name: 'VAULT', color: 'group-hover:text-[#D4AF37]', path: '/vault' },
];

// 🚀 CATEGORÍAS TEMÁTICAS REALES
const CAT_LINKS = [
  { name: 'ANIME', color: 'group-hover:text-[#00EEFF]', path: '/categoria/anime' },
  { name: 'CÓMICS', color: 'group-hover:text-[#D4AF37]', path: '/categoria/comics' },
  { name: 'DEPORTES', color: 'group-hover:text-[#A020F0]', path: '/categoria/deportes' },
  { name: 'ENTRETENIMIENTO', color: 'group-hover:text-[#00FF66]', path: '/categoria/entretenimiento' },
  { name: 'GAMING', color: 'group-hover:text-[#FF4500]', path: '/categoria/gaming' },
  { name: 'MÚSICA', color: 'group-hover:text-[#FF0033]', path: '/categoria/musica' },
  { name: 'TECNOLOGÍAS', color: 'group-hover:text-[#00EEFF]', path: '/categoria/tecnologias' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] flex justify-center font-body relative">
      
      {/* ─── LÍNEA DE ESPECTRO PANGEA ─── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF4500] via-[#00EEFF] via-[#00FF66] via-[#A020F0] via-[#FF0033] to-[#D4AF37]" />

      {/* ─── CONTENEDOR CENTRAL: ESPACIO COMPACTO (pt-10 pb-6) ─── */}
      <div className="max-w-[1200px] w-full px-4 md:px-6 pt-10 pb-6">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-10">
          
          {/* 1. BLOQUE DE MARCA */}
          <div className="flex flex-col gap-4 max-w-sm">
            <a href="/" className="flex items-center gap-3 group">
              <img 
                src="https://i.ibb.co/dwp2cfCt/logo.png" 
                alt="PanGGea Logo" 
                className="w-50 h-50 object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="flex flex-col">
                <h2 className="font-headline text-3xl font-black italic text-white leading-none tracking-tighter uppercase">PANGGEA</h2>
                <span className="font-mono text-[8px] text-white/40 font-black tracking-[0.4em] uppercase mt-0.5">Digital_Premiere</span>
              </div>
            </a>
            <p className="font-body text-white/50 text-sm leading-relaxed">
              El ecosistema definitivo de análisis táctico, hardware de élite y cultura digital. Operando en la red desde 2026.
            </p>
            
            <div className="flex items-center gap-5 mt-1">
              <a href="http://www.youtube.com/@PanGGea" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel"><BrandIcons.Youtube /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile"><BrandIcons.Instagram /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page"><BrandIcons.Facebook /></a>
            </div>
          </div>

          {/* 2. PARRILLA DE NAVEGACIÓN COMPLETA (3 Columnas reales sin espacio muerto) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">
            
            {/* COLUMNA 1: DIRECTORIO */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Directorio</span>
              <ul className="flex flex-col gap-2.5">
                {DIR_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.path} className="flex items-center gap-2 group">
                      <span className={`font-headline text-white/70 text-[15px] font-black italic uppercase tracking-tighter transition-colors ${link.color}`}>
                        {link.name}
                      </span>
                      <ArrowUpRight size={12} className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${link.color}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMNA 2: CATEGORÍAS */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Categorías</span>
              <ul className="flex flex-col gap-2.5">
                {CAT_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.path} className="flex items-center gap-2 group">
                      <span className={`font-headline text-white/70 text-[15px] font-black italic uppercase tracking-tighter transition-colors ${link.color}`}>
                        {link.name}
                      </span>
                      <ArrowUpRight size={12} className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${link.color}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMNA 3: PROTOCOLO */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Protocolo</span>
              <ul className="flex flex-col gap-2.5 font-mono text-[11px] font-semibold text-white/50">
                
                {/* 🔥 ENLACE NUEVO: ABOUT (Identidad del Sistema) 🔥 */}
                <li>
                  <a href="/about" className="hover:text-white transition-colors block">Nosotros</a>
                </li>
                
                {/* 🔥 ENLACE CORREGIDO: PRIVACY-POLICY 🔥 */}
                <li>
                  <a href="/privacy-policy" className="hover:text-white transition-colors block">Política de Privacidad</a>
                </li>
                
                <li>
                  <a href="/terms-of-use" className="hover:text-white transition-colors block">Términos de Uso</a>
                </li>
                
                <li className="mt-1">
                  <a href="mailto:contacto@panggea.site" className="text-white hover:text-[#00F0FF] transition-colors block break-all font-mono text-[10px]">
                    contacto@panggea.site
                  </a>
                </li>
                
                <li className="text-[#FF0033]/80 hover:text-[#FF0033] cursor-pointer transition-colors mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF0033] rounded-full animate-pulse" />
                  Reportar un Bug
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-6">
          <span className="font-mono text-[10px] font-bold tracking-widest text-white/30 uppercase text-center md:text-left">
            © {currentYear} PANGEA NETWORK 2026
          </span>
          
          {/* CREDITS BITXOLO */}
          <a href="https://bitxolo.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer">
             <span className="font-mono text-[9px] font-bold tracking-widest text-white/30 uppercase group-hover:text-white/50 transition-colors">
               Engineered By
             </span>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm group-hover:border-[#00EEFF]/30 transition-colors">
                <div className="w-1.5 h-1.5 bg-[#00EEFF] rounded-full shadow-[0_0_8px_#00EEFF]" />
                <span className="font-headline text-[13px] font-black italic tracking-widest text-white uppercase group-hover:text-[#00EEFF] transition-colors">
                  BITXOLO
                </span>
             </div>
          </a>
        </div>

      </div>
    </footer>
  );
}