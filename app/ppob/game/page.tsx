"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Gem } from "lucide-react";
import PhoneFrame from "../../components/PhoneFrame";
import PageHeader from "../../components/PageHeader";
import TransactionSuccess from "../../components/TransactionSuccess";
import { Avatar, Button, Field, cx } from "../../components/ui";
import { logoAvatar } from "../../lib/images";
import {
  games,
  gameDenoms,
  wallet,
  formatRupiah,
  makeReceiptMeta,
  type GameItem,
  type GameDenom,
} from "../../lib/dummy";

type Receipt = { txnId: string; time: string; amount: number; label: string };

export default function GameTopUpPage() {
  const router = useRouter();
  const [game, setGame] = useState<GameItem | null>(null);
  const [userId, setUserId] = useState("");
  const [denom, setDenom] = useState<GameDenom | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const canPay = !!game && userId.trim().length >= 4 && denom !== null;

  function handlePay() {
    if (!canPay || !denom) return;
    const { txnId, time } = makeReceiptMeta();
    setReceipt({ txnId, time, amount: denom.price, label: denom.label });
  }

  /* ---------------------- Berhasil ---------------------- */
  if (receipt && game) {
    return (
      <PhoneFrame>
        <TransactionSuccess
          title="Top Up Game Berhasil"
          caption={`${game.name} berhasil diisi`}
          amount={receipt.amount}
          saldoAfter={wallet.balance - receipt.amount}
          details={[
            { label: "Game", value: game.name },
            { label: "User ID", value: userId, mono: true },
            { label: "Item", value: receipt.label },
            { label: "Metode", value: "Saldo PPJI Pay" },
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
          title="Voucher Game"
          subtitle="Diamond & voucher game"
          onBack={() => (game ? setGame(null) : router.back())}
        />

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
          {/* 1. Pilih Game */}
          <p className="mb-1 text-sm font-semibold text-brand-900">Pilih Game</p>
          {!game && (
            <p className="mb-3 text-xs text-neutral-400">Pilih game untuk mulai top up</p>
          )}
          {game && <div className="mb-3" />}
          <div className="rounded-3xl bg-white px-4 pb-5 pt-4 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
            <div className="grid grid-cols-4 gap-x-3 gap-y-4">
              {games.map((g) => {
                const active = game?.id === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => { setGame(g); setDenom(null); }}
                    className="flex flex-col items-center gap-1.5 transition active:scale-95"
                  >
                    <span
                      className={cx(
                        "relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl transition",
                        active ? "ring-2 ring-brand-700 ring-offset-2" : "",
                      )}
                    >
                      <Avatar
                        src={logoAvatar(g.name)}
                        alt={g.name}
                        size={56}
                        className="rounded-2xl!"
                      />
                    </span>
                    <span
                      className={cx(
                        "text-center text-[10px] font-medium leading-tight",
                        active ? "text-brand-700" : "text-neutral-500",
                      )}
                    >
                      {g.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {game && (
            <>
              {/* 2. User ID */}
              <p className="mb-3 mt-6 text-sm font-semibold text-brand-900">
                User ID {game.name}
              </p>
              <div className="rounded-3xl bg-white px-4 py-4 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
                <Field
                  label={`User ID / Zone ID`}
                  icon={<Gamepad2 size={17} strokeWidth={1.8} />}
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Masukkan User ID / Zone ID"
                />
              </div>

              {/* 3. Pilih Nominal */}
              <p className="mb-3 mt-6 text-sm font-semibold text-brand-900">
                Pilih Nominal
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {gameDenoms.map((d) => {
                  const active = denom?.label === d.label;
                  return (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setDenom(d)}
                      className={cx(
                        "flex flex-col items-start gap-1 rounded-2xl px-4 py-3 text-left transition active:scale-[0.98]",
                        active
                          ? "bg-brand-700 shadow-md shadow-brand-900/25"
                          : "bg-white ring-1 ring-neutral-100 hover:ring-brand-200",
                      )}
                    >
                      <span
                        className={cx(
                          "flex items-center gap-1.5 text-sm font-bold",
                          active ? "text-white" : "text-brand-900",
                        )}
                      >
                        <Gem
                          size={14}
                          strokeWidth={1.8}
                          className={active ? "text-gold-300" : "text-gold-500"}
                          aria-hidden
                        />
                        {d.label}
                      </span>
                      <span
                        className={cx(
                          "tnum text-xs",
                          active ? "text-white/75" : "text-neutral-500",
                        )}
                      >
                        {formatRupiah(d.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Bottom bar — pinned to frame bottom */}
        {game && (
          <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-neutral-500">Total</span>
              {denom ? (
                <span className="tnum text-lg font-bold text-brand-900">
                  {formatRupiah(denom.price)}
                </span>
              ) : (
                <span className="text-sm text-neutral-400">Pilih nominal</span>
              )}
            </div>
            <Button
              variant="primary"
              onClick={handlePay}
              disabled={!canPay}
              className="w-full"
            >
              Beli Sekarang
            </Button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
