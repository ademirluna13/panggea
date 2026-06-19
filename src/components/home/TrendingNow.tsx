import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PangeaCard from '../ui/PanggeaCard'; 
import SectionHeader from '../ui/SectionHeader'; 

gsap.registerPlugin(ScrollTrigger);

interface SanityPost {
  title: string;
  slug: string;
  heroImage: string;
  publishedAt: string;
  category: string;
  description: string;
  platform?: string; // La hacemos opcional por si a veces no viene
}

export default function TrendingNow({ posts = [] }: { posts?: SanityPost[] }) {
  const container = useRef<HTMLDivElement>(null);
  const trendingPosts = posts.slice(0, 6);

  useGSAP(() => {
    if (!trendingPosts.length) return;

    const cards = gsap.utils.toArray<HTMLElement>('.trending-card');
    
    // 🔥 OPTIMIZADO: Solo animamos "y" y "opacity". Nada de clipPath pesados.
    gsap.set(cards, { y: 50, opacity: 0 });

    ScrollTrigger.batch(cards, {
      start: "top 90%", // Le damos más margen para que no choque con la hidratación de Astro
      once: true, // Hacemos que corra solo una vez para evitar lags si scrollean hacia arriba rápido
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => { gsap.set(elements, { clearProps: "y" }); }
        });
      },
    });
  }, { scope: container, dependencies: [posts] });

  if (!trendingPosts.length) return null;

  return (
    <section ref={container} className="relative py-24 bg-pangea-neutral overflow-hidden border-y border-white/5 flex justify-center transition-colors duration-500">
      <div className="flex w-full max-w-[1600px] justify-center items-start gap-12 px-6 relative z-10">
        <div className="max-w-[1200px] w-full">
          
          <SectionHeader 
            tag="Pangea_Core // Trending"
            titleSolid="TRENDING"
            titleOutline="NOW"
            description="Análisis en tiempo real de los picos de interés en el meta. No sigas la tendencia, anticípala."
            ctaText="Explorar tendencias"
            ctaHref="/blog"
            accentColor="var(--color-brand-orange)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            {trendingPosts.map((post, index) => (
              <PangeaCard
                key={post.slug || index}
                title={post.title}
                slug={post.slug}
                description={post.description}
                category={post.category}
                heroImage={post.heroImage}
                publishedAt={post.publishedAt}
                platform={post.platform} // 🔥 Ya le estamos pasando el platform
                baseHref="/news"
                accentColor="var(--color-brand-orange)"
                isHero={index === 0}
                className={index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}