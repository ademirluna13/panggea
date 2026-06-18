import { useRef, useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
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
  platform: string;
}

export default function TrendingNow({ posts = [] }: { posts?: SanityPost[] }) {
  const container = useRef<HTMLDivElement>(null);
  const trendingPosts = posts.slice(0, 6);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    if (!trendingPosts.length) return;

    const cards = gsap.utils.toArray<HTMLElement>('.trending-card');
    gsap.set(cards, { clipPath: 'inset(100% 0% 0% 0%)', y: 50, opacity: 0 });

    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.to(elements, {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => { gsap.set(elements, { clearProps: "clipPath,y" }); }
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

          {/* TU BENTO GRID ORIGINAL: Notas secundarias cuadradas y una grande a la izquierda */}
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