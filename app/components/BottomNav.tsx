"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type NavItem = {
  /** Indeks aktif: Beranda=0, Directory=1, (Scan=2), Notifikasi=3, Akun=4. */
  idx: number;
  label: string;
  icon: ReactNode;
  href: string;
};

/**
 * Bottom navigation PPJI: Beranda, Directory, [Scan QR], Notifikasi, Akun.
 * Slot tengah (idx 2) adalah tombol Scan QR menonjol (FAB) ke /scan.
 * `activeIndex` menandai menu yang sedang aktif (default Beranda).
 */
export default function BottomNav({ activeIndex = 0 }: { activeIndex?: number }) {
  const router = useRouter();
  const tabs: NavItem[] = [
    { idx: 0, label: "Beranda", icon: <HomeIcon />, href: "/dashboard" },
    { idx: 1, label: "Directory", icon: <DirectoryIcon />, href: "/directory" },
    { idx: 3, label: "Notifikasi", icon: <BellIcon />, href: "/notifications" },
    { idx: 4, label: "Akun", icon: <UserIcon />, href: "/account" },
  ];

  const tab = (item: NavItem) => {
    const active = item.idx === activeIndex;
    return (
      <li key={item.label} className="flex flex-1 justify-center">
        <button
          type="button"
          aria-label={item.label}
          aria-current={active ? "page" : undefined}
          onClick={() => router.push(item.href)}
          className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1 transition ${
            active ? "text-[#1c5fa8]" : "text-neutral-400 hover:text-[#1c5fa8]"
          }`}
        >
          {item.icon}
          <span
            className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}
          >
            {item.label}
          </span>
        </button>
      </li>
    );
  };

  return (
    <div className="relative">
      <nav className="overflow-hidden rounded-b-[2.45rem] border-t border-neutral-200/70 bg-white/90 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/90">
        <ul className="flex items-end justify-around px-4 pb-9 pt-2.5">
          {tab(tabs[0])}
          {tab(tabs[1])}

          {/* Slot tengah: ruang ikon + label (FAB dirender di luar nav) */}
          <li className="flex flex-1 flex-col items-center gap-1">
            <span className="h-6 w-6" aria-hidden />
            <span className="text-[10px] font-medium text-neutral-400">Scan</span>
          </li>

          {tab(tabs[2])}
          {tab(tabs[3])}
        </ul>
      </nav>

      {/* Scan QR — FAB di luar nav agar tidak terpotong overflow-hidden */}
      <button
        type="button"
        aria-label="Scan QR"
        aria-current={activeIndex === 2 ? "page" : undefined}
        onClick={() => router.push("/scan")}
        className="absolute left-1/2 top-0 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#1c5fa8] text-white shadow-lg shadow-[#1c5fa8]/40 ring-4 ring-white transition active:scale-95 dark:ring-neutral-950"
      >
        <ScanIcon />
      </button>
    </div>
  );
}

/* ------------------------------- ikon ------------------------------- */

const svg = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function HomeIcon() {
  return (
    <svg {...svg}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  );
}

function DirectoryIcon() {
  return (
    <svg {...svg}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 3v18M11 8h5M11 12h5" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M3.5 12h17" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg {...svg}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M10.5 21a2 2 0 0 0 3 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...svg}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}
