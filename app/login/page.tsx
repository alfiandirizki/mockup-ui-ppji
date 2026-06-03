"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { Screen, BackButton, Button, Field, PasswordField } from "../components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [kta, setKta] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Mockup: belum ada auth. Langsung ke dashboard.
    router.push("/dashboard");
  }

  return (
    <PhoneFrame>
      <Screen>
        <div className="flex min-h-full flex-col pb-10 pt-6">
          <BackButton onClick={() => router.push("/welcome")} />

          {/* Logo + judul */}
          <div className="mb-9 mt-3 flex flex-col items-center">
            <PpjiLogo width={150} hideTagline />
            <h1 className="mt-6 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Masuk Anggota
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Gunakan Kartu Tanda Anggota Anda
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

            <PasswordField
              label="Password"
              value={password}
              onValueChange={setPassword}
            />

            {/* Remember me + Lupa password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 accent-[#1c5fa8]"
                />
                Ingat saya
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#1c5fa8] hover:underline"
              >
                Lupa password?
              </button>
            </div>

            <Button type="submit" className="mt-2">
              Masuk
            </Button>
          </form>

          {/* Daftar */}
          <p className="mt-auto pt-8 text-center text-sm text-neutral-500">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-semibold text-[#1c5fa8] hover:underline"
            >
              Daftar
            </button>
          </p>
        </div>
      </Screen>
    </PhoneFrame>
  );
}
