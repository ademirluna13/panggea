import { Share2, Clock, Monitor, Gamepad2, User, Calendar } from 'lucide-react';

interface SidebarFichaProps {
  category: string;
  platform?: string;
  readTime?: string;
  game?: { name: string; logo: string } | null;
  reviewStats?: { score: string; status: string } | null;
  accentColor?: string;
  url: string;
  title: string;
  authorName?: string;
  publishDate?: string;
}

export default function SidebarFicha({
  category,
  platform,
  readTime,
  game,
  accentColor = "#FFD700",
  url,
  title,
  authorName = "Pangea Team",
  publishDate
}: SidebarFichaProps) {
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("¡Enlace copiado al portapapeles!");
      }
    } catch (err) {
      console.log('Error compartiendo:', err);
    }
  };

  const finalReadTime = readTime || "5 MIN";

  return (
    <aside 
      className="sticky top-32 h-fit w-full bg-[#050505] border border-white/5 rounded-xl flex flex-col transition-all duration-500 z-40 group relative overflow-hidden hover:border-[#FFD700]/30"
      style={{
        borderColor: 'rgba(255,255,255,0.05)',
        boxShadow: `0 0 30px ${accentColor}00` 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="p-6 md:p-8 flex flex-col gap-8">
        
        {/* Header Ficha */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-[2px]" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}></div>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold">Ficha Técnica</span>
        </div>

        {/* Datos Principales */}
        <div className="flex flex-col gap-6">
          
          {/* Categoría */}
          <div className="flex flex-col gap-2 border-b border-white/5 pb-4">
            <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
              <Monitor size={10} style={{ color: accentColor }} /> Hardware / Categoría
            </span>
            <span className="font-headline font-black text-white uppercase italic tracking-wider text-xl">
              {category} {platform ? `/ ${platform}` : ''}
            </span>
          </div>

          {/* Autor y Fecha */}
          <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
                <User size={10} style={{ color: accentColor }} /> Agente
              </span>
              <span className="font-headline font-black text-white/80 uppercase italic tracking-wider text-sm truncate">
                {authorName}
              </span>
            </div>
            {publishDate && (
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
                  <Calendar size={10} style={{ color: accentColor }} /> Registro
                </span>
                <span className="font-headline font-black text-white/80 uppercase italic tracking-wider text-sm">
                  {publishDate}
                </span>
              </div>
            )}
          </div>

          {/* Tiempo Estimado */}
          <div className="flex flex-col gap-2 border-b border-white/5 pb-4">
            <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
              <Clock size={10} style={{ color: accentColor }} /> Tiempo Estimado
            </span>
            <span className="font-headline font-black text-white/80 uppercase italic tracking-wider text-lg">
              {finalReadTime}
            </span>
          </div>

          {/* Juego Linkeado */}
          {game && (
            <div className="flex flex-col gap-2 pb-2">
              <span className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
                <Gamepad2 size={10} style={{ color: accentColor }} /> Juego
              </span>
              <div className="flex items-center gap-3 mt-1">
                {game.logo && <img src={game.logo} alt={game.name} className="h-6 w-auto object-contain brightness-0 invert opacity-80" />}
                <span className="font-headline font-black text-white uppercase italic tracking-wider text-lg">{game.name}</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Botón Compartir */}
      <button 
        onClick={handleShare}
        className="w-full py-5 border-t border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex justify-center items-center gap-3 focus:outline-none relative z-20"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] font-bold uppercase text-white/60 group-hover:text-white transition-colors">
          Compartir Datos
        </span>
        <Share2 size={14} style={{ color: accentColor }} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* 🔥 LA BARRA DE NEÓN 🔥 */}
      <div 
        className="absolute bottom-0 left-0 h-1.5 transition-all duration-1000 w-0 group-hover:w-full z-30" 
        style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
      />
    </aside>
  );
}