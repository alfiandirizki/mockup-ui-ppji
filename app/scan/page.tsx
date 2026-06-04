"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import {
  scanMerchant,
  ppobNominals,
  wallet,
  formatRupiah,
  makeReceiptMeta,
} from "../lib/dummy";

type Step = "scan" | "pay" | "success";
type Receipt = { txnId: string; time: string; amount: number };

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("scan");
  const [nominal, setNominal] = useState<number | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  function handlePay() {
    if (nominal === null) return;
    const { txnId, time } = makeReceiptMeta();
    setReceipt({ txnId, time, amount: nominal });
    setStep("success");
  }

  /* ----------------------- Step: Berhasil ----------------------- */
  if (step === "success" && receipt) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          caption={`Pembayaran ke ${scanMerchant.name}`}
          amount={receipt.amount}
          saldoAfter={wallet.balance - receipt.amount}
          details={[
            { label: "Merchant", value: scanMerchant.name },
            { label: "ID Merchant", value: scanMerchant.id, mono: true },
            { label: "Nominal", value: formatRupiah(receipt.amount) },
            { label: "Metode", value: "Saldo PPJI Pay" },
            { label: "ID Transaksi", value: receipt.txnId, mono: true },
            { label: "Waktu", value: receipt.time },
          ]}
        />
      </PhoneFrame>
    );
  }

  /* ----------------------- Step: Bayar Merchant ----------------------- */
  if (step === "pay") {
    const total = nominal ?? 0;
    return (
      <PhoneFrame>
        <div className="flex min-h-full flex-col bg-[#f4f7fb] dark:bg-neutral-950">
          <PageHeader
            title="Bayar"
            subtitle="Konfirmasi pembayaran merchant"
            onBack={() => setStep("scan")}
          />

          <div className="flex-1 px-5 pb-40 pt-5">
            {/* Kartu merchant */}
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
                <StoreIcon />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold text-neutral-900 dark:text-neutral-50">
                  {scanMerchant.name}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {scanMerchant.location}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-neutral-400">
                  {scanMerchant.id}
                </p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/15">
                Terverifikasi
              </span>
            </div>

            {/* Nominal */}
            <h2 className="mb-3 mt-6 text-sm font-bold text-neutral-900 dark:text-neutral-50">
              Nominal Pembayaran
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {ppobNominals.map((n) => {
                const active = nominal === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNominal(n)}
                    className={`rounded-2xl px-2 py-3 text-center text-sm font-bold transition active:scale-[0.98] ${
                      active
                        ? "bg-[#1c5fa8] text-white shadow-md shadow-[#1c5fa8]/25"
                        : "bg-white text-neutral-800 ring-1 ring-neutral-100 hover:ring-[#1c5fa8]/30 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-800"
                    }`}
                  >
                    {formatRupiah(n)}
                  </button>
                );
              })}
            </div>

            {/* Metode */}
            <h2 className="mb-3 mt-6 text-sm font-bold text-neutral-900 dark:text-neutral-50">
              Metode Pembayaran
            </h2>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-[#1c5fa8]/20 dark:bg-neutral-900 dark:shadow-none">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
                <WalletGlyph />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                  Saldo PPJI Pay
                </p>
                <p className="text-xs text-neutral-400">
                  Saldo: {formatRupiah(wallet.balance)}
                </p>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1c5fa8] text-white">
                <CheckSmall />
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-7 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-500">Total</span>
              <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                {formatRupiah(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={handlePay}
              disabled={nominal === null}
              className="w-full rounded-2xl bg-[#1c5fa8] py-4 text-sm font-bold text-white shadow-md shadow-[#1c5fa8]/25 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none dark:disabled:bg-neutral-700"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  /* ----------------------- Step: Scanner ----------------------- */
  return (
    <PhoneFrame>
      <div className="relative flex min-h-full flex-col bg-neutral-900 text-white">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-95"
          >
            <BackArrow />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Scan QR</h1>
        </div>

        {/* Viewfinder */}
        <div className="flex flex-1 flex-col items-center justify-center px-8">
          <div className="relative aspect-square w-64 max-w-full">
            {/* sudut bingkai */}
            <Corner className="left-0 top-0" />
            <Corner className="right-0 top-0 rotate-90" />
            <Corner className="bottom-0 right-0 rotate-180" />
            <Corner className="bottom-0 left-0 -rotate-90" />
            {/* QR dummy di tengah */}
            <div className="absolute inset-6 grid grid-cols-5 gap-1 opacity-30">
              {QR_CELLS.map((on, i) => (
                <span
                  key={i}
                  className={on ? "rounded-[2px] bg-white" : "bg-transparent"}
                />
              ))}
            </div>
            {/* garis pemindai */}
            <div className="absolute inset-x-3 top-1/2 h-0.5 bg-[#4c9aef] shadow-[0_0_12px_2px_#4c9aef]" />
          </div>
          <p className="mt-8 text-center text-sm text-white/60">
            Arahkan kamera ke kode QR merchant
          </p>
        </div>

        {/* Tombol simulasi */}
        <div className="px-6 pb-10">
          <button
            type="button"
            onClick={() => setStep("pay")}
            className="w-full rounded-2xl bg-white py-4 text-sm font-bold text-neutral-900 transition active:scale-[0.99]"
          >
            Simulasikan Scan
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1,
];

/* ------------------------------- ikon ------------------------------- */

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-white ${className}`}
    />
  );
}

function BackArrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9h16l-1-4H5L4 9Zm0 0v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M4 9a2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4 0M9.5 19v-4h5v4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function CheckSmall() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 10 17l9-10"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
