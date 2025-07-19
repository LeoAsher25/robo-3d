# Testing Strategy

> This document is a granulated shard from the main "Operational Guidelines" focusing on "Testing Strategy".

## Overall Testing Strategy

- **Unit Tests:** Tập trung vào các custom hooks (ví dụ `useInputController`) và logic trong store Zustand. Sử dụng Vitest/Jest và React Testing Library.
- **Integration Tests:** Không cần thiết cho MVP.
- **End-to-End (E2E) Tests:** Sẽ được bổ sung sau MVP. Các kịch bản chính bao gồm: tải trang thành công, nhấn từng phím kỹ năng và xác nhận hoạt ảnh được phát.
- **Manual Testing:** Là phương pháp chính để xác thực MVP. Phải kiểm tra trên các trình duyệt Chrome, Firefox, và Edge phiên bản mới nhất.
