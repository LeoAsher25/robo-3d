"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface CharacterProps {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Character({
  modelPath = "/models/yasuo-wheelchair.glb",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  // Get character state from store
  const {
    action,
    isAnimating,
    animationProgress,
    setAnimationProgress,
    animationDuration,
    dashActive,
    dashStartPosition,
    dashTargetPosition,
    dashStartTime,
    dashDuration,
    humorousActive,
    humorousStartTime,
    humorousDuration,
    ultimateActive,
    ultimateStartTime,
    ultimateDuration,
  } = useCharacterStore();

  // Animation timing
  const [animationStartTime, setAnimationStartTime] = useState<number>(0);

  // Initialize animation when Q_ATTACK, D_ABILITY, or R_ABILITY starts
  useEffect(() => {
    if (action === "Q_ATTACK") {
      setAnimationStartTime(Date.now());
      console.log("Q_ATTACK animation started");
    } else if (action === "D_ABILITY") {
      setAnimationStartTime(Date.now());
      console.log("D_ABILITY animation started");
    } else if (action === "R_ABILITY") {
      setAnimationStartTime(Date.now());
      console.log("R_ABILITY animation started");
    }
  }, [action]);

  // Animation frame update
  useFrame(() => {
    if (
      (action === "Q_ATTACK" ||
        action === "D_ABILITY" ||
        action === "R_ABILITY") &&
      isAnimating
    ) {
      const currentTime = Date.now();
      const elapsed = currentTime - animationStartTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimationProgress(progress);

      // Debug logging
      if (progress % 0.1 < 0.01) {
        console.log(`Animation progress: ${(progress * 100).toFixed(1)}%`);
      }
    }
  });

  // Calculate sword thrust animation values
  const getSwordThrustAnimation = () => {
    if (action !== "Q_ATTACK") {
      return {
        rightArmRotation: [0, 0, 0] as [number, number, number],
        leftArmRotation: [0, 0, 0] as [number, number, number],
        bodyForward: 0,
        armExtension: 0,
      };
    }

    // Create a smooth sword thrust animation
    const t = animationProgress;
    console.log(`Animation calculation - t: ${t}, action: ${action}`);

    // Easing function for smooth animation
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const easedT = easeInOut(t);

    // Sword thrust animation phases
    let rightArmRotation: [number, number, number];
    let leftArmRotation: [number, number, number];
    let bodyForward = 0;
    let armExtension = 0;

    if (t < 0.3) {
      // Wind up phase
      const windUpProgress = t / 0.3;
      rightArmRotation = [0, 0, (-Math.PI / 4) * windUpProgress];
      leftArmRotation = [0, 0, (Math.PI / 6) * windUpProgress];
      bodyForward = -0.1 * windUpProgress;
      console.log(`Wind up phase - progress: ${windUpProgress}`);
    } else if (t < 0.7) {
      // Thrust phase
      const thrustProgress = (t - 0.3) / 0.4;
      rightArmRotation = [0, 0, -Math.PI / 4 + (Math.PI / 2) * thrustProgress];
      leftArmRotation = [0, 0, Math.PI / 6 - (Math.PI / 6) * thrustProgress];
      bodyForward = -0.1 + 0.2 * thrustProgress;
      armExtension = 0.3 * thrustProgress;
      console.log(`Thrust phase - progress: ${thrustProgress}`);
    } else {
      // Return phase
      const returnProgress = (t - 0.7) / 0.3;
      rightArmRotation = [0, 0, Math.PI / 4 - (Math.PI / 4) * returnProgress];
      leftArmRotation = [0, 0, 0];
      bodyForward = 0.1 - 0.1 * returnProgress;
      armExtension = 0.3 - 0.3 * returnProgress;
      console.log(`Return phase - progress: ${returnProgress}`);
    }

    return {
      rightArmRotation,
      leftArmRotation,
      bodyForward,
      armExtension,
    };
  };

  const animation = getSwordThrustAnimation();

  // Calculate humorous action animation values
  const getHumorousAnimation = () => {
    if (action !== "D_ABILITY") {
      return {
        groupRotation: [0, 0, 0] as [number, number, number],
        bodyColor: "#4169E1",
        armColor: "#8B4513",
      };
    }

    // Create a rapid spinning animation for humorous action
    const t = animationProgress;
    console.log(`Humorous animation calculation - t: ${t}, action: ${action}`);

    // Easing function for smooth spinning
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const easedT = easeInOut(t);

    // Calculate rotation (3-5 full rotations during animation)
    const totalRotations = 4; // 4 full rotations
    const rotationY = totalRotations * 2 * Math.PI * easedT;

    // Color changes during spinning for visual feedback
    const bodyColor = action === "D_ABILITY" ? "#FFD700" : "#4169E1"; // Gold during spin
    const armColor = action === "D_ABILITY" ? "#FF6B6B" : "#8B4513"; // Red during spin

    return {
      groupRotation: [0, rotationY, 0] as [number, number, number],
      bodyColor,
      armColor,
    };
  };

  const humorousAnimation = getHumorousAnimation();

  // Calculate ultimate action animation values
  const getUltimateAnimation = () => {
    if (action !== "R_ABILITY") {
      return {
        groupRotation: [0, 0, 0] as [number, number, number],
        bodyColor: "#4169E1",
        armColor: "#8B4513",
        bodyScale: 1,
        armScale: 1,
      };
    }

    // Create a dramatic over-the-top animation for ultimate ability
    const t = animationProgress;
    console.log(`Ultimate animation calculation - t: ${t}, action: ${action}`);

    // Easing function for dramatic animation
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const easedT = easeInOut(t);

    // Ultimate animation phases
    let groupRotation: [number, number, number];
    let bodyColor = "#4169E1";
    let armColor = "#8B4513";
    let bodyScale = 1;
    let armScale = 1;

    if (t < 0.3) {
      // Wind-up phase - dramatic preparation
      const windUpProgress = t / 0.3;
      groupRotation = [0, 0, (-Math.PI / 6) * windUpProgress];
      bodyColor = "#FF4500"; // Orange-red during wind-up
      armColor = "#FFD700"; // Gold arms
      bodyScale = 1 + 0.2 * windUpProgress;
      armScale = 1 + 0.3 * windUpProgress;
    } else if (t < 0.7) {
      // Execution phase - dramatic action
      const executionProgress = (t - 0.3) / 0.4;
      groupRotation = [0, 0, -Math.PI / 6 + (Math.PI / 3) * executionProgress];
      bodyColor = "#FF0000"; // Bright red during execution
      armColor = "#FFD700"; // Gold arms
      bodyScale = 1.2 + 0.3 * executionProgress;
      armScale = 1.3 + 0.4 * executionProgress;
    } else {
      // Recovery phase - return to normal
      const recoveryProgress = (t - 0.7) / 0.3;
      groupRotation = [0, 0, Math.PI / 6 - (Math.PI / 6) * recoveryProgress];
      bodyColor = "#4169E1"; // Return to normal blue
      armColor = "#8B4513"; // Return to normal brown
      bodyScale = 1.5 - 0.5 * recoveryProgress;
      armScale = 1.7 - 0.7 * recoveryProgress;
    }

    return {
      groupRotation,
      bodyColor,
      armColor,
      bodyScale,
      armScale,
    };
  };

  const ultimateAnimation = getUltimateAnimation();

  // Calculate dash movement position
  const getDashPosition = () => {
    if (!dashActive) {
      return position;
    }

    const elapsedTime = Date.now() - dashStartTime;
    const progress = Math.min(elapsedTime / dashDuration, 1);

    // Easing function for smooth dash movement
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOut(progress);

    // Interpolate between start and target positions
    const currentPosition: [number, number, number] = [
      dashStartPosition[0] +
        (dashTargetPosition[0] - dashStartPosition[0]) * easedProgress,
      dashStartPosition[1] +
        (dashTargetPosition[1] - dashStartPosition[1]) * easedProgress,
      dashStartPosition[2] +
        (dashTargetPosition[2] - dashStartPosition[2]) * easedProgress,
    ];

    return currentPosition;
  };

  const currentPosition = getDashPosition();

  return (
    <group
      ref={groupRef}
      position={currentPosition}
      rotation={[
        rotation[0] +
          humorousAnimation.groupRotation[0] +
          ultimateAnimation.groupRotation[0],
        rotation[1] +
          humorousAnimation.groupRotation[1] +
          ultimateAnimation.groupRotation[1],
        rotation[2] +
          humorousAnimation.groupRotation[2] +
          ultimateAnimation.groupRotation[2],
      ]}
      scale={scale}>
      {/* Placeholder Yasuo in wheelchair character made of basic shapes */}
      <group position={[0, 0.5, 0]}>
        {/* Head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Body - moves forward during thrust */}
        <mesh
          ref={bodyRef}
          position={[0, 0.5, animation.bodyForward]}
          scale={[
            ultimateAnimation.bodyScale,
            ultimateAnimation.bodyScale,
            ultimateAnimation.bodyScale,
          ]}>
          <boxGeometry args={[0.8, 1, 0.3]} />
          <meshStandardMaterial
            color={
              action === "Q_ATTACK"
                ? "#4ECDC4"
                : action === "R_ABILITY"
                ? ultimateAnimation.bodyColor
                : humorousAnimation.bodyColor
            }
          />
        </mesh>

        {/* Right Arm - animated for sword thrust */}
        <mesh
          ref={rightArmRef}
          position={[0.6 + animation.armExtension, 0.8, 0]}
          rotation={animation.rightArmRotation}
          scale={[
            ultimateAnimation.armScale,
            ultimateAnimation.armScale,
            ultimateAnimation.armScale,
          ]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial
            color={
              action === "Q_ATTACK"
                ? "#FF6B6B"
                : action === "R_ABILITY"
                ? ultimateAnimation.armColor
                : humorousAnimation.armColor
            }
          />
        </mesh>

        {/* Left Arm - supporting arm during thrust */}
        <mesh
          ref={leftArmRef}
          position={[-0.6, 0.8, 0]}
          rotation={animation.leftArmRotation}
          scale={[
            ultimateAnimation.armScale,
            ultimateAnimation.armScale,
            ultimateAnimation.armScale,
          ]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial
            color={
              action === "R_ABILITY"
                ? ultimateAnimation.armColor
                : humorousAnimation.armColor
            }
          />
        </mesh>

        {/* Wheelchair seat */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#696969" />
        </mesh>

        {/* Wheelchair back */}
        <mesh position={[0, 0.3, -0.4]}>
          <boxGeometry args={[1.2, 0.8, 0.1]} />
          <meshStandardMaterial color="#696969" />
        </mesh>

        {/* Wheels */}
        <mesh position={[0.7, -0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>
        <mesh position={[-0.7, -0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#2F4F4F" />
        </mesh>

        {/* Wheel spokes */}
        <mesh position={[0.7, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.7, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.7, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.7, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
}

// TODO: When the actual GLB model is available, uncomment this code:
/*
import { useGLTF } from "@react-three/drei";

export function Character({
  modelPath = "/models/yasuo-wheelchair.glb",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hasError, setHasError] = useState(false);

  // Load the 3D model using useGLTF with error handling
  const { scene, nodes, materials } = useGLTF(modelPath);

  // Error handling for model loading
  useEffect(() => {
    if (!scene) {
      setHasError(true);
      console.error(`Failed to load model: ${modelPath}`);
    } else {
      setHasError(false);
    }
  }, [scene, modelPath]);

  // If there's an error, render a placeholder cube
  if (hasError) {
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model to avoid loading delays
useGLTF.preload("/models/yasuo-wheelchair.glb");
*/
