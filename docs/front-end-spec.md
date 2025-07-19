# Yasuo Three.js Meme Simulator UI/UX Specification

## Introduction

Tài liệu này xác định các mục tiêu trải nghiệm người dùng (UX), kiến trúc thông tin (IA), luồng người dùng và các đặc tả thiết kế trực quan cho dự án "Yasuo Three.js Meme Simulator". Mục tiêu là tạo ra một nền tảng vững chắc cho việc thiết kế và phát triển giao diện người dùng, đảm bảo trải nghiệm cuối cùng phải thật sự hài hước, hấp dẫn và dễ sử dụng.

- **Link to Primary Design Files:** _{Sẽ được tạo trong Figma sau khi bản đặc tả này được phê duyệt}_
- **Link to Deployed Storybook / Design System:** _{Không áp dụng cho MVP}_

## Overall UX Goals & Principles

- **Target User Personas:** Các nhà tuyển dụng kỹ thuật, nhà phát triển khác và cộng đồng game thủ/người yêu meme. Trải nghiệm cần phải gây ấn tượng về mặt kỹ thuật nhưng đồng thời cũng phải dễ tiếp cận và hài hước.
- **Usability Goals:**
  - **Tính giải trí tức thì:** Người dùng phải cảm thấy vui vẻ ngay từ những giây đầu tiên mà không cần hướng dẫn phức tạp.
  - **Điều khiển nhạy bén:** Mọi hành động nhấn phím hoặc nhấp chuột phải có phản hồi ngay lập tức và rõ ràng.
  - **Tối giản giao diện:** Giao diện người dùng (UI) phải ở mức tối thiểu để không làm xao lãng khỏi cảnh 3D.
- **Design Principles:**
  1.  **Meme là trung tâm:** Mọi yếu tố, từ mô hình nhân vật đến hiệu ứng, đều phải thấm nhuần văn hóa meme.
  2.  **Tập trung vào hành động:** Giao diện phải nhường sân khấu chính cho nhân vật và các hoạt ảnh của anh ta.
  3.  **Phản hồi rõ ràng:** Mỗi hành động của người dùng phải tạo ra một kết quả trực quan dễ nhận biết.

## Information Architecture (IA)

Kiến trúc thông tin cho MVP cực kỳ đơn giản vì đây là một trải nghiệm trên một màn hình duy nhất.

- **Site Map / Screen Inventory:**
  ```mermaid
  graph TD
      A[Trang tải] --> B(Trải nghiệm chính);
  ```
- **Navigation Structure:** Không có cấu trúc điều hướng nào trong MVP. Toàn bộ trải nghiệm diễn ra trong một cảnh 3D duy nhất.

## User Flows

### Luồng Tương tác Chính (Đã cập nhật)

- **Goal:** Người dùng muốn điều khiển các hành động và di chuyển của Yasuo một cách linh hoạt bằng cả bàn phím và chuột.
- **Steps / Diagram:**
  ```mermaid
  graph TD
      Start[Tải trang] --> Loading[Hiển thị màn hình tải];
      Loading --> SceneReady[Cảnh 3D sẵn sàng];
      SceneReady --> SeeCharacter[Thấy Yasuo trên màn hình];
      SeeCharacter --> Input{Người dùng tương tác};
      Input -- Nhấn phím Q,W,E,R,F,D --> SeeAbility[Xem hoạt ảnh kỹ năng];
      Input -- Chuột phải vào vị trí --> ShowIndicator[Hiển thị chỉ báo di chuyển] & MoveCharacter[Yasuo di chuyển tới vị trí đó];
      SeeAbility --> SeeCharacter;
      MoveCharacter --> SeeCharacter;
  ```

## Wireframes & Mockups

Toàn bộ "giao diện" là cảnh 3D. Các yếu tố UI 2D duy nhất trong MVP có thể là:

