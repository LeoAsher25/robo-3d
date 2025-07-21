"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Environment } from "./Environment";
import { Character } from "./Character";
import { WindWall } from "./WindWall";
import { DashTrail } from "./DashTrail";
import { FlashEffect } from "./FlashEffect";
import { UltimateTextBubble } from "./UltimateTextBubble";
import { OrbitControls } from "@react-three/drei";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import { useCharacterStore } from "../../stores/useCharacterStore";
import { CameraKeyboardControls } from "./CameraKeyboardControls";

interface SceneContainerProps {
  children?: React.ReactNode;
}

export default function SceneContainer({ children }: SceneContainerProps) {
  // Initialize keyboard controls
  useKeyboardControls();

  // Get character position for wind wall positioning
  const { position: characterPosition } = useCharacterStore();

  return (
    <div className="w-[80vw] h-screen">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: "#1a1a1a" }}>
        <Environment />
        <Suspense fallback={null}>
          <Character
            modelPath="/models/Yasuo_Base.glb"
            position={[0, 0, 0]}
            scale={0.1}
          />
        </Suspense>
        <WindWall characterPosition={characterPosition} />
        <DashTrail />
        <FlashEffect />
        <UltimateTextBubble />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          makeDefault
          minDistance={2}
          maxDistance={30}
          target={[0, 1, 0]}
        />
        <CameraKeyboardControls />
        {children}
      </Canvas>
    </div>
  );
}
