"use client";

import { useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import {
  directory,
  directoryFilters,
  initials,
  type DirectoryEntry,
} from "../lib/dummy";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  const list = directory.filter(
    (d) =>
      d.company.toLowerCase().includes(query.toLowerCase()) ||
      d.city.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={1} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="Direktori Anggota"
          subtitle="Temukan anggota PPJI"
          action={
            <HeaderAction label="Filter">
              <SlidersIcon />
            </HeaderAction>
          }
        >
          {/* Search bar di dalam header */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari anggota / perusahaan…"
              className="w-full rounded-2xl bg-white py-3.5 pl-12 pr-4 text-sm text-neutral-900 shadow-lg shadow-[#1c5fa8]/20 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-white/40 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>
        </PageHeader>

        <div className="px-5 pb-6 pt-5">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {directoryFilters.map((f, i) => {
              const active = i === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(i)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                    active
                      ? "bg-[#1c5fa8] text-white shadow-sm shadow-[#1c5fa8]/25"
                      : "bg-white text-neutral-500 ring-1 ring-neutral-200/80 hover:text-[#1c5fa8] dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-800"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Info jumlah */}
          <p className="mt-4 text-xs font-medium text-neutral-400">
            {list.length} dari {directory.length} anggota
          </p>

          {/* List anggota */}
          <ul className="mt-3 flex flex-col gap-3">
            {list.map((entry) => (
              <li key={entry.id}>
                <DirectoryCard entry={entry} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="py-12 text-center text-sm text-neutral-400">
                Tidak ada anggota yang cocok.
              </li>
            )}
          </ul>
        </div>
      </div>
    </PhoneFrame>
  );
}

function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      {/* Avatar inisial */}
      {entry.color ? (
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white ${entry.color}`}
        >
          {initials(entry.company)}
        </span>
      ) : (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-neutral-200 to-neutral-100 text-sm font-bold text-neutral-400 dark:from-neutral-800 dark:to-neutral-700">
          {initials(entry.company)}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold text-neutral-900 dark:text-neutral-50">
          {entry.company}
        </p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-neutral-500">
          <PinIcon />
          {entry.city}
        </p>
      </div>
      <ChevronRight />
    </button>
  );
}

/* ------------------------------- ikon ------------------------------- */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-neutral-400">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-neutral-300 dark:text-neutral-600"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
