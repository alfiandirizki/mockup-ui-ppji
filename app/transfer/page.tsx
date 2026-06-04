"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import {
  ppobNominals,
  wallet,
  formatRupiah,
  makeReceiptMeta,
} from "../lib/dummy";

type Receipt = { txnId: string; time: string; amount: number };

export default function TransferPage() {
  const router = useRouter();
  const [target, setTarget] = useState("");
  const [name, setName] = useState("");
  const [nominal, setNominal] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

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
          caption="Transfer berhasil dikirim"
          amount={receipt.amount}
          saldoAfter={wallet.balance - receipt.amount}
          details={[
            { label: "Tujuan", value: target },
            ...(name.trim() ? [{ label: "Nama", value: name }] : []),
            { label: "Nominal", value: formatRupiah(receipt.amount) },
            ...(note.trim() ? [{ label: "Catatan", value: note }] : []),
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
          title="Transfer"
          subtitle="Kirim saldo ke sesama anggota"
          onBack={() => router.back()}
        />

        <div className="flex-1 px-5 pb-40 pt-5">
          {/* Tujuan */}
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Nomor Tujuan / No. KTA
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="08xxxxxxxxxx / PPJI-xxxx"
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1c5fa8] focus:ring-2 focus:ring-[#1c5fa8]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Nama Penerima{" "}
                <span className="font-normal text-neutral-400">(opsional)</span>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama penerima"
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1c5fa8] focus:ring-2 focus:ring-[#1c5fa8]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
              />
            </label>
          </div>

          {/* Nominal */}
          <h2 className="mb-3 mt-6 text-sm font-bold text-neutral-900 dark:text-neutral-50">
            Nominal Transfer
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

          {/* Catatan */}
          <label className="mt-6 flex flex-col gap-1.5">
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              Catatan{" "}
              <span className="font-normal text-neutral-400">(opsional)</span>
            </span>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="mis. Pembayaran iuran"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1c5fa8] focus:ring-2 focus:ring-[#1c5fa8]/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </label>
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
            disabled={!canPay}
            className="w-full rounded-2xl bg-[#1c5fa8] py-4 text-sm font-bold text-white shadow-md shadow-[#1c5fa8]/25 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:shadow-none dark:disabled:bg-neutral-700"
          >
            Transfer Sekarang
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
