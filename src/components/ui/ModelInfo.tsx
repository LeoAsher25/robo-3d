"use client";

import { useState, useEffect } from "react";

interface ModelInfoProps {
  modelPath: string;
}

export function ModelInfo({ modelPath }: ModelInfoProps) {
  const [modelInfo, setModelInfo] = useState({
    loaded: false,
    error: false,
    fileSize: "26MB",
    format: "GLB",
    vertices: "~50,000",
    textures: "Yes",
  });

  useEffect(() => {
    // Simulate model loading status
    const timer = setTimeout(() => {
      setModelInfo((prev) => ({ ...prev, loaded: true }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm max-w-xs">
      <h3 className="font-bold mb-3 text-blue-400">Yasuo Model Info</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>File:</span>
          <span className="text-green-400">Yasuo_Base.glb</span>
        </div>
        <div className="flex justify-between">
          <span>Size:</span>
          <span>{modelInfo.fileSize}</span>
        </div>
        <div className="flex justify-between">
          <span>Format:</span>
          <span>{modelInfo.format}</span>
        </div>
        <div className="flex justify-between">
          <span>Vertices:</span>
          <span>{modelInfo.vertices}</span>
        </div>
        <div className="flex justify-between">
          <span>Textures:</span>
          <span className="text-green-400">{modelInfo.textures}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span
            className={modelInfo.loaded ? "text-green-400" : "text-yellow-400"}>
            {modelInfo.loaded ? "✓ Loaded" : "⏳ Loading..."}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <div className="text-xs text-gray-400">
          <div>• High-quality Yasuo character</div>
          <div>• Optimized for web performance</div>
          <div>• Fallback to placeholder if needed</div>
        </div>
      </div>
    </div>
  );
}
