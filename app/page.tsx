"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "./components/PhoneFrame";
import PpjiLogo from "./components/PpjiLogo";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/welcome"), 2400);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <PhoneFrame statusTone="light">
      <div className="relative flex h-full flex-col items-center justify-center gap-10 overflow-hidden bg-hero px-8 text-white">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl" />

        <div className="relative flex animate-[fadeUp_0.7s_ease-out] flex-col items-center gap-5">
          <span className="flex h-28 w-28 items-center justify-center rounded-4xl bg-white shadow-2xl shadow-black/30">
            <PpjiLogo width={92} hideTagline />
          </span>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight">PPJI Mobile</h1>
            <p className="mt-1 text-sm text-white/65">
              Perkumpulan Penyelenggara Jasaboga Indonesia
            </p>
          </div>
        </div>

        <div className="relative flex animate-[fadeUp_0.7s_ease-out_0.2s_both] flex-col items-center gap-3">
          <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-white/20 border-t-gold-500" />
          <span className="text-xs font-medium tracking-wide text-white/55">
            Memuat…
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
