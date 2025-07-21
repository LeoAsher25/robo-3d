import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function useCameraKeyboardControls() {
  const { camera } = useThree();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const step = 0.5;
      const zoomStep = 0.5;
      switch (event.code) {
        case "ArrowUp":
          camera.position.z -= step;
          break;
        case "ArrowDown":
          camera.position.z += step;
          break;
        case "ArrowLeft":
          camera.position.x -= step;
          break;
        case "ArrowRight":
          camera.position.x += step;
          break;
        case "NumpadAdd":
        case "Equal":
          camera.position.multiplyScalar(1 - zoomStep * 0.05);
          break;
        case "NumpadSubtract":
        case "Minus":
          camera.position.multiplyScalar(1 + zoomStep * 0.05);
          break;
        default:
          return;
      }
      camera.updateProjectionMatrix();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);
}
