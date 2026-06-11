/**
 * Sumber gambar terpusat untuk mockup PPJI.
 * Semua URL sudah divalidasi (HTTP 200). next.config mematikan optimizer
 * (`images.unoptimized`) agar foto remote selalu termuat saat dev & build.
 */

/** Bentuk URL foto Unsplash dari ID (tanpa prefix "photo-"). */
export const unsplash = (id: string, w = 640): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Hash deterministik kecil (tanpa Math.random → aman hydration). */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Foto wajah asli (pravatar img=1..70), dipilih deterministik dari seed. */
export function faceAvatar(seed: string, size = 160): string {
  const idx = (hash(seed) % 70) + 1;
  return `https://i.pravatar.cc/${size}?img=${idx}`;
}

/** Avatar inisial bergradien (DiceBear) untuk akun organisasi/perusahaan. */
export function logoAvatar(seed: string): string {
  return (
    "https://api.dicebear.com/9.x/initials/svg?seed=" +
    encodeURIComponent(seed) +
    "&backgroundType=gradientLinear&fontWeight=600&fontSize=42"
  );
}

/* Pool foto per kategori — ID Unsplash tervalidasi. */
export const PHOTOS = {
  food: [
    "1504674900247-0877df9cc836",
    "1414235077428-338989a2e8c0",
    "1467003909585-2f8a72700288",
    "1540189549336-e6e99c3679fe",
    "1546069901-ba9599a7e63c",
    "1565299624946-b28f40a0ae38",
    "1551782450-a2132b4ba21d",
    "1565958011703-44f9829ba187",
    "1466637574441-749b8f19452f",
    "1551218808-94e220e084d2",
    "1606787366850-de6330128bfc",
    "1505373877841-8d25f7d46678",
    "1555939594-58d7cb561ad1",
  ],
  catering: [
    "1517248135467-4c7edcad34c4",
    "1528605248644-14dd04022da1",
    "1530103862676-de8c9debad1d",
  ],
  event: [
    "1511795409834-ef04bbd61622",
    "1540575467063-178a50c2df87",
    "1556761175-5973dc0f32e7",
    "1559925393-8be0ec4767c8",
    "1559339352-11d035aa65de",
  ],
  chef: [
    "1577219491135-ce391730fb2c",
    "1556910103-1c02745aae4d",
    "1543353071-873f17a7a088",
    "1555244162-803834f70033",
    "1577303935007-0d306ee638cf",
  ],
} as const;

/** Pilih foto kategori secara deterministik dari seed. */
export function photo(
  category: keyof typeof PHOTOS,
  seed: string,
  w = 640,
): string {
  const pool = PHOTOS[category];
  return unsplash(pool[hash(seed) % pool.length], w);
}
