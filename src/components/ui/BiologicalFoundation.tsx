'use client';

import React from 'react';

export default function BiologicalFoundation() {
  return (
    <section id="origen" className="relative z-30 bg-white pt-24 pb-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Big Editorial Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] uppercase mb-12 leading-[0.95]">
          The Baseline
        </h2>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <p className="text-xl sm:text-2xl text-[#222222] font-light leading-relaxed tracking-tight border-l-2 border-black pl-6 sm:pl-8">
              &ldquo;Antes de su transformación, Elena era una reconocida arquitecta estructural. A sus 27 años fue diagnosticada con una atrofia neuromuscular degenerativa que amenazaba con paralizar sus manos y su mente creativa.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed pl-6 sm:pl-8 font-normal">
              Negándose a aceptar los límites de la fragilidad biológica, Elena pasó cuatro años diseñando en secreto su propio exoesqueleto subdérmico. No buscaba convertirse en una máquina impersonal, sino construir una segunda piel protectora que amplificara su capacidad sin borrar su identidad.
            </p>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed pl-6 sm:pl-8 font-normal">
              Hoy vive como un híbrido consciente: por fuera viste prendas simples de lana y mira con ojos humanos; por dentro, una red de fibra de carbono y enlaces neuronales sostiene cada uno de sus movimientos.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-black/5">
              <span className="text-[#888888] text-[10px] uppercase block mb-1">Diagnóstico 2024</span>
              <strong className="text-sm text-[#111111] block mb-1">Fragilidad Biológica</strong>
              <p className="text-[#666666] text-[11px] leading-relaxed">
                Pérdida progresiva del 40% de motricidad fina en extremidades superiores.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-black/5">
              <span className="text-[#888888] text-[10px] uppercase block mb-1">Prototipo 2025</span>
              <strong className="text-sm text-[#111111] block mb-1">Diseño Autónomo</strong>
              <p className="text-[#666666] text-[11px] leading-relaxed">
                Modelado en fibra de carbono y micro-servos electrohidráulicos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] text-white">
              <span className="text-neutral-400 text-[10px] uppercase block mb-1">Estado Presente</span>
              <strong className="text-sm text-white block mb-1">Fusión Completa</strong>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                100% de recuperación motriz con interfaz cerebro-computadora sincronizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
