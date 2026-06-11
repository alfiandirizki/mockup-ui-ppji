"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, User, Building2, Mail, Phone, Lock } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { BackButton, Button, Checkbox, Field, PasswordField, Card, cx } from "../components/ui";

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

  /* ---------------------- Berhasil ---------------------- */
  if (done) {
    return (
      <PhoneFrame statusTone="light">
        <div className="flex min-h-full flex-col bg-canvas">
          <div className="relative overflow-hidden bg-hero px-7 pb-16 pt-16 text-center text-white">
            <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="relative mx-auto flex h-20 w-20 animate-[popIn_0.5s_ease-out] items-center justify-center rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/40 ring-8 ring-white/10">
              <Check size={42} strokeWidth={3} />
            </div>
            <h1 className="relative mt-5 text-xl font-bold tracking-tight">
              Pendaftaran Berhasil
            </h1>
            <p className="relative mx-auto mt-1.5 max-w-64 text-sm leading-relaxed text-white/70">
              Akun anggota Anda telah dibuat. Silakan masuk untuk mulai
              menggunakan aplikasi.
            </p>
          </div>

          <div className="-mt-8 px-5">
            <Card className="p-5">
              <SummaryRow label="Nama" value={name || "-"} />
              <SummaryRow label="Email" value={email || "-"} />
              <SummaryRow label="No. KTA" value={kta || "-"} mono />
            </Card>
          </div>

          <div className="mt-auto px-7 pb-8 pt-8">
            <Button onClick={() => router.replace("/login")}>
              Masuk Sekarang
            </Button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  /* ---------------------- Form ---------------------- */
  return (
    <PhoneFrame statusTone="light">
      <div className="flex min-h-full flex-col bg-canvas">
        <div className="relative overflow-hidden rounded-b-3xl bg-hero px-7 pb-9 pt-14 text-white">
          <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />
          <BackButton tone="light" onClick={() => router.push("/welcome")} />
          <span className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            <PpjiLogo width={46} hideTagline />
          </span>
          <h1 className="relative mt-4 text-2xl font-extrabold tracking-tight">
            Daftar Anggota
          </h1>
          <p className="relative mt-1 text-sm text-white/70">
            Lengkapi data untuk Kartu Tanda Anggota
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-7 pb-8 pt-7"
        >
          <Field
            label="No. Kartu Tanda Anggota"
            inputMode="numeric"
            required
            icon={<CreditCard size={18} />}
            value={kta}
            onChange={(e) => setKta(e.target.value)}
            placeholder="Contoh: PPJI-0001234"
          />
          <Field
            label="Nama Lengkap"
            required
            icon={<User size={18} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama sesuai KTP"
          />
          <Field
            label="Nama Usaha / Jasaboga"
            required
            icon={<Building2 size={18} />}
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Contoh: Katering Berkah"
          />
          <Field
            label="Email"
            type="email"
            required
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
          />
          <Field
            label="No. Telepon"
            type="tel"
            required
            icon={<Phone size={18} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
          />
          <PasswordField
            label="Password"
            icon={<Lock size={18} />}
            value={password}
            onValueChange={setPassword}
            placeholder="Minimal 8 karakter"
          />

          <Checkbox checked={agree} onChange={setAgree} required>
            Saya menyetujui{" "}
            <span className="font-semibold text-brand-700">
              syarat &amp; ketentuan
            </span>{" "}
            keanggotaan PPJI
          </Checkbox>

          <Button type="submit" className="mt-2">
            Daftar
          </Button>

          <p className="mt-auto pt-4 text-center text-sm text-neutral-500">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-bold text-brand-700 hover:underline"
            >
              Masuk
            </button>
          </p>
        </form>
      </div>
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
        className={cx(
          "max-w-[60%] truncate text-right text-sm font-semibold text-brand-900",
          mono && "font-mono tnum",
        )}
      >
        {value}
      </span>
    </div>
  );
}
