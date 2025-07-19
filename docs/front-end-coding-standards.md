# Front-End Coding Standards

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Frontend Architecture Document" focusing on "Front-End Coding Standards".

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
