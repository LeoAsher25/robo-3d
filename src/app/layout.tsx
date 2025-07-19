import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yasuo Three.js Meme Simulator",
  description: "A humorous 3D web experience featuring Yasuo in a wheelchair",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
