"use client";

import { useBox } from "@react-three/cannon";

export default function Ramp() {
  const [ref] = useBox(() => ({
    type: "Static",
    position: [5, 0.25, 3], // trước mặt bóng
    rotation: [0, 0, -Math.PI / 6], // nghiêng về phía người nhìn (30 độ)
    args: [4, 0.5, 2], // chiều dài, độ dày, chiều rộng
    restitution: 0.3, // nảy nhẹ nếu cần
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[4, 0.5, 2]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
