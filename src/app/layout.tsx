import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Futurista // Interactive Liquid Mask Reveal Canvas',
  description:
    'WebGL 2.0 Real-time Liquid Mask Reveal Shader with Three.js, React Three Fiber, Simplex Noise distortion and Frosted Glass Swiss typography.',
  keywords: ['WebGL', 'Three.js', 'React Three Fiber', 'GLSL', 'Liquid Glass', 'Shader', 'Next.js'],
  authors: [{ name: 'Futurista WebGL Studio' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-white text-[#111111] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
