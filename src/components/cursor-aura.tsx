"use client";

import { useEffect, useState } from "react";

export function CursorAura() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 transition-opacity"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0.04) 25%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.06) 35%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
      <div
        className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background:
            "radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, rgba(192, 132, 252, 0.08) 40%, transparent 80%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
