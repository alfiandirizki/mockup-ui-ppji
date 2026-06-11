"use client";

import { useRouter } from "next/navigation";
import { IdCard, Wallet, GraduationCap, ShieldCheck } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import PpjiLogo from "../components/PpjiLogo";
import { Button, Photo, Avatar } from "../components/ui";
import { unsplash, faceAvatar } from "../lib/images";

const HIGHLIGHTS = [
  { icon: IdCard, label: "KTA Digital" },
  { icon: Wallet, label: "PPJI Pay" },
  { icon: GraduationCap, label: "Sertifikasi" },
];

const PROOF = ["Andi", "Sari", "Budi", "Rina"];

export default function WelcomePage() {
  const router = useRouter();

  return (
    <PhoneFrame statusTone="light">
      <div className="flex h-full flex-col bg-canvas">
        {/* ── Hero foto ── */}
        <div className="relative h-[44%] shrink-0 overflow-hidden">
          <Photo
            src={unsplash("1414235077428-338989a2e8c0", 900)}
            alt="Sajian katering"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-brand-900/55 via-brand-900/35 to-brand-900/80" />

          {/* Badge resmi */}
          <span className="absolute left-6 top-14 flex items-center gap-1.5 rounded-full bg-gold-500/20 px-3 py-1.5 text-[11px] font-bold text-gold-200 ring-1 ring-gold-400/40 backdrop-blur">
            <ShieldCheck size={13} />
            Aplikasi Resmi PPJI
          </span>

          {/* Judul */}
          <div className="absolute inset-x-0 bottom-0 px-7 pb-6 text-white">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <PpjiLogo width={46} hideTagline />
            </span>
            <h1 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-tight">
              Satu aplikasi untuk
              <br />
              anggota PPJI
            </h1>
          </div>
        </div>

        {/* ── Panel putih ── */}
        <div className="flex flex-1 flex-col px-7 pt-6">
          <p className="text-sm leading-relaxed text-neutral-500">
            Kartu anggota digital, PPJI Pay, sertifikasi, event &amp; direktori
            jasaboga dalam satu genggaman.
          </p>

          {/* Highlight fitur */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.label}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon size={22} strokeWidth={1.9} />
                  </span>
                  <span className="text-center text-[11px] font-semibold text-neutral-700">
                    {h.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {PROOF.map((seed) => (
                <Avatar key={seed} src={faceAvatar(seed, 60)} alt={seed} size={26} ring />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              Dipercaya <span className="font-bold text-brand-800">5.000+</span>{" "}
              anggota jasaboga
            </p>
          </div>

          {/* Aksi (menempel ke bawah) */}
          <div className="mt-auto flex flex-col gap-3 pb-7 pt-7">
            <Button onClick={() => router.push("/login")}>Masuk</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Buat Akun Baru
            </Button>
            <p className="text-center text-xs text-neutral-400">
              Dengan masuk, Anda menyetujui{" "}
              <a href="#" className="font-semibold text-brand-600 underline">
                Syarat &amp; Ketentuan PPJI
              </a>
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
