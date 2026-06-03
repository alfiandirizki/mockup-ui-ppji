"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../../components/PhoneFrame";
import PageHeader from "../../components/PageHeader";
import { events } from "../../lib/dummy";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#f4f7fb] px-8 text-center dark:bg-neutral-950">
          <p className="text-sm text-neutral-500">Event tidak ditemukan.</p>
          <button
            type="button"
            onClick={() => router.push("/event")}
            className="rounded-xl bg-[#1c5fa8] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Kembali ke Event
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const done = event.status === "done";

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title={event.title}
          subtitle={event.subtitle}
          onBack={() => router.push("/event")}
        >
          {done && (
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold ring-1 ring-white/20">
              Selesai
            </span>
          )}
        </PageHeader>

        <div className="px-5 pb-8 pt-5">
          {/* Info tanggal & lokasi */}
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <InfoRow icon={<CalendarIcon />} label="Tanggal" value={event.dateText} />
            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
            <InfoRow icon={<PinIcon />} label="Lokasi" value={event.location} />
          </div>

          {/* Deskripsi */}
          {event.description && (
            <section className="mt-6">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                Tentang Event
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {event.description}
              </p>
            </section>
          )}

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <section className="mt-6">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                Agenda
              </h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {event.agenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1c5fa8]/10 text-[11px] font-bold text-[#1c5fa8]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tombol daftar (hanya untuk event akan datang) */}
          {!done && (
            <button
              type="button"
              className="mt-8 w-full rounded-2xl bg-[#1c5fa8] py-4 text-sm font-bold text-white shadow-md shadow-[#1c5fa8]/25 transition hover:bg-[#164d8c] active:scale-[0.99]"
            >
              Daftar Sekarang
            </button>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1c5fa8]/10 text-[#1c5fa8]">
        {icon}
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------- ikon ------------------------------- */

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
