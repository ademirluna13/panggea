import { FEATURED_ARTICLES } from '../../constants/featuredContent';

export default function ContentGrid() {
  const featured = FEATURED_ARTICLES.find(article => article.isFeatured);
  const others = FEATURED_ARTICLES.filter(article => !article.isFeatured);

  return (
    <section className="relative w-full max-w-screen-2xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* 1. Imagen Grande Destacada (Estilo Reference) */}
        {featured && (
          <div className="md:col-span-2 aspect-[16/10] md:aspect-auto rounded-sm overflow-hidden group border border-white/5 bg-[#080808]">
            <img 
              src={featured.imageUrl} 
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 p-8">
              <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm mb-4 inline-block">
                {featured.category}
              </span>
              <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none mb-4 text-white">
                {featured.title}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                {featured.author} · {featured.readTime}
              </p>
            </div>
          </div>
        )}

        {/* 2. Bento Grid de Noticias Secundarias */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          {others.map(article => (
            <div key={article.id} className="aspect-square bg-[#080808] border border-white/5 rounded-sm p-6 flex flex-col group hover:border-orange-500/20 transition-all cursor-pointer">
              <span className="text-orange-500 font-mono text-[9px] uppercase tracking-widest mb-4">
                {article.category} //
              </span>
              <h3 className="font-['Inter'] font-black uppercase tracking-tight text-white/90 text-sm md:text-lg mb-2 leading-snug group-hover:text-white">
                {article.title}
              </h3>
              <div className="mt-auto pt-4 border-t border-white/5 text-[9px] font-medium uppercase tracking-wider text-gray-500 flex justify-between">
                <span>By {article.author}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}