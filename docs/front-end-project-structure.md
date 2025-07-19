# Front-End Project Structure

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Frontend Architecture Document" focusing on "Front-End Project Structure".

## Detailed Frontend Directory Structure

Dự án sẽ tuân theo cấu trúc của Next.js App Router.

```plaintext
src/
├── app/                      # Next.js App Router: Các trang và layout
│   ├── layout.tsx            # Layout gốc của ứng dụng
│   └── page.tsx              # Trang chính của ứng dụng
├── components/               # Các component React có thể tái sử dụng
│   ├── ui/                   # Các component UI 2D cơ bản (nếu cần)
│   └── 3d/                   # Các component 3D (liên quan đến Three.js/R3F)
│       ├── Scene.tsx         # Component R3F Canvas chính, nơi chứa toàn bộ cảnh 3D
│       ├── Character.tsx     # Component điều khiển logic và mô hình nhân vật
│       └── Environment.tsx   # Component thiết lập môi trường (ánh sáng, mặt đất)
├── hooks/                    # Các custom React Hooks
│   └── useKeyboardControls.ts# Hook để xử lý input từ bàn phím
├── stores/                   # Các store của Zustand để quản lý trạng thái
│   └── useCharacterStore.ts  # Store cho trạng thái của nhân vật
└── lib/                      # Các hàm tiện ích, hằng số
    └── constants.ts
```
