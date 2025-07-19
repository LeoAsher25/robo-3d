# Yasuo Three.js Meme Simulator Frontend Architecture Document

## Table of Contents

- [Introduction](https://www.google.com/search?q=%23introduction)
- [Overall Frontend Philosophy & Patterns](https://www.google.com/search?q=%23overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](https://www.google.com/search?q=%23detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](https://www.google.com/search?q=%23component-breakdown--implementation-details)
- [State Management In-Depth](https://www.google.com/search?q=%23state-management-in-depth)
- [API Interaction Layer](https://www.google.com/search?q=%23api-interaction-layer)
- [Routing Strategy](https://www.google.com/search?q=%23routing-strategy)
- [Build, Bundling, and Deployment](https://www.google.com/search?q=%23build-bundling-and-deployment)
- [Accessibility (AX) Implementation Details](https://www.google.com/search?q=%23accessibility-ax-implementation-details)
- [Performance Considerations](https://www.google.com/search?q=%23performance-considerations)
- [Change Log](https://www.google.com/search?q=%23change-log)

## Introduction

Tài liệu này trình bày chi tiết kiến trúc kỹ thuật cho phần frontend của dự án "Yasuo Three.js Meme Simulator". Nó được xây dựng dựa trên các yêu cầu từ **Product Requirements Document (PRD)** và các đặc tả từ **UI/UX Specification**. Mục tiêu của tài liệu này là cung cấp một bản thiết kế chi tiết để đội ngũ phát triển (hoặc các đặc vụ AI phát triển) có thể xây dựng một ứng dụng nhất quán, dễ bảo trì và có hiệu suất cao.

- **Link to Main Architecture Document (REQUIRED):** `docs/architecture.md` (Do đặc thù dự án, tài liệu này sẽ tập trung vào frontend, các quyết định backend sẽ tham khảo từ PRD).
- **Link to UI/UX Specification (REQUIRED if exists):** `docs/front-end-spec.md`
- **Link to Primary Design Files (Figma, Sketch, etc.) (REQUIRED if exists):** _{Sẽ được cung cấp sau}_

## Overall Frontend Philosophy & Patterns

- **Framework & Core Libraries:**
  - **React 18+** với **Next.js 14+** (sử dụng App Router). Mặc dù đây là một ứng dụng một trang (SPA), việc sử dụng Next.js cung cấp một cấu trúc dự án vững chắc, tối ưu hóa hình ảnh và một hệ sinh thái mạnh mẽ.
  - **TypeScript** sẽ được sử dụng trong toàn bộ dự án để đảm bảo an toàn kiểu dữ liệu.
  - **Three.js** sẽ được tích hợp thông qua **`@react-three/fiber`** (R3F) và **`@react-three/drei`**. Đây là cách tiếp cận hiện đại và được khuyến nghị để làm việc với Three.js trong môi trường React.
- **Component Architecture:** Chúng ta sẽ áp dụng một cấu trúc component dựa trên chức năng.
  - Các component 3D sẽ được tổ chức theo cấu trúc của cảnh (Scene Graph), ví dụ: `<Environment>`, `<Character>`, `<Effects>`.
  - Các component 2D (nếu có) sẽ tuân theo mô hình component React tiêu chuẩn.
- **State Management Strategy:**
  - Với MVP, trạng thái đơn giản của UI có thể được quản lý bằng `useState` của React.
  - Đối với trạng thái phức tạp hơn của nhân vật (vị trí, trạng thái hành động, v.v.) và các trạng thái toàn cục khác, **Zustand** được chọn làm thư viện quản lý trạng thái. Nó nhẹ, đơn giản, dễ sử dụng và hoạt động rất tốt với `@react-three/fiber`.
- **Styling Approach:**
  - **Tailwind CSS** sẽ được sử dụng cho mọi yếu tố UI 2D (ví dụ: lớp phủ hướng dẫn). Nó cho phép tạo kiểu nhanh chóng và nhất quán.
  - Phần lớn "phong cách" của ứng dụng nằm trong cảnh 3D (mô hình, vật liệu, ánh sáng, hiệu ứng).

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

## API Interaction Layer

Không áp dụng cho MVP. Nếu các tính năng post-MVP (ví dụ: lưu trữ chỉ số) được triển khai, một lớp service sẽ được tạo trong thư mục `src/services/` để tương tác với backend NestJS.

## Routing Strategy

Đây là một ứng dụng một trang (Single Page Application). Không yêu cầu thư viện định tuyến cho MVP.

## Build, Bundling, and Deployment

- **Build Process & Scripts:** Sử dụng các script tiêu chuẩn của Next.js:
  - `npm run dev`: Chạy môi trường phát triển.
  - `npm run build`: Build ứng dụng cho production.
  - `npm run start`: Chạy server production sau khi build.
- **Deployment to CDN/Hosting:** Khuyến nghị triển khai lên **Vercel** hoặc **Netlify** để tận dụng khả năng tích hợp CI/CD liền mạch với Next.js/React.

## Accessibility (AX) Implementation Details

- **Semantic HTML:** Sẽ được sử dụng cho bất kỳ cấu trúc HTML nào bên ngoài canvas 3D.
- **Canvas Accessibility:** Thẻ `<Canvas>` sẽ được cung cấp một `aria-label` mô tả (ví dụ: "Interactive 3D Yasuo character simulation").

## Performance Considerations

- **Model Optimization:** Mô hình 3D phải được tối ưu hóa (giảm số lượng polygon) và sử dụng nén **Draco** (được hỗ trợ bởi `@react-three/drei`) để giảm kích thước tệp.
- **Draw Calls:** Giữ cho cảnh đơn giản và sử dụng kỹ thuật "instancing" (nhân bản đối tượng) cho các hiệu ứng lặp lại để giảm số lượng lệnh vẽ (draw calls).
- **Lazy Loading:** Sử dụng `React.lazy` và `Suspense` để tải các component nặng một cách lười biếng nếu ứng dụng trở nên phức tạp hơn.
