"use client";

import type { ReactNode, InputHTMLAttributes } from "react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Layar dengan latar gradient biru lembut + dukungan dark mode        */
/* ------------------------------------------------------------------ */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-linear-to-b from-[#eaf3fb] via-white to-white px-7 dark:from-[#0d1b2c] dark:via-neutral-950 dark:to-neutral-950">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pill tabs / filter chips — gaya soft & airy, konsisten antar halaman */
/* ------------------------------------------------------------------ */
type PillTabsProps<T extends string> = {
  options: { key: T; label: string }[];
  active: T;
  onChange: (key: T) => void;
};

export function PillTabs<T extends string>({
  options,
  active,
  onChange,
}: PillTabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.key === active;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              on
                ? "bg-[#1c5fa8] text-white shadow-sm shadow-[#1c5fa8]/25"
                : "bg-white text-neutral-500 ring-1 ring-neutral-200/80 hover:text-[#1c5fa8] dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-800"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Kartu putih dasar — radius besar & shadow lembut. */
export function Card({
  children,
  className = "",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "button";
  onClick?: () => void;
}) {
  const cls = `rounded-2xl bg-white shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800 ${className}`;
  if (as === "button") {
    return (
      <button
        type="button"
        className={`text-left transition active:scale-[0.99] ${cls}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return <div className={cls}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Tombol kembali (panah kiri) di pojok atas                           */
/* ------------------------------------------------------------------ */
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Kembali"
      className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition hover:bg-black/5 active:scale-95 dark:text-neutral-300 dark:hover:bg-white/10"
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
  );
}

/* ------------------------------------------------------------------ */
/* Tombol utama (primary / outline)                                    */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline";
  className?: string;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "w-full rounded-2xl py-4 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#1c5fa8]/30";
  const styles =
    variant === "primary"
      ? "bg-[#1c5fa8] text-white shadow-sm shadow-[#1c5fa8]/25 hover:bg-[#164d8c]"
      : "border border-[#1c5fa8]/40 bg-white text-[#1c5fa8] hover:bg-[#1c5fa8]/5 dark:bg-transparent dark:hover:bg-[#1c5fa8]/10";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Input field dengan label                                            */
/* ------------------------------------------------------------------ */
type FieldProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const inputClass =
  "w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#1c5fa8] focus:ring-2 focus:ring-[#1c5fa8]/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100";

export function Field({ label, ...rest }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
      <input className={inputClass} {...rest} />
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Input password dengan toggle show/hide                              */
/* ------------------------------------------------------------------ */
type PasswordFieldProps = {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  placeholder?: string;
};

export function PasswordField({
  label,
  value,
  onValueChange,
  placeholder = "••••••••",
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Sembunyikan password" : "Lihat password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600 dark:hover:text-neutral-200"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </label>
  );
}

function Eye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M9.9 5.2A9.5 9.5 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.3 6.3A17 17 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 3.7-.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
