"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import PhoneFrame from "../../components/PhoneFrame";
import PageHeader from "../../components/PageHeader";
import { Avatar, Card } from "../../components/ui";
import { directory, type DirectoryEntry } from "../../lib/dummy";
import { logoAvatar } from "../../lib/images";

export default function NewChatPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const list = directory.filter(
    (d) =>
      d.company.toLowerCase().includes(query.toLowerCase()) ||
      d.city.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PhoneFrame>
      <div className="min-h-full bg-canvas">
        <PageHeader
          title="Chat Baru"
          subtitle="Pilih anggota untuk mulai pesan"
          onBack={() => router.push("/chat")}
        >
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">
              <Search size={17} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari anggota…"
              className="w-full rounded-2xl bg-white/15 py-3 pl-10 pr-4 text-sm text-white shadow-none outline-none transition placeholder:text-white/50 focus:bg-white/20 focus:ring-1 focus:ring-white/30"
            />
          </div>
        </PageHeader>

        <div className="px-5 pb-6 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Anggota Direktori
          </p>

          <ul className="flex flex-col gap-2">
            {list.map((d) => (
              <li key={d.id}>
                <MemberRow
                  entry={d}
                  onClick={() => router.push(`/chat/dm-${d.id}`)}
                />
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

function MemberRow({
  entry,
  onClick,
}: {
  entry: DirectoryEntry;
  onClick: () => void;
}) {
  return (
    <Card
      as="button"
      onClick={onClick}
      className="flex w-full items-center gap-3.5 p-3.5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-200 active:scale-[0.99]"
    >
      <Avatar
        src={logoAvatar(entry.company)}
        alt={entry.company}
        size={48}
        className="rounded-2xl"
      />
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-[15px] font-bold text-brand-900">
          {entry.company}
        </p>
        <p className="mt-0.5 truncate text-sm text-neutral-500">{entry.city}</p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-neutral-300" />
    </Card>
  );
}
