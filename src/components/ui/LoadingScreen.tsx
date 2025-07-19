"use client";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Loading 3D Environment...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
}
