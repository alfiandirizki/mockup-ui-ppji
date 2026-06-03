"use client";

import { useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs } from "../components/ui";
import {
  news,
  newsTabs,
  community,
  type NewsTab,
  type NewsItem,
} from "../lib/dummy";

export default function NewsPage() {
  const [tab, setTab] = useState<NewsTab>("berita");
  const list = news.filter((n) => n.tab === tab);

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={2} />}>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="Berita"
          subtitle="Kabar & informasi PPJI"
          action={
            <HeaderAction label="Arsip berita">
              <ArchiveIcon />
            </HeaderAction>
          }
        />

        <div className="px-5 pb-6 pt-5">
          {/* Tab */}
          <PillTabs options={newsTabs} active={tab} onChange={setTab} />

          {/* List berita */}
          <ul className="mt-5 flex flex-col gap-3">
            {list.map((item) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="py-10 text-center text-sm text-neutral-400">
                Belum ada konten.
              </li>
            )}
          </ul>

          {/* Komunitas */}
          <section className="mt-8">
            <h2 className="mb-4 text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Komunitas
            </h2>
            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1c5fa8] text-white shadow-sm shadow-[#1c5fa8]/30">
                <UsersIcon />
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-neutral-900 dark:text-neutral-50">
                  {community.title}
                </p>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {community.members}
                </p>
              </div>
              <ChevronRight />
            </button>
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 rounded-2xl bg-white p-3.5 text-left shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#1c5fa8]/30 active:scale-[0.99] dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800"
    >
      {/* Thumbnail placeholder */}
      <span className="h-16 w-16 shrink-0 rounded-2xl bg-linear-to-br from-[#cfe0f4] to-[#eaf3fb] dark:from-neutral-800 dark:to-neutral-700" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 dark:text-neutral-50">
          {item.title}
        </p>
        <p className="mt-1.5 text-xs text-neutral-400">{item.time}</p>
      </div>
    </button>
  );
}

/* ------------------------------- ikon ------------------------------- */

function ArchiveIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v3H4zM5 9v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M9.5 13h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 7a3 3 0 0 1 0 6M17.5 19c0-2.2-.9-4-2.3-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
