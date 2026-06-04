"use client";

import { type WalletAction, type WalletTxn } from "../lib/dummy";

/* ================================================================== */
/* Item riwayat transaksi (dipakai di /wallet)                         */
/* ================================================================== */
export function TxnItem({ txn }: { txn: WalletTxn }) {
  const income = txn.amount > 0;
  const style = TXN_STYLE[txn.category];
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${style.bg} ${style.fg}`}
      >
        {style.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-50">
          {txn.title}
        </p>
        <p className="mt-0.5 text-xs text-neutral-400">{txn.time}</p>
      </div>
      <span
        className={`shrink-0 text-sm font-bold ${
          income ? "text-emerald-600" : "text-neutral-700 dark:text-neutral-300"
        }`}
      >
        {income ? "+ " : "- "}Rp{Math.abs(txn.amount).toLocaleString("id-ID")}
      </span>
    </div>
  );
}

/* --------------------------- gaya kategori ------------------------- */

const TXN_STYLE: Record<
  WalletTxn["category"],
  { bg: string; fg: string; icon: React.ReactNode }
> = {
  topup: { bg: "bg-emerald-100 dark:bg-emerald-500/15", fg: "text-emerald-600", icon: <PlusGlyph /> },
  transfer: { bg: "bg-[#1c5fa8]/10", fg: "text-[#1c5fa8]", icon: <TransferGlyph /> },
  pay: { bg: "bg-amber-100 dark:bg-amber-500/15", fg: "text-amber-600", icon: <PayGlyph /> },
  reward: { bg: "bg-violet-100 dark:bg-violet-500/15", fg: "text-violet-600", icon: <CoinGlyph /> },
};

/* ------------------------------- ikon ------------------------------- */

export function WalletActionIcon({ name }: { name: WalletAction["icon"] }) {
  const p = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "topup":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M3 10h18M12 13.5v-3M10.5 12h3" />
        </svg>
      );
    case "transfer":
      return (
        <svg {...p}>
          <path d="M7 7h11l-3-3M17 17H6l3 3" />
        </svg>
      );
    case "scan":
      return (
        <svg {...p}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3M3 12h18" />
        </svg>
      );
    case "history":
      return (
        <svg {...p}>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 4v4h4" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
  }
}

function CoinGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v9M9.5 9.5a2.5 2 0 0 1 5 0c0 1.2-1.1 1.6-2.5 1.8s-2.5.6-2.5 1.8a2.5 2 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TransferGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 7h11l-3-3M17 17H6l3 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PayGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
