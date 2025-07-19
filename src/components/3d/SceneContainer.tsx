"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "./Environment";

interface SceneContainerProps {
  children?: React.ReactNode;
}

export default function SceneContainer({ children }: SceneContainerProps) {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: "#1a1a1a" }}>
        <Environment />
        {children}
      </Canvas>
    </div>
  );
}
