
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLens } from '@/context/LensContext';
import * as THREE from 'three';
import { Sparkles, Stars } from '@react-three/drei';

function Scene() {
  const { activeProject } = useLens();
  const groupRef = useRef<THREE.Group>(null);
  const colorTarget = useMemo(() => new THREE.Color(), []);

  // Map activeProject to specific colors
  const colorMap: Record<string, string> = {
    sakhi: '#14B8A6', // aura-medical
    navigator: '#6366F1', // aura-logic
    leadership: '#F59E0B', // aura-gold
    rigor: '#EF4444', // aura-rigor
    none: '#1A1A1A', // twin-border (neutral)
  };

  useFrame((state, delta) => {
    // Determine target color based on active project
    const targetHex = colorMap[activeProject.toLowerCase()] || colorMap.none;
    colorTarget.set(targetHex);
    
    // Animate rotation subtly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Animated background color (Deep Dark Ambient Base)
  useFrame(({ scene }, delta) => {
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(colorTarget.clone().multiplyScalar(0.02), 2 * delta);
    } else {
      scene.background = new THREE.Color(0x020202);
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      {activeProject === 'sakhi' && <Sparkles count={200} size={10} color="#0D9488" speed={0.4} opacity={0.5} scale={20} />}
      {activeProject === 'navigator' && <Sparkles count={400} size={5} color="#4F46E5" speed={2} opacity={0.8} scale={30} />}
      {activeProject === 'leadership' && <Sparkles count={100} size={15} color="#D97706" speed={0.1} opacity={0.3} scale={25} />}
      {activeProject === 'rigor' && <Sparkles count={300} size={8} color="#DC2626" speed={3} opacity={0.6} scale={15} noise={1} />}
    </group>
  );
}

export function BackgroundAura() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-twin-bg bg-grid-pattern">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </div>
  );
}
