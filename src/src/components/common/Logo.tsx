import { Zap } from 'lucide-react';

export const Logo = () => (
  <a href="/" className="flex items-center gap-2 group outline-none">
    <Zap className="text-orange-500 fill-orange-500 group-hover:scale-110 transition-transform duration-300" />
    <span className="text-2xl font-black uppercase tracking-tighter italic text-white group-hover:text-orange-500 transition-colors">
      Pangea
    </span>
  </a>
);