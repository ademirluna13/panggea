import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Sparkles, Stars, Environment, Center } from '@react-three/drei';
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

    updateColors(); // Lectura inicial
    // Observador para cambios en data-theme
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

export default function SpaceHeroScene() {
  const colors = useThemeColors();

  return (
    /* 🧠 Se sustituyó el bg-black por la clase de neutral del tema */
    <div className="absolute inset-0 z-0 h-full w-full bg-pangea-neutral transition-colors duration-500">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        {/* Color de fondo sincronizado con el tema */}
        <color attach="background" args={[colors.neutral]} />
        
        <ambientLight intensity={0.8} />
        {/* Luz direccional base */}
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" /> 
        {/* 🔥 Luz de punto que muta con tu color primario del tema 🔥 */}
        <pointLight position={[-5, -5, 5]} intensity={3} color={colors.primary} />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
          {/* 🔥 Sparkles que se tiñen con tu color secundario del tema 🔥 */}
          <Sparkles count={100} scale={10} size={1.5} color={colors.secondary} speed={0.1} opacity={0.4} />

          <MeteoritoModel />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}