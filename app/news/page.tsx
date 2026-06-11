"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, Users, ChevronRight, MessageSquare } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { cx, Photo, Card, PillTabs, SectionHeader } from "../components/ui";
import {
  news,
  newsTabs,
  community,
  type NewsTab,
  type NewsItem,
} from "../lib/dummy";

export default function NewsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<NewsTab>("berita");
  const list = news.filter((n) => n.tab === tab);
  const featured = list[0] ?? null;
  const rest = list.slice(1);

  return (
    <PhoneFrame>
      <div className="min-h-full bg-canvas">
        <PageHeader
          title="Berita & Info"
          subtitle="Kabar & informasi PPJI"
          onBack={() => router.back()}
          action={
            <HeaderAction label="Arsip berita">
              <Archive size={20} />
            </HeaderAction>
          }
        >
          <PillTabs options={newsTabs} active={tab} onChange={setTab} tone="onDark" />
        </PageHeader>

        <div className="px-5 pb-8 pt-5">
          {/* Featured card */}
          {featured && (
            <button
              type="button"
              className="mb-4 w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100 transition active:scale-[0.99]"
            >
              {/* Cover photo */}
              <div className="relative h-40 w-full overflow-hidden">
                <Photo src={featured.image} alt={featured.title} priority />
                {/* Gradient scrim */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/60 via-transparent to-transparent" />
                {/* Tab badge */}
                <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-950">
                  {newsTabs.find((t) => t.key === tab)?.label ?? tab}
                </span>
              </div>
              <div className="px-4 pb-4 pt-3">
                <p className="line-clamp-2 text-[15px] font-bold leading-snug text-brand-900">
                  {featured.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                  {featured.excerpt}
                </p>
                <p className="mt-2 text-xs text-neutral-400">{featured.time}</p>
              </div>
            </button>
          )}

          {/* Rest of the list */}
          {rest.length > 0 && (
            <ul className="flex flex-col gap-3">
              {rest.map((item) => (
                <li key={item.id}>
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          )}

          {list.length === 0 && (
            <p className="py-10 text-center text-sm text-neutral-400">
              Belum ada konten.
            </p>
          )}

          {/* Forum Diskusi */}
          <section className="mt-8">
            <SectionHeader title="Komunitas" />
            <Card
              as="button"
              onClick={() => {}}
              className="flex w-full items-center gap-4 p-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-sm shadow-brand-700/30">
                <Users size={22} />
              </span>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-bold text-brand-900">
                  {community.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
                  <MessageSquare size={13} className="text-brand-400" />
                  {community.members}
                </p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-neutral-300" />
            </Card>
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
      className={cx(
        "flex w-full items-center gap-3.5 rounded-2xl bg-white p-3.5 text-left",
        "shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100",
        "transition active:scale-[0.99]",
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
        <Photo src={item.image} alt={item.title} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-bold leading-snug text-brand-900">
          {item.title}
        </p>
        <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-neutral-500">
          {item.excerpt}
        </p>
        <p className="mt-1.5 text-xs text-neutral-400">{item.time}</p>
      </div>
    </button>
  );
}
