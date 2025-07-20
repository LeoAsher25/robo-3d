import SceneContainer from "@/components/3d/SceneContainer";
import { TestControls } from "@/components/ui/TestControls";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <SceneContainer>
        {/* Additional 3D components will be added here in future stories */}
      </SceneContainer>
      <TestControls />
    </main>
  );
}
