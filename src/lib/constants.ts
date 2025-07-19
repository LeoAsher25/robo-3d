// 3D Scene Constants
export const SCENE_CONFIG = {
  CAMERA: {
    POSITION: [0, 5, 10] as [number, number, number],
    FOV: 75,
  },
  GROUND: {
    SIZE: 20,
    POSITION: [0, -1, 0] as [number, number, number],
    COLOR: "#2a2a2a",
  },
  LIGHTING: {
    AMBIENT_INTENSITY: 0.4,
    DIRECTIONAL_INTENSITY: 1,
    FILL_INTENSITY: 0.3,
  },
};

// Keyboard Controls (for future stories)
export const KEYBOARD_CONTROLS = {
  Q: "KeyQ",
  W: "KeyW",
  E: "KeyE",
  R: "KeyR",
  F: "KeyF",
  D: "KeyD",
} as const;
