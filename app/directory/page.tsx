"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronRight } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import PageHeader from "../components/PageHeader";
import { Avatar, Card, ListRow, PillTabs } from "../components/ui";
import {
  directory,
  directoryFilters,
  type DirectoryEntry,
} from "../lib/dummy";
import { logoAvatar } from "../lib/images";

export default function DirectoryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  const list = directory.filter(
    (d) =>
      d.company.toLowerCase().includes(query.toLowerCase()) ||
      d.city.toLowerCase().includes(query.toLowerCase()),
  );

  const filterOptions = directoryFilters.map((f, i) => ({
    key: String(i),
    label: f,
  }));

  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={1} />}>
      <div className="flex min-h-full flex-col bg-canvas">
        <PageHeader
          title="Direktori Anggota"
          subtitle="Temukan anggota PPJI"
        >
          {/* Search bar di dalam header */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari anggota / perusahaan…"
              className="w-full rounded-2xl bg-white/15 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Filter chips */}
          <div className="mt-3">
            <PillTabs
              options={filterOptions}
              active={String(activeFilter)}
              onChange={(key) => setActiveFilter(Number(key))}
              tone="onDark"
            />
          </div>
        </PageHeader>

        <div className="flex-1 px-5 pb-6 pt-5">
          {/* Info jumlah */}
          <p className="mb-3 text-xs font-medium text-neutral-400">
            {list.length} dari {directory.length} anggota
          </p>

          {/* List anggota */}
          {list.length > 0 ? (
            <Card className="overflow-hidden divide-y divide-neutral-100 p-0">
              {list.map((entry) => (
                <DirectoryRow
                  key={entry.id}
                  entry={entry}
                  onChat={() => router.push(`/chat/dm-${entry.id}`)}
                />
              ))}
            </Card>
          ) : (
            <div className="py-12 text-center text-sm text-neutral-400">
              Tidak ada anggota yang cocok.
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

function DirectoryRow({
  entry,
  onChat,
}: {
  entry: DirectoryEntry;
  onChat: () => void;
}) {
  return (
    <ListRow
      className="px-4 py-3"
      onClick={onChat}
      leading={
        <Avatar
          src={logoAvatar(entry.company)}
          alt={entry.company}
          size={44}
        />
      }
      title={entry.company}
      subtitle={
        <span className="flex items-center gap-1 text-neutral-500">
          <MapPin size={12} className="shrink-0 text-neutral-400" />
          {entry.city}
        </span>
      }
      trailing={
        <ChevronRight size={18} className="text-neutral-300" />
      }
    />
  );
}
