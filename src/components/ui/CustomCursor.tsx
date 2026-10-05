'use client';

import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  isCanvasHovered: boolean;
}

export default function CustomCursor({ isCanvasHovered }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none select-none z-50 transition-opacity duration-200 hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: position.x < 0 ? 0 : 1,
      }}
    >
      {/* Central Precision Target Dot */}
      <div
        className="w-1.5 h-1.5 rounded-full bg-[#111111] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        style={{
          transform: `translate(-50%, -50%) scale(${isMouseDown ? 1.4 : 1})`,
        }}
      />

      {/* Outer Frosted Glass Ring Indicator */}
      <div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center pointer-events-none"
        style={{
          width: isCanvasHovered ? (isMouseDown ? '48px' : '56px') : '28px',
          height: isCanvasHovered ? (isMouseDown ? '48px' : '56px') : '28px',
          backgroundColor: isCanvasHovered
            ? 'rgba(255, 255, 255, 0.15)'
            : 'transparent',
          borderColor: isCanvasHovered ? 'rgba(17, 17, 17, 0.45)' : 'rgba(17, 17, 17, 0.18)',
          boxShadow: isCanvasHovered
            ? '0 4px 20px rgba(0,0,0,0.08), inset 0 0 4px rgba(255,255,255,0.8)'
            : 'none',
        }}
      />
    </div>
  );
}
