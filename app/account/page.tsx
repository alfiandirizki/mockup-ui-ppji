"use client";

import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import { member, formatDate, remainingText } from "../lib/dummy";

// Mockup: waktu acuan tetap agar render deterministik.
const NOW = new Date("2026-06-03");

type MenuItem = { label: string; icon: React.ReactNode };

export default function AccountPage() {
  const router = useRouter();

  const menu: MenuItem[] = [
    { label: "Edit Profil", icon: <UserIcon /> },
    { label: "Kartu Anggota", icon: <CardIcon /> },
    { label: "Keamanan", icon: <ShieldIcon /> },
    { label: "Bahasa", icon: <GlobeIcon /> },
    { label: "Bantuan", icon: <HelpIcon /> },
    { label: "Tentang PPJI", icon: <InfoIcon /> },
  ];

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={4} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        {/* Header profil */}
        <header className="relative overflow-hidden rounded-b-[2rem] bg-linear-to-br from-[#2f7ad1] via-[#236bbd] to-[#143f78] px-6 pb-9 pt-7 text-white shadow-lg shadow-[#1c5fa8]/20">
          <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold ring-2 ring-white/30">
              {member.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight">
                {member.name}
              </h1>
              <p className="truncate text-sm text-white/75">
                {member.business}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-300/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Anggota Aktif
              </span>
            </div>
          </div>
        </header>

        <div className="px-5 pb-8 pt-5">
          {/* Ringkasan keanggotaan */}
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              label="No. KTA"
              value={member.ktaNumber.slice(-9)}
              hint="Kartu Tanda Anggota"
            />
            <SummaryCard
              label="Berlaku s/d"
              value={formatDate(member.validUntil)}
              hint={remainingText(member.validUntil, NOW)}
            />
          </div>

          {/* Menu pengaturan */}
          <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            {menu.map((item, i) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3.5 px-4 py-4 text-left transition hover:bg-neutral-50 active:bg-neutral-100 dark:hover:bg-neutral-800/60 ${
                  i !== 0
                    ? "border-t border-neutral-100 dark:border-neutral-800"
                    : ""
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
                  {item.icon}
                </span>
                <span className="flex-1 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {item.label}
                </span>
                <ChevronRight />
              </button>
            ))}
          </div>

          {/* Tombol logout */}
          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-semibold text-rose-600 shadow-sm shadow-neutral-200/50 ring-1 ring-rose-100 transition hover:bg-rose-50 active:scale-[0.99] dark:bg-neutral-900 dark:ring-rose-500/30 dark:hover:bg-rose-500/10"
          >
            <LogoutIcon />
            Keluar
          </button>

          <p className="mt-5 text-center text-xs text-neutral-400">
            PPJI Mobile • v1.0.0
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
      <p className="text-[11px] uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold text-neutral-900 dark:text-neutral-50">
        {value}
      </p>
      <p className="mt-1 truncate text-[11px] text-[#1c5fa8]">{hint}</p>
    </div>
  );
}

/* ------------------------------- ikon ------------------------------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3Z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.7.3-.9.8-.9 1.5M12 17h.01" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      {...stroke}
      className="text-neutral-300 dark:text-neutral-600"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
