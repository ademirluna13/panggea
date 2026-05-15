import { useState, useEffect, useRef } from 'react';
import { Menu, Search, X, Loader2, ChevronDown } from 'lucide-react';

export default function Header({ searchData = [] }: { searchData?: any[] }) {
  const [isFloating, setIsFloating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [currentPath, setCurrentPath] = useState("");

  // 🚀 ESTRUCTURA FINAL (Menús y Accesos Directos)
  const menuGroups = [
    {
      label: "NOTICIAS",
      links: [
        { name: "TRENDING NOW", href: "/blog" },
        { name: "DEEP DIVES", href: "/lore" }
      ]
    },
    {
      label: "ESTRATEGIA",
      links: [
        { name: "GUÍAS", href: "/guide" },
        { name: "TIER LIST", href: "/tier" }
      ]
    },
    {
      label: "SISTEMA",
      links: [
        { name: "RADAR", href: "/radar" },
        { name: "PATCH LOG", href: "/patchLog" }
      ]
    }
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
        const filtered = (searchData || []).filter((item: any) => 
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
              ? 'w-full max-w-7xl bg-[#0a0504]/95 backdrop-blur-2xl border border-pangea-primary/40 rounded-2xl h-16 px-6 md:px-10 shadow-[0_25px_50px_-15px_rgba(255,69,0,0.4)]' 
              : 'w-full bg-black md:bg-transparent border-b border-white/5 h-20 md:h-28 px-6 md:px-16'
            }`}
        >
          <div className="flex items-center justify-between h-full gap-4 xl:gap-8">
            
            {/* LOGO */}
            <a href="/" className="flex items-center gap-3 shrink-0">
              <img 
                src="https://i.ibb.co/dwp2cfCt/logo.png" 
                alt="Logo" 
                className={`transition-all duration-700 ${isFloating ? 'w-10 h-10' : 'w-14 h-14 md:w-20 md:h-20'}`}
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

            {/* ─── NAV DE ÉLITE ─── */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              
              {/* INICIO DIRECTO */}
              <a href="/" className={`font-label text-[10px] xl:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors ${currentPath === '/' ? 'text-pangea-primary' : 'text-zinc-400 hover:text-white'}`}>
                INICIO
              </a>

              {/* GRUPOS DESPLEGABLES */}
              {menuGroups.map((group) => (
                <div 
                  key={group.label}
                  className="relative h-full flex items-center group/nav"
                  onMouseEnter={() => setActiveDropdown(group.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`flex items-center gap-2 font-label text-[10px] xl:text-[11px] font-bold tracking-[0.25em] transition-colors uppercase
                    ${activeDropdown === group.label ? 'text-pangea-primary' : 'text-zinc-400 hover:text-white'}
                  `}>
                    {group.label}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === group.label ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-56 bg-[#0a0a0a]/98 backdrop-blur-xl border border-pangea-primary/20 rounded-xl shadow-2xl py-4 transition-all duration-300 z-50
                    ${activeDropdown === group.label ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
                  `}>
                    {group.links.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.href} 
                        className={`block px-6 py-3 font-label text-[9px] font-bold tracking-widest transition-all
                          ${currentPath === link.href ? 'text-pangea-primary bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                        `}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* VAULT DIRECTO */}
              <a href="/vault" className={`font-label text-[10px] xl:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors shrink-0 ${currentPath === '/vault' ? 'text-pangea-primary' : 'text-zinc-400 hover:text-white'}`}>
                VAULT
              </a>
            </nav>

            {/* BÚSQUEDA FUNCIONAL */}
            <div className="flex-1 max-w-[200px] xl:max-w-md hidden lg:block relative" ref={searchRef}>
              <div className="group flex items-center relative w-full">
                <Search size={16} className={`absolute left-0 transition-colors ${searchQuery ? 'text-pangea-primary' : 'text-zinc-600 group-focus-within:text-pangea-primary'}`} />
                <input 
                  type="text" 
                  placeholder="BUSCAR..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-white/[0.03] border-b border-white/10 text-white text-[12px] font-mono pl-8 pr-10 py-3 outline-none focus:border-pangea-primary transition-all placeholder:text-zinc-700 tracking-wider"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2 text-zinc-500 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* RESULTADOS */}
              {searchQuery.length > 2 && (
                <div className="absolute top-[calc(100%+5px)] right-0 w-[450px] bg-[#0a0a0a]/98 border border-pangea-primary/30 rounded-xl shadow-2xl overflow-hidden flex flex-col z-[150] backdrop-blur-3xl">
                  {isSearching ? (
                    <div className="flex items-center justify-center gap-3 p-8 text-pangea-primary">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Sincronizando...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {searchResults.map((res, index) => (
                        <a key={index} href={res.href} className="flex flex-col gap-1 p-5 border-b border-white/5 hover:bg-pangea-primary/10 transition-all group">
                          <span className="font-mono text-[9px] text-pangea-primary uppercase tracking-[0.3em] font-bold">// {res.category}</span>
                          <span className="font-headline text-base font-bold italic text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                            {res.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-widest italic">Data_Not_Found</div>
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
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
            <div className="h-full transition-all duration-200"
              style={{ width: `${scrollProgress}%`, background: `linear-gradient(to right, #FF4500, #9D00FF, #00F0FF)` }}
            />
          </div>
        </header>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[9998] bg-black/98 backdrop-blur-3xl lg:hidden transition-all duration-500 flex flex-col ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex-1 overflow-y-auto px-8 pt-32 pb-10 flex flex-col items-center gap-10">
          <a href="/" onClick={() => setIsMenuOpen(false)} className="font-headline font-black text-5xl italic text-white uppercase tracking-tighter">INICIO</a>
          {menuGroups.map((group) => (
            <div key={group.label} className="w-full text-center">
              <span className="font-mono text-[9px] text-pangea-primary tracking-[0.4em] mb-4 block opacity-50 uppercase">// {group.label}</span>
              <div className="flex flex-col gap-4">
                {group.links.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-headline font-black text-4xl italic text-white uppercase tracking-tighter">{link.name}</a>
                ))}
              </div>
            </div>
          ))}
          <a href="/vault" onClick={() => setIsMenuOpen(false)} className="font-headline font-black text-5xl italic text-pangea-primary uppercase tracking-tighter">VAULT</a>
        </div>
      </div>
    </>
  );
}