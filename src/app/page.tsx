import SceneContainer from "@/components/3d/SceneContainer";
import { TestControls } from "@/components/ui/TestControls";
import { ModelStatus } from "@/components/ui/ModelStatus";
import { ModelInfo } from "@/components/ui/ModelInfo";
import Scene from "./components/Scene";
import AnimatedCharacterScene from "./components/AnimatedCharacter";

export default function Home() {
  return (
    <main className="flex gap-4 w-screen h-screen">
      <SceneContainer />
      <TestControls />
      <ModelStatus />
      {/* <ModelInfo modelPath="/models/Yasuo_Base.glb" /> */}
      {/* <Scene /> */}
      {/* <AnimatedCharacterScene /> */}
    </main>
  );
}
