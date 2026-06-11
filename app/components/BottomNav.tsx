"use client";

import { useRouter } from "next/navigation";
import {
  Home,
  BookUser,
  Clapperboard,
  User,
  QrCode,
  type LucideIcon,
} from "lucide-react";
import { cx } from "./ui";

type NavItem = { idx: number; label: string; icon: LucideIcon; href: string };

/**
 * Bottom navigation: Beranda, Directory, [Scan QRIS FAB], Reels, Akun.
 * FAB tengah (idx 2) dirender di luar <nav> agar tidak terpotong overflow.
 */
export default function BottomNav({ activeIndex = 0 }: { activeIndex?: number }) {
  const router = useRouter();
  const tabs: NavItem[] = [
    { idx: 0, label: "Beranda", icon: Home, href: "/dashboard" },
    { idx: 1, label: "Directory", icon: BookUser, href: "/directory" },
    { idx: 3, label: "Reels", icon: Clapperboard, href: "/reels" },
    { idx: 4, label: "Akun", icon: User, href: "/account" },
  ];

  const Tab = ({ item }: { item: NavItem }) => {
    const active = item.idx === activeIndex;
    const Icon = item.icon;
    return (
      <button
        type="button"
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        onClick={() => router.push(item.href)}
        className={cx(
          "flex flex-1 flex-col items-center gap-1 py-1 transition active:scale-95",
          active ? "text-brand-700" : "text-neutral-400 hover:text-brand-600",
        )}
      >
        <Icon size={23} strokeWidth={active ? 2.4 : 1.9} />
        <span className={cx("text-[10px]", active ? "font-bold" : "font-medium")}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="relative">
      <nav className="overflow-hidden rounded-b-[2.55rem] border-t border-neutral-200/70 bg-white/95 backdrop-blur-xl">
        <div className="flex items-end justify-around px-3 pb-8 pt-2.5">
          <Tab item={tabs[0]} />
          <Tab item={tabs[1]} />
          {/* slot tengah */}
          <div className="flex flex-1 flex-col items-center gap-1 py-1">
            <span className="h-5.75 w-5.75" aria-hidden />
            <span className="text-[10px] font-medium text-neutral-400">Scan</span>
          </div>
          <Tab item={tabs[2]} />
          <Tab item={tabs[3]} />
        </div>
      </nav>

      {/* FAB Scan QRIS */}
      <button
        type="button"
        aria-label="Scan QRIS"
        aria-current={activeIndex === 2 ? "page" : undefined}
        onClick={() => router.push("/scan")}
        className="absolute left-1/2 top-0 z-30 flex h-15 w-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-hero text-white shadow-lg shadow-brand-900/40 ring-4 ring-white transition active:scale-95"
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold-500/40" />
        <QrCode size={26} strokeWidth={2} />
      </button>
    </div>
  );
}
