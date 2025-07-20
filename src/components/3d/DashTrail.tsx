import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshBasicMaterial, Vector3 } from "three";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface TrailParticle {
  position: [number, number, number];
  startTime: number;
  life: number;
  id: number;
}

export const DashTrail: React.FC = () => {
  const {
    dashActive,
    dashStartPosition,
    dashTargetPosition,
    dashStartTime,
    dashDuration,
  } = useCharacterStore();
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);

  // Create particle material
  const particleMaterial = useMemo(() => {
    return new MeshBasicMaterial({
      color: 0x00ffff, // Cyan color for trail effect
      transparent: true,
      opacity: 0.7,
    });
  }, []);

  // Generate particles during dash
  useEffect(() => {
    if (!dashActive) return;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - dashStartTime;
      const progress = Math.min(elapsedTime / dashDuration, 1);

      // Interpolate current position
      const currentPosition: [number, number, number] = [
        dashStartPosition[0] +
          (dashTargetPosition[0] - dashStartPosition[0]) * progress,
        dashStartPosition[1] +
          (dashTargetPosition[1] - dashStartPosition[1]) * progress,
        dashStartPosition[2] +
          (dashTargetPosition[2] - dashStartPosition[2]) * progress,
      ];

      // Add new particle
      const newParticle: TrailParticle = {
        position: currentPosition,
        startTime: Date.now(),
        life: 1000, // 1 second life
        id: particleIdRef.current++,
      };

      setParticles((prev) => [...prev, newParticle]);
    }, 50); // Generate particle every 50ms

    return () => clearInterval(interval);
  }, [
    dashActive,
    dashStartPosition,
    dashTargetPosition,
    dashStartTime,
    dashDuration,
  ]);

  // Update particles
  useFrame(() => {
    const currentTime = Date.now();

    setParticles((prev) =>
      prev.filter((particle) => {
        const age = currentTime - particle.startTime;
        return age < particle.life;
      })
    );
  });

  if (!dashActive && particles.length === 0) {
    return null;
  }

  return (
    <>
      {particles.map((particle) => {
        const age = Date.now() - particle.startTime;
        const opacity = Math.max(0, 0.7 * (1 - age / particle.life));

        return (
          <mesh
            key={particle.id}
            position={particle.position}
            material={particleMaterial}>
            <sphereGeometry args={[0.1, 8, 8]} />
          </mesh>
        );
      })}
    </>
  );
};
