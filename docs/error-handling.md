# Error Handling

> This document is a granulated shard from the main "Operational Guidelines" focusing on "Error Handling".

## Error Handling Strategy

- **Model Loading:** Sử dụng component `<Suspense>` của React để hiển thị một màn hình tải (`LoadingScreen`) trong khi các tài sản 3D đang được tải. Nếu có lỗi tải, hiển thị một thông báo lỗi cho người dùng.
- **Runtime Errors:** Các lỗi runtime phía client sẽ được bắt bởi Error Boundary của React để tránh làm sập toàn bộ ứng dụng.
