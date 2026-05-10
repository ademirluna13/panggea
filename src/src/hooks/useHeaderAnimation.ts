import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useHeaderAnimation = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
    );
  }, []);

  return { headerRef };
};