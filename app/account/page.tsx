"use client";

import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  CircleHelp,
  CreditCard,
  GraduationCap,
  Info,
  Languages,
  LogOut,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import { Avatar, Button, Card, IconTile, ListRow } from "../components/ui";
import { member, formatDate } from "../lib/dummy";

export default function AccountPage() {
  const router = useRouter();

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={4} />}>
      <div className="flex min-h-full flex-col bg-canvas">
        {/* ── Hero header ── */}
        <div className="relative overflow-hidden rounded-b-3xl bg-hero px-5 pb-8 pt-14 shadow-lg shadow-brand-900/20">
          {/* decorative blur orbs */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <Avatar
              src={member.avatar}
              alt={member.name}
              size={72}
              ring
            />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-bold tracking-tight text-white">
                {member.name}
              </h1>
              <p className="truncate text-sm text-white/70">
                {member.business}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-400/30">
                <BadgeCheck size={12} />
                {member.tier}
              </span>
            </div>
          </div>

          {/* KTA info strip */}
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-[10px] uppercase tracking-wide text-white/70">
                No. KTA
              </p>
              <p className="mt-0.5 truncate text-sm font-bold text-white tnum">
                {member.ktaNumber.slice(-9)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-[10px] uppercase tracking-wide text-white/70">
                Berlaku s/d
              </p>
              <p className="mt-0.5 truncate text-sm font-bold text-white tnum">
                {formatDate(member.validUntil)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 px-4 pb-24 pt-5 space-y-4">
          {/* Group 1 — Akun */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Akun
            </p>
            <Card>
              <div className="divide-y divide-neutral-100">
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <CreditCard size={18} />
                    </IconTile>
                  }
                  title="Kartu Tanda Anggota"
                  subtitle="Lihat & unduh KTA digital"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <Wallet size={18} />
                    </IconTile>
                  }
                  title="PPJI Pay"
                  subtitle="Dompet digital anggota"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => router.push("/wallet")}
                />
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <GraduationCap size={18} />
                    </IconTile>
                  }
                  title="Sertifikat Saya"
                  subtitle="Pelatihan & sertifikasi"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => router.push("/sertifikasi")}
                />
              </div>
            </Card>
          </div>

          {/* Group 2 — Pengaturan */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Pengaturan
            </p>
            <Card>
              <div className="divide-y divide-neutral-100">
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <ShieldCheck size={18} />
                    </IconTile>
                  }
                  title="Keamanan"
                  subtitle="PIN, sidik jari, kata sandi"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <Bell size={18} />
                    </IconTile>
                  }
                  title="Notifikasi"
                  subtitle="Atur preferensi notifikasi"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <Languages size={18} />
                    </IconTile>
                  }
                  title="Bahasa"
                  subtitle="Indonesia"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
              </div>
            </Card>
          </div>

          {/* Group 3 — Bantuan */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Bantuan
            </p>
            <Card>
              <div className="divide-y divide-neutral-100">
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <CircleHelp size={18} />
                    </IconTile>
                  }
                  title="Pusat Bantuan"
                  subtitle="FAQ & kontak dukungan"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
                <ListRow
                  className="px-4 py-3.5"
                  leading={
                    <IconTile size={40}>
                      <Info size={18} />
                    </IconTile>
                  }
                  title="Tentang PPJI"
                  subtitle="Versi 1.0.0 • ppji.or.id"
                  trailing={<ChevronRight size={16} className="text-neutral-300" />}
                  onClick={() => {}}
                />
              </div>
            </Card>
          </div>

          {/* Keluar */}
          <Button
            variant="destructive"
            onClick={() => router.push("/welcome")}
          >
            <LogOut size={16} />
            Keluar
          </Button>

          <p className="text-center text-xs text-neutral-400">
            PPJI Mobile • v1.0.0
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
