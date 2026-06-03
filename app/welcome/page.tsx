"use client";

import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { Screen, Button } from "../components/ui";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <PhoneFrame>
      <Screen>
        <div className="flex min-h-full flex-col pb-12 pt-16">
          {/* Logo + sambutan */}
          <div className="flex flex-col items-center">
            <PpjiLogo width={210} />
            <h1 className="mt-9 text-center text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Selamat Datang
            </h1>
            <p className="mt-2 max-w-60 text-center text-sm leading-relaxed text-neutral-500">
              Masuk untuk melanjutkan, atau buat akun baru
            </p>
          </div>

          {/* Dua pilihan */}
          <div className="mt-auto flex flex-col gap-3 pt-12">
            <Button onClick={() => router.push("/login")}>
              Sudah punya akun — Masuk
            </Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Buat akun baru — Daftar
            </Button>
            <p className="mt-1 text-center text-xs text-neutral-400">
              Daftar untuk mendapatkan akun anggota
            </p>
          </div>
        </div>
      </Screen>
    </PhoneFrame>
  );
}
