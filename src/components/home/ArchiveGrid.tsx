import { useState, useMemo, useRef, useEffect, type JSX } from 'react';
import { Clock, ArrowRight, ChevronDown, Search } from 'lucide-react';

// 🎨 Colores oficiales de marca para el Hover
const BRAND_COLORS: Record<string, string> = {
  XBOX: '#107C10',
  PS: '#003791',
  NINTENDO: '#E60012',
  PC: '#00F0FF',
  ANDROID: '#3DDC84',
  MULTI: '#FF4500',
  TODOS: '#FFFFFF'
};

// 🛠️ Mapeo de nombres de Sanity a tus nombres de archivo en public/icons/
const ICON_FILES: Record<string, string> = {
  XBOX: 'xbox.svg',
  PS: 'playstation.svg',
  NINTENDO: 'nintendo.svg',
  PC: 'computer.svg',
  ANDROID: 'android.svg',
  MULTI: 'multi.svg',
  TODOS: 'all.svg'
};

const GetIcon = ({ name, color, isHovered }: { name: string, color: string, isHovered: boolean }) => {
  const fileName = ICON_FILES[name];
  if (!fileName) return null;

  // Si es hover, usamos el color de marca, si no, el color que viene por prop
  const activeColor = isHovered ? BRAND_COLORS[name] : color;

  return (
    <div 
      className="w-6 h-6 transition-all duration-300"
      style={{
        backgroundColor: activeColor,
        WebkitMaskImage: `url(/icons/${fileName})`,
        maskImage: `url(/icons/${fileName})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        filter: isHovered ? `drop-shadow(0 0 8px ${activeColor})` : 'none'
      }}
    />
  );
};

export default function ArchiveGrid({ 
  posts, 
  categories, 
  accentColor, 
  hideCategory = false,
  basePath = '/news' 
}: { 
  posts: any[], 
  categories: string[], 
  accentColor: string, 
  hideCategory?: boolean,
  basePath?: string 
}) {
  const [activeCat, setActiveCat] = useState('TODOS');
  const [activePlat, setActivePlat] = useState('TODOS');
  const [hoveredPlat, setHoveredPlat] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('RECIENTE');
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const rackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rackRef.current && !rackRef.current.contains(event.target as Node)) {
        setShowCatMenu(false);
        setShowSortMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const platforms = ['TODOS', 'XBOX', 'PS', 'NINTENDO', 'PC', 'ANDROID', 'MULTI'];

  const filteredPosts = useMemo(() => {
    let result = posts.filter(post => {
      const matchCat = hideCategory || activeCat === 'TODOS' || post.category.toUpperCase() === activeCat;
      const p = post.platform?.toUpperCase() || "";
      const matchPlat = activePlat === 'TODOS' || (activePlat === 'MULTI' ? p.includes(',') : p.includes(activePlat));
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchPlat && matchSearch;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === 'RECIENTE' ? dateB - dateA : dateA - dateB;
    });
  }, [activeCat, activePlat, search, sortOrder, posts, hideCategory]);

  // 🧠 FUNCIÓN HELPER PARA REESCALAR EL TITULO POR SU LONGITUD EN EL BENTO
  const getFontSize = (title: string, isBig: boolean) => {
    const length = title.length;
    if (isBig) {
      if (length > 50) return 'text-3xl sm:text-4xl md:text-5xl';
      if (length > 30) return 'text-4xl sm:text-5xl md:text-6xl';
      return 'text-5xl md:text-7xl';
    } else {
      if (length > 45) return 'text-lg md:text-xl';
      if (length > 25) return 'text-xl md:text-2xl';
      return 'text-xl md:text-3xl';
    }
  };

  return (
    <div className="flex flex-col gap-10" ref={rackRef}>
      {/* 🚀 CSS PARA MATAR EL SCROLLBAR BLANCO DE WINDOWS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="flex flex-col lg:flex-row items-end w-full border-b border-white/10 pb-8 gap-8 lg:gap-12 relative z-[60]">
        
        {!hideCategory && (
          <div className="flex flex-col gap-2 w-full lg:w-[220px]">
            <span className="font-mono text-[9px] font-bold tracking-[0.4em]" style={{ color: accentColor }}>CATEGORÍA</span>
            <div className="relative">
              <button onClick={() => setShowCatMenu(!showCatMenu)} className={`w-full flex items-center justify-between bg-white/[0.03] border py-4 px-5 font-headline text-[13px] font-black italic uppercase tracking-widest transition-all ${showCatMenu ? 'border-white/30 text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}>
                <span className="truncate">{activeCat}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${showCatMenu ? 'rotate-180' : ''}`} />
              </button>
              {showCatMenu && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0a0a0a] border border-white/10 shadow-2xl z-[100] max-h-[250px] overflow-y-auto no-scrollbar">
                  {['TODOS', ...categories.map(c => c.toUpperCase())].map(cat => (
                    <button key={cat} onClick={() => { setActiveCat(cat); setShowCatMenu(false); }} className="w-full text-left px-5 py-3 font-headline text-[10px] font-black italic uppercase tracking-widest hover:bg-white hover:text-black transition-colors">{cat}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full lg:w-[180px]">
          <span className="font-mono text-[9px] font-bold tracking-[0.4em]" style={{ color: accentColor }}>ORDENAR</span>
          <div className="relative">
            <button onClick={() => setShowSortMenu(!showSortMenu)} className={`w-full flex items-center justify-between bg-white/[0.03] border py-4 px-5 font-headline text-[13px] font-black italic uppercase tracking-widest transition-all ${showSortMenu ? 'border-white/30 text-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}>
              <span>{sortOrder}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>
            {showSortMenu && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0a0a0a] border border-white/10 shadow-2xl z-[100]">
                {['RECIENTE', 'ANTIGUO'].map(order => (
                  <button key={order} onClick={() => { setSortOrder(order as any); setShowSortMenu(false); }} className="w-full text-left px-5 py-3 font-headline text-[10px] font-black italic uppercase tracking-widest hover:bg-white hover:text-black transition-colors">{order}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🎮 PLATAFORMAS (FIX DE ICONOS Y SCROLL) */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] font-bold tracking-[0.4em]" style={{ color: accentColor }}>PLATAFORMA</span>
          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-3 px-5 rounded-sm overflow-x-auto overflow-y-hidden no-scrollbar min-h-[56px]">
            {platforms.map(plat => {
              const isSelected = activePlat === plat;
              const isHovered = hoveredPlat === plat;
              
              return (
                <button 
                  key={plat} 
                  onClick={() => setActivePlat(plat)}
                  onMouseEnter={() => setHoveredPlat(plat)}
                  onMouseLeave={() => setHoveredPlat(null)}
                  className={`group relative transition-all duration-300 hover:scale-125 flex-shrink-0 flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                >
                  <GetIcon 
                    name={plat} 
                    color={isSelected ? accentColor : 'white'} 
                    isHovered={isHovered}
                  />
                  
                  {isSelected && (
                    <div 
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full shadow-[0_0_10px_currentColor] animate-pulse" 
                      style={{ backgroundColor: isHovered ? BRAND_COLORS[plat] : accentColor }} 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 w-full lg:w-auto">
          <span className="font-mono text-[9px] font-bold tracking-[0.4em]" style={{ color: accentColor }}>BÚSQUEDA</span>
          <div className="relative group flex items-center h-[52px] border border-white/10 bg-white/[0.03] px-6 transition-all focus-within:border-white/30">
            <Search className="text-white/20 group-focus-within:text-white transition-colors" size={20} />
            <input type="text" placeholder="ESCRIBIR..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none w-full pl-5 font-headline text-[15px] text-white uppercase italic tracking-widest focus:outline-none placeholder:text-white/5" />
          </div>
        </div>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[390px] gap-8">
        {filteredPosts.map((post, i) => {
          const isBig = i === 0;
          const platList = post.platform?.split(',').map((p: string) => p.trim().toUpperCase()) || [];
          return (
            <a key={post.slug} href={`${basePath}/${post.slug}`} className={`group relative bg-[#050505] overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/20 flex flex-col ${isBig ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1"}`}>
              <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                <img src={post.heroImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
              </div>
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <div className="flex items-center gap-5 mb-5">
                  <span className="text-white font-mono text-[10px] font-[900] tracking-[0.2em] uppercase border-l-2 pl-3" style={{ borderColor: accentColor }}>{post.category}</span>
                  {platList.length > 0 && (
                    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-sm border border-white/5">
                      {platList.map((p: string, idx: number) => (
                        <div key={idx} className="opacity-80 group-hover:opacity-100 transition-all duration-300">
                          <GetIcon name={p} color="white" isHovered={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className={`font-headline font-black text-white uppercase italic tracking-tighter leading-[0.85] group-hover:text-white transition-all ${getFontSize(post.title, isBig)}`}>{post.title}</h2>
                
                {/* 🔥 REPARADO: Muestra siempre en móviles (grid-rows-[1fr]), transiciona al hover en Desktop (lg:grid-rows-[0fr] -> lg:group-hover:grid-rows-[1fr]) 🔥 */}
                <div className="grid transition-all duration-500 ease-in-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] w-full">
                  <div className="overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white/40 text-sm italic leading-relaxed line-clamp-2 mt-6">{post.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                  <div className="flex items-center gap-2 text-white/20 font-mono text-[9px] font-bold uppercase group-hover:text-white/50 transition-colors">
                    <Clock size={12} style={{ color: accentColor }} /> 
                    {new Date(post.publishedAt).toLocaleDateString('es-MX', { month: 'short', day: '2-digit' })}
                  </div>
                  <ArrowRight size={22} className="text-white/40 -translate-x-full group-hover:text-white group-hover:translate-x-0 transition-all duration-500" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}