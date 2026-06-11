"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs, Card, Photo } from "../components/ui";
import {
  trainings,
  trainingTabs,
  formatRupiah,
  type Training,
  type TrainingStatus,
} from "../lib/dummy";
import {
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  Award,
} from "lucide-react";

export default function SertifikasiPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | TrainingStatus>("all");

  const list =
    tab === "all" ? trainings : trainings.filter((t) => t.status === tab);

  const inProgressCount = trainings.filter((t) => t.status === "progress").length;
  const doneCount = trainings.filter((t) => t.status === "done").length;

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-canvas">
        <PageHeader
          title="e-Sertifikasi"
          subtitle="Pelatihan & sertifikasi anggota"
          onBack={() => router.back()}
          action={
            <HeaderAction label="Sertifikat saya">
              <Award size={20} />
            </HeaderAction>
          }
        />

        <div className="px-5 pb-8 pt-5">
          {/* Summary strip */}
          <div className="mb-5 flex gap-3">
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-neutral-100 shadow-sm shadow-brand-900/5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100">
                <GraduationCap size={16} className="text-brand-700" />
              </span>
              <div>
                <p className="text-xs text-neutral-400 leading-tight">Berjalan</p>
                <p className="text-base font-bold text-brand-900 tnum leading-tight">{inProgressCount}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-neutral-100 shadow-sm shadow-brand-900/5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 size={16} className="text-emerald-600" />
              </span>
              <div>
                <p className="text-xs text-neutral-400 leading-tight">Selesai</p>
                <p className="text-base font-bold text-brand-900 tnum leading-tight">{doneCount}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <PillTabs options={trainingTabs} active={tab} onChange={setTab} />

          {/* Training list */}
          <ul className="mt-4 flex flex-col gap-3">
            {list.map((t) => (
              <li key={t.id}>
                <TrainingCard training={t} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="py-12 text-center text-sm text-neutral-400">
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
    <Card
      as="button"
      className="flex w-full gap-3.5 p-3.5 text-left transition hover:-translate-y-0.5 active:scale-[0.99]"
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
        <Photo
          src={training.image}
          alt={training.title}
        />
        {/* JP badge */}
        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-brand-900/80 px-1.5 py-0.5 text-[10px] font-bold text-white tnum">
          {training.jp} JP
        </span>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <p className="line-clamp-2 text-sm font-bold leading-snug text-brand-900">
          {training.title}
        </p>

        {/* Price / status badge */}
        <div className="mt-1.5 flex items-center gap-2">
          {done ? (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
              <CheckCircle2 size={11} />
              Selesai
            </span>
          ) : free ? (
            <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
              GRATIS
            </span>
          ) : (
            <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700 tnum">
              {formatRupiah(training.price!)}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {inProgress && (
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${training.progress ?? 0}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] font-medium text-neutral-400 tnum">
              {training.progress}% selesai
            </p>
          </div>
        )}

        {/* Lihat sertifikat */}
        {done && (
          <span className="mt-2 inline-flex w-fit items-center gap-0.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
            Lihat Sertifikat
            <ChevronRight size={13} />
          </span>
        )}

        {/* CTA untuk available */}
        {!done && !inProgress && (
          <span className="mt-2 inline-flex w-fit items-center rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition">
            {free ? "Mulai" : "Daftar"}
          </span>
        )}
      </div>
    </Card>
  );
}
