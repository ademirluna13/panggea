import { motion } from 'framer-motion';

// Definimos la interfaz para evitar errores de TypeScript
interface Category {
  title: string;
  slug: string;
}

export default function CategoryNav({ categories = [], accentColor = "#00F0FF" }: { categories: Category[], accentColor?: string }) {
  return (
    /* Quitamos el sticky y el z-index masivo para que no tape la Navbar */
    <nav className="w-full bg-transparent border-y border-white/5 relative mb-12">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        
        {/* ─── NAVEGACIÓN DE CATEGORÍAS TÁCTICA ─── */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {categories.map((cat) => (
            <a 
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group relative px-6 py-2"
            >
              {/* ESQUINAS DE ENFOQUE (Signature BitXolo) */}
              <div 
                className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ borderColor: accentColor }}
              />
              <div 
                className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ borderColor: accentColor }}
              />

              {/* TEXTO: Tipografía Pesada 900 e Itálica */}
              <span className="relative z-10 font-headline text-white/30 group-hover:text-white text-[13px] font-[900] italic uppercase tracking-[0.3em] transition-all duration-500">
                {cat.title}
              </span>

              {/* RESPLANDOR DE FONDO SUTIL */}
              <div 
                className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                style={{ backgroundColor: accentColor }}
              />
              
              {/* LÍNEA DE DATOS INFERIOR DINÁMICA */}
              <motion.div 
                className="absolute -bottom-1 left-0 h-[1px]"
                style={{ 
                  background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` 
                }}
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: '100%', opacity: 0.6 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
            </a>
          ))}
        </div>

      </div>

      {/* LÍNEA DE CIERRE DE RACK */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.05]" />
    </nav>
  );
}