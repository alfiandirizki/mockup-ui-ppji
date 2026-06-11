"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, Receipt, Info, CheckCheck } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { Card, IconTile } from "../components/ui";
import { notifications, type Notification } from "../lib/dummy";

export default function NotificationsPage() {
  const router = useRouter();
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-canvas">
        <PageHeader
          title="Notifikasi"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} belum dibaca`
              : "Semua sudah dibaca"
          }
          onBack={() => router.back()}
          action={
            <HeaderAction label="Tandai semua dibaca" badge={unreadCount}>
              <CheckCheck size={20} />
            </HeaderAction>
          }
        />

        <ul className="flex flex-col gap-3 px-5 pb-8 pt-5">
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
    <Card
      as="button"
      onClick={() => {}}
      className={
        notif.unread
          ? "bg-brand-50 ring-1 ring-brand-200/60"
          : "bg-white ring-1 ring-neutral-100"
      }
    >
      <div className="flex items-start gap-3.5 p-4">
        {/* Ikon kategori */}
        <IconTile className={style.tile}>{style.icon}</IconTile>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold leading-snug text-brand-900">
              {notif.title}
            </p>
            {notif.unread && (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
            {notif.body}
          </p>
          <p className="mt-2 text-[11px] font-medium text-neutral-400">
            {notif.time}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* -------------------- gaya per kategori -------------------- */

const TYPE_STYLE: Record<
  Notification["type"],
  { tile: string; icon: React.ReactNode }
> = {
  event: {
    tile: "bg-brand-100 text-brand-700",
    icon: <CalendarDays size={20} />,
  },
  iuran: {
    tile: "bg-gold-100 text-gold-600",
    icon: <Receipt size={20} />,
  },
  info: {
    tile: "bg-emerald-100 text-emerald-600",
    icon: <Info size={20} />,
  },
};
