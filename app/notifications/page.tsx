"use client";

import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { notifications, type Notification } from "../lib/dummy";

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={3} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="Notifikasi"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} belum dibaca`
              : "Semua sudah dibaca"
          }
          action={
            <HeaderAction label="Tandai semua dibaca">
              <CheckAllIcon />
            </HeaderAction>
          }
        />

        {/* Daftar notifikasi — gap lega */}
        <ul className="flex flex-col gap-3 px-5 pb-6 pt-5">
          {notifications.map((n) => (
            <li key={n.id}>
              <NotifItem notif={n} />
            </li>
          ))}
        </ul>
      </div>
    </PhoneFrame>
  );
}

function NotifItem({ notif }: { notif: Notification }) {
  const style = TYPE_STYLE[notif.type];
  return (
    <button
      type="button"
      className={`flex w-full items-start gap-3.5 rounded-2xl p-4 text-left transition active:scale-[0.99] ${
        notif.unread
          ? "bg-white shadow-sm shadow-neutral-200/60 ring-1 ring-[#1c5fa8]/15 dark:bg-neutral-900 dark:ring-[#1c5fa8]/25"
          : "bg-white/60 ring-1 ring-neutral-100 hover:bg-white dark:bg-neutral-900/50 dark:ring-neutral-800"
      }`}
    >
      {/* Ikon kategori */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.fg}`}
      >
        {style.icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-bold leading-snug text-neutral-900 dark:text-neutral-50">
            {notif.title}
          </p>
          {notif.unread && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1c5fa8]" />
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {notif.body}
        </p>
        <p className="mt-2 text-[11px] font-medium text-neutral-400">
          {notif.time}
        </p>
      </div>
    </button>
  );
}

/* ------------------------- gaya per kategori ------------------------ */

const TYPE_STYLE: Record<
  Notification["type"],
  { bg: string; fg: string; icon: React.ReactNode }
> = {
  event: {
    bg: "bg-[#1c5fa8]/10",
    fg: "text-[#1c5fa8]",
    icon: <CalendarIcon />,
  },
  iuran: {
    bg: "bg-amber-100 dark:bg-amber-500/15",
    fg: "text-amber-600",
    icon: <WalletIcon />,
  },
  info: {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    fg: "text-emerald-600",
    icon: <InfoIcon />,
  },
};

/* ------------------------------- ikon ------------------------------- */

function CheckAllIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m3 13 3.5 3.5L15 8M11 16l1.5 1.5L21 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="6"
        width="18"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="13.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 11v5M12 8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
