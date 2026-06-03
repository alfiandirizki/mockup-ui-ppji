"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

type NavItem = {
  label: string;
  icon: ReactNode;
  /** Tujuan navigasi; null = belum ada halaman (placeholder). */
  href: string | null;
};

/**
 * Bottom navigation PPJI: Beranda, Directory, Event, Notifikasi, Akun.
 * `activeIndex` menandai menu yang sedang aktif (default Beranda).
 */
export default function BottomNav({ activeIndex = 0 }: { activeIndex?: number }) {
  const router = useRouter();
  const items: NavItem[] = [
    { label: "Beranda", icon: <HomeIcon />, href: "/dashboard" },
    { label: "Directory", icon: <DirectoryIcon />, href: "/directory" },
    { label: "Berita", icon: <NewsIcon />, href: "/news" },
    { label: "Notifikasi", icon: <BellIcon />, href: "/notifications" },
    { label: "Akun", icon: <UserIcon />, href: "/account" },
  ];

  return (
    <nav className="overflow-hidden rounded-b-[2.45rem] border-t border-neutral-200/70 bg-white/90 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/90">
      {/* px aman agar item tepi tak menyentuh lengkung sudut;
          pb besar menyisakan zona aman untuk home indicator iOS */}
      <ul className="flex items-stretch justify-around px-4 pb-9 pt-2.5">
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <li key={item.label} className="flex flex-1 justify-center">
              <button
                type="button"
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onClick={() => item.href && router.push(item.href)}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1 transition ${
                  active
                    ? "text-[#1c5fa8]"
                    : "text-neutral-400 hover:text-[#1c5fa8]"
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
        })}
      </ul>
    </nav>
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

function NewsIcon() {
  return (
    <svg {...svg}>
      <path d="M4 5h13a1 1 0 0 1 1 1v12a2 2 0 0 0 2-2V8" />
      <path d="M18 19H5a1 1 0 0 1-1-1V5" />
      <path d="M7 9h7M7 12.5h7M7 16h4" />
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
