"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Music2, Plus } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import BottomNav from "../components/BottomNav";
import { Avatar, Photo } from "../components/ui";
import { reels, formatCount, type Reel } from "../lib/dummy";
import { faceAvatar } from "../lib/images";

export default function ReelsPage() {
  return (
    <PhoneFrame bottomBar={<BottomNav activeIndex={3} />}>
      <div className="h-full snap-y snap-mandatory overflow-y-auto bg-black">
        {reels.map((r) => (
          <ReelCard key={r.id} reel={r} />
        ))}
      </div>
    </PhoneFrame>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  const likeCount = reel.likes + (liked ? 1 : 0);

  return (
    <section className="relative flex h-full snap-start flex-col justify-end overflow-hidden bg-black">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Photo src={reel.image} alt={reel.caption} priority />
      </div>

      {/* Dark gradient overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/70" />

      {/* Subtle reel.gradient tint on top */}
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${reel.gradient} opacity-20`}
      />

      {/* Top gradient scrim — keeps white tab text legible over bright photos */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/50 to-transparent" />

      {/* Top tabs */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-6 px-4 pt-14 pb-3 text-sm font-semibold text-white">
        <span className="text-white/60">Mengikuti</span>
        <span className="relative">
          Untuk Anda
          <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white" />
        </span>
      </div>

      {/* Bottom-left: author, caption, audio */}
      <div className="relative z-10 max-w-[78%] px-4 pb-24 text-white">
        <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold ring-1 ring-white/30 backdrop-blur-sm">
          #{reel.tag}
        </span>
        <p className="mt-2 text-[15px] font-bold">@{reel.author}</p>
        <p className="mt-1 text-sm leading-snug text-white/90">{reel.caption}</p>
        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-white/85">
          <Music2 size={13} />
          <span className="truncate">{reel.audio}</span>
        </p>
      </div>

      {/* Right action rail */}
      <div className="absolute bottom-24 right-4 z-10 flex flex-col items-center gap-4 text-white">
        {/* Avatar + follow badge */}
        <div className="relative mb-1">
          <Avatar
            src={faceAvatar(reel.author)}
            alt={reel.author}
            size={48}
            ring
            className="ring-white"
          />
          {!following && (
            <button
              type="button"
              onClick={() => setFollowing(true)}
              aria-label="Ikuti"
              className="absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-gold-500 text-white ring-2 ring-white transition active:scale-90"
            >
              <Plus size={11} strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Like */}
        <RailButton
          onClick={() => setLiked((v) => !v)}
          label={formatCount(likeCount)}
          active={liked}
        >
          <Heart
            size={28}
            strokeWidth={1.8}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-rose-500" : "text-white"}
          />
        </RailButton>

        {/* Comment */}
        <RailButton label={formatCount(reel.comments)}>
          <MessageCircle size={28} strokeWidth={1.8} />
        </RailButton>

        {/* Share */}
        <RailButton label={formatCount(reel.shares)}>
          <Share2 size={26} strokeWidth={1.8} />
        </RailButton>

        {/* Spinning audio disc */}
        <span className="mt-1 flex h-11 w-11 animate-[spin_4s_linear_infinite] items-center justify-center rounded-full bg-black/30 ring-2 ring-white/40">
          <Music2 size={16} />
        </span>
      </div>
    </section>
  );
}

function RailButton({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center transition active:scale-90"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center ${
          active ? "text-rose-500" : "text-white"
        }`}
      >
        {children}
      </span>
      <span className="text-[11px] font-semibold text-white">{label}</span>
    </button>
  );
}
