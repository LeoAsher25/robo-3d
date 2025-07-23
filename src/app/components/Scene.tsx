"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import {
  Physics,
  useSphere,
  usePlane,
  useBox,
  useCylinder,
} from "@react-three/cannon";
import Ball from "./Ball";
import Ramp from "./Ramp";

function Obstacle() {
  const [ref] = useBox(() => ({
    mass: 1, // nặng hơn bóng
    position: [2, 0.5, -2],
    args: [1, 1, 1],
    restitution: 0.3,
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    restitution: 0.4,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#ccc" />
    </mesh>
  );
}

function Walls() {
  const wallThickness = 0.5;
  const wallLength = 20;
  const wallHeight = 2;
  const y = wallHeight / 2;

  return (
    <>
      {/* Tường trước (phía người dùng) */}
      {/* <Wall position={[0, y, wallLength / 2]} /> */}
      {/* Tường sau */}
      <Wall position={[0, y, -wallLength / 2]} />
      {/* Tường trái */}
      <Wall position={[-wallLength / 2, y, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* Tường phải */}
      <Wall position={[wallLength / 2, y, 0]} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}

function Wall({ position, rotation = [0, 0, 0] }) {
  const height = 3; // tăng lên gấp rưỡi
  const [ref] = useBox(() => ({
    type: "Kinematic",
    position,
    rotation,
    args: [20, height, 0.5],
    restitution: 0.6,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[20, height, 0.5]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Pillar() {
  const [ref] = useCylinder(() => ({
    type: "Static",
    position: [-3, 1, 3],
    args: [0.3, 0.3, 2, 32], // radiusTop, radiusBottom, height, segments
  }));

  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
      <meshStandardMaterial color="#8B4513" /> {/* màu gỗ */}
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
      {/* Ánh sáng */}
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
      <OrbitControls />

      <Physics
        gravity={[0, -15, 0]}
        defaultContactMaterial={{
          restitution: 0.5, // bật mạnh
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 3,
        }}>
        {/* Mặt đất vật lý */}
        <Ground />

        {/* Quả bóng vật lý */}
        <Ball />

        {/* Vật cản */}
        <Obstacle />
        <Pillar />
        <Ramp />

        {/* Tường */}
        <Walls />
      </Physics>
    </Canvas>
  );
}
