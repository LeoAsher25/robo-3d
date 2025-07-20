import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshBasicMaterial } from "three";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface WindWallProps {
  characterPosition: [number, number, number];
}

export const WindWall: React.FC<WindWallProps> = ({ characterPosition }) => {
  const meshRef = useRef<Mesh>(null);
  const { windWallActive, windWallStartTime, windWallDuration } =
    useCharacterStore();

  // Calculate wind wall position in front of character
  const windWallPosition = useMemo(() => {
    const [x, y, z] = characterPosition;
    // Position wall 2 units in front of character
    return [x, y + 1, z + 2] as [number, number, number];
  }, [characterPosition]);

  // Create wind-like material with transparency
  const material = useMemo(() => {
    return new MeshBasicMaterial({
      color: 0x87ceeb, // Sky blue color
      transparent: true,
      opacity: 0.6,
      side: 2, // DoubleSide
    });
  }, []);

  // Animate wind wall effects
  useFrame((state) => {
    if (!meshRef.current || !windWallActive) return;

    const mesh = meshRef.current;
    const material = mesh.material as MeshBasicMaterial;

    // Calculate fade in/out based on time
    const elapsedTime = Date.now() - windWallStartTime;
    const fadeInDuration = 300; // 300ms fade in
    const fadeOutDuration = 500; // 500ms fade out
    const activeDuration = windWallDuration - fadeInDuration - fadeOutDuration;

    let opacity = 0.6; // Default opacity

    if (elapsedTime < fadeInDuration) {
      // Fade in
      opacity = (elapsedTime / fadeInDuration) * 0.6;
    } else if (elapsedTime > fadeInDuration + activeDuration) {
      // Fade out
      const fadeOutProgress =
        (elapsedTime - fadeInDuration - activeDuration) / fadeOutDuration;
      opacity = 0.6 * (1 - fadeOutProgress);
    }

    material.opacity = Math.max(0, Math.min(0.6, opacity));

    // Add subtle wind-like movement
    const time = state.clock.elapsedTime;
    mesh.rotation.y = Math.sin(time * 2) * 0.1; // Subtle swaying
    mesh.position.y = characterPosition[1] + 1 + Math.sin(time * 3) * 0.05; // Gentle floating
  });

  if (!windWallActive) {
    return null;
  }

  return (
    <mesh ref={meshRef} position={windWallPosition} material={material}>
      <planeGeometry args={[3, 2]} /> {/* 3 units wide, 2 units tall */}
    </mesh>
  );
};
