"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

export function Environment() {
  const groundRef = useRef<THREE.Mesh>(null);

  // Optional: Add subtle animation to the ground
  useFrame((state) => {
    if (groundRef.current) {
      // Add any ground animations here if needed
    }
  });

  return (
    <>
      {/* Ground Plane */}
      <Plane
        ref={groundRef}
        args={[10000, 10000]} // Ground rất lớn
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.1} />
      </Plane>

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Directional Lighting */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Additional fill light for better visibility */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
}
