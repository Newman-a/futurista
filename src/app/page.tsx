'use client';

import React, { useState } from 'react';
import LiquidMaskCanvas from '@/components/canvas/LiquidMaskCanvas';
import Navbar from '@/components/ui/Navbar';
import HeroOverlay from '@/components/ui/HeroOverlay';
import BiologicalFoundation from '@/components/ui/BiologicalFoundation';
import CyberneticBreakdown from '@/components/ui/CyberneticBreakdown';
import DeepDiveSection from '@/components/ui/DeepDiveSection';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [targetCoord, setTargetCoord] = useState<{ x: number; y: number } | null>(null);

  const handleSelectHotspot = (coords: { x: number; y: number }) => {
    setTargetCoord(coords);
  };

  return (
    <main className="relative min-h-screen bg-white text-[#111111] overflow-x-hidden">
      {/* Custom Precision Follower Cursor */}
      <CustomCursor isCanvasHovered={isHovered} />

      {/* Frosted Glass Navigation Bar */}
      <Navbar />

      {/* 1. SECCIÓN HERO: Fullscreen Liquid Mask WebGL Canvas */}
      <section className="relative w-screen h-screen overflow-hidden bg-white">
        {/* Three.js R3F Liquid Mask Canvas */}
        <LiquidMaskCanvas
          onHoverStateChange={setIsHovered}
          targetCoord={targetCoord}
        />

        {/* Minimalist UI Floating Overlay */}
        <HeroOverlay isHovered={isHovered} />

        {/* Seamless Soft Gradient Blend at the bottom of Hero (Eliminates any harsh cut) */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </section>

      {/* 2. EL ORIGEN (The Baseline) */}
      <BiologicalFoundation />

      {/* 3. EL CHASIS (Interactive Cybernetic Breakdown) */}
      <CyberneticBreakdown onSelectHotspot={handleSelectHotspot} />

      {/* 4. DIARIOS Y REFLEXIÓN (Deep Dive) */}
      <DeepDiveSection />

      {/* 5. FOOTER */}
      <Footer />
    </main>
  );
}
