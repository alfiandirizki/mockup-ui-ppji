import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  /** Teks waktu di status bar. Default "9:41". */
  time?: string;
  /** Tampilkan tombol fisik (volume, power) di sisi frame. Default true. */
  buttons?: boolean;
  /**
   * Bottom navigation yang menempel di dasar layar (di luar area scroll).
   * Gunakan ini agar navbar selalu terlihat, bukan ikut menggulir konten.
   */
  bottomBar?: ReactNode;
};

/**
 * Bingkai iPhone 17 Pro Max untuk demo mockup mobile.
 *
 * Ciri khas yang ditiru:
 * - Bezel titanium tipis & seragam (Pro Max), sudut sangat membulat.
 * - Dynamic Island (pill hitam) menggantikan notch lama.
 * - Status bar iOS dengan ikon signal / Wi-Fi / battery SVG.
 * - Tombol fisik: action/volume di kiri, power di kanan.
 * - Home indicator bawah; konten scroll di dalam frame.
 *
 * Rasio mengikuti point-size Pro Max (~440 x 956). Frame menyesuaikan
 * tinggi viewport via max-h sehingga tetap utuh di layar kecil.
 */
export default function PhoneFrame({
  children,
  time = "9:41",
  buttons = true,
  bottomBar,
}: PhoneFrameProps) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-950">
      {/* Wrapper untuk frame + tombol fisik */}
      <div
        className="relative aspect-440/956 max-h-[92dvh] w-[min(440px,92vw)]"
        style={{ height: "min(956px, 92dvh)" }}
      >
        {/* Tombol fisik kiri: action button + volume up/down */}
        {buttons && (
          <>
            <div className="absolute -left-0.75 top-[18%] h-9 w-0.75 rounded-l-md bg-neutral-400 dark:bg-neutral-700" />
            <div className="absolute -left-0.75 top-[27%] h-14 w-0.75 rounded-l-md bg-neutral-400 dark:bg-neutral-700" />
            <div className="absolute -left-0.75 top-[37%] h-14 w-0.75 rounded-l-md bg-neutral-400 dark:bg-neutral-700" />
            {/* Tombol fisik kanan: power / camera control */}
            <div className="absolute -right-0.75 top-[30%] h-20 w-0.75 rounded-r-md bg-neutral-400 dark:bg-neutral-700" />
          </>
        )}

        {/* Rangka titanium luar */}
        <div className="relative h-full w-full rounded-[3.4rem] bg-linear-to-b from-neutral-300 via-neutral-400 to-neutral-300 p-0.75 shadow-2xl dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700">
          {/* Bezel hitam tipis */}
          <div className="relative h-full w-full overflow-hidden rounded-[3.2rem] bg-black p-2.5">
            {/* Layar — disusun vertikal: status bar, konten scroll, navbar */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.6rem] bg-white dark:bg-neutral-950">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2.75 z-30 flex h-8.5 w-30 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-3">
                {/* Kamera depan (titik kecil di dalam island) */}
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-800 ring-1 ring-neutral-700/60" />
              </div>

              {/* Status bar */}
              <div className="relative z-20 flex shrink-0 items-center justify-between px-8 pt-4.5 text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                <span className="tracking-tight tabular-nums">{time}</span>
                <span className="flex items-center gap-1.5">
                  <SignalIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </span>
              </div>

              {/* Area konten — scrollable, mengisi sisa ruang */}
              <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

              {/* Bottom navigation — menempel di dasar layar */}
              {bottomBar && <div className="relative z-20 shrink-0">{bottomBar}</div>}

              {/* Home indicator */}
              <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-1.25 w-33.5 -translate-x-1/2 rounded-full bg-neutral-900/80 dark:bg-neutral-100/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="currentColor"
      aria-hidden
      className="text-neutral-900 dark:text-neutral-100"
    >
      <rect x="0" y="8" width="3" height="4" rx="0.6" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" />
      <rect x="10" y="3" width="3" height="9" rx="0.6" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="0.6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="currentColor"
      aria-hidden
      className="text-neutral-900 dark:text-neutral-100"
    >
      <path d="M8.5 2.2c2.7 0 5.2 1 7.1 2.8.3.3.3.7 0 1l-.8.8c-.3.3-.7.3-1 0a8 8 0 0 0-10.6 0c-.3.3-.7.3-1 0l-.8-.8c-.3-.3-.3-.7 0-1A10.4 10.4 0 0 1 8.5 2.2Z" />
      <path d="M8.5 6.4c1.5 0 2.9.6 4 1.6.3.3.3.7 0 1l-.9.9c-.3.3-.7.2-1 0a4.4 4.4 0 0 0-4.2 0c-.3.2-.7.3-1 0l-.9-.9c-.3-.3-.3-.7 0-1a5.8 5.8 0 0 1 4-1.6Z" />
      <circle cx="8.5" cy="11" r="1.3" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      width="27"
      height="13"
      viewBox="0 0 27 13"
      fill="none"
      aria-hidden
      className="text-neutral-900 dark:text-neutral-100"
    >
      {/* Body */}
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      {/* Tip */}
      <path
        d="M24.5 4.5c.8.3 1.3 1 1.3 2s-.5 1.7-1.3 2v-4Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
      {/* Fill ~85% */}
      <rect x="2" y="2" width="17" height="9" rx="1.6" fill="currentColor" />
    </svg>
  );
}
