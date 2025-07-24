"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useCharacterStore } from "../../stores/useCharacterStore";

export function UltimateTextBubble() {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<any>(null);

  // Get character state from store
  const {
    textBubbleActive,
    textBubbleText,
    textBubbleStartTime,
    textBubbleDuration,
    position,
  } = useCharacterStore();

  // Animation timing
  const [animationStartTime, setAnimationStartTime] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0);

  // Initialize animation when text bubble becomes active
  useEffect(() => {
    if (textBubbleActive) {
      setAnimationStartTime(Date.now());
      console.log("Text bubble animation started");
    }
  }, [textBubbleActive]);

  // Animation frame update
  useFrame(() => {
    if (textBubbleActive) {
      const currentTime = Date.now();
      const elapsed = currentTime - animationStartTime;
      const progress = Math.min(elapsed / textBubbleDuration, 1);

      // Calculate opacity with fade in/out effect
      let newOpacity = 0;
      if (progress < 0.2) {
        // Fade in (first 20%)
        newOpacity = progress / 0.2;
      } else if (progress > 0.8) {
        // Fade out (last 20%)
        newOpacity = (1 - progress) / 0.2;
      } else {
        // Full opacity (middle 60%)
        newOpacity = 1;
      }

      setOpacity(newOpacity);

      // Debug logging
      if (progress % 0.1 < 0.01) {
        console.log(`Text bubble progress: ${(progress * 100).toFixed(1)}%`);
      }
    }
  });

  if (!textBubbleActive || !textBubbleText) {
    return null;
  }

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1] + 3, position[2]]}
      visible={opacity > 0}>
      {/* Background bubble */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4, 1.5]} />
        <meshStandardMaterial
          color="#FFD700"
          transparent
          opacity={opacity * 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Text */}
      <Text
        ref={textRef}
        position={[0, 0, 0.1]}
        fontSize={0.5}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}>
        {textBubbleText}
      </Text>

      {/* Bubble tail */}
      <mesh position={[0, -0.75, 0]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial
          color="#FFD700"
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>
    </group>
  );
}
