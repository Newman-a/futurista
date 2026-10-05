'use client';

import React from 'react';

export default function DeepDiveSection() {
  return (
    <section id="reflexion" className="relative z-30 bg-white py-32 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] leading-[1.02] uppercase mb-16">
          The Rise of Neural Interfaces & Speculative Design
        </h2>

        {/* Story Logs */}
        <div className="space-y-16">
          {/* Part I */}
          <article className="border-l-2 border-black/80 pl-6 sm:pl-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
              &ldquo;From Fiction to Function&rdquo;
            </h3>
            <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-light">
              &ldquo;Ya no estamos hablando de ciencia ficción. La primera vez que el exoesqueleto respondió a una intención de movimiento antes de que mis músculos enviaran la señal, sentí una extraña paz. Las interfaces neuronales no son una invasión externa; son un puente que repara y extiende nuestra propia biología cuando el cuerpo falla.&rdquo;
            </p>
          </article>

          {/* Part II */}
          <article className="border-l-2 border-black/80 pl-6 sm:pl-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
              &ldquo;Identity in the Augmented Era&rdquo;
            </h3>
            <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-light">
              &ldquo;A medida que integramos estas capas sintéticas bajo nuestra piel, surge una pregunta fundamental: ¿dónde termina la biología y comienza la identidad digital? Miro el espejo cada mañana: mis ojos siguen siendo los mismos, pero mis manos ahora pueden esculpir edificios enteros sin temblar. El diseño especulativo nos permite explorar estas dualidades antes de que se conviertan en nuestra realidad cotidiana.&rdquo;
            </p>
          </article>
        </div>

        {/* Quote Box */}
        <div className="mt-20 p-8 rounded-2xl bg-[#FAFAFA] border border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#888888] uppercase block">Firma</span>
            <strong className="text-[#111111] text-sm">Elena Voss — Arquitecta</strong>
          </div>
          <div className="text-[#666666] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Estado: Vital y Activa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
