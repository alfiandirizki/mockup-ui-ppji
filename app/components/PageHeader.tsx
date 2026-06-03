"use client";

import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /** Aksi tombol kembali; jika ada, tampil panah kiri. */
  onBack?: () => void;
  /** Ikon aksi di kanan (opsional). */
  action?: ReactNode;
  /** Konten ekstra di bawah judul (mis. search bar). */
  children?: ReactNode;
};

/**
 * Header biru gradient bersama untuk semua halaman.
 * Gaya soft & airy: sudut bawah membulat besar, tipografi lega,
 * aksen blur lembut. Konsisten di seluruh app.
 */
export default function PageHeader({
  title,
  subtitle,
  onBack,
  action,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-b-[2rem] bg-linear-to-br from-[#2f7ad1] via-[#236bbd] to-[#1c5fa8] px-6 pb-6 pt-6 text-white shadow-lg shadow-[#1c5fa8]/20">
      {/* Aksen lingkaran blur lembut */}
      <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex items-start gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="-ml-1.5 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-white/75">{subtitle}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {children && <div className="relative mt-5">{children}</div>}
    </header>
  );
}

/** Tombol ikon untuk slot `action` di header. */
export function HeaderAction({
  onClick,
  label,
  children,
}: {
  onClick?: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 transition hover:bg-white/25 active:scale-95"
    >
      {children}
    </button>
  );
}
