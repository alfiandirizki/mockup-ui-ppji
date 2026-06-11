"use client";

import type { ReactNode, InputHTMLAttributes } from "react";
import { useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

/** Gabung className kondisional. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Layar dasar — kanvas terang lembut                                  */
/* ------------------------------------------------------------------ */
export function Screen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex min-h-full flex-col bg-canvas", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Foto & Avatar (next/image, remote)                                  */
/* ------------------------------------------------------------------ */
export function Avatar({
  src,
  alt,
  size = 44,
  ring = false,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "relative inline-block shrink-0 overflow-hidden rounded-full bg-brand-100",
        ring && "ring-2 ring-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
    </span>
  );
}

/** Foto sampul rasio bebas (parent harus relative + tinggi). */
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="430px"
      className={cx("object-cover", className)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Pill / segmented tabs — navy aktif                                  */
/* ------------------------------------------------------------------ */
type PillTabsProps<T extends string> = {
  options: { key: T; label: string }[];
  active: T;
  onChange: (key: T) => void;
  /** "pill" = chip terpisah; "segment" = satu track berisi segmen. */
  variant?: "pill" | "segment";
  /** "onDark" untuk tab di atas header navy (kontras dibalik). */
  tone?: "light" | "onDark";
};

export function PillTabs<T extends string>({
  options,
  active,
  onChange,
  variant = "pill",
  tone = "light",
}: PillTabsProps<T>) {
  if (variant === "segment") {
    return (
      <div className="flex gap-1 rounded-full bg-brand-50 p-1 ring-1 ring-brand-100">
        {options.map((o) => {
          const on = o.key === active;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              className={cx(
                "flex-1 rounded-full px-3 py-2 text-sm font-semibold transition active:scale-[0.98]",
                on ? "bg-brand-700 text-white shadow-sm" : "text-brand-700/70",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }
  const dark = tone === "onDark";
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.key === active;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={cx(
              "rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95",
              dark
                ? on
                  ? "bg-white text-brand-800 shadow-sm"
                  : "bg-white/12 text-white/75 ring-1 ring-white/15 hover:text-white"
                : on
                  ? "bg-brand-700 text-white shadow-sm shadow-brand-700/25"
                  : "bg-white text-neutral-500 ring-1 ring-neutral-200/80 hover:text-brand-700",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Kartu putih dasar. */
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
  const cls = cx(
    "rounded-3xl bg-white shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100",
    className,
  );
  if (as === "button") {
    return (
      <button
        type="button"
        className={cx("text-left transition active:scale-[0.99]", cls)}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return <div className={cls}>{children}</div>;
}

/** Judul seksi + aksi opsional (mis. "Lihat semua"). */
export function SectionHeader({
  title,
  action,
  onAction,
  className = "",
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cx("mb-3 flex items-center justify-between", className)}>
      <h2 className="text-base font-bold tracking-tight text-brand-900">
        {title}
      </h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-0.5 text-xs font-semibold text-brand-600 active:opacity-70"
        >
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

/** Baris daftar serbaguna. */
export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className = "",
}: {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-brand-900">
          {title}
        </div>
        {subtitle && (
          <div className="truncate text-xs text-neutral-500">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(
          "flex w-full items-center gap-3 text-left transition active:scale-[0.99]",
          className,
        )}
      >
        {inner}
      </button>
    );
  }
  return <div className={cx("flex items-center gap-3", className)}>{inner}</div>;
}

/** Checkbox kustom on-brand dengan tap-target ≥44px. */
export function Checkbox({
  checked,
  onChange,
  children,
  required = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-2.5 py-1 text-sm text-neutral-600">
      <span
        onClick={() => onChange(!checked)}
        className={cx(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition",
          checked
            ? "border-brand-700 bg-brand-700 text-white"
            : "border-neutral-300 bg-white",
        )}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </span>
      {required && (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          required
          className="sr-only"
          aria-hidden
          tabIndex={-1}
        />
      )}
      <span className="pt-0.5 leading-snug">{children}</span>
    </label>
  );
}

/** Kotak ikon berwarna (quick menu). */
export function IconTile({
  children,
  className = "",
  size = 44,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cx(
        "flex items-center justify-center rounded-2xl bg-brand-50 text-brand-700",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Tombol kembali bulat                                                */
/* ------------------------------------------------------------------ */
export function BackButton({
  onClick,
  tone = "dark",
}: {
  onClick: () => void;
  tone?: "dark" | "light";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Kembali"
      className={cx(
        "flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95",
        tone === "light"
          ? "bg-white/15 text-white hover:bg-white/25"
          : "bg-white text-brand-900 ring-1 ring-neutral-200 hover:bg-neutral-50",
      )}
    >
      <ChevronLeft size={22} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Tombol utama                                                        */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "ghost" | "gold" | "destructive";
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50";
  const styles = {
    primary: "bg-brand-700 text-white shadow-lg shadow-brand-700/25 hover:bg-brand-800",
    gold: "bg-gold-500 text-brand-950 shadow-lg shadow-gold-500/30 hover:bg-gold-400",
    outline: "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50",
    ghost: "bg-brand-50 text-brand-700 hover:bg-brand-100",
    destructive: "bg-white text-rose-600 ring-1 ring-rose-100 shadow-sm shadow-brand-900/5 hover:bg-rose-50",
  }[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(base, styles, className)}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Input field                                                         */
/* ------------------------------------------------------------------ */
type FieldProps = {
  label: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const inputBase =
  "w-full rounded-2xl border border-neutral-200 bg-white py-3.5 text-sm text-brand-900 outline-none transition placeholder:text-neutral-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15";

export function Field({ label, icon, ...rest }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        )}
        <input className={cx(inputBase, icon ? "pl-11 pr-4" : "px-4")} {...rest} />
      </div>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Input password                                                      */
/* ------------------------------------------------------------------ */
type PasswordFieldProps = {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  placeholder?: string;
  icon?: ReactNode;
};

export function PasswordField({
  label,
  value,
  onValueChange,
  placeholder = "••••••••",
  icon,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </span>
        )}
        <input
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className={cx(inputBase, icon ? "pl-11 pr-11" : "px-4 pr-11")}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Sembunyikan password" : "Lihat password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </label>
  );
}
