"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { BackButton, Button, Checkbox, Field, PasswordField } from "../components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [kta, setKta] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <PhoneFrame statusTone="light">
      <div className="flex min-h-full flex-col bg-canvas">
        {/* Hero navy */}
        <div className="relative overflow-hidden rounded-b-3xl bg-hero px-7 pb-9 pt-14 text-white">
          <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />
          <BackButton tone="light" onClick={() => router.push("/welcome")} />
          <span className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            <PpjiLogo width={46} hideTagline />
          </span>
          <h1 className="relative mt-4 text-2xl font-extrabold tracking-tight">
            Masuk Anggota
          </h1>
          <p className="relative mt-1 text-sm text-white/70">
            Gunakan Kartu Tanda Anggota Anda
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-7 pb-8 pt-7"
        >
          <Field
            label="No. Kartu Tanda Anggota"
            type="text"
            inputMode="numeric"
            required
            icon={<CreditCard size={18} />}
            value={kta}
            onChange={(e) => setKta(e.target.value)}
            placeholder="Contoh: PPJI-0001234"
          />
          <PasswordField
            label="Password"
            icon={<Lock size={18} />}
            value={password}
            onValueChange={setPassword}
          />

          <div className="flex items-center justify-between">
            <Checkbox checked={remember} onChange={setRemember}>
              Ingat saya
            </Checkbox>
            <button
              type="button"
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              Lupa password?
            </button>
          </div>

          <Button type="submit" className="mt-2">
            Masuk
          </Button>

          <p className="mt-auto pt-6 text-center text-sm text-neutral-500">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-bold text-brand-700 hover:underline"
            >
              Daftar
            </button>
          </p>
        </form>
      </div>
    </PhoneFrame>
  );
}
