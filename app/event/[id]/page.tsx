"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, CircleDot, Check } from "lucide-react";
import PhoneFrame from "../../components/PhoneFrame";
import { BackButton, Button, Photo, Card, SectionHeader } from "../../components/ui";
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
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-canvas px-8 text-center">
          <p className="text-sm text-neutral-500">Event tidak ditemukan.</p>
          <Button onClick={() => router.push("/event")}>
            Kembali ke Event
          </Button>
        </div>
      </PhoneFrame>
    );
  }

  const done = event.status === "done";

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-canvas">
        {/* Scrollable content — hero + body */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Hero cover image with overlay gradient and back button */}
          <div className="relative h-60 w-full shrink-0 overflow-hidden">
            <Photo
              src={event.image}
              alt={event.title}
              className="object-cover"
              priority
            />
            {/* dark gradient at bottom for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-brand-950/80 to-transparent" />

            {/* floating back button */}
            <div className="absolute left-4 top-12">
              <BackButton onClick={() => router.push("/event")} tone="light" />
            </div>

            {/* status badge */}
            {done && (
              <div className="absolute right-4 top-14">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
                  Selesai
                </span>
              </div>
            )}

            {/* title block over gradient */}
            <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
              {event.subtitle && (
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-white/70">
                  {event.subtitle}
                </p>
              )}
              <h1 className="text-lg font-bold leading-tight text-white">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Body content */}
          <div className="px-5 pt-5">
            {/* Date & location chips */}
            <Card className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <CalendarDays size={18} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    Tanggal
                  </p>
                  <p className="text-sm font-semibold text-brand-900">
                    {event.dateText}
                  </p>
                </div>
              </div>
              <div className="h-px bg-neutral-100" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    Lokasi
                  </p>
                  <p className="text-sm font-semibold text-brand-900">
                    {event.location}
                  </p>
                </div>
              </div>
            </Card>

            {/* Description */}
            {event.description && (
              <section className="mt-8">
                <SectionHeader title="Tentang Event" />
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {event.description}
                </p>
              </section>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <section className="mt-8">
                <SectionHeader title="Agenda" />
                <ul className="mt-3 flex flex-col gap-3">
                  {event.agenda.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-brand-600">
                        {done ? (
                          <Check size={18} />
                        ) : (
                          <CircleDot size={18} />
                        )}
                      </span>
                      <span className="text-sm leading-snug text-neutral-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Pinned bottom action bar (in-flow, not absolute) */}
        {!done && (
          <div className="shrink-0 rounded-t-3xl border-t border-neutral-100 bg-white px-5 pb-8 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <Button variant="primary">Daftar Sekarang</Button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
