import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Grid, Stars } from '@react-three/drei';

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // Animated background color (Static Dark Base)
  useFrame(({ scene, clock }, delta) => {
    // Constant background color
    scene.background = new THREE.Color(0x0A0A0A); // Deep dark gray/black

    // Animate rotation very subtly (Extremely low entropy)
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02; // Extremely slow rotation
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.02; // Very slow oscillation
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
        Enterprise-grade geometric grid 
        Replaces chaotic particles with deterministic structure
      */}
      <Grid
        position={[0, -5, 0]}
        args={[100, 100]}
        cellSize={1}
        cellThickness={1}
        cellColor="#27272a"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#3f3f46"
        fadeDistance={40}
        fadeStrength={1}
      />

      {/* 
        Subdued background stars 
        Lowest opacity, tiny factor, very slow speed 
      */}
      <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} fade speed={0.1} />
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
