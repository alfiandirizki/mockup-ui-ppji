"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  MessageCircle,
  Newspaper,
  FileBadge2,
  CalendarDays,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import MemberWalletCard from "../components/MemberWalletCard";
import PromoBanner from "../components/PromoBanner";
import OrgFeatures from "../components/OrgFeatures";
import { HeaderAction } from "../components/PageHeader";
import { Avatar, SectionHeader, IconTile } from "../components/ui";
import {
  member,
  shortcuts,
  totalUnreadChats,
  totalUnreadNotifs,
  type Shortcut,
} from "../lib/dummy";

const UNREAD_CHATS = totalUnreadChats();
const UNREAD_NOTIFS = totalUnreadNotifs();

const SHORTCUT_ICON: Record<Shortcut["icon"], LucideIcon> = {
  news: Newspaper,
  doc: FileBadge2,
  calendar: CalendarDays,
  topup: Receipt,
};

export default function DashboardPage() {
  const router = useRouter();
  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={0} />}>
      <div className="bg-canvas pb-12">
        {/* Hero navy */}
        <header className="relative overflow-hidden rounded-b-3xl bg-hero px-5 pb-20 pt-14 text-white">
          <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <Avatar src={member.avatar} alt={member.name} size={44} ring />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white/85">Halo, selamat datang 👋</p>
              <h1 className="truncate text-lg font-bold tracking-tight">
                {member.name}
              </h1>
            </div>
            <HeaderAction
              label="Notifikasi"
              onClick={() => router.push("/notifications")}
              badge={UNREAD_NOTIFS}
            >
              <Bell size={20} />
            </HeaderAction>
            <HeaderAction
              label="Chat"
              onClick={() => router.push("/chat")}
              badge={UNREAD_CHATS}
            >
              <MessageCircle size={20} />
            </HeaderAction>
          </div>
        </header>

        {/* Kartu hero overlap */}
        <div className="-mt-14 px-5">
          <MemberWalletCard member={member} />
        </div>

        {/* Menu pintasan */}
        <section className="mt-7 px-5">
          <SectionHeader title="Menu" />
          <div className="grid grid-cols-4 gap-2">
            {shortcuts.map((s) => {
              const Icon = SHORTCUT_ICON[s.icon];
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => s.href && router.push(s.href)}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100 transition active:scale-95"
                >
                  <IconTile size={44}>
                    <Icon size={22} strokeWidth={1.9} />
                  </IconTile>
                  <span className="text-[11px] font-semibold text-neutral-700">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Promo */}
        <div className="mt-7 px-5">
          <SectionHeader title="Promo & Info" action="Lihat semua" />
          <PromoBanner />
        </div>

        {/* Fitur organisasi */}
        <div className="mt-7 px-5">
          <OrgFeatures />
        </div>
      </div>
    </PhoneFrame>
  );
}
