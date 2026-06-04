import { banner } from "../lib/dummy";

/**
 * Banner promo/info ringkas — kartu putih dengan aksen biru.
 * Sengaja ringan agar tidak menyaingi kartu utama di Beranda.
 */
export default function PromoBanner() {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3.5 rounded-2xl bg-white p-3.5 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      {/* ikon aksen */}
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
        <MegaphoneIcon />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#1c5fa8]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1c5fa8]">
            Promo
          </span>
          <h3 className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-50">
            {banner.title}
          </h3>
        </div>
        <p className="mt-0.5 truncate text-xs text-neutral-500">
          {banner.subtitle}
        </p>
      </div>

      <ChevronRight />
    </button>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 11v2a1 1 0 0 0 1 1h2l9 4V6L6 10H4a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M18 8a4 4 0 0 1 0 8M7 14v3a2 2 0 0 0 4 0v-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-neutral-300 dark:text-neutral-600"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
