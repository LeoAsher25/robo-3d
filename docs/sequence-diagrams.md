# Sequence Diagrams

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Sequence Diagrams".

## Core Workflow / Sequence Diagrams

**Luồng Tương tác Di chuyển và Kỹ năng**

```mermaid
sequenceDiagram
    participant User
    participant InputController
    participant CharacterStore
    participant CharacterController

    User->>+InputController: Nhấn chuột phải vào vị trí (x, y, z)
    InputController->>+CharacterStore: Gọi hàm moveTo({ position: [x, y, z] })
    CharacterStore->>-InputController: Cập nhật state (targetPosition, action: 'MOVE')
    CharacterStore->>+CharacterController: (React re-render) State thay đổi
    CharacterController->>-CharacterController: Đọc targetPosition và thực hiện logic di chuyển (lerp)

    User->>+InputController: Nhấn phím 'Q'
    InputController->>+CharacterStore: Gọi hàm performAbility('Q')
    CharacterStore->>-InputController: Cập nhật state (action: 'ABILITY_Q')
    CharacterStore->>+CharacterController: (React re-render) State thay đổi
    CharacterController->>-CharacterController: Kích hoạt hoạt ảnh kỹ năng 'Q'
    CharacterController->>+CharacterStore: Gọi hàm clearAction() sau khi hoàn thành
    CharacterStore->>-CharacterController: Reset action về null
```
