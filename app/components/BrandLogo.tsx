import { Landmark } from "lucide-react";

/**
 * Logo brand "mirip asli" untuk daftar biller/pembayaran (gaya OVO/Livin).
 * Bukan logo resmi — tile warna brand + wordmark singkat agar mockup terlihat
 * nyata tanpa aset eksternal.
 */
type Brand = {
  label?: string;
  bg: string;
  fg?: string;
  /** Override ukuran font (px). */
  fontSize?: number;
  /** Render khusus (mis. QRIS dua warna). */
  custom?: "qris" | "bank";
};

const REGISTRY: Record<string, Brand> = {
  bca: { label: "BCA", bg: "#0066AE", fontSize: 13 },
  mandiri: { label: "mandiri", bg: "#003D79", fontSize: 8.5 },
  bri: { label: "BRI", bg: "#00529C", fontSize: 13 },
  bni: { label: "BNI", bg: "#ED8B00", fontSize: 13 },
  bsi: { label: "BSI", bg: "#00A39D", fontSize: 13 },
  qris: { custom: "qris", bg: "#ffffff" },
  gopay: { label: "gopay", bg: "#00AAD2", fontSize: 9.5 },
  ovo: { label: "OVO", bg: "#4C2A86", fontSize: 12 },
  dana: { label: "DANA", bg: "#118EEA", fontSize: 10.5 },
  shopeepay: { label: "Shopee", bg: "#EE4D2D", fontSize: 9 },
  linkaja: { label: "LinkAja", bg: "#E62129", fontSize: 8.5 },
  alfamart: { label: "Alfa", bg: "#E1141E", fontSize: 11 },
  indomaret: { label: "Indo", bg: "#0066B3", fontSize: 11 },
  pln: { label: "PLN", bg: "#FCD116", fg: "#0b1f3a", fontSize: 12 },
  telkomsel: { label: "Tsel", bg: "#EC1B24", fontSize: 11 },
  indosat: { label: "IM3", bg: "#FFC600", fg: "#0b1f3a", fontSize: 11 },
  bank: { custom: "bank", bg: "#103a73" },
};

export default function BrandLogo({
  brand,
  size = 40,
  className = "",
}: {
  brand: string;
  size?: number;
  className?: string;
}) {
  const b = REGISTRY[brand] ?? REGISTRY.bank;
  const radius = Math.round(size * 0.28);

  if (b.custom === "bank") {
    return (
      <span
        className={`flex items-center justify-center text-white ${className}`}
        style={{ width: size, height: size, background: b.bg, borderRadius: radius }}
      >
        <Landmark size={size * 0.5} strokeWidth={2} />
      </span>
    );
  }

  if (b.custom === "qris") {
    return (
      <span
        className={`flex flex-col items-center justify-center ring-1 ring-neutral-200 ${className}`}
        style={{ width: size, height: size, background: "#fff", borderRadius: radius }}
      >
        <span
          className="font-extrabold leading-none"
          style={{ fontSize: size * 0.3, color: "#E2231A" }}
        >
          QR
        </span>
        <span
          className="font-extrabold leading-none"
          style={{ fontSize: size * 0.3, color: "#003D79" }}
        >
          IS
        </span>
      </span>
    );
  }

  return (
    <span
      className={`flex items-center justify-center font-extrabold tracking-tight ${className}`}
      style={{
        width: size,
        height: size,
        background: b.bg,
        color: b.fg ?? "#fff",
        borderRadius: radius,
        fontSize: b.fontSize ?? 12,
      }}
    >
      {b.label}
    </span>
  );
}
