'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroOverlayProps {
  isHovered: boolean;
}

export default function HeroOverlay({ isHovered }: HeroOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between p-6 sm:p-12 md:p-16 pt-28 md:pt-36">
      {/* Left Column Clean Editorial Header */}
      <div className="max-w-xs sm:max-w-sm md:max-w-md pointer-events-none">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#111111] leading-[0.9] uppercase">
          ELENA
          <span className="block font-light text-[#222222] tracking-tight">
            VOSS
          </span>
        </h1>

        <div className="mt-3 font-mono text-xs text-[#666666] uppercase tracking-widest">
          The First Conscious Hybrid
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#444444] leading-relaxed font-normal bg-white/45 backdrop-blur-[3px] p-4 rounded-2xl border border-white/70 shadow-2xs">
          Bajo la serenidad orgánica y el suéter de lana, Elena alberga la arquitectura biomecánica de un chasis sintético de titanio y carbono.
        </p>
      </div>

      {/* Bottom Action */}
      <div className="flex justify-end pointer-events-auto pb-4">
        <a
          href="#origen"
          className="frosted-glass-pill px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] hover:bg-black hover:text-white transition-all shadow-sm flex items-center gap-2"
        >
          <span>[ Conocer su historia ]</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
