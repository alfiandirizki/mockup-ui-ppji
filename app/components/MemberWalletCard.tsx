"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, BadgeCheck } from "lucide-react";
import PpjiLogo from "./PpjiLogo";
import { WalletActionIcon } from "./Wallet";
import { IconTile, cx } from "./ui";
import {
  formatDate,
  formatRupiah,
  wallet,
  walletActions,
  type Member,
  type WalletAction,
} from "../lib/dummy";

type Props = { member: Member };

/** Kartu hero: identitas KTA (navy) + dompet PPJI Pay (putih). */
export default function MemberWalletCard({ member }: Props) {
  const router = useRouter();
  const [hide, setHide] = useState(false);

  function go(action: WalletAction["icon"]) {
    if (action === "tarik") router.push("/withdraw");
    else if (action === "transfer") router.push("/transfer");
    else if (action === "topup") router.push("/topup");
    else router.push("/wallet");
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-brand-900/15 ring-1 ring-neutral-100">
      {/* ====== KTA (navy) ====== */}
      <div className="relative overflow-hidden bg-hero p-5 text-white">
        {/* tekstur garis halus */}
        <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-6 h-36 w-36 rounded-full bg-gold-500/15 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <PpjiLogo width={32} hideTagline />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/55">
              Kartu Tanda Anggota
            </p>
            <p className="truncate text-sm font-bold">{member.business}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-gold-500/20 px-2.5 py-1 text-[11px] font-bold text-gold-200 ring-1 ring-gold-500/40">
            <BadgeCheck size={13} />
            {member.tier}
          </span>
        </div>

        {/* chip + nomor KTA */}
        <div className="relative mt-5 flex items-center gap-3">
          <span className="flex h-7 w-9 items-center justify-center rounded-md bg-linear-to-br from-gold-300 to-gold-600">
            <span className="h-3.5 w-5 rounded-[3px] ring-1 ring-gold-700/40" />
          </span>
          <p className="font-mono text-[15px] font-semibold tracking-[0.18em] tnum">
            {member.ktaNumber}
          </p>
        </div>

        <div className="relative mt-3 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Berlaku s/d{" "}
            <span className="font-semibold text-white/85">
              {formatDate(member.validUntil)}
            </span>
          </p>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Aktif
          </span>
        </div>
      </div>

      {/* ====== PPJI Pay (putih) ====== */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
            Saldo PPJI Pay
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/wallet")}
              className="text-2xl font-extrabold tracking-tight tnum text-brand-900 transition active:opacity-70"
            >
              {hide ? "Rp ••••••" : formatRupiah(wallet.balance)}
            </button>
            <button
              type="button"
              onClick={() => setHide((v) => !v)}
              aria-label={hide ? "Tampilkan saldo" : "Sembunyikan saldo"}
              className="-mr-1 flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
            >
              {hide ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-gold-50 px-2 py-1 ring-1 ring-gold-100">
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-gold-400 text-[8px] font-black text-white">
            P
          </span>
          <span className="text-xs font-semibold text-gold-600 tnum">
            {wallet.points.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-gold-500/70">Poin</span>
        </span>
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-4 gap-1 px-2 pb-4 pt-3">
        {walletActions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => go(a.icon)}
            className={cx(
              "flex flex-col items-center gap-1.5 rounded-2xl py-1.5 transition active:scale-95",
            )}
          >
            <IconTile>
              <WalletActionIcon name={a.icon} />
            </IconTile>
            <span className="text-[11px] font-semibold text-neutral-600">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