- **Màn hình tải:** Một màn hình đơn giản với tên dự án và một thanh tiến trình hoặc hoạt ảnh tải vui nhộn.
- **Lớp phủ hướng dẫn:** Một dòng văn bản đơn giản, bán trong suốt ở góc màn hình khi bắt đầu, ví dụ: `"Sử dụng các phím Q, W, E, R, F, D để tung chiêu. Chuột phải để di chuyển."`. Lớp phủ này có thể biến mất sau vài giây.

_{Chi tiết về bố cục và thiết kế trực quan sẽ được thực hiện trong Figma.}_

## Interaction Feedback & Visual Effects

- **Movement Target Indicator (Chỉ báo Mục tiêu Di chuyển):**
  - **Kích hoạt:** Khi người dùng **chuột phải** vào một vị trí hợp lệ trên mặt đất.
  - **Hiệu ứng Hình ảnh:** Một chỉ báo trực quan (ví dụ: một vòng tròn màu xanh lá cây sáng lên rồi mờ dần, hoặc một hiệu ứng gợn sóng nhỏ) phải xuất hiện ngay lập-tức tại vị trí được nhấp.
  - **Mục đích:** Cung cấp phản hồi tức thì cho người dùng rằng hệ thống đã nhận được lệnh và nhân vật đang bắt đầu di chuyển.
  - **Thời lượng:** Hiệu ứng nên rõ ràng nhưng ngắn gọn, kéo dài khoảng 1-1.5 giây rồi biến mất.

## Component Library / Design System Reference

Không áp dụng cho MVP vì không có các thành phần UI (nút, biểu mẫu, thẻ, v.v.) tiêu chuẩn. Nếu dự án được mở rộng với các menu hoặc HUD trong tương lai, một hệ thống thiết kế nhỏ có thể được phát triển.

## Branding & Style Guide Reference

- **Color Palette:** Một bảng màu tối, có độ tương phản cao (ví dụ: nền màu xám đậm, xanh đậm) để làm nổi bật nhân vật và các hiệu ứng kỹ năng. Các hiệu ứng có thể sử dụng màu sắc tươi sáng, bão hòa để tạo điểm nhấn.
- **Typography:** Phông chữ cho lớp phủ hướng dẫn nên mang tính hài hước và dễ đọc. Một phông chữ vui nhộn như `Comic Sans MS` hoặc một phông chữ pixelated có thể phù hợp với chủ đề meme.
- **Iconography:** Không yêu cầu cho MVP.

## Accessibility (AX) Requirements

- **Target Compliance:** WCAG 2.1 A (Mức tuân thủ cơ bản).
- **Specific Requirements:**
  - **Độ tương phản:** Bất kỳ văn bản nào trên màn hình phải có tỷ lệ tương phản đủ với nền.
  - **Điều khiển bằng bàn phím:** Trải nghiệm vốn dĩ đã dựa trên bàn phím, điều này đáp ứng yêu cầu cốt lõi về khả năng truy cập bằng bàn phím.
  - **Tiêu đề trang:** Thẻ `<title>` của trang HTML phải mô tả rõ ràng nội dung (ví dụ: "Yasuo Meme Simulator").

## Responsiveness

- **Breakpoints:** Ưu tiên chính cho máy tính để bàn (desktop).
- **Adaptation Strategy:**
  - Khung vẽ 3D (canvas) phải tự động thay đổi kích thước để lấp đầy cửa sổ trình duyệt.
  - Trên thiết bị di động hoặc các màn hình quá nhỏ, có thể hiển thị một thông báo đơn giản: `"Trải nghiệm tốt nhất trên máy tính để bàn"`. MVP sẽ không hỗ trợ đầy đủ cho thiết bị di động.

## Change Log

| Change        | Date       | Version | Description                                                                                   | Author |
| ------------- | ---------- | ------- | --------------------------------------------------------------------------------------------- | ------ |
| Initial Draft | 2025-07-19 | 1.0     | First draft of the UI/UX Specification.                                                       | Jane   |
| Add Movement  | 2025-07-19 | 1.1     | Added right-click movement feature. Updated User Flow and added Interaction Feedback section. | Jane   |
