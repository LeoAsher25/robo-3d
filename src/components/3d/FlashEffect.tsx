import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshBasicMaterial, PointLight, Group } from "three";
import { useCharacterStore } from "../../stores/useCharacterStore";

interface FlashParticle {
  position: [number, number, number];
  startTime: number;
  life: number;
  id: number;
  velocity: [number, number, number];
}

export const FlashEffect: React.FC = () => {
  const {
    flashActive,
    flashStartPosition,
    flashEndPosition,
    flashStartTime,
    flashDuration,
  } = useCharacterStore();
  const [startParticles, setStartParticles] = useState<FlashParticle[]>([]);
  const [endParticles, setEndParticles] = useState<FlashParticle[]>([]);
  const particleIdRef = useRef(0);

  // Create flash material
  const flashMaterial = useMemo(() => {
    return new MeshBasicMaterial({
      color: 0xffff00, // Bright yellow for flash effect
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  // Generate flash particles when flash activates
  useEffect(() => {
    if (!flashActive) return;

    // Create burst of particles at start position
    const startBurst: FlashParticle[] = [];
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const radius = 0.5 + Math.random() * 0.5;
      const velocity: [number, number, number] = [
        Math.cos(angle) * radius * 2,
        Math.random() * 2 - 1,
        Math.sin(angle) * radius * 2,
      ];

      startBurst.push({
        position: [...flashStartPosition] as [number, number, number],
        startTime: Date.now(),
        life: 600, // 0.6 seconds
        id: particleIdRef.current++,
        velocity,
      });
    }

    // Create burst of particles at end position
    const endBurst: FlashParticle[] = [];
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const radius = 0.5 + Math.random() * 0.5;
      const velocity: [number, number, number] = [
        Math.cos(angle) * radius * 2,
        Math.random() * 2 - 1,
        Math.sin(angle) * radius * 2,
      ];

      endBurst.push({
        position: [...flashEndPosition] as [number, number, number],
        startTime: Date.now(),
        life: 600, // 0.6 seconds
        id: particleIdRef.current++,
        velocity,
      });
    }

    setStartParticles(startBurst);
    setEndParticles(endBurst);
  }, [flashActive, flashStartPosition, flashEndPosition]);

  // Update particles
  useFrame((state) => {
    const currentTime = Date.now();

    // Update start particles
    setStartParticles((prev) =>
      prev.filter((particle) => {
        const age = currentTime - particle.startTime;
        if (age >= particle.life) return false;

        // Update particle position based on velocity
        const progress = age / particle.life;
        particle.position[0] += particle.velocity[0] * 0.016; // 60fps
        particle.position[1] += particle.velocity[1] * 0.016;
        particle.position[2] += particle.velocity[2] * 0.016;

        return true;
      })
    );

    // Update end particles
    setEndParticles((prev) =>
      prev.filter((particle) => {
        const age = currentTime - particle.startTime;
        if (age >= particle.life) return false;

        // Update particle position based on velocity
        const progress = age / particle.life;
        particle.position[0] += particle.velocity[0] * 0.016; // 60fps
        particle.position[1] += particle.velocity[1] * 0.016;
        particle.position[2] += particle.velocity[2] * 0.016;

        return true;
      })
    );
  });

  if (
    !flashActive &&
    startParticles.length === 0 &&
    endParticles.length === 0
  ) {
    return null;
  }

  return (
    <>
      {/* Start flash effect */}
      {startParticles.map((particle) => {
        const age = Date.now() - particle.startTime;
        const opacity = Math.max(0, 0.8 * (1 - age / particle.life));

        return (
          <group key={`start-${particle.id}`}>
            <mesh position={particle.position} material={flashMaterial}>
              <sphereGeometry args={[0.05, 8, 8]} />
            </mesh>
            <pointLight
              position={particle.position}
              intensity={opacity * 2}
              distance={2}
              color={0xffff00}
            />
          </group>
        );
      })}

      {/* End flash effect */}
      {endParticles.map((particle) => {
        const age = Date.now() - particle.startTime;
        const opacity = Math.max(0, 0.8 * (1 - age / particle.life));

        return (
          <group key={`end-${particle.id}`}>
            <mesh position={particle.position} material={flashMaterial}>
              <sphereGeometry args={[0.05, 8, 8]} />
            </mesh>
            <pointLight
              position={particle.position}
              intensity={opacity * 2}
              distance={2}
              color={0xffff00}
            />
          </group>
        );
      })}
    </>
  );
};
