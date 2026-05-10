import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useHeroAnimation = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !textRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Estado inicial: Invisible y desenfocado
    gsap.set([logoRef.current, textRef.current], { opacity: 0, y: 50, filter: "blur(15px)" });

    // Secuencia de revelación (se dispara tras la carga del 3D)
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.8,
      delay: 0.5 // Damos tiempo a que el Canvas 3D esté listo
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
    }, "-=1.2");

  }, []);

  return { logoRef, textRef };
};