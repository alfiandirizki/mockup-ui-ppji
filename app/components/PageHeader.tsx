"use client";

import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { cx } from "./ui";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  /** Ikon aksi di kanan. */
  action?: ReactNode;
  /** Konten ekstra di bawah judul (mis. search / saldo). */
  children?: ReactNode;
  /** Padding bawah ekstra bila ada konten yang "menggantung". */
  className?: string;
};

/**
 * Header hero navy bersama. "Bleed" sampai ke atas layar (di belakang status
 * bar) dengan padding atas aman. Gaya Livin' by Mandiri.
 */
export default function PageHeader({
  title,
  subtitle,
  onBack,
  action,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={cx(
        "relative overflow-hidden rounded-b-3xl bg-hero px-5 pb-6 pt-14 text-white shadow-lg shadow-brand-900/20",
        className,
      )}
    >
      {/* aksen lembut */}
      <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />

      <div className="relative flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="-ml-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/25 active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 truncate text-sm text-white/70">{subtitle}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {children && <div className="relative mt-4">{children}</div>}
    </header>
  );
}

/** Tombol ikon untuk slot `action`. */
export function HeaderAction({
  onClick,
  label,
  children,
  badge,
}: {
  onClick?: () => void;
  label: string;
  children: ReactNode;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-white transition hover:bg-white/25 active:scale-95"
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-brand-950 ring-2 ring-brand-900">
          {badge}
        </span>
      )}
    </button>
  );
}
