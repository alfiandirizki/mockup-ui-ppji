"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import BrandLogo from "../components/BrandLogo";
import { Button, SectionHeader } from "../components/ui";
import { Check } from "lucide-react";
import {
  withdrawMerchants,
  withdrawNominals,
  wallet,
  formatRupiah,
  makeReceiptMeta,
  type WithdrawMerchant,
} from "../lib/dummy";

type Receipt = { txnId: string; time: string; amount: number; code: string };

export default function WithdrawPage() {
  const router = useRouter();
  const [merchant, setMerchant] = useState<WithdrawMerchant | null>(null);
  const [nominal, setNominal] = useState<number | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const canPay = merchant !== null && nominal !== null;

  function handlePay() {
    if (!canPay || nominal === null) return;
    const { txnId, time } = makeReceiptMeta();
    const code = String(new Date().getTime()).slice(-6);
    setReceipt({ txnId, time, amount: nominal, code });
  }

  /* ---------------------- Berhasil ---------------------- */
  if (receipt && merchant) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          title="Tarik Tunai Siap"
          caption={`Tunjukkan kode ini di kasir ${merchant.name}`}
          amount={receipt.amount}
          saldoAfter={wallet.balance - receipt.amount}
          details={[
            { label: "Gerai", value: merchant.name },
            { label: "Kode Tarik Tunai", value: receipt.code, mono: true },
            { label: "Nominal", value: formatRupiah(receipt.amount) },
            { label: "Berlaku s/d", value: "24 jam" },
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
          title="Tarik Tunai"
          subtitle="Ambil uang di gerai terdekat"
          onBack={() => router.back()}
        />

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
          {/* Saldo */}
          <div className="flex items-center justify-between rounded-2xl bg-hero px-5 py-4 text-white shadow-md shadow-brand-900/20">
            <span className="text-sm text-white/80">Saldo PPJI Pay</span>
            <span className="tnum text-xl font-bold tracking-tight">
              {formatRupiah(wallet.balance)}
            </span>
          </div>

          {/* Pilih gerai */}
          <div className="mt-6">
            <SectionHeader title="Pilih Gerai" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {withdrawMerchants.map((m) => {
              const active = merchant?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMerchant(m)}
                  className={`relative flex items-center gap-3 rounded-2xl p-4 text-left shadow-sm shadow-brand-900/5 ring-1 transition active:scale-[0.98] ${
                    active
                      ? "bg-brand-50 ring-2 ring-brand-700"
                      : "bg-white ring-neutral-100 hover:ring-brand-200"
                  }`}
                >
                  {active && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-700">
                      <Check size={12} strokeWidth={3} className="text-white" />
                    </span>
                  )}
                  <BrandLogo brand={m.id} size={40} />
                  <span className="text-sm font-bold text-brand-900">
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Nominal */}
          <div className="mt-6">
            <SectionHeader title="Nominal Penarikan" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {withdrawNominals.map((n) => {
              const active = nominal === n;
              const over = n > wallet.balance;
              return (
                <button
                  key={n}
                  type="button"
                  disabled={over}
                  onClick={() => setNominal(n)}
                  className={`tnum rounded-2xl px-2 py-3.5 text-center text-sm font-bold transition active:scale-[0.98] ${
                    active
                      ? "bg-brand-700 text-white shadow-md shadow-brand-700/25"
                      : over
                        ? "cursor-not-allowed bg-neutral-100 text-neutral-300"
                        : "bg-white text-brand-900 ring-1 ring-neutral-100 hover:ring-brand-200"
                  }`}
                >
                  {formatRupiah(n)}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            Penarikan dipotong dari saldo PPJI Pay. Kode berlaku 24 jam.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Tarik</span>
            {nominal !== null ? (
              <span className="tnum text-xl font-extrabold text-brand-900">
                {formatRupiah(nominal)}
              </span>
            ) : (
              <span className="text-sm text-neutral-400">Pilih nominal</span>
            )}
          </div>
          <Button onClick={handlePay} disabled={!canPay}>
            Buat Kode Tarik Tunai
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
