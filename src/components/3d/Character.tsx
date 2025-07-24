"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface CharacterProps {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Character({
  modelPath = "/models/Yasuo_Base.glb",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  // Load the 3D model
  const { scene: modelScene, animations } = useGLTF(modelPath);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);

  // Animation mixer for glTF animations
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

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
    humorousActive,
    humorousStartTime,
    humorousDuration,
    ultimateActive,
    ultimateStartTime,
    ultimateDuration,
    resetAnimation,
  } = useCharacterStore();

  // Animation timing
  const [animationStartTime, setAnimationStartTime] = useState<number>(0);

  // Handle model loading
  useEffect(() => {
    if (modelScene) {
      setModelLoaded(true);
      setModelError(false);
      console.log("Yasuo model loaded successfully");
    }
  }, [modelScene]);

  // Handle model loading errors
  useEffect(() => {
    const handleModelError = () => {
      setModelError(true);
      setModelLoaded(false);
      console.log("Failed to load Yasuo model, using placeholder");
    };

    // Add error handling for model loading
    if (modelScene) {
      modelScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.userData = { ...child.userData, onError: handleModelError };
        }
      });
    }
  }, [modelScene]);

  // Play glTF animation when action changes
  useEffect(() => {
    if (!modelScene || !animations || animations.length === 0) return;
    if (!mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(modelScene);
    }
    if (actionRef.current) {
      actionRef.current.stop();
      actionRef.current = null;
    }
    let animIndex = 0;
    // if (action === "Q_ATTACK") animIndex = 0;
    // else if (action === "D_ABILITY") animIndex = 1;
    // else if (action === "R_ABILITY") animIndex = 43;

    const Q_animation_indexes = [33, 34, 35];
    switch (action) {
      case "Q_ATTACK":
        animIndex =
          Q_animation_indexes[
            Math.floor(Math.random() * Q_animation_indexes.length)
          ];
        break;
      case "W_ABILITY":
        animIndex = 37;
        break;
      case "E_ABILITY":
        animIndex = 42;
        break;
      case "R_ABILITY":
        animIndex = 43;
        break;
      case "F_ABILITY":
        animIndex = 3;
        break;
      case "D_ABILITY":
        animIndex = 1;
        break;
      default:
        animIndex = 0;
        break;
    }

    if (animIndex >= 1 && animIndex < animations.length && mixerRef.current) {
      const clip = animations[animIndex - 1];
      const animAction = mixerRef.current.clipAction(clip);
      animAction.reset().setLoop(THREE.LoopOnce, 0).clampWhenFinished = true;
      animAction.play();
      actionRef.current = animAction;

      // Optional: lắng nghe khi animation kết thúc
      const onFinished = () => {
        // Ví dụ: reset action về "" hoặc trạng thái idle
        // setAction(""); // nếu bạn có hàm setAction
        resetAnimation();
      };
      animAction.getMixer().addEventListener("finished", onFinished);

      // Cleanup listener khi unmount hoặc đổi action
      return () => {
        animAction.getMixer().removeEventListener("finished", onFinished);
      };
    }
  }, [action, modelScene, animations]);

  // Update mixer mỗi frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
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

  const { camera, gl } = useThree();

  // State for dash movement
  const [currentPosition, setCurrentPosition] =
    useState<[number, number, number]>(position);
  const [dashActiveLocal, setDashActiveLocal] = useState(false);
  const [dashStart, setDashStart] =
    useState<[number, number, number]>(position);
  const [dashTarget, setDashTarget] =
    useState<[number, number, number]>(position);
  const [dashStartTime, setDashStartTime] = useState(0);
  const dashDuration = 500; // ms

  // Thêm state cho hướng quay nhân vật
  const [characterRotationY, setCharacterRotationY] = useState(0);

  // Khi dashActive từ store bật lên, bắt đầu dash nội bộ
  useEffect(() => {
    if (dashActive && dashTargetPosition && dashStartPosition) {
      setDashStart(currentPosition);
      setDashTarget(dashTargetPosition);
      setDashStartTime(Date.now());
      setDashActiveLocal(true);
    }
  }, [dashActive, dashTargetPosition, dashStartPosition, currentPosition]);

  // Dash logic: interpolate vị trí
  useFrame(() => {
    if (dashActiveLocal) {
      const elapsed = Date.now() - dashStartTime;
      const progress = Math.min(elapsed / dashDuration, 1);
      // Di chuyển đều (linear)
      const eased = progress; // Không dùng easeOut nữa
      const newPos: [number, number, number] = [
        dashStart[0] + (dashTarget[0] - dashStart[0]) * eased,
        dashStart[1] + (dashTarget[1] - dashStart[1]) * eased,
        dashStart[2] + (dashTarget[2] - dashStart[2]) * eased,
      ];
      setCurrentPosition(newPos);
      if (progress >= 1) {
        setDashActiveLocal(false);
        setCurrentPosition(dashTarget); // Giữ vị trí mới
        resetAnimation(); // Reset animation sau khi dash xong
      }
    }
  });

  // Click chuột phải để di chuyển Yasuo
  useEffect(() => {
    if (!gl || !camera) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (event.button === 2) {
        // Right click
        const rect = gl.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);
        setDashStart(currentPosition);
        setDashTarget([intersection.x, intersection.y, intersection.z]);
        setDashStartTime(Date.now());
        setDashActiveLocal(true);
        // Tính góc hướng về đích
        const dx = intersection.x - currentPosition[0];
        const dz = intersection.z - currentPosition[2];
        const angle = Math.atan2(dx, dz);
        setCharacterRotationY(angle);
        // Play animation 27 khi click chuột phải
        if (mixerRef.current && animations && animations[27]) {
          if (actionRef.current) {
            actionRef.current.stop();
            actionRef.current = null;
          }
          const clip = animations[27];
          const animAction = mixerRef.current.clipAction(clip);
          animAction.reset().setLoop(THREE.LoopOnce, 0).clampWhenFinished =
            true;
          animAction.play();
          actionRef.current = animAction;
        }
      }
    };
    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [camera, gl, currentPosition, animations]);

  // Thay currentPosition vào vị trí nhân vật
  return (
    <group
      ref={groupRef}
      position={currentPosition}
      rotation={[0, characterRotationY, 0]}
      scale={scale}>
      {/* Render actual Yasuo model if loaded successfully */}
      {modelLoaded && !modelError && (
        <primitive
          object={modelScene}
          position={[0, 0, 0]}
          scale={[scale, scale, scale]}
        />
      )}
    </group>
  );
}

// Preload the Yasuo model to avoid loading delays
useGLTF.preload("/models/Yasuo_Base.glb");
