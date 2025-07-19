# Technology Stack

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Technology Stack".

## Definitive Tech Stack Selections

| Category             | Technology                  | Version / Details   | Description / Purpose                                            |
| :------------------- | :-------------------------- | :------------------ | :--------------------------------------------------------------- |
| **Languages**        | TypeScript                  | 5.x                 | Ngôn ngữ chính cho toàn bộ dự án.                                |
| **Runtime**          | Node.js                     | 20.x                | Môi trường để chạy Next.js.                                      |
| **Frameworks**       | React (Next.js)             | 18.x (Next.js 14.x) | Framework chính cho giao diện người dùng và cấu trúc dự án.      |
|                      | Three.js                    | latest              | Thư viện đồ họa 3D cốt lõi.                                      |
| **3D Ecosystem**     | @react-three/fiber          | latest              | Bộ render (renderer) của Three.js cho React.                     |
|                      | @react-three/drei           | latest              | Tập hợp các hàm tiện ích và component cho R3F.                   |
|                      | @react-three/postprocessing | latest              | Dành cho các hiệu ứng hậu xử lý.                                 |
| **State Management** | Zustand                     | latest              | Thư viện quản lý trạng thái client-side.                         |
| **Styling**          | Tailwind CSS                | latest              | Framework CSS cho các yếu tố UI 2D.                              |
| **Testing**          | Vitest / Jest               | latest              | Framework để kiểm thử đơn vị (Unit Test) cho các hooks và logic. |
|                      | Playwright                  | latest              | Framework để kiểm thử E2E (post-MVP).                            |
| **CI/CD**            | GitHub Actions              | N/A                 | Tự động hóa việc build và triển khai.                            |
