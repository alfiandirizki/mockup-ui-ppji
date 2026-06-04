"use client";

import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import MemberWalletCard from "../components/MemberWalletCard";
import PromoBanner from "../components/PromoBanner";
import OrgFeatures from "../components/OrgFeatures";
import { member, shortcuts, type Shortcut } from "../lib/dummy";

// Mockup: waktu acuan tetap agar render deterministik.
const NOW = new Date("2026-06-03");

export default function DashboardPage() {
  const router = useRouter();
  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={0} />}>
      <div className="min-h-full bg-linear-to-b from-[#eaf3fb] via-white to-white px-6 pb-10 pt-7 dark:from-[#0d1b2c] dark:via-neutral-950 dark:to-neutral-950">
        {/* Sapaan */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500">Selamat datang,</p>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {member.name}
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c5fa8] text-lg font-semibold text-white shadow-sm shadow-[#1c5fa8]/30">
            {member.name.charAt(0)}
          </div>
        </header>

        {/* Kartu gabungan: KTA + PPJI Pay */}
        <div className="mt-7">
          <MemberWalletCard member={member} now={NOW} />
        </div>

        {/* Menu pintasan */}
        <section className="mt-8">
          <h2 className="mb-4 text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Menu
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {shortcuts.map((s) => (
              <ShortcutItem
                key={s.label}
                item={s}
                onClick={() => s.href && router.push(s.href)}
              />
            ))}
          </div>
        </section>

        {/* Banner promo — ringan, di bawah menu */}
        <div className="mt-6">
          <PromoBanner />
        </div>

        {/* Fitur Organisasi */}
        <div className="mt-8">
          <OrgFeatures />
        </div>
      </div>
    </PhoneFrame>
  );
}

function ShortcutItem({
  item,
  onClick,
}: {
  item: Shortcut;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 rounded-2xl bg-white p-3.5 text-center shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.97] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
        <ShortcutIcon name={item.icon} />
      </span>
      <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
        {item.label}
      </span>
    </button>
  );
}

function ShortcutIcon({ name }: { name: Shortcut["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "news":
      return (
        <svg {...common}>
          <path d="M4 5h13a1 1 0 0 1 1 1v12a2 2 0 0 0 2-2V8" />
          <path d="M18 19H5a1 1 0 0 1-1-1V5" />
          <path d="M7 9h7M7 12.5h7M7 16h4" />
        </svg>
      );
    case "topup":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M12 13.5v-3M10.5 12h3" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M9 13h6M9 17h6" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
  }
}
