import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  tag: string;
  titleSolid: string;
  titleOutline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  accentColor: string;
}

export default function SectionHeader({
  tag,
  titleSolid,
  titleOutline,
  description,
  ctaText,
  ctaHref,
  accentColor
}: SectionHeaderProps) {
  return (
    <header className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 w-full">
      <div className="flex flex-col items-start w-full lg:w-auto">
        <div className="flex items-center gap-3 mb-4 md:mb-6" style={{ color: accentColor }}>
          <div className="w-8 md:w-12 h-1 shadow-lg" style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}` }} />
          <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase italic">
            {tag}
          </span>
        </div>
        <h2 className="font-headline text-pangea-text text-5xl md:text-7xl lg:text-[85px] font-black tracking-tighter leading-[0.85] uppercase italic drop-shadow-2xl transition-all duration-500">
          {titleSolid} <br className="hidden sm:block" />
          <span className="text-transparent" style={{ WebkitTextStroke: `2px ${accentColor}` }}>
            {titleOutline}
          </span>
        </h2>
      </div>

      <div className="max-w-xs text-left lg:text-right mt-2 lg:mt-0">
        <p className="text-white/60 text-xs md:text-sm italic mb-4 md:mb-6 leading-relaxed drop-shadow-md">
          "{description}"
        </p>
        <a 
          href={ctaHref} 
          className="inline-flex items-center gap-3 md:gap-4 font-mono lg:hover:text-white text-[9px] md:text-[11px] font-black tracking-[0.4em] uppercase transition-all group drop-shadow-md"
          style={{ color: accentColor }}
        >
          {ctaText} <ChevronRight size={16} className="transition-transform lg:group-hover:translate-x-2" />
        </a>
      </div>
    </header>
  );
}