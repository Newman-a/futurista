'use client';

import React from 'react';
import { FileText, Cpu, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 bg-white py-16 px-6 sm:px-12 text-[#111111]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-t border-black/5 pt-12">
        {/* Subtle Signature */}
        <div className="flex flex-col gap-1 text-center md:text-left font-mono text-xs text-[#777777]">
          <strong className="text-[#111111] font-semibold text-sm">
            Elena Voss • Proyecto de Investigación
          </strong>
          <span>© 2026 Humanity 2.0 Research Initiative</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs">
          <a
            href="#reflexion"
            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all duration-200 border border-black/5 flex items-center gap-1.5 font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>[ Read Paper ]</span>
          </a>

          <a
            href="#chasis"
            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all duration-200 border border-black/5 flex items-center gap-1.5 font-medium"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>[ View Specs ]</span>
          </a>

          <a
            href="mailto:elena.voss@humanity2.initiative"
            className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all duration-200 border border-black/5 flex items-center gap-1.5 font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>[ Contact ]</span>
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full frosted-glass hover:bg-black hover:text-white transition-all shadow-sm"
          title="Volver arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
