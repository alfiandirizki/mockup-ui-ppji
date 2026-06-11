"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Wallet, Check, BadgeCheck, ImagePlus, Zap } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import BrandLogo from "../components/BrandLogo";
import { cx } from "../components/ui";
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

  /* ----------------------- Berhasil ----------------------- */
  if (step === "success" && receipt) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          title="Pembayaran Berhasil"
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

  /* ----------------------- Bayar Merchant ----------------------- */
  if (step === "pay") {
    const total = nominal ?? 0;
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col bg-canvas">
          <PageHeader
            title="Bayar"
            subtitle="Konfirmasi pembayaran merchant"
            onBack={() => setStep("scan")}
          />

          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
            {/* Merchant */}
            <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
              <BrandLogo brand="qris" size={52} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-brand-900">
                  {scanMerchant.name}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {scanMerchant.location}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-neutral-400 tnum">
                  {scanMerchant.id}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                <BadgeCheck size={12} />
                Terverifikasi
              </span>
            </div>

            {/* Nominal */}
            <h2 className="mb-3 mt-6 text-sm font-bold text-brand-900">
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
                    className={cx(
                      "rounded-2xl px-2 py-3 text-center text-sm font-bold tnum transition active:scale-[0.98]",
                      active
                        ? "bg-brand-700 text-white shadow-md shadow-brand-700/25"
                        : "bg-white text-brand-900 ring-1 ring-neutral-100 hover:ring-brand-300",
                    )}
                  >
                    {formatRupiah(n)}
                  </button>
                );
              })}
            </div>

            {/* Metode */}
            <h2 className="mb-3 mt-6 text-sm font-bold text-brand-900">
              Metode Pembayaran
            </h2>
            <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm shadow-brand-900/5 ring-1 ring-brand-200">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Wallet size={22} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-brand-900">Saldo PPJI Pay</p>
                <p className="text-xs text-neutral-400 tnum">
                  Saldo: {formatRupiah(wallet.balance)}
                </p>
              </div>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white">
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-500">Total</span>
              {nominal === null ? (
                <span className="text-sm text-neutral-400">Pilih nominal</span>
              ) : (
                <span className="text-lg font-extrabold text-brand-900 tnum">
                  {formatRupiah(total)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handlePay}
              disabled={nominal === null}
              className="w-full rounded-2xl bg-brand-700 py-4 text-sm font-bold text-white shadow-lg shadow-brand-700/25 transition active:scale-[0.99] disabled:pointer-events-none disabled:bg-neutral-300 disabled:shadow-none"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  /* ----------------------- Scanner ----------------------- */
  return (
    <PhoneFrame statusTone="light">
      <div className="relative flex min-h-full flex-col overflow-hidden bg-hero text-white">
        {/* aksen */}
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between px-5 pt-14">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Tutup"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 transition hover:bg-white/20 active:scale-95"
          >
            <X size={20} />
          </button>
          <h1 className="text-base font-bold tracking-tight">Scan QRIS</h1>
          <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
            <BrandLogo brand="qris" size={16} />
            <span className="text-[11px] font-extrabold text-brand-800">QRIS</span>
          </span>
        </div>

        {/* Viewfinder */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-8">
          <div className="relative aspect-square w-64 max-w-full">
            <Corner className="left-0 top-0" />
            <Corner className="right-0 top-0 rotate-90" />
            <Corner className="bottom-0 right-0 rotate-180" />
            <Corner className="bottom-0 left-0 -rotate-90" />
            {/* QR dummy */}
            <div className="absolute inset-7 grid grid-cols-5 gap-1.5 opacity-25">
              {QR_CELLS.map((on, i) => (
                <span
                  key={i}
                  className={on ? "rounded-[2px] bg-white" : "bg-transparent"}
                />
              ))}
            </div>
            {/* garis pemindai */}
            <div className="absolute inset-x-4 top-1/2 h-0.5 animate-pulse bg-gold-400 shadow-[0_0_14px_3px_var(--color-gold-400)]" />
          </div>
          <p className="mt-8 text-center text-sm text-white/80">
            Arahkan kamera ke kode QRIS merchant
          </p>
        </div>

        {/* Aksi */}
        <div className="relative flex flex-col gap-3 px-6 pb-12">
          <button
            type="button"
            onClick={() => setStep("pay")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-brand-900 transition active:scale-[0.99]"
          >
            <Zap size={18} className="text-gold-500" />
            Simulasikan Scan
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white/70 transition active:opacity-70"
          >
            <ImagePlus size={18} />
            Unggah dari galeri
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1,
];

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-gold-400 ${className}`}
    />
  );
}
