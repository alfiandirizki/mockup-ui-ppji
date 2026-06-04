"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { Screen, BackButton, Button, Field, PasswordField } from "../components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [kta, setKta] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  /* ---------------------- Layar Berhasil ---------------------- */
  if (done) {
    return (
      <PhoneFrame>
        <div className="flex min-h-full flex-col bg-linear-to-b from-[#eaf3fb] via-white to-white px-7 pb-10 pt-14 dark:from-[#0d1b2c] dark:via-neutral-950 dark:to-neutral-950">
          {/* Ceklis + animasi */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 animate-[popIn_0.5s_ease-out] items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
              <CheckBig />
            </div>
            <h1 className="mt-5 animate-[fadeUp_0.5s_ease-out_0.15s_both] text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Pendaftaran Berhasil
            </h1>
            <p className="mt-1.5 animate-[fadeUp_0.5s_ease-out_0.2s_both] max-w-64 text-sm leading-relaxed text-neutral-500">
              Akun anggota Anda telah berhasil dibuat. Silakan masuk untuk
              mulai menggunakan aplikasi.
            </p>
          </div>

          {/* Ringkasan data */}
          <div className="mt-8 animate-[fadeUp_0.5s_ease-out_0.3s_both] rounded-2xl bg-white p-5 shadow-sm shadow-neutral-200/50 ring-1 ring-neutral-100 dark:bg-neutral-900 dark:shadow-none dark:ring-neutral-800">
            <SummaryRow label="Nama" value={name || "-"} />
            <SummaryRow label="Email" value={email || "-"} />
            <SummaryRow label="No. KTA" value={kta || "-"} mono />
          </div>

          {/* Tombol */}
          <div className="mt-auto pt-8">
            <Button onClick={() => router.replace("/login")}>
              Masuk Sekarang
            </Button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  /* ---------------------- Layar Form ---------------------- */
  return (
    <PhoneFrame>
      <Screen>
        <div className="flex min-h-full flex-col pb-10 pt-6">
          <BackButton onClick={() => router.push("/welcome")} />

          {/* Logo + judul */}
          <div className="mb-7 mt-2 flex flex-col items-center">
            <PpjiLogo width={130} hideTagline />
            <h1 className="mt-5 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Daftar Anggota
            </h1>
            <p className="mt-1 max-w-64 text-center text-sm text-neutral-500">
              Lengkapi data untuk mendapatkan Kartu Tanda Anggota
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field
              label="No. Kartu Tanda Anggota"
              type="text"
              inputMode="numeric"
              required
              value={kta}
              onChange={(e) => setKta(e.target.value)}
              placeholder="Contoh: PPJI-0001234"
            />
            <Field
              label="Nama Lengkap"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama sesuai KTP"
            />
            <Field
              label="Nama Usaha / Jasaboga"
              type="text"
              required
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="Contoh: Katering Berkah"
            />
            <Field
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />
            <Field
              label="No. Telepon"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
            <PasswordField
              label="Password"
              value={password}
              onValueChange={setPassword}
              placeholder="Minimal 8 karakter"
            />

            {/* Persetujuan */}
            <label className="flex cursor-pointer items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-[#1c5fa8]"
              />
              <span>
                Saya menyetujui{" "}
                <span className="font-medium text-[#1c5fa8]">
                  syarat &amp; ketentuan
                </span>{" "}
                keanggotaan PPJI
              </span>
            </label>

            <Button type="submit" className="mt-2">
              Daftar
            </Button>
          </form>

          {/* Sudah punya akun */}
          <p className="mt-auto pt-8 text-center text-sm text-neutral-500">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-[#1c5fa8] hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </Screen>
    </PhoneFrame>
  );
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-sm text-neutral-500">{label}</span>
      <span
        className={`max-w-[60%] truncate text-right text-sm font-semibold text-neutral-800 dark:text-neutral-200 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CheckBig() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 10 17l9-10"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
