"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PpjiLogo from "./PpjiLogo";
import { WalletActionIcon } from "./Wallet";
import {
  formatDate,
  remainingText,
  formatRupiah,
  wallet,
  walletActions,
  type Member,
  type WalletAction,
} from "../lib/dummy";

type Props = {
  member: Member;
  now: Date;
};

/**
 * Kartu gabungan: Identitas KTA (atas, biru) + PPJI Pay (bawah, putih).
 * Satu kartu kohesif menggantikan dua kartu biru terpisah agar Beranda
 * tidak monoton/berat.
 */
export default function MemberWalletCard({ member, now }: Props) {
  const router = useRouter();
  const [hideBalance, setHideBalance] = useState(false);

  function go(action: WalletAction["icon"]) {
    if (action === "topup") router.push("/ppob");
    else if (action === "transfer") router.push("/transfer");
    else if (action === "scan") router.push("/scan");
    else router.push("/wallet");
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-[#1c5fa8]/15 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
      {/* ====== Atas: Identitas KTA (biru) ====== */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#1c5fa8] via-[#1a539a] to-[#0f3a72] p-5 text-white">
        <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-white/5" />

        {/* logo + status */}
        <div className="relative flex items-start justify-between">
          <div className="rounded-lg bg-white/95 px-2 py-1">
            <PpjiLogo width={52} hideTagline />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-300/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Aktif
          </span>
        </div>

        {/* nomor KTA */}
        <div className="relative mt-4">
          <p className="text-[10px] uppercase tracking-widest text-white/55">
            No. Kartu Tanda Anggota
          </p>
          <p className="mt-1 font-mono text-base font-semibold tracking-[0.15em] tabular-nums">
            {member.ktaNumber}
          </p>
        </div>

        {/* identitas + QR */}
        <div className="relative mt-4 flex items-end justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{member.name}</p>
            <p className="truncate text-xs text-white/70">{member.business}</p>
            <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
              Berlaku s/d{" "}
              <span className="font-semibold text-white/80">
                {formatDate(member.validUntil)}
              </span>
            </p>
            <p className="text-[10px] font-medium text-emerald-300">
              {remainingText(member.validUntil, now)}
            </p>
          </div>
          <QrDummy />
        </div>
      </div>

      {/* ====== Bawah: PPJI Pay (putih) ====== */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
            <WalletGlyph />
            PPJI Pay
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/wallet")}
              className="text-xl font-bold tracking-tight tabular-nums text-neutral-900 transition active:opacity-70 dark:text-neutral-50"
            >
              {hideBalance ? "Rp ••••••" : formatRupiah(wallet.balance)}
            </button>
            <button
              type="button"
              onClick={() => setHideBalance((v) => !v)}
              aria-label={hideBalance ? "Tampilkan saldo" : "Sembunyikan saldo"}
              className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
            >
              {hideBalance ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 dark:bg-amber-500/15">
          <CoinGlyph />
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
            {wallet.points.toLocaleString("id-ID")}
          </span>
          <span className="text-[11px] text-amber-600/70">Poin</span>
        </span>
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-4 gap-1 px-2 pb-4 pt-3">
        {walletActions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => go(a.icon)}
            className="flex flex-col items-center gap-1.5 rounded-2xl py-1.5 transition active:scale-95"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
              <WalletActionIcon name={a.icon} />
            </span>
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** QR code dummy (pola kotak-kotak dekoratif). */
function QrDummy() {
  const cells = [
    1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1,
  ];
  return (
    <div className="grid h-12 w-12 grid-cols-5 gap-0.5 rounded-md bg-white p-1">
      {cells.map((on, i) => (
        <span
          key={i}
          className={on ? "rounded-[1px] bg-[#0f3a72]" : "rounded-[1px] bg-transparent"}
        />
      ))}
    </div>
  );
}

function WalletGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CoinGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="text-amber-600">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7.5v9M9.5 9.5a2.5 2 0 0 1 5 0c0 1.2-1.1 1.6-2.5 1.8s-2.5.6-2.5 1.8a2.5 2 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M9.9 5.2A9.5 9.5 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.3 6.3A17 17 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 3.7-.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
