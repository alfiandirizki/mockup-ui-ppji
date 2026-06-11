"use client";

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
} from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import { IconTile } from "../components/ui";
import { ppobItems, type PpobItem, type PpobIcon, wallet, formatRupiah } from "../lib/dummy";

const ppobIconMap: Record<PpobIcon, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
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

export default function PpobPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-canvas">
        <PageHeader
          title="PPOB"
          subtitle="Bayar tagihan & beli kebutuhan"
          onBack={() => router.back()}
        >
          {/* Saldo chip */}
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/12 px-4 py-2">
            <Wallet size={16} className="shrink-0 text-gold-400" />
            <span className="text-[11px] font-medium text-white/60">PPJI Pay</span>
            <span className="tnum text-base font-extrabold text-gold-300">
              {formatRupiah(wallet.balance)}
            </span>
          </div>
        </PageHeader>

        <div className="flex-1 px-5 pb-8 pt-5">
          {/* Layanan grid card */}
          <div className="rounded-3xl bg-white px-4 pb-6 pt-5 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
            <p className="mb-4 text-sm font-semibold text-brand-900">Layanan</p>
            <div className="grid grid-cols-4 gap-x-2 gap-y-5">
              {ppobItems.map((item) => (
                <PpobTile
                  key={item.id}
                  item={item}
                  onClick={() =>
                    router.push(
                      item.id === "voucher-game" ? "/ppob/game" : `/ppob/${item.id}`,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PpobTile({
  item,
  onClick,
}: {
  item: PpobItem;
  onClick: () => void;
}) {
  const Icon = ppobIconMap[item.icon];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 transition active:scale-95"
    >
      <IconTile className={`${item.bg} ${item.color}`}>
        <Icon size={22} strokeWidth={1.8} aria-hidden />
      </IconTile>
      <span className="text-center text-[10.5px] font-medium leading-tight text-neutral-600">
        {item.label}
      </span>
    </button>
  );
}
