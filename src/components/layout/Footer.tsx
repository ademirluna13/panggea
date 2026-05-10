import { ArrowUpRight } from 'lucide-react';

const BrandIcons = {
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-white transition-colors cursor-pointer"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Youtube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#FF0000] transition-colors cursor-pointer"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2h15a2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3z"/></svg>
  ),
  Twitch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#9146FF] transition-colors cursor-pointer"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/></svg>
  ),
  Discord: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 hover:text-[#5865F2] transition-colors cursor-pointer"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.1c1.5-1.1 4.5-1.1 4.5-1.1s3 0 4.5 1.1c1 1.5 1 4.9 1 4.9s0 3.4-1 4.9c-1.5 1.1-4.5 1.1-4.5 1.1s-3 0-4.5-1.1c-1-1.5-1-4.9-1-4.9s0-3.4 1-4.9Z"/><path d="M10 18v1a2 2 0 0 1-2 2H6"/><path d="M14 18v1a2 2 0 0 0 2 2h2"/></svg>
  )
};

const DIR_LINKS = [
  { name: 'TRENDING NOW', color: 'group-hover:text-[#FF4500]' },
  { name: 'RADAR', color: 'group-hover:text-[#00EEFF]' },
  { name: 'TIER ARSENAL', color: 'group-hover:text-[#00FF66]' },
  { name: 'PATCH LOG', color: 'group-hover:text-[#A020F0]' },
  { name: 'THE CHARTS', color: 'group-hover:text-[#FF0033]' },
  { name: 'VAULT', color: 'group-hover:text-[#D4AF37]' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] flex justify-center font-body relative">
      
      {/* ─── LÍNEA DE ESPECTRO PANGEA (Tope del Footer) ─── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF4500] via-[#00EEFF] via-[#00FF66] via-[#A020F0] via-[#FF0033] to-[#D4AF37]" />

      {/* ─── ESTRUCTURA TRES COLUMNAS (1600px Max) ─── */}
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-8 px-4 md:px-6 pt-16 pb-8">
        
        {/* ESPACIO ADS IZQUIERDA */}
        <aside className="hidden 2xl:flex w-[160px] flex-col items-center justify-start opacity-10">
          <div className="w-full h-[250px] border border-white/10 flex items-center justify-center">
            <span className="font-mono text-[9px] text-white/30 uppercase [writing-mode:vertical-lr] tracking-[1em]">AD_SPACE</span>
          </div>
        </aside>

        {/* ─── CONTENEDOR CENTRAL 1200PX ─── */}
        <div className="max-w-[1200px] w-full">
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16">
            
            {/* 1. BLOQUE DE MARCA */}
            <div className="flex flex-col gap-5 max-w-sm">
              <a href="/" className="flex items-center gap-3 group">
                {/* 🔥 LOGO INTEGRADO AQUÍ 🔥 */}
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
              <div className="flex items-center gap-5 mt-2">
                <BrandIcons.X />
                <BrandIcons.Youtube />
                <BrandIcons.Twitch />
                <BrandIcons.Discord />
              </div>
            </div>

            {/* 2. GRID DE NAVEGACIÓN (3 Columnas limpias) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">
              
              {/* COLUMNA DIRECTORIO (Con Magia RGB en Hover) */}
              <div className="flex flex-col gap-5">
                <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Directorio</span>
                <ul className="flex flex-col gap-3">
                  {DIR_LINKS.map((link) => (
                    <li key={link.name}>
                      <a href="#" className="flex items-center gap-2 group">
                        <span className={`font-headline text-white/70 text-[15px] font-black italic uppercase tracking-tighter transition-colors ${link.color}`}>
                          {link.name}
                        </span>
                        <ArrowUpRight size={12} className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${link.color}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMNA SISTEMAS */}
              <div className="flex flex-col gap-5">
                <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Sistemas</span>
                <ul className="flex flex-col gap-3">
                  {["PlayStation 5", "Xbox Series", "PC Master Race", "Nintendo Switch"].map((link) => (
                    <li key={link}>
                      <a href="#" className="font-headline text-white/70 hover:text-white text-[15px] font-black italic uppercase tracking-tighter transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMNA PROTOCOLO (Legales) */}
              <div className="flex flex-col gap-5">
                <span className="font-mono text-[10px] font-black tracking-widest text-white/30 uppercase">Protocolo</span>
                <ul className="flex flex-col gap-3 font-mono text-[11px] font-semibold text-white/50">
                  {/* 🔥 LINKS LEGALES AGREGADOS 🔥 */}
                  <li>
                    <a href="/legal/privacidad" className="hover:text-white transition-colors block">Política de Privacidad</a>
                  </li>
                  <li>
                    <a href="/legal/terminos" className="hover:text-white transition-colors block">Términos de Uso</a>
                  </li>
                  {/* 🔥 CONTACTO AGREGADO 🔥 */}
                  <li className="mt-2">
                    <a href="mailto:contacto@panggea.site" className="text-white hover:text-[#FF4500] transition-colors block break-all">
                      Contactanos: contacto@panggea.site
                    </a>
                  </li>
                  <li className="text-[#FF0033]/80 hover:text-[#FF0033] cursor-pointer transition-colors mt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF0033] rounded-full animate-pulse" />
                    Reportar un Bug
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* ─── BOTTOM BAR ─── */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            <span className="font-mono text-[10px] font-bold tracking-widest text-white/30 uppercase text-center md:text-left">
              © {currentYear} PANGEA NETWORK • TODOS LOS DERECHOS RESERVADOS
            </span>
            
            {/* CREDITS BITXOLO (Sleek & Premium) */}
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

        {/* ESPACIO ADS DERECHA */}
        <aside className="hidden 2xl:flex w-[160px] flex-col items-center justify-start opacity-10">
          <div className="w-full h-[250px] border border-white/10 flex items-center justify-center">
            <span className="font-mono text-[9px] text-white/30 uppercase [writing-mode:vertical-lr] tracking-[1em]">AD_SPACE</span>
          </div>
        </aside>

      </div>
    </footer>
  );
}