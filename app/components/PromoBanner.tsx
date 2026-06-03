import { banner } from "../lib/dummy";

/**
 * Banner promo/info di Beranda (di bawah kartu anggota).
 * Gradient + judul + deskripsi + tombol CTA. Placeholder.
 */
export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1c5fa8] to-[#3b82d6] p-5 text-white shadow-md shadow-[#1c5fa8]/20">
      {/* aksen dekoratif */}
      <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold tracking-tight">{banner.title}</h3>
          <p className="mt-0.5 text-xs text-white/80">{banner.subtitle}</p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#1c5fa8] transition active:scale-95"
          >
            {banner.cta}
          </button>
        </div>

        {/* ilustrasi sederhana */}
        <div className="hidden shrink-0 sm:block">
          <MegaphoneIcon />
        </div>
      </div>
    </div>
  );
}

function MegaphoneIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-white/85"
    >
      <path
        d="M3 11v2a1 1 0 0 0 1 1h2l9 4V6L6 10H4a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18 8a4 4 0 0 1 0 8M7 14v3a2 2 0 0 0 4 0v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
