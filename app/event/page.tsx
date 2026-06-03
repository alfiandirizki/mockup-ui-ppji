"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs } from "../components/ui";
import { events, type EventItem } from "../lib/dummy";

export default function EventPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"upcoming" | "done">("upcoming");

  const list = events.filter((e) => e.status === tab);

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={2} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="Event"
          subtitle="Agenda & kegiatan PPJI"
          action={
            <HeaderAction label="Kalender">
              <CalendarIcon />
            </HeaderAction>
          }
        />

        <div className="px-5 pb-6 pt-5">
          {/* Tab Akan Datang / Selesai */}
          <PillTabs
            options={[
              { key: "upcoming", label: "Akan Datang" },
              { key: "done", label: "Selesai" },
            ]}
            active={tab}
            onChange={setTab}
          />

          {/* Daftar event */}
          <div className="mt-5 flex flex-col gap-4">
            {list.map((ev) =>
              ev.featured ? (
                <FeaturedCard
                  key={ev.id}
                  event={ev}
                  onOpen={() => router.push(`/event/${ev.id}`)}
                />
              ) : (
                <PlainCard
                  key={ev.id}
                  event={ev}
                  onOpen={() => router.push(`/event/${ev.id}`)}
                />
              ),
            )}
            {list.length === 0 && (
              <p className="py-12 text-center text-sm text-neutral-400">
                Belum ada event.
              </p>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* Kartu event unggulan — biru besar dengan tombol daftar */
function FeaturedCard({
  event,
  onOpen,
}: {
  event: EventItem;
  onOpen: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#2f7ad1] via-[#236bbd] to-[#143f78] p-5 text-white shadow-lg shadow-[#1c5fa8]/25">
      <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-white/20">
          Unggulan
        </span>
        <h2 className="mt-2.5 text-xl font-bold tracking-tight">{event.title}</h2>
        {event.subtitle && (
          <p className="mt-1 text-sm text-white/75">{event.subtitle}</p>
        )}

        <div className="mt-4 flex flex-col gap-2 text-sm text-white/90">
          <span className="flex items-center gap-2.5">
            <CalendarIcon small />
            {event.dateText}
          </span>
          <span className="flex items-center gap-2.5">
            <PinIcon />
            {event.location}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-5 w-full rounded-2xl bg-white py-3.5 text-sm font-bold text-[#1c5fa8] shadow-sm transition hover:bg-white/90 active:scale-[0.99]"
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
}

/* Kartu event biasa — putih ringkas */
function PlainCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  const done = event.status === "done";
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-bold text-neutral-900 dark:text-neutral-50">
          {event.title}
        </h3>
        {done && (
          <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-500 dark:bg-neutral-800">
            Selesai
          </span>
        )}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <CalendarIcon small muted />
          {event.dateText}
        </span>
        <span className="flex items-center gap-1.5">
          <PinIcon muted />
          {event.location}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------- ikon ------------------------------- */

function CalendarIcon({
  small,
  muted,
}: {
  small?: boolean;
  muted?: boolean;
}) {
  const s = small ? 15 : 22;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={muted ? "text-neutral-400" : undefined}
    >
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

function PinIcon({ muted }: { muted?: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={muted ? "text-neutral-400" : undefined}
    >
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
