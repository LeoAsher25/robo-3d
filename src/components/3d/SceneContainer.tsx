"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "./Environment";
import { Character } from "./Character";
import { WindWall } from "./WindWall";
import { DashTrail } from "./DashTrail";
import { FlashEffect } from "./FlashEffect";
import { UltimateTextBubble } from "./UltimateTextBubble";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface SceneContainerProps {
  children?: React.ReactNode;
}

export default function SceneContainer({ children }: SceneContainerProps) {
  // Initialize keyboard controls
  useKeyboardControls();

  // Get character position for wind wall positioning
  const { position: characterPosition } = useCharacterStore();

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: "#1a1a1a" }}>
        <Environment />
        <Suspense fallback={null}>
          <Character
            modelPath="/models/yasuo-wheelchair.glb"
            position={[0, 0, 0]}
            scale={1}
          />
        </Suspense>
        <WindWall characterPosition={characterPosition} />
        <DashTrail />
        <FlashEffect />
        <UltimateTextBubble />
        {children}
      </Canvas>
    </div>
  );
}
