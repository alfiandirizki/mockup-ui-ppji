"use client";

import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PageHeader from "../components/PageHeader";
import { ppobItems, type PpobItem, type PpobIcon } from "../lib/dummy";

export default function PpobPage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <div className="min-h-full bg-[#f4f7fb] dark:bg-neutral-950">
        <PageHeader
          title="Top Up & PPOB"
          subtitle="Bayar tagihan & isi ulang"
          onBack={() => router.back()}
        />

        <div className="px-5 pb-8 pt-5">
          {/* Grid layanan dalam kartu */}
          <section className="rounded-3xl bg-white p-5 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <h2 className="mb-5 text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Layanan
            </h2>
            <div className="grid grid-cols-4 gap-x-2 gap-y-6">
              {ppobItems.map((item) => (
                <PpobButton
                  key={item.id}
                  item={item}
                  onClick={() => router.push(`/ppob/${item.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PpobButton({
  item,
  onClick,
}: {
  item: PpobItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 transition active:scale-95"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
      >
        <PpobIconSvg name={item.icon} />
      </span>
      <span className="text-center text-[11px] font-medium leading-tight text-neutral-700 dark:text-neutral-300">
        {item.label}
      </span>
    </button>
  );
}

function PpobIconSvg({ name }: { name: PpobIcon }) {
  const p = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "pulsa":
      return (
        <svg {...p}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </svg>
      );
    case "pln":
      return (
        <svg {...p}>
          <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="13" rx="2.5" />
          <path d="M3 10h18" />
          <circle cx="16.5" cy="14" r="1.3" fill="currentColor" />
        </svg>
      );
    case "pdam":
      return (
        <svg {...p}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
        </svg>
      );
    case "bpjs":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3Z" />
          <path d="M12 8v6M9 11h6" />
        </svg>
      );
    case "internet":
      return (
        <svg {...p}>
          <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
      );
    case "game":
      return (
        <svg {...p}>
          <rect x="2" y="7" width="20" height="11" rx="4" />
          <path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 14h.01" />
        </svg>
      );
  }
}


