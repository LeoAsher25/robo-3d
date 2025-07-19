# Data Models

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Data Models".

Các mô hình dữ liệu chính tồn tại ở phía client-side, được quản lý bởi Zustand.

#### `CharacterState` (trong `useCharacterStore.ts`)

- **Description:** Lưu trữ tất cả trạng thái động của nhân vật.
- **Schema / Interface Definition:**

  ```typescript
  export interface CharacterState {
    position: [number, number, number];
    rotation: [number, number, number];
    action: string | null; // e.g., 'Q_ATTACK', 'MOVE_TO_TARGET'
    targetPosition: [number, number, number] | null;

    // Actions
    performAbility: (ability: "Q" | "W" | "E" | "R" | "F" | "D") => void;
    moveTo: (position: [number, number, number]) => void;
    clearAction: () => void;
  }
  ```
