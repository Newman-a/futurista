'use client';

import React, { useState } from 'react';
import { Cpu, Shield, HeartPulse, Smile, ArrowUpRight, type LucideIcon } from 'lucide-react';

interface PillData {
  id: string;
  title: string;
  region: string;
  icon: LucideIcon;
  coords: { x: number; y: number };
  storyContext: string;
  specs: string;
}

const PILLS: PillData[] = [
  {
    id: 'neural',
    title: 'Neural Linkage',
    region: 'Córtex y Cuello',
    icon: Cpu,
    coords: { x: 0.50, y: 0.28 },
    storyContext:
      'Elena diseñó este enlace para proyectar estructuras arquitectónicas tridimensionales directamente desde sus sinapsis a la realidad mixta.',
    specs: 'Mapeo sináptico subdérmico de baja latencia. Interfaz bidireccional para aumento cognitivo y síntesis de pensamiento.',
  },
  {
    id: 'kinetic',
    title: 'Kinetic Shell',
    region: 'Hombros y Torso',
    icon: Shield,
    coords: { x: 0.35, y: 0.60 },
    storyContext:
      'La estructura que reemplazó su columna debilitada. Oculta bajo suéteres de lana natural, le otorga fuerza y precisión milimétrica.',
    specs: 'Exoesqueleto de composite de carbono ultra ligero. Multiplicación de potencia motriz y soporte pasivo ante fatiga.',
  },
  {
    id: 'biometric',
    title: 'Biometric Core',
    region: 'Núcleo y Pecho',
    icon: HeartPulse,
    coords: { x: 0.50, y: 0.48 },
    storyContext:
      'El centro de energía que sustituye sus fallos metabólicos, manteniendo su cuerpo en perfecta homeostasis térmica.',
    specs: 'Regulación térmica autónoma, oxigenación asistida por fluidos sintéticos y monitorización vital continua.',
  },
  {
    id: 'empathy',
    title: 'Empathy Interface',
    region: 'Rostro y Expresión',
    icon: Smile,
    coords: { x: 0.50, y: 0.16 },
    storyContext:
      'Su decisión más íntima: prohibió cualquier implante en su rostro para preservar intactas sus sonrisas, su voz y la empatía humana.',
    specs: 'Preservación dérmica y muscular 100% orgánica. Transmisión micro-expresiva intacta en entornos sintéticos.',
  },
];

interface CyberneticBreakdownProps {
  onSelectHotspot?: (coords: { x: number; y: number }) => void;
}

export default function CyberneticBreakdown({ onSelectHotspot }: CyberneticBreakdownProps) {
  const [activePill, setActivePill] = useState<string | null>(null);

  const handleCardInteraction = (pill: PillData) => {
    setActivePill(pill.id);
    if (onSelectHotspot) {
      onSelectHotspot(pill.coords);
    }
  };

  return (
    <section id="chasis" className="relative z-30 bg-[#FAFAFC] py-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] uppercase">
              El Chasis de Elena
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#666666] leading-relaxed">
            Cada implante fue fabricado a medida según los bocetos de Elena. Selecciona una sección para enfocar el revelador en su figura.
          </p>
        </div>

        {/* 4 Frosted Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLS.map((pill) => {
            const Icon = pill.icon;
            const isSelected = activePill === pill.id;

            return (
              <div
                key={pill.id}
                onMouseEnter={() => handleCardInteraction(pill)}
                onClick={() => {
                  handleCardInteraction(pill);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`frosted-glass p-8 cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-black bg-white/95 shadow-xl ring-2 ring-black/5 -translate-y-1'
                    : 'border-white/80 hover:border-black/20 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase block">
                        {pill.region}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111] tracking-tight">
                        {pill.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Story Context */}
                <p className="text-sm text-[#222222] font-medium leading-relaxed mb-3">
                  &ldquo;{pill.storyContext}&rdquo;
                </p>

                {/* Technical Specs */}
                <p className="text-xs text-[#666666] leading-relaxed mb-6 font-normal">
                  {pill.specs}
                </p>

                <div className="flex items-center justify-end pt-4 border-t border-black/[0.06] font-mono text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#111111] group-hover:underline">
                    <span>Enfocar en la imagen</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
