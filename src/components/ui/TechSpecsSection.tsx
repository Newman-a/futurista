'use client';

import React from 'react';
import { Cpu, Zap, Maximize2, Sparkles, Layers, RefreshCw, Code2, CheckCircle2 } from 'lucide-react';

export default function TechSpecsSection() {
  return (
    <section id="details" className="relative z-30 bg-white py-24 px-6 md:px-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-[#888888] uppercase tracking-widest block mb-2">
              02 // ARQUITECTURA & ESPECIFICACIONES TÉCNICAS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] uppercase">
              Shader Pipeline & Optimización
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666666] leading-relaxed">
            Diseñado para un rendimiento extremo de 60 FPS continuo con renderizado WebGL suspendido
            automáticamente al salir del viewport.
          </p>
        </div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-black/10 bg-[#FAFAFA] flex flex-col justify-between hover:border-black/30 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] mb-2 uppercase tracking-wide">
                Simplex Noise 3D & Máscara Líquida
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed mb-4">
                El shader calcula la distancia radial normalizada corregida por aspecto y modula el
                borde con 3 octavas de ruido Simplex dependientes de <code>u_time</code>, creando una
                tensión superficial orgánica.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#444444] bg-white p-3 rounded-lg border border-black/5">
              <code>smoothstep(u_radius + f, u_radius - f, dist + noise);</code>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-black/10 bg-[#FAFAFA] flex flex-col justify-between hover:border-black/30 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-6 shadow-sm">
                <Layers className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] mb-2 uppercase tracking-wide">
                Refracción Óptica y Aberración
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed mb-4">
                La textura B sufre un desplazamiento en dirección radial proporcional a la curvatura de la
                lente de fluido, descomponiendo los canales R, G y B con sutil dispersión cromática y caústica.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#444444] bg-white p-3 rounded-lg border border-black/5">
              <code>vec2 uvOffset = dir * (lensProfile + ripple) * u_distortion;</code>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl border border-black/10 bg-[#FAFAFA] flex flex-col justify-between hover:border-black/30 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-black/10 flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] mb-2 uppercase tracking-wide">
                Intersection & Resize Observers
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed mb-4">
                WebGL suspende el ciclo <code>frameloop=&quot;never&quot;</code> cuando esta sección
                está en vista, liberando completamente el GPU. El cálculo cover de UVs recalcula el ratio de aspecto
                sin provocar deformaciones.
              </p>
            </div>
            <div className="font-mono text-[10px] text-[#444444] bg-white p-3 rounded-lg border border-black/5">
              <code>frameloop: isVisible ? &quot;always&quot; : &quot;never&quot;</code>
            </div>
          </div>
        </div>

        {/* Asset Customization Guide Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-[#111111] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                LISTO PARA TUS IMÁGENES
              </span>
            </div>
            <h4 className="text-xl font-bold tracking-tight">
              ¿Cómo cambiar las imágenes A y B?
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Las imágenes actuales <code>/1.jpg</code> y <code>/2.jpg</code> están cargadas desde la carpeta <code>public/</code>.
              Puedes reemplazarlas o configurar constantes directas en el archivo <code>LiquidMaskCanvas.tsx</code> (constante <code>ASSETS</code>).
            </p>
          </div>

          <div className="font-mono text-xs bg-black/50 border border-white/10 p-4 rounded-xl text-neutral-200">
            <span className="text-neutral-500">// En LiquidMaskCanvas.tsx</span>
            <br />
            export const ASSETS = &#123;
            <br />
            &nbsp;&nbsp;TEXTURE_A: &apos;/1.jpg&apos;,
            <br />
            &nbsp;&nbsp;TEXTURE_B: &apos;/2.jpg&apos;,
            <br />
            &#125;;
          </div>
        </div>
      </div>
    </section>
  );
}
