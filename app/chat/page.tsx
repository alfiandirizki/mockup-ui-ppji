"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenSquare, Users } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader, { HeaderAction } from "../components/PageHeader";
import { PillTabs, Avatar, cx } from "../components/ui";
import { chats, type Chat } from "../lib/dummy";
import { faceAvatar, logoAvatar } from "../lib/images";

export default function ChatListPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"dm" | "group">("dm");

  const list = chats.filter((c) => c.kind === tab);

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-canvas">
        <PageHeader
          title="Chat"
          subtitle="Pesan & forum organisasi"
          onBack={() => router.push("/dashboard")}
          action={
            <HeaderAction label="Chat baru" onClick={() => router.push("/chat/new")}>
              <PenSquare size={20} />
            </HeaderAction>
          }
        >
          <PillTabs
            options={[
              { key: "dm", label: "Pesan" },
              { key: "group", label: "Grup" },
            ]}
            active={tab}
            onChange={setTab}
            tone="onDark"
          />
        </PageHeader>

        <div className="flex-1 px-5 pb-8 pt-5">
          <ul className="flex flex-col gap-2">
            {list.map((c) => (
              <li key={c.id}>
                <ChatRow chat={c} onClick={() => router.push(`/chat/${c.id}`)} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="py-16 text-center text-sm text-neutral-400">
                Belum ada percakapan.
              </li>
            )}
          </ul>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ChatRow({ chat, onClick }: { chat: Chat; onClick: () => void }) {
  const avatarSrc =
    chat.kind === "dm" ? faceAvatar(chat.name) : logoAvatar(chat.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3.5 rounded-2xl bg-white p-3.5 text-left shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-200 active:scale-[0.99]"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar
          src={avatarSrc}
          alt={chat.name}
          size={48}
          className="rounded-2xl"
        />
        {chat.kind === "group" && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white ring-2 ring-white">
            <Users size={11} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cx(
              "truncate text-[15px] font-bold text-brand-900",
              chat.unread > 0 && "text-brand-950",
            )}
          >
            {chat.name}
          </p>
          <span className="shrink-0 text-[12px] text-neutral-500">
            {chat.lastTime}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={cx(
              "truncate text-sm",
              chat.unread > 0
                ? "font-medium text-neutral-700"
                : "text-neutral-500",
            )}
          >
            {chat.lastText}
          </p>
          {chat.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-brand-950">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
