# Project Structure

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Project Structure".

Cấu trúc thư mục sẽ tuân theo các quy ước của Next.js App Router và được tổ chức theo chức năng.

```plaintext
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Các component UI 2D (ví dụ: loading screen, overlays)
│   │   └── LoadingScreen.tsx
│   └── 3d/                   # Các component 3D cho R3F
│       ├── SceneContainer.tsx
│       ├── CharacterController.tsx
│       ├── Environment.tsx
│       └── Effects.tsx
├── hooks/
│   └── useInputController.ts # Hook quản lý tất cả đầu vào từ người dùng
├── stores/
│   └── useCharacterStore.ts  # Store của Zustand cho trạng thái nhân vật
├── lib/
│   └── constants.ts
└── public/
    └── models/
        └── yasuo-wheelchair.glb
```
