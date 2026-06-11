"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Settings2 } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import PromoBanner from "../components/PromoBanner";
import { WalletActionIcon, TxnItem } from "../components/Wallet";
import { Screen, Card, SectionHeader } from "../components/ui";
import {
  wallet,
  walletActions,
  walletTxns,
  formatRupiah,
  type WalletAction,
} from "../lib/dummy";

export default function WalletPage() {
  const router = useRouter();
  const [hide, setHide] = useState(false);

  function go(action: WalletAction["icon"]) {
    if (action === "tarik") router.push("/withdraw");
    else if (action === "transfer") router.push("/transfer");
    else if (action === "topup") router.push("/topup");
  }

  return (
    <PhoneFrame>
      <Screen>
        <PageHeader
          title="PPJI Pay"
          subtitle="Dompet digital anggota"
          onBack={() => router.back()}
          action={
            <HeaderAction label="Pengaturan">
              <Settings2 size={20} />
            </HeaderAction>
          }
        >
          {/* Saldo */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/60">Saldo PPJI Pay</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-3xl font-extrabold tracking-tight tnum">
                  {hide ? "Rp ••••••" : formatRupiah(wallet.balance)}
                </p>
                <button
                  type="button"
                  onClick={() => setHide((v) => !v)}
                  aria-label={hide ? "Tampilkan saldo" : "Sembunyikan saldo"}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10"
                >
                  {hide ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-gold-500/20 px-3 py-1.5 ring-1 ring-gold-500/40">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-white">
                P
              </span>
              <span className="text-sm font-bold text-gold-200 tnum">
                {wallet.points.toLocaleString("id-ID")}
              </span>
            </span>
          </div>

          {/* Aksi cepat */}
          <div className="mt-5 grid grid-cols-4 gap-1">
            {walletActions.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => go(a.icon)}
                className="flex flex-col items-center gap-1.5 py-1 transition active:scale-95"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-white ring-1 ring-white/15">
                  <WalletActionIcon name={a.icon} />
                </span>
                <span className="text-[11px] font-semibold text-white/85">
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </PageHeader>

        <div className="px-5 pb-8 pt-5">
          <PromoBanner />

          <section className="mt-6">
            <SectionHeader title="Riwayat Transaksi" action="Lihat semua" />
            <Card className="divide-y divide-neutral-100 px-4">
              {walletTxns.map((t) => (
                <TxnItem key={t.id} txn={t} />
              ))}
            </Card>
          </section>
        </div>
      </Screen>
    </PhoneFrame>
  );
}
