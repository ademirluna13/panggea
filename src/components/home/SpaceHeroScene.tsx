import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Sparkles, Stars, Environment, Center } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

function MeteoritoModel() {
  const { scene } = useGLTF('/models/meteorite.glb'); 
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // 1. POSICIÓN: Lo movemos al lado IZQUIERDO para que luzca con el texto
  // -1.8 lo avienta al lado izquierdo sin pegarse tanto a la orilla
  const responsiveX = useMemo(() => {
    return viewport.width < 5 ? 0 : 5; 
  }, [viewport.width]);

  // 2. ESCALA: Mantenemos tu 1.5, está chido para que tenga presencia
  const responsiveScale = useMemo(() => {
    return viewport.width < 5 ? 0.8 : 1.8;
  }, [viewport.width]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();

    // 🎯 ORIENTACIÓN (ROTACIÓN): Lo rotamos para que "vea" hacia el otro lado
    modelRef.current.rotation.y = -1; // Ajusta este número si quieres que rote más o menos

    // ✅ FLOTADO (Arreglé la fórmula para que no se pierda, pero es muy sutil)
    // Movimiento vertical suave
    modelRef.current.position.y = Math.sin(t / 2) * 0.12; 
    
    // Balanceo leve tipo péndulo para que parezca ingravidez
    modelRef.current.rotation.z = Math.sin(t / 4) * 0.05;
    modelRef.current.rotation.x = Math.cos(t / 3) * 0.03;

    // Suavizamos el movimiento lateral
    modelRef.current.position.x = THREE.MathUtils.lerp(
      modelRef.current.position.x, 
      responsiveX, 
      0.1
    );
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive 
          object={scene} 
          scale={responsiveScale} 
        />
      </Center>
    </group>
  );
}

export default function SpaceHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-black">
      {/* 🚀 ALEJAR: Subimos la cámara a Z: 12 para que el encuadre sea más amplio */}
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" /> 
        <pointLight position={[-5, -5, 5]} intensity={3} color="#FF4500" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
          <Sparkles count={100} scale={10} size={1.5} color="#FFD700" speed={0.1} opacity={0.4} />

          <MeteoritoModel />
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}