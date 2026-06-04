"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../../components/PhoneFrame";
import PageHeader from "../../components/PageHeader";
import TransactionSuccess from "../../components/TransactionSuccess";
import {
  findPpob,
  ppobNominals,
  wallet,
  formatRupiah,
  makeReceiptMeta,
} from "../../lib/dummy";

type Receipt = {
  txnId: string;
  time: string;
  amount: number;
};

export default function PpobFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const item = findPpob(id);

  const [target, setTarget] = useState("");
  const [nominal, setNominal] = useState<number | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  if (!item) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#f4f7fb] px-8 text-center dark:bg-neutral-950">
          <p className="text-sm text-neutral-500">Layanan tidak ditemukan.</p>
          <button
            type="button"
            onClick={() => router.push("/ppob")}
            className="rounded-xl bg-[#1c5fa8] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Kembali
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const canPay = target.trim().length >= 4 && nominal !== null;

  function handlePay() {
    if (!canPay || nominal === null) return;
    const { txnId, time } = makeReceiptMeta();
    setReceipt({ txnId, time, amount: nominal });
  }

  /* ---------------------- Layar Berhasil ---------------------- */
  if (receipt) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          caption={`${item.label} berhasil diproses`}
          amount={receipt.amount}
          saldoAfter={wallet.balance - receipt.amount}
          details={[
            { label: "Layanan", value: item.label },
            { label: item.targetLabel, value: target },
            { label: "Nominal", value: formatRupiah(receipt.amount) },
            { label: "Metode", value: "Saldo PPJI Pay" },
            { label: "ID Transaksi", value: receipt.txnId, mono: true },
            { label: "Waktu", value: receipt.time },
          ]}
        />
      </PhoneFrame>
    );
  }

  /* ---------------------- Layar Form ---------------------- */
  const total = nominal ?? 0;
  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title={item.label}
          subtitle="Isi data pembelian"
          onBack={() => router.back()}
        />

        <div className="flex-1 px-5 pb-40 pt-5">
          {/* Nomor tujuan */}
          <div className="rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {item.targetLabel}
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={item.targetPlaceholder}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1c5fa8] focus:ring-2 focus:ring-[#1c5fa8]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
              />
            </label>
          </div>

          {/* Pilih nominal */}
          <h2 className="mb-3 mt-6 text-sm font-bold text-neutral-900 dark:text-neutral-50">
            Pilih Nominal
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {ppobNominals.map((n) => {
              const active = nominal === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNominal(n)}
                  className={`rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.98] ${
                    active
                      ? "bg-[#1c5fa8] text-white shadow-md shadow-[#1c5fa8]/25"
                      : "bg-white text-neutral-800 ring-1 ring-neutral-100 hover:ring-[#1c5fa8]/30 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-800"
                  }`}
                >
                  <span className="block text-sm font-bold">{formatRupiah(n)}</span>
                  <span
                    className={`text-[11px] ${active ? "text-white/70" : "text-neutral-400"}`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Metode bayar */}
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

        {/* Bottom bar: total + Bayar */}
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
            disabled={!canPay}
            className="w-full rounded-2xl bg-[#1c5fa8] py-4 text-sm font-bold text-white shadow-md shadow-[#1c5fa8]/25 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none dark:disabled:bg-neutral-700"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------- ikon ------------------------------- */

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

function WalletGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
