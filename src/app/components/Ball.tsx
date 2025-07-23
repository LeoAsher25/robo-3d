"use client";

import { useSphere } from "@react-three/cannon";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import { useRef, useEffect } from "react";

export default function Ball() {
  const texture = useLoader(TextureLoader, "/earth.jpg");
  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [0.5],
    restitution: 0.6,
  }));

  const keysPressed = useRef({});
  const force = 6;

  // Lắng nghe phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;

      // Tạo vector hướng nhìn hiện tại (đã được normalize)
      const forward = new Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      // Tính vector hướng ngang dựa vào cross product (hướng bên phải)
      const right = new Vector3();
      right.crossVectors(forward, camera.up).normalize();

      const impulse = new Vector3();

      // Tính hướng lực
      if (e.key === "ArrowUp") impulse.add(forward);
      if (e.key === "ArrowDown") impulse.add(forward.clone().negate());
      if (e.key === "ArrowLeft") impulse.add(right.clone().negate());
      if (e.key === "ArrowRight") impulse.add(right);

      if (e.key === " " || e.key === "Space") {
        // Nhảy lên
        api.applyImpulse([0, 6, 0], [0, 0, 0]);
        return;
      }

      // Nhân lực
      impulse.multiplyScalar(force);

      // Apply impulse
      api.applyImpulse([impulse.x, 0, impulse.z], [0, 0, 0]);
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [api, camera]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
