"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, User, Hash, StickyNote } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import TransactionSuccess from "../components/TransactionSuccess";
import { Card, Button, SectionHeader } from "../components/ui";
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
          title="Transfer Berhasil"
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
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-canvas">
        <PageHeader
          title="Transfer"
          subtitle="Kirim saldo ke sesama anggota"
          onBack={() => router.back()}
        />

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
          {/* Tujuan */}
          <Card className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50">
                <Send size={16} className="text-brand-600" />
              </span>
              <span className="text-sm font-bold text-brand-900">
                Informasi Penerima
              </span>
            </div>

            {/* No. Tujuan */}
            <label className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <Hash size={12} />
                Nomor Tujuan / No. KTA
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="08xxxxxxxxxx / PPJI-xxxx"
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-brand-900 outline-none transition placeholder:text-neutral-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-500/15"
              />
            </label>

            {/* Nama Penerima */}
            <label className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <User size={12} />
                Nama Penerima{" "}
                <span className="normal-case font-normal text-neutral-400">
                  (opsional)
                </span>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama penerima"
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-brand-900 outline-none transition placeholder:text-neutral-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-500/15"
              />
            </label>
          </Card>

          {/* Nominal */}
          <div className="mt-6">
            <SectionHeader title="Nominal Transfer" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {ppobNominals.map((n) => {
              const active = nominal === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNominal(n)}
                  className={`rounded-2xl px-2 py-3.5 text-center text-sm font-bold transition active:scale-[0.97] ${
                    active
                      ? "bg-brand-700 text-white shadow-md shadow-brand-900/20"
                      : "bg-white text-brand-900 ring-1 ring-neutral-100 hover:ring-brand-200"
                  }`}
                >
                  <span className="tnum">{formatRupiah(n)}</span>
                </button>
              );
            })}
          </div>

          {/* Nominal lain */}
          <div className="relative mt-2.5">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-400">
              Rp
            </span>
            <input
              inputMode="numeric"
              value={nominal ? nominal.toLocaleString("id-ID") : ""}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setNominal(v ? Number(v) : null);
              }}
              placeholder="Atau nominal lain"
              className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm font-bold tnum text-brand-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          {/* Catatan */}
          <Card className="mt-6 p-5">
            <label className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <StickyNote size={12} />
                Catatan{" "}
                <span className="normal-case font-normal text-neutral-400">
                  (opsional)
                </span>
              </span>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="mis. Pembayaran iuran"
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-brand-900 outline-none transition placeholder:text-neutral-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-500/15"
              />
            </label>
          </Card>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-neutral-500">Total Transfer</span>
            <span className="text-xl font-extrabold text-brand-900 tnum">
              {nominal === null ? (
                <span className="text-sm text-neutral-400">Pilih nominal</span>
              ) : (
                formatRupiah(nominal)
              )}
            </span>
          </div>
          <Button
            variant="primary"
            onClick={handlePay}
            disabled={!canPay}
            className="w-full py-4 text-sm font-bold"
          >
            Transfer Sekarang
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
