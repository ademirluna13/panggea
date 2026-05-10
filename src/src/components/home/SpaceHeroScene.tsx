import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Sparkles, Stars, Environment } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

function MeteoritoModel() {
  const { scene } = useGLTF('/models/meteorite.glb'); 
  const modelRef = useRef<THREE.Group>(null);
  
  // 🎯 Accedemos al tamaño de la pantalla dentro del canvas
  const { viewport } = useThree();

  // Calculamos la posición x: si la pantalla es chica (móvil), 0. Si es grande, 2.5
  // Esto hace que el objeto sea responsivo de verdad
  const responsiveX = useMemo(() => {
    return viewport.width < 5 ? 0 : 2.5;
  }, [viewport.width]);

  // Ajustamos el tamaño también para que no se coma la pantalla en móvil
  const responsiveScale = useMemo(() => {
    return viewport.width < 5 ? 1.2 : 1.8;
  }, [viewport.width]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = t * 0.1;
    modelRef.current.position.y = Math.sin(t / 1.5) * 0.15;
    
    // Suavizamos el movimiento hacia su posición responsiva
    modelRef.current.position.x = THREE.MathUtils.lerp(
      modelRef.current.position.x, 
      responsiveX, 
      0.1
    );
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={responsiveScale} 
      position={[responsiveX, 0, 0]} 
    />
  );
}

export default function SpaceHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-black">
      {/* 🚀 SUBIMOS EL FOV Y ALEJAMOS LA CÁMARA (Z: 8) PARA MEJOR ENCUADRE EN MÓVIL */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ff7f50" /> 
        <pointLight position={[-10, -10, -10]} intensity={1} color="#331100" />

        <Suspense fallback={null}>
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          <Sparkles 
            count={(150)} 
            scale={10} 
            size={1.5} 
            color="#ffcc99" 
            speed={0.2} 
            opacity={0.5} 
          />

          <MeteoritoModel />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}