"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, MoreVertical, Send, Plus, ChevronRight } from "lucide-react";
import PhoneFrame from "../../components/PhoneFrame";
import { Avatar, BackButton } from "../../components/ui";
import { findChat, type ChatMessage } from "../../lib/dummy";
import { faceAvatar, logoAvatar } from "../../lib/images";

export default function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const chat = findChat(id);

  const [messages, setMessages] = useState<ChatMessage[]>(
    chat ? chat.messages : [],
  );
  const [draft, setDraft] = useState("");

  if (!chat) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-canvas px-8 text-center">
          <p className="text-sm text-neutral-500">Percakapan tidak ditemukan.</p>
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Kembali
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const isGroup = chat.kind === "group";

  function send() {
    const text = draft.trim();
    if (!text) return;
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMessages((prev) => [
      ...prev,
      {
        id: `me-${prev.length}`,
        from: "me",
        text,
        time: `${pad(d.getHours())}.${pad(d.getMinutes())}`,
        read: false,
      },
    ]);
    setDraft("");
  }

  const avatarSrc =
    chat.kind === "dm"
      ? faceAvatar(chat.name)
      : logoAvatar(chat.name);

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-canvas">
        {/* Header */}
        <header className="bg-hero flex shrink-0 items-center gap-3 rounded-b-2xl px-4 pt-14 pb-3 shadow-lg shadow-brand-900/20">
          <BackButton onClick={() => router.push("/chat")} tone="light" />
          <Avatar
            src={avatarSrc}
            alt={chat.name}
            size={40}
            ring
            className="shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-tight text-white">
              {chat.name}
            </p>
            <p className="truncate text-[11px] text-white/70">
              {isGroup
                ? `${chat.members} anggota`
                : chat.subtitle
                  ? `${chat.subtitle} • online`
                  : "online"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Telepon"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95"
          >
            <Phone size={18} />
          </button>
          <button
            type="button"
            aria-label="Info"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-95"
          >
            <MoreVertical size={18} />
          </button>
        </header>

        {/* Chip konteks B2B (khusus DM) */}
        {!isGroup && (
          <button
            type="button"
            className="flex shrink-0 items-center justify-between gap-2 border-b border-gold-200 bg-gold-50 px-4 py-2.5 text-left transition active:bg-gold-100"
          >
            <span className="truncate text-xs font-semibold text-gold-700">
              Kirim penawaran katering ke {chat.name}
            </span>
            <ChevronRight size={16} className="shrink-0 text-gold-600" />
          </button>
        )}

        {/* Pesan */}
        <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-4">
          {isGroup && (
            <div className="mx-auto mb-1 max-w-[80%] rounded-full bg-brand-50 px-3 py-1 text-center text-[10px] font-medium text-brand-700">
              Grup “{chat.name}” • {chat.members} anggota
            </div>
          )}
          <div className="mx-auto mb-2 rounded-full bg-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-600">
            Hari ini
          </div>
          {messages.map((m, i) => {
            const mine = m.from === "me";
            const prev = messages[i - 1];
            const showName =
              isGroup && !mine && (!prev || prev.from !== m.from);
            return <Bubble key={m.id} msg={m} mine={mine} showName={showName} />;
          })}
        </div>

        {/* Input bar */}
        <div className="flex shrink-0 items-end gap-2 rounded-t-3xl border-t border-neutral-100 bg-white px-3 pb-8 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button
            type="button"
            aria-label="Lampiran"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 active:scale-95"
          >
            <Plus size={20} strokeWidth={2.4} />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ketik pesan…"
            className="min-w-0 flex-1 rounded-full bg-brand-50 px-4 py-2.5 text-sm text-brand-900 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            aria-label="Kirim"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm shadow-brand-900/20 transition active:scale-95 disabled:bg-neutral-300"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Bubble({
  msg,
  mine,
  showName,
}: {
  msg: ChatMessage;
  mine: boolean;
  showName: boolean;
}) {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 shadow-sm ${
          mine
            ? "rounded-br-md bg-brand-700 text-white"
            : "rounded-bl-md bg-white text-neutral-900 ring-1 ring-neutral-100"
        }`}
      >
        {showName && (
          <p className={`mb-0.5 text-[11px] font-bold text-brand-700`}>
            {msg.from}
          </p>
        )}
        <p className="whitespace-pre-wrap text-sm leading-snug">{msg.text}</p>
        <p
          className={`mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
            mine ? "text-white/70" : "text-neutral-400"
          }`}
        >
          {msg.time}
          {mine && <ReadTick read={msg.read} />}
        </p>
      </div>
    </div>
  );
}

function ReadTick({ read }: { read?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={read ? "text-amber-300" : "text-white/60"}
    >
      <path
        d="M2 12.5 6 16l7-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 13 12 14.5l7-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
