"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs } from "../components/ui";
import {
  trainings,
  trainingTabs,
  formatRupiah,
  type Training,
  type TrainingStatus,
} from "../lib/dummy";

export default function SertifikasiPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | TrainingStatus>("all");

  const list =
    tab === "all" ? trainings : trainings.filter((t) => t.status === tab);

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={-1} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="e-Sertifikasi"
          subtitle="Pelatihan & sertifikasi anggota"
          onBack={() => router.back()}
          action={
            <HeaderAction label="Sertifikat saya">
              <CapIcon />
            </HeaderAction>
          }
        />

        <div className="px-5 pb-6 pt-5">
          {/* Tab */}
          <PillTabs options={trainingTabs} active={tab} onChange={setTab} />

          {/* List training */}
          <ul className="mt-5 flex flex-col gap-3">
            {list.map((t) => (
              <li key={t.id}>
                <TrainingCard training={t} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="py-10 text-center text-sm text-neutral-400">
                Belum ada pelatihan.
              </li>
            )}
          </ul>
        </div>
      </div>
    </PhoneFrame>
  );
}

function TrainingCard({ training }: { training: Training }) {
  const done = training.status === "done";
  const inProgress = training.status === "progress";
  const free = training.price === null;

  return (
    <button
      type="button"
      className="flex w-full gap-3.5 rounded-2xl bg-white p-3.5 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      {/* Thumbnail + badge JP */}
      <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-[#cfe0f4] to-[#eaf3fb] dark:from-neutral-800 dark:to-neutral-700">
        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-neutral-900/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {training.jp} JP
        </span>
      </div>

      {/* Detail */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 dark:text-neutral-50">
          {training.title}
        </p>

        {/* Badge harga / gratis / selesai */}
        <div className="mt-1.5 flex items-center gap-2">
          {done ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-500/15">
              <CheckIcon />
              Selesai
            </span>
          ) : free ? (
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-500/15">
              GRATIS
            </span>
          ) : (
            <span className="rounded-md bg-[#1c5fa8]/10 px-2 py-0.5 text-[11px] font-bold text-[#1c5fa8]">
              {formatRupiah(training.price!)}
            </span>
          )}
        </div>

        {/* Progress bar (On Progress) */}
        {inProgress && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className="h-full rounded-full bg-[#1c5fa8]"
                style={{ width: `${training.progress ?? 0}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] font-medium text-neutral-400">
              {training.progress}% selesai
            </p>
          </div>
        )}

        {/* Lihat sertifikat (Selesai) */}
        {done && (
          <span className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#1c5fa8]">
            Lihat Sertifikat
            <ChevronRight />
          </span>
        )}
      </div>
    </button>
  );
}

/* ------------------------------- ikon ------------------------------- */

function CapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4 2 9l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M21 9.5V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 10 17l9-10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
