'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-40 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      <div className="frosted-glass px-6 py-3.5 flex items-center justify-between pointer-events-auto transition-all duration-300">
        {/* Model Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm">
            EV
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
              ELENA VOSS
            </span>
            <span className="text-[10px] font-mono text-[#888888] tracking-tight">
              Arquitectura Biocibernética
            </span>
          </div>
        </div>

        {/* Clean Navigation Links */}
        <nav className="flex items-center gap-3">
          <a
            href="#origen"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            Origen
          </a>
          <a
            href="#chasis"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            Chasis
          </a>
          <a
            href="#reflexion"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            Diarios
          </a>

          <a
            href="#origen"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-black/80 transition-colors shadow-sm font-mono"
          >
            <span>Historia</span>
            <ChevronDown className="w-3 h-3" />
          </a>
        </nav>
      </div>
    </header>
  );
}
