# Project Brief: Yasuo Three.js Meme Simulator

## Introduction / Problem Statement

Dự án này nhằm mục đích tạo ra một bản demo kỹ thuật vui nhộn và có tính tương tác cao, sử dụng React và Three.js. "Vấn đề" cần giải quyết là tạo ra một sản phẩm độc đáo cho portfolio, thể hiện kỹ năng phát triển front-end, xử lý đồ họa 3D thời gian thực và tạo ra một trải nghiệm mang tính giải trí, dễ lan truyền, thay vì một ứng dụng web thông thường. Dự án sẽ mô phỏng nhân vật Yasuo từ trò chơi Liên Minh Huyền Thoại, nhưng với một biến thể hài hước: thay thế mô hình nhân vật tiêu chuẩn bằng một meme "Yasuo ngồi xe lăn".

## Vision & Goals

- **Vision:** Xây dựng một trải nghiệm web 3D hài hước, có thể chia sẻ, thể hiện thành thạo các công nghệ hiện đại như React, Three.js (sử dụng React Three Fiber) và hoạt ảnh nhân vật, đồng thời thu hút cộng đồng game thủ và các nhà phát triển.
- **Primary Goals (Mục tiêu chính cho MVP - Sản phẩm Khả thi Tối thiểu):**
  1.  Dựng một cảnh 3D cơ bản và hiển thị mô hình "Yasuo xe lăn".
  2.  Triển khai hệ thống điều khiển nhân vật bằng bàn phím để kích hoạt các hành động cụ thể.
  3.  Tạo và liên kết các hoạt ảnh độc đáo cho từng kỹ năng (Q, W, E, R, F, D).
  4.  Đảm bảo ứng dụng có hiệu suất tốt và chạy mượt mà trên các trình duyệt web hiện đại.

## Target Audience / Users

- Các nhà tuyển dụng kỹ thuật và giám đốc tuyển dụng đang tìm kiếm các nhà phát triển front-end có kỹ năng về đồ họa web.
- Các nhà phát triển muốn tìm hiểu về Three.js và React Three Fiber.
- Cộng đồng người chơi Liên Minh Huyền Thoại và những người yêu thích meme.
- Bất kỳ ai thích thú với các trò chơi và trải nghiệm sáng tạo trên nền tảng web.

## Key Features / Scope (High-Level Ideas for MVP)

- **Thiết lập Cảnh 3D:** Một không gian 3D đơn giản (ví dụ: một mặt phẳng hoặc một đấu trường nhỏ) để nhân vật có thể di chuyển.
- **Mô hình Nhân vật:** Tải và hiển thị mô hình 3D của "Yasuo ngồi xe lăn".
- **Điều khiển bằng Bàn phím:** Liên kết các phím sau với các hành động cụ thể:
  - **Phím Q:** Kích hoạt hoạt ảnh "đâm kiếm" về phía trước.
  - **Phím W:** Tạo ra một đối tượng "tường gió" (có thể là một mặt phẳng bán trong suốt) trước mặt nhân vật.
  - **Phím E:** Khiến nhân vật "lướt" một đoạn ngắn theo một hướng.
  - **Phím R:** Một hành động tùy chọn mang tính hài hước (ví dụ: một bong bóng chat với nội dung "GGEZ" hoặc "Đấng thể hiện" xuất hiện).
  - **Phím F (Tốc biến):** Dịch chuyển tức thời nhân vật một khoảng cách ngắn.
  - **Phím D:** Một hành động tùy chọn khác (ví dụ: nhân vật xoay tròn trên xe lăn).
- **Backend (Tùy chọn):** Một backend NestJS tối giản có thể được thiết lập để chuẩn bị cho các tính năng trong tương lai, nhưng không phải là yêu cầu cốt lõi cho MVP.

## Post MVP Features / Scope and Ideas

- Thêm hiệu ứng âm thanh cho mỗi kỹ năng.
- Tạo các mục tiêu giả (ví dụ: "lính" hoặc "bù nhìn") để các kỹ năng có thể tương tác.
- Sử dụng backend NestJS để theo dõi các chỉ số đơn giản (ví dụ: số lần phím Q được nhấn) và hiển thị chúng.
- Nâng cấp môi trường 3D với nhiều chi tiết hơn.
- Thêm các tính năng liên quan đến meme khác (ví dụ: các trang phục meme khác nhau).

## Known Technical Constraints or Preferences

- **Constraints:** Dự án phải chạy trên trình duyệt web và được tối ưu hóa cho hiệu suất để đảm bảo trải nghiệm người dùng mượt mà.
- **Initial Architectural Preferences:**
  - **Frontend:** React, Three.js (khuyến khích sử dụng hệ sinh thái `react-three-fiber` và `drei` để tích hợp liền mạch).
  - **Backend (Optional):** NestJS.
  - **Cấu trúc Repository:** Monorepo là một lựa chọn tốt để quản lý cả code frontend và backend (nếu có) trong cùng một nơi.
- **Risks:** Tìm kiếm hoặc tạo ra một mô hình 3D "Yasuo ngồi xe lăn" chất lượng tốt có thể mất thời gian. Việc tối ưu hóa hoạt ảnh 3D để chạy mượt trên web có thể là một thách thức.
- **User Preferences:** Ưu tiên cao cho yếu tố hài hước và văn hóa meme. Trải nghiệm phải vui nhộn và dễ dàng để người dùng thử ngay lập tức.
