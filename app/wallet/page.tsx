"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import PromoBanner from "../components/PromoBanner";
import { WalletActionIcon, TxnItem } from "../components/Wallet";
import {
  wallet,
  walletActions,
  walletTxns,
  formatRupiah,
  type WalletAction,
} from "../lib/dummy";

export default function WalletPage() {
  const router = useRouter();
  const [hideBalance, setHideBalance] = useState(false);

  function go(action: WalletAction["icon"]) {
    if (action === "topup") router.push("/ppob");
    else if (action === "transfer") router.push("/transfer");
    else if (action === "scan") router.push("/scan");
    // "history" tetap di halaman ini
  }

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="PPJI Pay"
          subtitle="Dompet digital anggota"
          onBack={() => router.back()}
        />

        <div className="px-5 pb-8 pt-5">
          {/* Kartu saldo + quick actions */}
          <div className="rounded-3xl bg-white p-5 shadow-lg shadow-[#1c5fa8]/10 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-neutral-400">Saldo</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-2xl font-bold tracking-tight text-neutral-900 tabular-nums dark:text-neutral-50">
                    {hideBalance ? "Rp ••••••" : formatRupiah(wallet.balance)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setHideBalance((v) => !v)}
                    aria-label={hideBalance ? "Tampilkan saldo" : "Sembunyikan saldo"}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                  >
                    {hideBalance ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 dark:bg-amber-500/15">
                <CoinGlyph />
                <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {wallet.points.toLocaleString("id-ID")}
                </span>
                <span className="text-[11px] text-amber-600/70">Poin</span>
              </span>
            </div>

            {/* pemisah */}
            <div className="my-4 h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* quick actions */}
            <div className="grid grid-cols-4 gap-1">
              {walletActions.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => go(a.icon)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl py-1 transition active:scale-95"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
                    <WalletActionIcon name={a.icon} />
                  </span>
                  <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Promo */}
          <div className="mt-5">
            <PromoBanner />
          </div>

          {/* Riwayat transaksi */}
          <section className="mt-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Riwayat Transaksi
              </h2>
              <button
                type="button"
                className="text-xs font-semibold text-[#1c5fa8] hover:underline"
              >
                Lihat semua
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {walletTxns.map((t) => (
                <TxnItem key={t.id} txn={t} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function CoinGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="text-amber-600">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
