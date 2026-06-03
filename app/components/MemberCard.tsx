import PpjiLogo from "./PpjiLogo";
import { formatDate, remainingText, type Member } from "../lib/dummy";

type MemberCardProps = {
  member: Member;
  /** Waktu acuan untuk hitung sisa berlaku (mockup pakai tanggal tetap). */
  now: Date;
};

/**
 * Kartu Tanda Anggota PPJI bergaya kartu ATM/membership.
 * Gradient biru brand, nomor KTA bergaya nomor kartu, logo + QR dummy,
 * dan badge status aktif beserta sisa masa berlaku.
 */
export default function MemberCard({ member, now }: MemberCardProps) {
  return (
    <div className="relative aspect-[1.586] w-full overflow-hidden rounded-3xl bg-linear-to-br from-[#1c5fa8] via-[#1a539a] to-[#0f3a72] p-5 text-white shadow-xl shadow-[#1c5fa8]/30">
      {/* Pola dekoratif */}
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/5" />

      {/* Header: logo + badge status */}
      <div className="relative flex items-start justify-between">
        <div className="rounded-lg bg-white/95 px-2 py-1">
          <PpjiLogo width={56} hideTagline />
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-300/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Aktif
        </span>
      </div>

      {/* Nomor KTA */}
      <div className="relative mt-4">
        <p className="text-[10px] uppercase tracking-widest text-white/60">
          No. Kartu Tanda Anggota
        </p>
        <p className="mt-1 font-mono text-base font-semibold tracking-[0.15em] tabular-nums">
          {member.ktaNumber}
        </p>
      </div>

      {/* Footer: identitas + QR */}
      <div className="relative mt-auto flex items-end justify-between pt-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{member.name}</p>
          <p className="truncate text-xs text-white/70">{member.business}</p>
          <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
            Berlaku s/d{" "}
            <span className="font-semibold text-white/80">
              {formatDate(member.validUntil)}
            </span>
          </p>
          <p className="text-[10px] font-medium text-emerald-300">
            {remainingText(member.validUntil, now)}
          </p>
        </div>

        {/* QR dummy */}
        <QrDummy />
      </div>
    </div>
  );
}

/** QR code dummy (pola kotak-kotak dekoratif, bukan QR sungguhan). */
function QrDummy() {
  // pola 5x5 sederhana
  const cells = [
    1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1,
  ];
  return (
    <div className="grid h-12 w-12 grid-cols-5 gap-0.5 rounded-md bg-white p-1">
      {cells.map((on, i) => (
        <span
          key={i}
          className={on ? "rounded-[1px] bg-[#0f3a72]" : "rounded-[1px] bg-transparent"}
        />
      ))}
    </div>
  );
}
