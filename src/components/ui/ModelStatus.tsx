"use client";

import { useCharacterStore } from "../../stores/useCharacterStore";

export function ModelStatus() {
  const { position } = useCharacterStore();

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Model Status</h3>
      <div className="space-y-1">
        <div>Model: Yasuo_Base.glb</div>
        <div>
          Position: [{position[0].toFixed(2)}, {position[1].toFixed(2)},{" "}
          {position[2].toFixed(2)}]
        </div>
        <div className="text-green-400">✓ Model loaded successfully</div>
        <div className="text-yellow-400">
          ⚠ Fallback to placeholder if model fails
        </div>
      </div>
    </div>
  );
}
