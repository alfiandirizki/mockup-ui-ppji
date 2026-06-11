"use client";

import {
  Banknote,
  ArrowLeftRight,
  Plus,
  History,
  ArrowDownLeft,
  Receipt,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { formatRupiah, type WalletAction, type WalletTxn } from "../lib/dummy";

/* Item riwayat transaksi (dipakai di /wallet). */
export function TxnItem({ txn }: { txn: WalletTxn }) {
  const income = txn.amount > 0;
  const s = TXN_STYLE[txn.category];
  const Icon = s.icon;
  return (
    <div className="flex items-center gap-3.5 px-1 py-3">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: s.bg, color: s.fg }}
      >
        <Icon size={20} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-brand-900">{txn.title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">{txn.time}</p>
      </div>
      <span
        className={`shrink-0 text-sm font-bold tnum ${
          income ? "text-emerald-600" : "text-brand-900"
        }`}
      >
        {income ? "+" : "−"}
        {formatRupiah(Math.abs(txn.amount))}
      </span>
    </div>
  );
}

const TXN_STYLE: Record<
  WalletTxn["category"],
  { bg: string; fg: string; icon: LucideIcon }
> = {
  topup: { bg: "#d1fae5", fg: "#059669", icon: ArrowDownLeft },
  transfer: { bg: "#d8e6f8", fg: "#14457f", icon: ArrowLeftRight },
  pay: { bg: "#fdf8ed", fg: "#c5862a", icon: Receipt },
  reward: { bg: "#ede9fe", fg: "#7c3aed", icon: Gift },
};

/* Ikon aksi cepat di kartu wallet. */
const ACTION_ICON: Record<WalletAction["icon"], LucideIcon> = {
  tarik: Banknote,
  transfer: ArrowLeftRight,
  topup: Plus,
  history: History,
};

export function WalletActionIcon({ name }: { name: WalletAction["icon"] }) {
  const Icon = ACTION_ICON[name];
  return <Icon size={22} strokeWidth={2} />;
}
