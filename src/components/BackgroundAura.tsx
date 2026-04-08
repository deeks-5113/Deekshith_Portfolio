import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Stars } from '@react-three/drei';

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // Animated background color (Static Dark Base)
  useFrame(({ scene, clock }, delta) => {
    // Constant background color
    scene.background = new THREE.Color(0x0A0A0A); // Deep dark gray/black

    // Animate rotation subtly
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={400} size={4} color="#E5E7EB" speed={0.4} opacity={0.5} scale={25} />
      <Sparkles count={150} size={8} color="#F9FAFB" speed={1.5} opacity={0.3} scale={35} />
    </group>
  );
}

export function BackgroundAura() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </div>
  );
}
