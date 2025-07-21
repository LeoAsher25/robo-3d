import SceneContainer from "@/components/3d/SceneContainer";
import { TestControls } from "@/components/ui/TestControls";
import { ModelStatus } from "@/components/ui/ModelStatus";
import { ModelInfo } from "@/components/ui/ModelInfo";

export default function Home() {
  return (
    <main className="flex gap-4">
      <SceneContainer>
        {/* Additional 3D components will be added here in future stories */}
      </SceneContainer>
      <TestControls />
      <ModelStatus />
      {/* <ModelInfo modelPath="/models/Yasuo_Base.glb" /> */}
    </main>
  );
}
