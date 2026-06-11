"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import BrandLogo from "../components/BrandLogo";
import {
  topupNominals,
  payMethods,
  wallet,
  formatRupiah,
  makeReceiptMeta,
  type PayMethod,
} from "../lib/dummy";

type Receipt = { txnId: string; time: string; amount: number };

export default function TopUpSaldoPage() {
  const router = useRouter();
  const [nominal, setNominal] = useState<number | null>(null);
  const [method, setMethod] = useState<PayMethod | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const canPay = nominal !== null && method !== null;

  function handlePay() {
    if (!canPay || nominal === null) return;
    const { txnId, time } = makeReceiptMeta();
    setReceipt({ txnId, time, amount: nominal });
  }

  /* ---------------------- Berhasil ---------------------- */
  if (receipt && method) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          title="Top Up Berhasil"
          caption="Saldo PPJI Pay Anda telah bertambah"
          amount={receipt.amount}
          saldoAfter={wallet.balance + receipt.amount}
          details={[
            { label: "Jenis", value: "Top Up Saldo PPJI Pay" },
            { label: "Metode", value: method.name },
            { label: "Nominal", value: formatRupiah(receipt.amount) },
            { label: "ID Transaksi", value: receipt.txnId, mono: true },
            { label: "Waktu", value: receipt.time },
          ]}
        />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-canvas">
        <PageHeader
          title="Top Up Saldo"
          subtitle="Isi saldo PPJI Pay"
          onBack={() => router.back()}
        />

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
          {/* Saldo saat ini */}
          <div className="flex items-center justify-between rounded-2xl bg-hero px-5 py-4 text-white shadow-md shadow-brand-900/20">
            <span className="text-sm text-white/80">Saldo PPJI Pay</span>
            <span className="tnum text-xl font-bold tracking-tight">
              {formatRupiah(wallet.balance)}
            </span>
          </div>

          {/* Nominal */}
          <h2 className="mb-3 mt-6 text-sm font-bold text-brand-900">
            Pilih Nominal
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {topupNominals.map((n) => {
              const active = nominal === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNominal(n)}
                  className={`rounded-2xl px-2 py-3 text-center text-sm font-bold tnum transition active:scale-[0.98] ${
                    active
                      ? "bg-brand-700 text-white shadow-md shadow-brand-700/25"
                      : "bg-white text-neutral-800 ring-1 ring-neutral-100 hover:ring-brand-300"
                  }`}
                >
                  {formatRupiah(n)}
                </button>
              );
            })}
          </div>

          {/* Metode pembayaran */}
          <h2 className="mb-3 mt-6 text-sm font-bold text-brand-900">
            Metode Pembayaran
          </h2>
          <div className="flex flex-col gap-2.5">
            {payMethods.map((m) => {
              const active = method?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm shadow-brand-900/5 ring-1 transition active:scale-[0.99] ${
                    active
                      ? "ring-brand-700"
                      : "ring-neutral-100 hover:ring-brand-300"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50">
                    <BrandLogo brand={m.brand} size={40} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brand-900">
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-neutral-500">{m.desc}</p>
                  </div>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      active
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-neutral-300"
                    }`}
                  >
                    {active && <Check size={11} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Top Up</span>
            {nominal === null ? (
              <span className="text-sm text-neutral-400">Pilih nominal</span>
            ) : (
              <span className="tnum text-lg font-bold text-brand-900">
                {formatRupiah(nominal)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handlePay}
            disabled={!canPay}
            className="w-full rounded-2xl bg-brand-700 py-4 text-sm font-bold text-white shadow-md shadow-brand-700/25 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none"
          >
            Top Up Sekarang
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
