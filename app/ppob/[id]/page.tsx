"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Zap,
  Wallet,
  Droplets,
  HeartPulse,
  Wifi,
  Gamepad2,
  Clapperboard,
  Landmark,
  ShieldCheck,
  HandHeart,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PhoneFrame from "../../components/PhoneFrame";
import PageHeader from "../../components/PageHeader";
import TransactionSuccess from "../../components/TransactionSuccess";
import { Button, Field, SectionHeader, cx } from "../../components/ui";
import {
  findPpob,
  ppobNominals,
  wallet,
  formatRupiah,
  makeReceiptMeta,
  type PpobIcon,
} from "../../lib/dummy";

/* ------------------------------------------------------------------ */
/* PpobIcon → lucide-react mapping                                     */
/* ------------------------------------------------------------------ */
const ICON_MAP: Record<PpobIcon, LucideIcon> = {
  pulsa: Smartphone,
  pln: Zap,
  wallet: Wallet,
  pdam: Droplets,
  bpjs: HeartPulse,
  internet: Wifi,
  game: Gamepad2,
  plnpasca: Zap,
  streaming: Clapperboard,
  pajak: Landmark,
  asuransi: ShieldCheck,
  donasi: HandHeart,
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type Receipt = {
  txnId: string;
  time: string;
  amount: number;
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
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

  /* ---- layanan tidak ditemukan ---- */
  if (!item) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-canvas px-8 text-center">
          <p className="text-sm text-neutral-500">Layanan tidak ditemukan.</p>
          <Button onClick={() => router.push("/ppob")} className="max-w-[160px]">
            Kembali
          </Button>
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

  /* ---- layar berhasil ---- */
  if (receipt) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          title={`${item.label} Berhasil`}
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

  /* ---- layar form ---- */
  const total = nominal ?? 0;
  const ItemIcon = ICON_MAP[item.icon] ?? Smartphone;

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-canvas">
        {/* Header */}
        <PageHeader
          title={item.label}
          subtitle="Isi data pembelian"
          onBack={() => router.back()}
        />

        {/* Scroll content */}
        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6 space-y-6">

          {/* Nomor tujuan */}
          <Field
            label={item.targetLabel}
            icon={<ItemIcon size={18} />}
            type="text"
            inputMode="numeric"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={item.targetPlaceholder}
          />

          {/* Pilih nominal */}
          <div>
            <SectionHeader title="Pilih Nominal" />
            <div className="grid grid-cols-3 gap-3">
              {ppobNominals.map((n) => {
                const active = nominal === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNominal(n)}
                    className={cx(
                      "rounded-2xl px-3 py-3.5 text-left transition active:scale-[0.97]",
                      active
                        ? "bg-brand-700 text-white shadow-md shadow-brand-700/30"
                        : "bg-white text-brand-900 ring-1 ring-neutral-100 hover:ring-brand-200 shadow-sm shadow-brand-900/5",
                    )}
                  >
                    <span className="block text-sm font-bold tnum leading-tight">
                      {formatRupiah(n)}
                    </span>
                    <span
                      className={cx(
                        "mt-0.5 block truncate text-[11px]",
                        active ? "text-white/70" : "text-neutral-400",
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metode pembayaran */}
          <div>
            <SectionHeader title="Metode Pembayaran" />
            <div className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm shadow-brand-900/5 ring-1 ring-brand-200/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Wallet size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-900">
                  Saldo PPJI Pay
                </p>
                <p className="text-xs text-neutral-400 tnum">
                  Saldo: {formatRupiah(wallet.balance)}
                </p>
              </div>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                <CheckCircle2 size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Pinned bottom bar */}
        <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Pembayaran</span>
            {nominal === null ? (
              <span className="text-sm text-neutral-400">Pilih nominal</span>
            ) : (
              <span className="text-xl font-bold text-brand-900 tnum">
                {formatRupiah(total)}
              </span>
            )}
          </div>
          <Button onClick={handlePay} disabled={!canPay}>
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
