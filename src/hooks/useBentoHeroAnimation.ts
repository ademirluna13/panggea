// src/hooks/useBentoHeroAnimation.ts
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useBentoHeroAnimation = () => {
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftContentRef.current || !rightPanelRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Estado inicial
    gsap.set(leftContentRef.current.children, { opacity: 0, y: 30 });
    gsap.set(rightPanelRef.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" });

    // Secuencia
    tl.to(rightPanelRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
    })
    .to(leftContentRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1 // Aparecen uno tras otro
    }, "-=1");

  }, []);

  return { leftContentRef, rightPanelRef };
};