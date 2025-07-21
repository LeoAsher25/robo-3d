import { create } from "zustand";

export interface CharacterState {
  position: [number, number, number];
  action: string | null; // 'Q_ATTACK', 'W_ABILITY', 'E_ABILITY', 'F_ABILITY', 'D_ABILITY', 'R_ABILITY', 'IDLE'
  isAnimating: boolean;
  animationProgress: number;
  animationDuration: number;
  windWallActive: boolean;
  windWallStartTime: number;
  windWallDuration: number;
  dashActive: boolean;
  dashStartPosition: [number, number, number];
  dashTargetPosition: [number, number, number];
  dashStartTime: number;
  dashDuration: number;
  flashActive: boolean;
  flashStartPosition: [number, number, number];
  flashEndPosition: [number, number, number];
  flashStartTime: number;
  flashDuration: number;
  humorousActive: boolean;
  humorousStartTime: number;
  humorousDuration: number;
  ultimateActive: boolean;
  ultimateStartTime: number;
  ultimateDuration: number;
  textBubbleActive: boolean;
  textBubbleText: string;
  textBubbleStartTime: number;
  textBubbleDuration: number;
  setAction: (action: string | null) => void;
  setAnimationProgress: (progress: number) => void;
  setAnimationDuration: (duration: number) => void;
  resetAnimation: () => void;
  setPosition: (position: [number, number, number]) => void;
  activateWindWall: () => void;
  deactivateWindWall: () => void;
  activateDash: () => void;
  deactivateDash: () => void;
  activateFlash: () => void;
  deactivateFlash: () => void;
  activateHumorous: () => void;
  deactivateHumorous: () => void;
  activateUltimate: () => void;
  deactivateUltimate: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  // Initial state
  position: [0, 0, 0],
  action: "IDLE",
  isAnimating: false,
  animationProgress: 0,
  animationDuration: 1000, // 1 second default
  windWallActive: false,
  windWallStartTime: 0,
  windWallDuration: 3500, // 3.5 seconds
  dashActive: false,
  dashStartPosition: [0, 0, 0],
  dashTargetPosition: [0, 0, 0],
  dashStartTime: 0,
  dashDuration: 800, // 0.8 seconds
  flashActive: false,
  flashStartPosition: [0, 0, 0],
  flashEndPosition: [0, 0, 0],
  flashStartTime: 0,
  flashDuration: 600, // 0.6 seconds
  humorousActive: false,
  humorousStartTime: 0,
  humorousDuration: 1500, // 1.5 seconds
  ultimateActive: false,
  ultimateStartTime: 0,
  ultimateDuration: 2500, // 2.5 seconds
  textBubbleActive: false,
  textBubbleText: "",
  textBubbleStartTime: 0,
  textBubbleDuration: 2000, // 2 seconds

  // Actions
  setAction: (action) => {
    console.log(`Setting action to: ${action}`);
    set({ action });
    if (action === "Q_ATTACK") {
      console.log("Starting Q_ATTACK animation");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "W_ABILITY") {
      console.log("Activating W_ABILITY - Wind Wall");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "E_ABILITY") {
      console.log("Activating E_ABILITY - Dash");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "F_ABILITY") {
      console.log("Activating F_ABILITY - Flash Teleport");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "D_ABILITY") {
      console.log("Activating D_ABILITY - Humorous Action");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "R_ABILITY") {
      console.log("Activating R_ABILITY - Ultimate");
      set({ isAnimating: true, animationProgress: 0 });
    } else if (action === "IDLE") {
      console.log("Resetting to IDLE");
      set({ isAnimating: false, animationProgress: 0 });
    }
  },

  setAnimationProgress: (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    set({ animationProgress: clampedProgress });
    console.log(`Animation progress: ${(clampedProgress * 100).toFixed(1)}%`);

    // Auto-reset to IDLE when animation completes
    if (progress >= 1) {
      console.log("Animation completed, resetting to IDLE");
      setTimeout(() => {
        set({ action: "IDLE", isAnimating: false, animationProgress: 0 });
      }, 100); // Small delay to ensure animation completes
    }
  },

  setAnimationDuration: (duration) => {
    set({ animationDuration: duration });
  },

