"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneFrame from "./components/PhoneFrame";
import PpjiLogo from "./components/PpjiLogo";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/welcome"), 2500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col items-center justify-center gap-12 overflow-hidden bg-linear-to-b from-[#eaf3fb] via-white to-white px-8 dark:from-[#0d1b2c] dark:via-neutral-950 dark:to-neutral-950">
        {/* Aksen lingkaran blur lembut di latar */}
        <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#1c5fa8]/10 blur-3xl" />

        <PpjiLogo
          width={230}
          className="relative animate-[fadeUp_0.7s_ease-out]"
        />

        {/* Spinner loading */}
        <div className="relative flex animate-[fadeUp_0.7s_ease-out_0.2s_both] flex-col items-center gap-3">
          <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#1c5fa8]/20 border-t-[#1c5fa8]" />
          <span className="text-xs font-medium tracking-wide text-neutral-400">
            Memuat…
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
