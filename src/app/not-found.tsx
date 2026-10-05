import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#111111] p-6 font-mono text-center">
      <h2 className="text-4xl font-black mb-2">404</h2>
      <p className="text-sm text-[#666666] mb-6">Página no encontrada</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-black/80 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