  resetAnimation: () => {
    set({
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },

  setPosition: (position) => {
    set({ position });
  },

  activateWindWall: () => {
    console.log("Activating wind wall");
    const currentTime = Date.now();
    set({
      windWallActive: true,
      windWallStartTime: currentTime,
      action: "W_ABILITY",
      isAnimating: true,
      animationProgress: 0,
    });

    // Auto-deactivate wind wall after duration
    setTimeout(() => {
      const state = get();
      if (state.windWallActive && state.windWallStartTime === currentTime) {
        console.log("Auto-deactivating wind wall");
        set({
          windWallActive: false,
          action: "IDLE",
          isAnimating: false,
          animationProgress: 0,
        });
      }
    }, get().windWallDuration);
  },

  deactivateWindWall: () => {
    console.log("Deactivating wind wall");
    set({
      windWallActive: false,
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },

  activateDash: () => {
    console.log("Activating dash");
    const currentPosition = get().position;
    const dashDistance = 3; // 3 units forward
    const targetPosition: [number, number, number] = [
      currentPosition[0],
      currentPosition[1],
      currentPosition[2] + dashDistance,
    ];
    const currentTime = Date.now();

    set({
      dashActive: true,
      dashStartPosition: currentPosition,
      dashTargetPosition: targetPosition,
      dashStartTime: currentTime,
      action: "E_ABILITY",
      isAnimating: true,
      animationProgress: 0,
    });

    // Auto-deactivate dash after duration
    setTimeout(() => {
      const state = get();
      if (state.dashActive && state.dashStartTime === currentTime) {
        console.log("Auto-deactivating dash");
        set({
          dashActive: false,
          action: "IDLE",
          isAnimating: false,
          animationProgress: 0,
          position: targetPosition, // Set final position
        });
      }
    }, get().dashDuration);
  },

  deactivateDash: () => {
    console.log("Deactivating dash");
    set({
      dashActive: false,
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },

  activateFlash: () => {
    console.log("Activating flash teleport");
    const currentPosition = get().position;
    const flashDistance = 4; // 4 units forward
    const targetPosition: [number, number, number] = [
      currentPosition[0],
      currentPosition[1],
      currentPosition[2] + flashDistance,
    ];
    const currentTime = Date.now();

    set({
      flashActive: true,
      flashStartPosition: currentPosition,
      flashEndPosition: targetPosition,
      flashStartTime: currentTime,
      action: "F_ABILITY",
      isAnimating: true,
      animationProgress: 0,
      position: targetPosition, // Instantly change position
    });

    // Auto-deactivate flash after duration
    setTimeout(() => {
      const state = get();
      if (state.flashActive && state.flashStartTime === currentTime) {
        console.log("Auto-deactivating flash");
        set({
          flashActive: false,
          action: "IDLE",
          isAnimating: false,
          animationProgress: 0,
        });
      }
    }, get().flashDuration);
  },

  deactivateFlash: () => {
    console.log("Deactivating flash");
    set({
      flashActive: false,
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },

  activateHumorous: () => {
    console.log("Activating humorous action");
    const currentTime = Date.now();
    set({
      humorousActive: true,
      humorousStartTime: currentTime,
      action: "D_ABILITY",
      isAnimating: true,
      animationProgress: 0,
    });

    // Auto-deactivate humorous action after duration
    setTimeout(() => {
      const state = get();
      if (state.humorousActive && state.humorousStartTime === currentTime) {
        console.log("Auto-deactivating humorous action");
        set({
          humorousActive: false,
          action: "IDLE",
          isAnimating: false,
          animationProgress: 0,
        });
      }
    }, get().humorousDuration);
  },

  deactivateHumorous: () => {
    console.log("Deactivating humorous action");
    set({
      humorousActive: false,
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },

  activateUltimate: () => {
    console.log("Activating ultimate ability");
    const currentTime = Date.now();
    const memePhrases = ["GGEZ", "HASAGI!", "EZ GAME", "GG"];
    const randomPhrase =
      memePhrases[Math.floor(Math.random() * memePhrases.length)];

    set({
      ultimateActive: true,
      ultimateStartTime: currentTime,
      textBubbleActive: true,
      textBubbleText: randomPhrase,
      textBubbleStartTime: currentTime,
      action: "R_ABILITY",
      isAnimating: true,
      animationProgress: 0,
    });

    // Auto-deactivate ultimate after duration
    setTimeout(() => {
      const state = get();
      if (state.ultimateActive && state.ultimateStartTime === currentTime) {
        console.log("Auto-deactivating ultimate");
        set({
          ultimateActive: false,
          textBubbleActive: false,
          action: "IDLE",
          isAnimating: false,
          animationProgress: 0,
        });
      }
    }, get().ultimateDuration);
  },

  deactivateUltimate: () => {
    console.log("Deactivating ultimate");
    set({
      ultimateActive: false,
      textBubbleActive: false,
      action: "IDLE",
      isAnimating: false,
      animationProgress: 0,
    });
  },
}));
