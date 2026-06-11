type PpjiLogoProps = {
  /** Lebar logo dalam px. Tinggi mengikuti rasio. Default 220. */
  width?: number;
  /** Sembunyikan teks "Perkumpulan Penyelenggara Jasaboga Indonesia". */
  hideTagline?: boolean;
  className?: string;
};

/**
 * Logo PPJI (Perkumpulan Penyelenggara Jasaboga Indonesia) sebagai SVG.
 * Recreate dari logo asli: oval biru bertingkat dengan teks "PPJI" putih,
 * sapuan gelombang di bawah, dan tagline dua baris.
 */
export default function PpjiLogo({
  width = 220,
  hideTagline = false,
  className,
}: PpjiLogoProps) {
  // viewBox: oval bagian atas, tagline di bawah (jika ada)
  const viewH = hideTagline ? 200 : 300;

  return (
    <svg
      width={width}
      height={(width / 320) * viewH}
      viewBox={`0 0 320 ${viewH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo PPJI - Perkumpulan Penyelenggara Jasaboga Indonesia"
    >
      <defs>
        <linearGradient id="ppji-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a72c0" />
          <stop offset="1" stopColor="#1b4f9b" />
        </linearGradient>
        <linearGradient id="ppji-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14457f" />
          <stop offset="1" stopColor="#0b1f3a" />
        </linearGradient>
      </defs>

      {/* Cincin oval luar (biru muda) */}
      <ellipse cx="160" cy="100" rx="150" ry="92" fill="url(#ppji-rim)" />
      {/* Wajah oval dalam (biru tua) */}
      <ellipse cx="160" cy="96" rx="132" ry="76" fill="url(#ppji-face)" />

      {/* Sapuan gelombang */}
      <path
        d="M70 150 C 110 172, 210 172, 252 138 C 214 158, 112 158, 70 150 Z"
        fill="#e0a53b"
        opacity="0.9"
      />

      {/* Teks PPJI */}
      <text
        x="160"
        y="120"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="76"
        letterSpacing="-2"
        fill="#ffffff"
      >
        PPJI
      </text>

      {/* Tagline */}
      {!hideTagline && (
        <g
          fill="#0b1f3a"
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
        >
          <text x="160" y="238" fontSize="22" fontWeight="400">
            Perkumpulan Penyelenggara
          </text>
          <text x="160" y="270" fontSize="26" fontWeight="700">
            Jasaboga Indonesia
          </text>
        </g>
      )}
    </svg>
  );
}
