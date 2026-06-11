"use client";

import { Photo, cx } from "./ui";
import { banners, type Banner } from "../lib/dummy";

const TONE: Record<Banner["tone"], string> = {
  brand: "from-brand-900/95 via-brand-900/55 to-transparent",
  gold: "from-gold-700/95 via-gold-700/45 to-transparent",
  dark: "from-black/90 via-black/45 to-transparent",
};

/** Carousel promo horizontal — kartu foto dengan overlay (gaya OVO Deals). */
export default function PromoBanner() {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
      {banners.map((b) => (
        <button
          key={b.id}
          type="button"
          className="relative h-36 w-[80%] shrink-0 snap-start overflow-hidden rounded-3xl text-left shadow-md shadow-brand-900/10 ring-1 ring-black/5 transition active:scale-[0.98]"
        >
          <Photo src={b.image} alt={b.title} />
          <div className={cx("absolute inset-0 bg-linear-to-r", TONE[b.tone])} />
          <div className="absolute inset-0 flex flex-col justify-center px-5 text-white">
            <h3 className="text-base font-extrabold leading-tight drop-shadow">
              {b.title}
            </h3>
            <p className="mt-1 max-w-[80%] text-xs text-white/85 drop-shadow">
              {b.subtitle}
            </p>
            <span className="mt-2.5 w-fit rounded-full bg-white px-3 py-1 text-[11px] font-bold text-brand-800">
              {b.cta}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
