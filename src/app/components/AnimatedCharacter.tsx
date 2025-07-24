"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/Soldier.glb"; // Đảm bảo file này nằm trong public/models/

type MoveState = { forward: number; turn: number; run: boolean };

function Character() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState("Idle");
  const [move, setMove] = useState<MoveState>({
    forward: 0,
    turn: 0,
    run: false,
  });
  const velocity = move.run ? 5 : 1.8;

  // Xử lý animation chuyển đổi
  useEffect(() => {
    if (!actions) return;
    if (actions[currentAction]) {
      actions[currentAction].reset().fadeIn(0.2).play();
      Object.keys(actions).forEach((name) => {
        if (name !== currentAction) actions[name]?.fadeOut(0.2);
      });
    }
    return () => {
      if (actions[currentAction]) actions[currentAction].fadeOut(0.2);
    };
  }, [currentAction, actions]);

  // Xử lý di chuyển
  useFrame((state, delta) => {
    if (!group.current) return;
    let direction = 0;
    if (move.forward !== 0) {
      direction = move.forward;
      // Di chuyển theo hướng camera
      const angle = state.camera.rotation.y;
      group.current.position.x -=
        Math.sin(angle) * velocity * delta * direction;
      group.current.position.z -=
        Math.cos(angle) * velocity * delta * direction;
    }
    if (move.turn !== 0) {
      group.current.rotation.y -= move.turn * 2 * delta;
    }
    // Animation state
    if (move.forward === 0) setCurrentAction("Idle");
    else if (move.run) setCurrentAction("Run");
    else setCurrentAction("Walk");
  });

  // Xử lý phím
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    setMove((m) => {
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          return { ...m, forward: 1 };
        case "ArrowDown":
        case "KeyS":
          return { ...m, forward: -1 };
        case "ArrowLeft":
        case "KeyA":
          return { ...m, turn: 1 };
        case "ArrowRight":
        case "KeyD":
          return { ...m, turn: -1 };
        case "ShiftLeft":
        case "ShiftRight":
          return { ...m, run: true };
        default:
          return m;
      }
    });
  }, []);
  const onKeyUp = useCallback((e: KeyboardEvent) => {
    setMove((m) => {
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          if (m.forward === 1) return { ...m, forward: 0 };
          break;
        case "ArrowDown":
        case "KeyS":
          if (m.forward === -1) return { ...m, forward: 0 };
          break;
        case "ArrowLeft":
        case "KeyA":
          if (m.turn === 1) return { ...m, turn: 0 };
          break;
        case "ArrowRight":
        case "KeyD":
          if (m.turn === -1) return { ...m, turn: 0 };
          break;
        case "ShiftLeft":
        case "ShiftRight":
          return { ...m, run: false };
        default:
          return m;
      }
      return m;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

export default function AnimatedCharacterScene() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <OrbitControls
        target={[0, 1, 0]}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
      {/* Sàn */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <Character />
    </Canvas>
  );
}

// Đảm bảo file Soldier.glb nằm ở public/models/Soldier.glb
// Có thể đổi tên model hoặc animation nếu model của bạn khác
