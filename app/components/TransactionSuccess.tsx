"use client";

import { useRouter } from "next/navigation";
import { formatRupiah } from "../lib/dummy";

export type Detail = { label: string; value: string; mono?: boolean };

type Props = {
  /** Judul. Default "Transaksi Berhasil". */
  title?: string;
  /** Keterangan di bawah judul, mis. "Pulsa & Data berhasil diproses". */
  caption: string;
  amount: number;
  details: Detail[];
  /** Sisa saldo setelah transaksi (dummy). */
  saldoAfter: number;
};

/**
 * Layar "Transaksi Berhasil" bersama untuk PPOB, Transfer, dan Scan QR.
 * Ceklis beranimasi, nominal, detail transaksi, sisa saldo, dan tombol aksi.
 */
export default function TransactionSuccess({
  title = "Transaksi Berhasil",
  caption,
  amount,
  details,
  saldoAfter,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-col bg-[#f4f7fb] px-6 pb-8 pt-12 dark:bg-neutral-950">
      {/* Ceklis + animasi */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 animate-[popIn_0.5s_ease-out] items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
          <CheckBig />
        </div>
        <h1 className="mt-5 animate-[fadeUp_0.5s_ease-out_0.15s_both] text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h1>
        <p className="mt-1 animate-[fadeUp_0.5s_ease-out_0.2s_both] text-sm text-neutral-500">
          {caption}
        </p>
        <p className="mt-4 animate-[fadeUp_0.5s_ease-out_0.25s_both] text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {formatRupiah(amount)}
        </p>
      </div>

      {/* Detail transaksi */}
      <div className="mt-8 animate-[fadeUp_0.5s_ease-out_0.3s_both] rounded-2xl bg-white p-5 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
        {details.map((d, i) => (
          <DetailRow key={i} {...d} />
        ))}
        <div className="my-3 border-t border-dashed border-neutral-200 dark:border-neutral-800" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Total Bayar</span>
          <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
            {formatRupiah(amount)}
          </span>
        </div>
      </div>

      {/* Sisa saldo (dummy) */}
      <div className="mt-3 animate-[fadeUp_0.5s_ease-out_0.35s_both] flex items-center justify-between rounded-2xl bg-[#1c5fa8]/5 px-5 py-3.5 ring-1 ring-[#1c5fa8]/10">
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          Sisa Saldo PPJI Pay
        </span>
        <span className="text-sm font-bold text-[#1c5fa8]">
          {formatRupiah(saldoAfter)}
        </span>
      </div>

      {/* Tombol */}
      <div className="mt-auto flex flex-col gap-3 pt-8">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-2xl bg-[#1c5fa8] py-4 text-sm font-bold text-white shadow-md shadow-[#1c5fa8]/25 transition hover:bg-[#164d8c] active:scale-[0.99]"
        >
          Selesai
        </button>
        <button
          type="button"
          className="w-full rounded-2xl bg-white py-4 text-sm font-semibold text-[#1c5fa8] ring-1 ring-[#1c5fa8]/30 transition hover:bg-[#1c5fa8]/5 active:scale-[0.99] dark:bg-neutral-900"
        >
          Lihat Struk
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: Detail) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-sm text-neutral-500">{label}</span>
      <span
        className={`text-right text-sm font-semibold text-neutral-800 dark:text-neutral-200 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CheckBig() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
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
