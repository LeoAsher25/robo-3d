"use client";

import { useCharacterStore } from "../../stores/useCharacterStore";

export function TestControls() {
  const {
    setAction,
    action,
    isAnimating,
    animationProgress,
    activateWindWall,
    windWallActive,
    activateDash,
    dashActive,
    activateFlash,
    flashActive,
    activateHumorous,
    humorousActive,
    activateUltimate,
    ultimateActive,
  } = useCharacterStore();

  const triggerQAttack = () => {
    console.log("Manual Q attack triggered");
    setAction("Q_ATTACK");
  };

  const resetAnimation = () => {
    console.log("Manual reset triggered");
    setAction("IDLE");
  };

  const triggerWindWall = () => {
    console.log("Manual wind wall triggered");
    activateWindWall();
  };

  const triggerDash = () => {
    console.log("Manual dash triggered");
    activateDash();
  };

  const triggerFlash = () => {
    console.log("Manual flash teleport triggered");
    activateFlash();
  };

  const triggerHumorous = () => {
    console.log("Manual humorous action triggered");
    activateHumorous();
  };

  const triggerUltimate = () => {
    console.log("Manual ultimate ability triggered");
    activateUltimate();
  };

  return (
    <div className="text-white p-[16px] rounded">
      <h3 className="text-lg font-bold mb-2">Test Controls</h3>
      <div className="flex gap-[8px] flex-wrap">
        <button
          onClick={triggerQAttack}
          disabled={isAnimating}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 rounded mr-2">
          Trigger Q Attack
        </button>
        <button
          onClick={resetAnimation}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded mr-2">
          Reset Animation
        </button>
        <button
          onClick={triggerWindWall}
          disabled={windWallActive}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 rounded mr-2">
          Trigger Wind Wall
        </button>
        <button
          onClick={triggerDash}
          disabled={dashActive}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded mr-2">
          Trigger Dash
        </button>
        <button
          onClick={triggerFlash}
          disabled={flashActive}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-500 rounded mr-2">
          Trigger Flash
        </button>
        <button
          onClick={triggerHumorous}
          disabled={humorousActive}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 rounded mr-2">
          Trigger Humorous
        </button>
        <button
          onClick={triggerUltimate}
          disabled={ultimateActive}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 rounded">
          Trigger Ultimate
        </button>
      </div>
      <div className="mt-[16px] text-sm">
        <div>Action: {action}</div>
        <div>Animating: {isAnimating ? "Yes" : "No"}</div>
        <div>Progress: {(animationProgress * 100).toFixed(1)}%</div>
        <div>Wind Wall Active: {windWallActive ? "Yes" : "No"}</div>
        <div>Dash Active: {dashActive ? "Yes" : "No"}</div>
        <div>Flash Active: {flashActive ? "Yes" : "No"}</div>
        <div>Humorous Active: {humorousActive ? "Yes" : "No"}</div>
        <div>Ultimate Active: {ultimateActive ? "Yes" : "No"}</div>
      </div>
      <div className="mt-[24px] text-sm bg-gray-900/80 p-3 rounded">
        <div className="font-bold mb-1 text-blue-300">3D Camera Controls</div>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            <b>Zoom:</b> Lăn chuột giữa hoặc dùng phím <b>+/-</b>
          </li>
          <li>
            <b>Xoay:</b> Giữ chuột phải và kéo
          </li>
          <li>
            <b>Kéo (Pan):</b> Giữ chuột trái và kéo
          </li>
          <li>
            <b>Di chuyển camera:</b> Phím <b>Up/Down/Left/Right</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
