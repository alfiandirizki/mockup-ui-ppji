import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  /** Teks waktu di status bar. Default "9:41". */
  time?: string;
  /** Tombol fisik di sisi frame. Default true. */
  buttons?: boolean;
  /** Bottom navigation menempel di dasar layar (di luar area scroll). */
  bottomBar?: ReactNode;
  /**
   * Warna ikon status bar.
   * "light" (default) untuk header gelap; "dark" untuk latar terang penuh.
   */
  statusTone?: "light" | "dark";
};

/**
 * Bingkai iPhone 17 Pro Max — versi realistis.
 *
 * Status bar dibuat sebagai overlay transparan sehingga header/hero halaman
 * bisa "bleed" sampai ke atas (gaya Livin' by Mandiri). Setiap halaman cukup
 * menambah padding atas (mis. `pt-14`) agar kontennya tidak tertutup status bar
 * — PageHeader sudah menanganinya.
 */
export default function PhoneFrame({
  children,
  time = "9:41",
  buttons = true,
  bottomBar,
  statusTone = "light",
}: PhoneFrameProps) {
  const ink = statusTone === "light" ? "text-white" : "text-neutral-900";

  return (
    <div className="flex min-h-dvh w-full items-center justify-center p-3 sm:p-5">
      <div
        className="relative aspect-440/956 max-h-[96dvh] w-[min(430px,94vw)]"
        style={{ height: "min(956px, 96dvh)" }}
      >
        {/* Tombol fisik */}
        {buttons && (
          <>
            {/* Action button (kiri atas) */}
            <div className="absolute -left-[3px] top-[16%] h-8 w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700 shadow-sm" />
            {/* Volume up / down */}
            <div className="absolute -left-[3px] top-[25%] h-12 w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700 shadow-sm" />
            <div className="absolute -left-[3px] top-[34%] h-12 w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700 shadow-sm" />
            {/* Power (kanan) */}
            <div className="absolute -right-[3px] top-[27%] h-20 w-[3px] rounded-r-sm bg-linear-to-b from-neutral-500 to-neutral-700 shadow-sm" />
            {/* Camera control (kanan bawah) */}
            <div className="absolute -right-[3px] top-[44%] h-9 w-[3px] rounded-r-sm bg-linear-to-b from-neutral-500 to-neutral-700 shadow-sm" />
          </>
        )}

        {/* Bayangan kontak di "meja" */}
        <div className="pointer-events-none absolute inset-x-8 -bottom-6 h-12 rounded-[50%] bg-black/25 blur-2xl" />

        {/* Rangka titanium */}
        <div className="relative h-full w-full rounded-[3.5rem] bg-linear-to-br from-neutral-200 via-neutral-400 to-neutral-300 p-[3px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.55),0_10px_25px_-10px_rgba(15,23,42,0.4)]">
          {/* Garis kilau tepi */}
          <div className="absolute inset-0 rounded-[3.5rem] ring-1 ring-inset ring-white/40" />
          <div className="absolute inset-[3px] rounded-[3.35rem] ring-1 ring-inset ring-black/20" />

          {/* Bezel hitam */}
          <div className="relative h-full w-full overflow-hidden rounded-[3.3rem] bg-black p-[11px]">
            {/* Layar */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.7rem] bg-canvas">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[11px] z-40 flex h-[34px] w-[120px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-3 shadow-inner">
                {/* Sensor proximity */}
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                {/* Kamera depan dengan glint */}
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-linear-to-br from-neutral-700 to-black ring-1 ring-neutral-700/60">
                  <span className="h-1 w-1 rounded-full bg-blue-900/80" />
                  <span className="absolute left-0.5 top-0.5 h-[3px] w-[3px] rounded-full bg-sky-300/40" />
                </span>
              </div>

              {/* Status bar (overlay transparan) */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-7 pt-3.5 text-[15px] font-semibold ${ink}`}
              >
                <span className="tnum tracking-tight">{time}</span>
                <span className="flex items-center gap-1.5">
                  <SignalIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </span>
              </div>

              {/* Konten — mengisi ruang antara atas layar dan bottom bar.
                  Sengaja TIDAK relative agar action bar `absolute bottom-0`
                  di dalam halaman ter-anchor ke layar (frame), bukan scroll. */}
              <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
                {children}
              </div>

              {/* Bottom navigation */}
              {bottomBar && (
                <div className="relative z-20 shrink-0">{bottomBar}</div>
              )}

              {/* Kilau layar tipis */}
              <div className="pointer-events-none absolute inset-0 z-30 rounded-[2.7rem] bg-linear-to-br from-white/8 via-transparent to-transparent" />

              {/* Home indicator */}
              <div
                className={`pointer-events-none absolute bottom-2 left-1/2 z-40 h-1 w-32 -translate-x-1/2 rounded-full ${
                  statusTone === "light" ? "bg-white/70" : "bg-neutral-900/70"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
      <rect x="0" y="8" width="3" height="4" rx="0.6" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" />
      <rect x="10" y="3" width="3" height="9" rx="0.6" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden>
      <path d="M8.5 2.2c2.7 0 5.2 1 7.1 2.8.3.3.3.7 0 1l-.8.8c-.3.3-.7.3-1 0a8 8 0 0 0-10.6 0c-.3.3-.7.3-1 0l-.8-.8c-.3-.3-.3-.7 0-1A10.4 10.4 0 0 1 8.5 2.2Z" />
      <path d="M8.5 6.4c1.5 0 2.9.6 4 1.6.3.3.3.7 0 1l-.9.9c-.3.3-.7.2-1 0a4.4 4.4 0 0 0-4.2 0c-.3.2-.7.3-1 0l-.9-.9c-.3-.3-.3-.7 0-1a5.8 5.8 0 0 1 4-1.6Z" />
      <circle cx="8.5" cy="11" r="1.3" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" strokeOpacity="0.4" />
      <path d="M24.5 4.5c.8.3 1.3 1 1.3 2s-.5 1.7-1.3 2v-4Z" fill="currentColor" fillOpacity="0.4" />
      <rect x="2" y="2" width="18.5" height="9" rx="1.6" fill="currentColor" />
    </svg>
  );
}
