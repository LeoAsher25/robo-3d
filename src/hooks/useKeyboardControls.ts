import { useEffect, useCallback } from "react";
import { useCharacterStore } from "../stores/useCharacterStore";

export const useKeyboardControls = () => {
  const {
    setAction,
    isAnimating,
    action,
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default browser behavior for game keys
      if (
        ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyD", "KeyF"].includes(event.code)
      ) {
        event.preventDefault();
      }

      // Handle Q key press for sword thrust
      if (event.code === "KeyQ") {
        console.log(
          `Q key pressed - isAnimating: ${isAnimating}, action: ${action}`
        );
        // Prevent rapid-fire Q presses during animation
        if (!isAnimating && action !== "Q_ATTACK") {
          console.log("Q key pressed - triggering sword thrust animation");
          setAction("Q_ATTACK");
        } else {
          console.log(
            "Q key ignored - animation in progress or already attacking"
          );
        }
      }

      // Handle W key press for wind wall
      if (event.code === "KeyW") {
        console.log(
          `W key pressed - windWallActive: ${windWallActive}, action: ${action}`
        );
        // Prevent rapid-fire W presses during wind wall duration
        if (!windWallActive && action !== "W_ABILITY") {
          console.log("W key pressed - activating wind wall");
          activateWindWall();
        } else {
          console.log(
            "W key ignored - wind wall active or ability in progress"
          );
        }
      }

      // Handle E key press for dash
      if (event.code === "KeyE") {
        console.log(
          `E key pressed - dashActive: ${dashActive}, action: ${action}`
        );
        // Prevent rapid-fire E presses during dash movement
        if (!dashActive && action !== "E_ABILITY") {
          console.log("E key pressed - activating dash");
          activateDash();
        } else {
          console.log("E key ignored - dash active or ability in progress");
        }
      }

      // Handle F key press for flash teleport
      if (event.code === "KeyF") {
        console.log(
          `F key pressed - flashActive: ${flashActive}, action: ${action}`
        );
        // Prevent rapid-fire F presses during flash effects
        if (!flashActive && action !== "F_ABILITY") {
          console.log("F key pressed - activating flash teleport");
          activateFlash();
        } else {
          console.log("F key ignored - flash active or ability in progress");
        }
      }

      // Handle D key press for humorous action
      if (event.code === "KeyD") {
        console.log(
          `D key pressed - humorousActive: ${humorousActive}, action: ${action}`
        );
        // Prevent rapid-fire D presses during humorous action
        if (!humorousActive && action !== "D_ABILITY") {
          console.log("D key pressed - activating humorous action");
          activateHumorous();
        } else {
          console.log(
            "D key ignored - humorous action active or ability in progress"
          );
        }
      }

      // Handle R key press for ultimate ability
      if (event.code === "KeyR") {
        console.log(
          `R key pressed - ultimateActive: ${ultimateActive}, action: ${action}`
        );
        // Prevent rapid-fire R presses during ultimate action
        if (!ultimateActive && action !== "R_ABILITY") {
          console.log("R key pressed - activating ultimate ability");
          activateUltimate();
        } else {
          console.log("R key ignored - ultimate active or ability in progress");
        }
      }
    },
    [
      setAction,
      isAnimating,
      action,
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
    ]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    // Handle key release if needed
    if (event.code === "KeyQ") {
      // Key release logic can be added here if needed
    }
  }, []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    isAnimating,
    currentAction: action,
  };
};
