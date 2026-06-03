"use client";

import { orgFeatures, type OrgFeature } from "../lib/dummy";

/**
 * Grid "Fitur Organisasi" untuk Beranda.
 * 4 kolom, ikon berwarna dengan lingkaran background lembut.
 * Semua item placeholder — sambungkan navigasi sesuai kebutuhan.
 */
export default function OrgFeatures() {
  return (
    <section>
      <h2 className="mb-4 text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        Fitur Organisasi
      </h2>
      <div className="rounded-3xl bg-white p-4 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {orgFeatures.map((f) => (
            <FeatureItem key={f.label} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature }: { feature: OrgFeature }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1.5 transition active:scale-95"
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}
      >
        <FeatureIcon name={feature.icon} />
      </span>
      <span className="text-center text-[11px] font-medium leading-tight text-neutral-700 dark:text-neutral-300">
        {feature.label}
      </span>
    </button>
  );
}

function FeatureIcon({ name }: { name: OrgFeature["icon"] }) {
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
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 9.5h18M8 3v4M16 3v4" />
          <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 17h2M11 17h2" />
        </svg>
      );
    case "recruit":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <circle cx="8.5" cy="11" r="2" />
          <path d="M5.5 16c.4-1.6 1.6-2.5 3-2.5s2.6.9 3 2.5" />
          <path d="M14 9.5h4M14 13h3" />
        </svg>
      );
    case "org":
      return (
        <svg {...p}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" />
          <path d="M8.5 7.5 7 9l1.5 1.5M8.5 13.5 7 15l1.5 1.5M15.5 7.5 17 9l-1.5 1.5M15.5 13.5 17 15l-1.5 1.5" />
        </svg>
      );
    case "diploma":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="13" rx="2.5" />
          <path d="M6.5 8h7M6.5 11h4" />
          <circle cx="17" cy="17" r="3" />
          <path d="M15.5 19.5 15 22l2-1 2 1-.5-2.5" />
        </svg>
      );
    case "structure":
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="18" rx="2.5" />
          <path d="M8 8h6M8 11.5h6" />
          <circle cx="15.5" cy="16" r="2.2" />
          <path d="m14.7 16 .6.6 1.2-1.2" />
        </svg>
      );
    case "forum":
      return (
        <svg {...p}>
          <path d="M4 5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
          <path d="M7 9h10M7 12h6" />
        </svg>
      );
    case "matrix":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 16v-2.5M11 16v-5M15 16v-3.5" />
          <path d="m7 11 4-3 3 2 4-4" />
        </svg>
      );
    case "activity":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="17" rx="2.5" />
          <path d="M8 3.5h8v2.5H8z" />
          <path d="m8 11 1.2 1.2L11.5 10M8 15.5l1.2 1.2 2.3-2.2M14 11h3M14 15.7h3" />
        </svg>
      );
  }
}
