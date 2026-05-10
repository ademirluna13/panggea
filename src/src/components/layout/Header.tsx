import { useState, useEffect } from 'react';
import { Menu, Search, X, Bell, User } from 'lucide-react';

export default function Header() {
  const [isFloating, setIsFloating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 👇 1. ESTADO PARA SABER EN QUÉ RUTA ESTAMOS
  const [currentPath, setCurrentPath] = useState("");

  const navLinks = [
    { name: "INICIO", href: "/" },
    { name: "NOTAS", href: "/blog" },
    { name: "DEEP DIVES", href: "/lore" }, // <--- AQUÍ ESTÁ EL NUEVO ENLACE
    { name: "REVIEWS", href: "#" },
    { name: "HARDWARE", href: "#" },
    { name: "GUIAS", href: "#" }
  ];

  useEffect(() => {
    // Seteamos la ruta actual al cargar
    setCurrentPath(window.location.pathname);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsFloating(currentScrollY > 80);

      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-700 px-4 md:px-8
        ${isFloating ? 'pt-4 md:pt-6' : 'pt-0'}
      `}>
        <header 
          className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
            ${isFloating 
              ? 'w-full max-w-6xl bg-[#0a0504]/95 backdrop-blur-2xl border border-pangea-primary/40 rounded-2xl h-18 md:h-20 px-6 md:px-10 shadow-[0_25px_50px_-15px_rgba(255,69,0,0.4)]' 
              : 'w-full bg-black md:bg-transparent border-b border-white/5 h-20 md:h-28 px-6 md:px-16'
            }`}
        >
          <div className="flex items-center justify-between h-full gap-4">
            
            <a href="/" className="flex items-center gap-3 md:gap-4 hover:scale-105 transition-transform shrink-0">
              <img 
                src="/img/logo.png" 
                alt="Logo" 
                className={`transition-all duration-700 object-contain ${isFloating ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-20 md:h-20'}`}
              />
              {!isFloating && (
                <div className="hidden sm:flex flex-col">
                  <span className="font-headline font-black italic text-xl md:text-2xl text-white tracking-tighter leading-none">PANGEA</span>
                  <span className="font-label text-[8px] text-pangea-primary tracking-[0.35em] mt-1 uppercase font-bold">DIGITAL PREMIERE</span>
                </div>
              )}
            </a>

            {/* 👇 2. NAVEGACIÓN DESKTOP CON COLOR ACTIVO */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10 transition-all duration-500">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-label text-[11px] font-bold tracking-[0.25em] transition-colors uppercase
                    ${currentPath === link.href 
                      ? 'text-pangea-primary' // Color si estás en la página
                      : 'text-zinc-300 hover:text-pangea-primary' // Color normal
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <div className="hidden sm:flex items-center">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-zinc-500 hover:text-pangea-primary transition-colors p-2">
                  {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              </div>
              
              <button className={`bg-pangea-primary text-black font-label text-[10px] md:text-[11px] font-[900] tracking-widest uppercase transition-all duration-500 shadow-pangea-neon hover:bg-pangea-secondary active:scale-95
                ${isFloating ? 'h-9 md:h-11 px-6 md:px-8 rounded-xl' : 'h-10 md:h-13 px-6 md:px-10 rounded-sm'}
              `}>
                SUSCRIBETE
              </button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-pangea-primary p-1 active:scale-90 transition-transform">
                {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>

          {/* 👇 BARRA DE PROGRESO CON TUS COLORES TAILWIND */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
            <div className="h-full transition-all duration-200 shadow-[0_0_15px_var(--color-pangea-primary)]"
              style={{ 
                width: `${scrollProgress}%`, 
                background: `linear-gradient(to right, var(--color-pangea-primary), var(--color-pangea-secondary), var(--color-pangea-tertiary))` 
              }}
            />
          </div>
        </header>
      </div>

      {/* 👇 3. MENÚ MÓVIL TAMBIÉN CON COLOR ACTIVO */}
      <div className={`fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`font-headline font-black text-4xl italic tracking-tighter transition-colors
                ${currentPath === link.href ? 'text-pangea-primary' : 'text-white hover:text-pangea-primary'}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}