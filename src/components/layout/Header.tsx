import { useState, useEffect, useRef } from 'react';
import { Menu, Search, X, Loader2 } from 'lucide-react';

export default function Header({ searchData = [] }: { searchData?: any[] }) {
  const [isFloating, setIsFloating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [currentPath, setCurrentPath] = useState("");

  const navLinks = [
    { name: "INICIO", href: "/" },
    { name: "NOTAS", href: "/blog" },
    { name: "DEEP DIVES", href: "/lore" },
    { name: "UPDATES", href: "/updates" },
    { name: "HARDWARE", href: "/vault" },
    { name: "GUIAS", href: "/tier" }
  ];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setIsFloating(window.scrollY > 80);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery(""); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const filtered = searchData.filter((item: any) => 
          item.title?.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-[9999] flex justify-center transition-all duration-700 px-4 md:px-8
        ${isFloating ? 'pt-4 md:pt-6' : 'pt-0'}
      `}>
        <header className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isFloating 
              ? 'w-full max-w-7xl bg-[#0a0504]/95 backdrop-blur-2xl border border-pangea-primary/40 rounded-2xl h-20 px-6 md:px-10 shadow-[0_25px_50px_-15px_rgba(255,69,0,0.4)]' 
              : 'w-full bg-black md:bg-transparent border-b border-white/5 h-20 md:h-28 px-6 md:px-16'
            }`}
        >
          <div className="flex items-center justify-between h-full gap-8">
            
            {/* LOGO */}
            <a href="/" className="flex items-center gap-3 md:gap-4 hover:scale-105 transition-transform shrink-0">
              <img 
                src="https://i.ibb.co/dwp2cfCt/logo.png" 
                alt="PanGGea Logo" 
                className={`transition-all duration-700 object-contain ${isFloating ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-20 md:h-20'}`}
              />
              {!isFloating && (
                <div className="hidden sm:flex flex-col">
                  <span className="font-headline font-black italic text-xl md:text-3xl text-white tracking-tighter leading-none">
                    PAN<span className="text-pangea-primary">GG</span>EA
                  </span>
                  <span className="font-label text-[8px] text-pangea-primary tracking-[0.35em] mt-1 uppercase font-bold">DIGITAL PREMIERE</span>
                </div>
              )}
            </a>

            {/* NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 transition-all duration-500">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-label text-[10px] xl:text-[11px] font-bold tracking-[0.25em] transition-colors uppercase
                    ${currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href))
                      ? 'text-pangea-primary' 
                      : 'text-zinc-400 hover:text-pangea-primary' 
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* BARRA DE BÚSQUEDA LARGA */}
            <div className="flex-1 max-w-md hidden lg:block relative" ref={searchRef}>
              <div className="group flex items-center relative w-full">
                <Search size={16} className={`absolute left-0 transition-colors ${searchQuery ? 'text-pangea-primary' : 'text-zinc-600 group-focus-within:text-pangea-primary'}`} />
                <input 
                  type="text" 
                  placeholder="BUSCAR EN EL ARCHIVO..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-white/[0.03] border-b border-white/10 text-white text-[12px] font-mono pl-8 pr-10 py-3 outline-none focus:border-pangea-primary focus:bg-white/[0.07] transition-all placeholder:text-zinc-700 tracking-wider"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2 text-zinc-500 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* RESULTADOS TAMAÑO BUSCADOR */}
              {searchQuery.length > 2 && (
                <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#0a0a0a] border-x border-b border-pangea-primary/30 rounded-b-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-[150] backdrop-blur-3xl">
                  {isSearching ? (
                    <div className="flex items-center justify-center gap-3 p-8 text-pangea-primary">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Sincronizando...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {searchResults.map((res, index) => (
                        <a 
                          key={index} 
                          href={res.href} 
                          className="flex flex-col gap-1 p-5 border-b border-white/5 hover:bg-pangea-primary/10 transition-all group"
                        >
                          <span className="font-mono text-[9px] text-pangea-primary uppercase tracking-[0.3em] font-bold">
                            // {res.category}
                          </span>
                          <span className="font-headline text-base font-bold italic text-zinc-100 group-hover:text-white transition-colors line-clamp-2 leading-tight">
                            {res.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-red-500/5">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest italic">
                        No se encontraron registros para: "{searchQuery}"
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-pangea-primary p-1 active:scale-90 transition-transform">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          {/* PROGRESS BAR RGB */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden rounded-b-2xl">
            <div className="h-full transition-all duration-200"
              style={{ 
                width: `${scrollProgress}%`, 
                background: `linear-gradient(to right, #FF4500, #9D00FF, #00F0FF)` 
              }}
            />
          </div>
        </header>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[9998] bg-black/98 backdrop-blur-3xl lg:hidden transition-all duration-500 flex flex-col ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex-1 overflow-y-auto px-8 pt-32 pb-10 flex flex-col items-center">
          <div className="w-full max-w-sm mb-12">
            <div className="flex items-center relative">
              <Search size={22} className="absolute left-0 text-pangea-primary" />
              <input 
                type="text" 
                placeholder="BUSCAR..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/10 text-white text-2xl font-headline italic py-4 pl-10 outline-none focus:border-pangea-primary transition-all"
              />
            </div>
            {/* Mobile Results Short version */}
            {searchQuery.length > 2 && searchResults.length > 0 && (
              <div className="mt-4 flex flex-col gap-4">
                {searchResults.slice(0, 3).map((res, i) => (
                  <a key={i} href={res.href} className="border-l-2 border-pangea-primary pl-4 py-2">
                    <p className="text-white text-lg font-bold italic uppercase">{res.title}</p>
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="flex flex-col items-center gap-10 w-full">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-headline font-black text-5xl italic tracking-tighter transition-colors text-center w-full
                  ${currentPath === link.href ? 'text-pangea-primary' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}