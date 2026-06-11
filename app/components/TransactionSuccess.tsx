"use client";

import { useRouter } from "next/navigation";
import { Check, Share2, Wallet } from "lucide-react";
import { formatRupiah } from "../lib/dummy";
import { Button, cx } from "./ui";

export type Detail = { label: string; value: string; mono?: boolean };

type Props = {
  title?: string;
  caption: string;
  amount: number;
  details: Detail[];
  saldoAfter: number;
};

/** Layar "Transaksi Berhasil" bersama — gaya e-receipt navy + emas. */
export default function TransactionSuccess({
  title = "Transaksi Berhasil",
  caption,
  amount,
  details,
  saldoAfter,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-col bg-canvas">
      {/* Hero navy + ceklis */}
      <div className="relative overflow-hidden bg-hero px-6 pb-16 pt-16 text-center text-white">
        <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold-500/15 blur-2xl" />
        <div className="relative mx-auto flex h-20 w-20 animate-[popIn_0.5s_ease-out] items-center justify-center rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/40 ring-8 ring-white/10">
          <Check size={42} strokeWidth={3} className="text-white" />
        </div>
        <h1 className="relative mt-5 animate-[fadeUp_0.5s_ease-out_0.15s_both] text-xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="relative mt-1 animate-[fadeUp_0.5s_ease-out_0.2s_both] text-sm text-white/70">
          {caption}
        </p>
        <p className="relative mt-4 animate-[fadeUp_0.5s_ease-out_0.25s_both] text-4xl font-extrabold tracking-tight tnum">
          {formatRupiah(amount)}
        </p>
      </div>

      {/* Struk */}
      <div className="-mt-8 px-5">
        <div className="relative animate-[fadeUp_0.5s_ease-out_0.3s_both] rounded-3xl bg-white p-5 shadow-lg shadow-brand-900/10 ring-1 ring-neutral-100">
          {/* perforasi */}
          <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-canvas" />
          <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-canvas" />

          {details.map((d, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 py-1.5"
            >
              <span className="text-sm text-neutral-500">{d.label}</span>
              <span
                className={cx(
                  "max-w-[60%] text-right text-sm font-semibold text-brand-900",
                  d.mono && "font-mono tnum",
                )}
              >
                {d.value}
              </span>
            </div>
          ))}

          <div className="my-3 border-t border-dashed border-neutral-200" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-600">
              Total Bayar
            </span>
            <span className="text-lg font-extrabold tracking-tight text-brand-900 tnum">
              {formatRupiah(amount)}
            </span>
          </div>
        </div>

        {/* Sisa saldo */}
        <div className="mt-3 flex animate-[fadeUp_0.5s_ease-out_0.35s_both] items-center justify-between rounded-2xl bg-brand-50 px-5 py-3.5 ring-1 ring-brand-100">
          <span className="flex items-center gap-2 text-sm font-medium text-brand-800">
            <Wallet size={17} /> Sisa Saldo PPJI Pay
          </span>
          <span className="text-sm font-bold text-brand-700 tnum">
            {formatRupiah(saldoAfter)}
          </span>
        </div>
      </div>

      {/* Tombol */}
      <div className="mt-auto flex flex-col gap-3 px-5 pb-8 pt-8">
        <Button onClick={() => router.push("/dashboard")}>Selesai</Button>
        <Button variant="outline">
          <Share2 size={17} /> Bagikan Struk
        </Button>
      </div>
    </div>
  );
}
