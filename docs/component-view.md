# Component View

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Component View".

Các thành phần chính được chia thành các khối logic để dễ quản lý:

- **`SceneContainer`:** Component cấp cao nhất chứa `<Canvas>` của R3F và tất cả các thực thể 3D.
- **`Environment`:** Chịu trách nhiệm thiết lập môi trường 3D, bao gồm ánh sáng, mặt đất, và có thể là sương mù hoặc skybox.
- **`CharacterController`:** Component logic chính, chịu trách nhiệm tải mô hình nhân vật, quản lý và kích hoạt các hoạt ảnh. Nó lấy dữ liệu từ `useCharacterStore` để thực hiện các hành động.
- **`InputController`:** Một component "vô hình" (không render gì) hoặc một custom hook, chịu trách nhiệm lắng nghe các sự kiện từ bàn phím và chuột, sau đó cập nhật `useCharacterStore`.
- **`Effects`:** Component chứa các hiệu ứng hậu xử lý (post-processing) của R3F như bloom, depth of field, để tăng chất lượng hình ảnh.
