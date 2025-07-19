# Front-End Testing Strategy

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Frontend Architecture Document" focusing on "Front-End Testing Strategy".

## Performance Considerations

- **Model Optimization:** Mô hình 3D phải được tối ưu hóa (giảm số lượng polygon) và sử dụng nén **Draco** (được hỗ trợ bởi `@react-three/drei`) để giảm kích thước tệp.
- **Draw Calls:** Giữ cho cảnh đơn giản và sử dụng kỹ thuật "instancing" (nhân bản đối tượng) cho các hiệu ứng lặp lại để giảm số lượng lệnh vẽ (draw calls).
- **Lazy Loading:** Sử dụng `React.lazy` và `Suspense` để tải các component nặng một cách lười biếng nếu ứng dụng trở nên phức tạp hơn.
