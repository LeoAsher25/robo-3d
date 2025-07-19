# Front-End State Management

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Frontend Architecture Document" focusing on "Front-End State Management".

## State Management In-Depth

- **Chosen Solution:** Zustand.
- **Store Structure / Slices:**
  - **`useCharacterStore.ts`**
    - **Purpose:** Quản lý tất cả trạng thái liên quan đến nhân vật.
    - **State Shape (Interface/Type):**
      ```typescript
      interface CharacterState {
        position: [number, number, number];
        action: string | null; // e.g., 'Q_ATTACK', 'MOVE'
        targetPosition: [number, number, number] | null;
        setAction: (action: string | null) => void;
        moveTo: (position: [number, number, number]) => void;
      }
      ```
