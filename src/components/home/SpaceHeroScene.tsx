import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Sparkles, Stars, Center } from '@react-three/drei'; // 🔥 ELIMINAMOS Environment
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// 🧠 HOOK PARA ESCUCHAR EL TEMA GLOBAL Y PASARLO A 3D
function useThemeColors() {
  const [colors, setColors] = useState({
    primary: '#FF4500',
    secondary: '#FF8C00',
    neutral: '#020203'
  });

  useEffect(() => {
    const updateColors = () => {
      const root = getComputedStyle(document.documentElement);
      setColors({
        primary: root.getPropertyValue('--pangea-primary').trim(),
        secondary: root.getPropertyValue('--pangea-secondary').trim(),
        neutral: root.getPropertyValue('--pangea-neutral').trim(),
      });
    };

    updateColors(); 
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function MeteoritoModel() {
  const { scene } = useGLTF('/models/meteorite.glb'); 
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const responsiveX = useMemo(() => viewport.width < 5 ? 0 : 5, [viewport.width]);
  const responsiveScale = useMemo(() => viewport.width < 5 ? 0.8 : 1.8, [viewport.width]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = -1;
    modelRef.current.position.y = Math.sin(t / 2) * 0.12; 
    modelRef.current.rotation.z = Math.sin(t / 4) * 0.05;
    modelRef.current.rotation.x = Math.cos(t / 3) * 0.03;
    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, responsiveX, 0.1);
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={scene} scale={responsiveScale} />
      </Center>
    </group>
  );
}

// 🔥 PRECARGAMOS EL MODELO PARA EVITAR TIRONES AL INICIO 🔥
useGLTF.preload('/models/meteorite.glb');

export default function SpaceHeroScene() {
  const colors = useThemeColors();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // 🚀 EL RADAR DE RENDIMIENTO: Apaga el 3D cuando el usuario hace scroll hacia abajo
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full bg-pangea-neutral transition-colors duration-500">
      
      <Canvas 
        /* 🔥 LA MAGIA: Si no se ve, corta el frameloop de golpe y le devuelve todo el poder a la GPU 🔥 */
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 12], fov: 45 }} 
        dpr={[1, 1.5]} /* 🔥 Bajamos de 2 a 1.5. Salva millones de píxeles inútiles en celulares */
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[colors.neutral]} />
        
        <ambientLight intensity={0.5} />
        {/* 🔥 HemisphereLight sustituye al .hdr. Recrea la luz del ambiente casi a costo cero de RAM 🔥 */}
        <hemisphereLight intensity={0.5} color="#ffffff" groundColor={colors.neutral} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" /> 
        <pointLight position={[-5, -5, 5]} intensity={3} color={colors.primary} />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={2500} factor={4} fade speed={0.5} />
          <Sparkles count={80} scale={10} size={1.5} color={colors.secondary} speed={0.1} opacity={0.4} />

          <MeteoritoModel />
        </Suspense>
      </Canvas>
    </div>
  );
}