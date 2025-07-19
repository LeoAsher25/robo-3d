# Front-End Component Guide

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Frontend Architecture Document" focusing on "Front-End Component Guide".

## Component Breakdown & Implementation Details

Đây là đặc tả cho một số component cốt lõi. Các component khác sẽ được tạo ra khi cần thiết và phải tuân theo mẫu tương tự.

#### Component: `Character.tsx`

- **Purpose:** Chịu trách nhiệm tải, hiển thị và điều khiển hoạt ảnh của mô hình Yasuo. Nó cũng nhận các lệnh từ store trạng thái để thực hiện hành động.
- **Source File(s):** `src/components/3d/Character.tsx`
- **Props:**
  | Prop Name | Type | Required? | Description |
  | :--- | :--- | :--- | :--- |
  | `modelPath` | `string` | Yes | Đường dẫn đến tệp mô hình 3D (GLB/GLTF). |
- **Internal State:** Sử dụng `useRef` cho đối tượng group của Three.js, và `useAnimations` từ `@react-three/drei` để quản lý các animation clip.
- **Actions Triggered:** Lắng nghe sự thay đổi của `useCharacterStore` để kích hoạt các hoạt ảnh (ví dụ: `playAction('attack_Q')`).

#### Component: `Scene.tsx`

- **Purpose:** Component gốc cho trải nghiệm 3D. Nó chứa R3F `<Canvas>` và thiết lập các thành phần cơ bản của cảnh.
- **Source File(s):** `src/components/3d/Scene.tsx`
- **Key UI Elements / Structure:**
  ```jsx
  <Canvas>
    <Environment />
    <Character modelPath="/models/yasuo.glb" />
    {/* Các hiệu ứng khác sẽ được thêm vào đây */}
  </Canvas>
  ```
