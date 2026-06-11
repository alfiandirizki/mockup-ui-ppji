"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs, Photo, Button, cx } from "../components/ui";
import { events, type EventItem } from "../lib/dummy";

export default function EventPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"upcoming" | "done">("upcoming");

  const list = events.filter((e) => e.status === tab);

  return (
    <PhoneFrame>
      <div className="min-h-full bg-canvas">
        <PageHeader
          title="Event"
          subtitle="Agenda & kegiatan PPJI"
          onBack={() => router.back()}
          action={
            <HeaderAction label="Kalender">
              <CalendarDays size={20} />
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

/* Kartu event unggulan — foto besar + overlay navy + tombol daftar */
function FeaturedCard({
  event,
  onOpen,
}: {
  event: EventItem;
  onOpen: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
      {/* Foto sampul */}
      <div className="relative h-44 overflow-hidden">
        <Photo src={event.image} alt={event.title} priority />
        {/* Overlay navy gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-900/30 to-transparent" />
        {/* Badge unggulan */}
        <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-950 shadow-sm">
          Unggulan
        </span>
      </div>

      {/* Konten bawah */}
      <div className="px-5 pb-5 pt-4">
        <h2 className="text-[17px] font-bold leading-snug tracking-tight text-brand-900">
          {event.title}
        </h2>
        {event.subtitle && (
          <p className="mt-1 text-sm text-neutral-500">{event.subtitle}</p>
        )}

        <div className="mt-3 flex flex-col gap-1.5 text-xs text-neutral-500">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="shrink-0 text-brand-400" />
            {event.dateText}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 text-brand-400" />
            {event.location}
          </span>
        </div>

        <div className="mt-4">
          <Button onClick={onOpen} variant="primary">
            Lihat Detail
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Kartu event biasa — thumbnail kecil + info */
function PlainCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  const done = event.status === "done";
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cx(
        "flex w-full items-start gap-4 rounded-2xl bg-white p-4 text-left",
        "shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100",
        "transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-200 active:scale-[0.99]",
      )}
    >
      {/* Thumbnail foto */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
        <Photo src={event.image} alt={event.title} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-brand-900">
            {event.title}
          </h3>
          {done && (
            <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-500">
              Selesai
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-col gap-1 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} className="shrink-0 text-brand-400" />
            {event.dateText}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="shrink-0 text-brand-400" />
            {event.location}
          </span>
        </div>
      </div>
    </button>
  );
}
