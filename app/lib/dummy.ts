/**
 * Data dummy untuk mockup dashboard PPJI.
 * Ganti nilai-nilai di sini saat menyambungkan ke data asli.
 */

import { unsplash, faceAvatar } from "./images";

export type Member = {
  name: string;
  business: string;
  ktaNumber: string; // ditampilkan bergaya nomor kartu ATM
  issuedAt: string; // ISO date — tanggal terbit
  validUntil: string; // ISO date — masa berlaku (terbit + 4 tahun)
  /** Foto profil (wajah asli, dummy). */
  avatar: string;
  /** Tier keanggotaan. */
  tier: string;
};

export const member: Member = {
  name: "Budi Santoso",
  business: "Katering Berkah Rasa",
  ktaNumber: "1234 5678 9012 3456",
  issuedAt: "2024-06-03",
  validUntil: "2028-06-03", // berlaku 4 tahun
  avatar: faceAvatar("Budi Santoso", 160),
  tier: "Anggota Utama",
};

/** Pintasan menu (placeholder — silakan sesuaikan). */
export type Shortcut = {
  label: string;
  icon: "news" | "topup" | "doc" | "calendar";
  /** Tujuan navigasi; null = belum ada halaman. */
  href: string | null;
};

export const shortcuts: Shortcut[] = [
  { label: "Berita", icon: "news", href: "/news" },
  { label: "Sertifikat", icon: "doc", href: "/sertifikasi" },
  { label: "Event", icon: "calendar", href: "/event" },
  { label: "PPOB", icon: "topup", href: "/ppob" },
];

/** Banner promo/info di Beranda. */
export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  /** Tema warna overlay kartu. */
  tone: "brand" | "gold" | "dark";
};

export const banners: Banner[] = [
  {
    id: "promo-rakernas",
    title: "Rakernas PPJI 2024",
    subtitle: "Daftar sekarang & dapatkan benefit anggota",
    cta: "Daftar",
    image: unsplash("1540575467063-178a50c2df87", 800),
    tone: "brand",
  },
  {
    id: "promo-cashback",
    title: "Cashback 20% PPJI Pay",
    subtitle: "Bayar iuran & PPOB pakai PPJI Pay",
    cta: "Klaim",
    image: unsplash("1606787366850-de6330128bfc", 800),
    tone: "gold",
  },
  {
    id: "promo-sertifikasi",
    title: "Sertifikasi Halal Gratis",
    subtitle: "Untuk 100 anggota pertama bulan ini",
    cta: "Ikuti",
    image: unsplash("1577219491135-ce391730fb2c", 800),
    tone: "dark",
  },
];

/** Banner tunggal (kompatibilitas). */
export const banner: Banner = banners[0];

/** Layanan PPOB / Top Up (placeholder). */
export type PpobIcon =
  | "pulsa"
  | "pln"
  | "wallet"
  | "pdam"
  | "bpjs"
  | "internet"
  | "game"
  | "plnpasca"
  | "streaming"
  | "pajak"
  | "asuransi"
  | "donasi";

export type PpobItem = {
  /** Slug untuk rute /ppob/[id]. */
  id: string;
  label: string;
  icon: PpobIcon;
  color: string;
  bg: string;
  /** Label & placeholder field "nomor tujuan" sesuai jenis layanan. */
  targetLabel: string;
  targetPlaceholder: string;
};

export const ppobItems: PpobItem[] = [
  { id: "pulsa", label: "Pulsa & Data", icon: "pulsa", color: "text-sky-600", bg: "bg-sky-100", targetLabel: "Nomor HP", targetPlaceholder: "08xxxxxxxxxx" },
  { id: "token-listrik", label: "Token Listrik", icon: "pln", color: "text-amber-500", bg: "bg-amber-100", targetLabel: "Nomor Meter / ID Pelanggan", targetPlaceholder: "1234 5678 9012" },
  { id: "e-wallet", label: "Top Up e-Wallet", icon: "wallet", color: "text-emerald-500", bg: "bg-emerald-100", targetLabel: "Nomor HP", targetPlaceholder: "08xxxxxxxxxx" },
  { id: "pdam", label: "PDAM", icon: "pdam", color: "text-blue-500", bg: "bg-blue-100", targetLabel: "Nomor Pelanggan", targetPlaceholder: "Nomor pelanggan PDAM" },
  { id: "bpjs", label: "BPJS", icon: "bpjs", color: "text-teal-600", bg: "bg-teal-100", targetLabel: "Nomor VA BPJS", targetPlaceholder: "Nomor virtual account" },
  { id: "internet-tv", label: "Internet & TV", icon: "internet", color: "text-violet-500", bg: "bg-violet-100", targetLabel: "Nomor Pelanggan", targetPlaceholder: "ID pelanggan" },
  { id: "voucher-game", label: "Voucher Game", icon: "game", color: "text-rose-500", bg: "bg-rose-100", targetLabel: "User ID", targetPlaceholder: "User ID / Zone ID" },
  { id: "pln-pascabayar", label: "PLN Pascabayar", icon: "plnpasca", color: "text-amber-600", bg: "bg-amber-100", targetLabel: "ID Pelanggan", targetPlaceholder: "Nomor ID pelanggan PLN" },
  { id: "streaming", label: "Streaming", icon: "streaming", color: "text-fuchsia-500", bg: "bg-fuchsia-100", targetLabel: "Email / Akun", targetPlaceholder: "Email akun streaming" },
  { id: "pajak", label: "Pajak PBB", icon: "pajak", color: "text-cyan-600", bg: "bg-cyan-100", targetLabel: "Nomor Objek Pajak", targetPlaceholder: "NOP" },
  { id: "asuransi", label: "Asuransi", icon: "asuransi", color: "text-teal-600", bg: "bg-teal-100", targetLabel: "Nomor Polis", targetPlaceholder: "Nomor polis" },
  { id: "donasi", label: "Donasi", icon: "donasi", color: "text-rose-500", bg: "bg-rose-100", targetLabel: "Nama Donatur", targetPlaceholder: "Nama (opsional)" },
];

/** Pilihan nominal top up / pembelian (Rupiah). */
export const ppobNominals: number[] = [
  10000, 25000, 50000, 100000, 150000, 200000,
];

/** Daftar game untuk Top Up Game. */
export type GameItem = {
  id: string;
  name: string;
  publisher: string;
  /** Warna avatar inisial. */
  color: string;
};

export const games: GameItem[] = [
  { id: "ml", name: "Mobile Legends", publisher: "Moonton", color: "bg-sky-500" },
  { id: "ff", name: "Free Fire", publisher: "Garena", color: "bg-orange-500" },
  { id: "pubg", name: "PUBG Mobile", publisher: "Tencent", color: "bg-amber-500" },
  { id: "genshin", name: "Genshin Impact", publisher: "HoYoverse", color: "bg-indigo-500" },
  { id: "valorant", name: "Valorant", publisher: "Riot Games", color: "bg-rose-500" },
  { id: "codm", name: "COD Mobile", publisher: "Activision", color: "bg-neutral-700" },
  { id: "hok", name: "Honor of Kings", publisher: "TiMi", color: "bg-violet-500" },
  { id: "roblox", name: "Roblox", publisher: "Roblox Corp", color: "bg-red-500" },
];

/** Pilihan nominal diamond/voucher game. */
export type GameDenom = { label: string; price: number };
export const gameDenoms: GameDenom[] = [
  { label: "86 Diamonds", price: 20000 },
  { label: "172 Diamonds", price: 40000 },
  { label: "257 Diamonds", price: 60000 },
  { label: "344 Diamonds", price: 80000 },
  { label: "514 Diamonds", price: 120000 },
  { label: "706 Diamonds", price: 160000 },
];

export function findGame(id: string): GameItem | undefined {
  return games.find((g) => g.id === id);
}

/** Cari layanan PPOB berdasarkan id. */
export function findPpob(id: string): PpobItem | undefined {
  return ppobItems.find((p) => p.id === id);
}

/** Merchant dummy untuk simulasi Scan QR. */
export const scanMerchant = {
  name: "Katering Berkah Rasa",
  location: "Jakarta Selatan",
  id: "MID-0089231",
};

/** Metadata struk (ID transaksi + waktu). Panggil di handler, bukan saat render. */
export function makeReceiptMeta(): { txnId: string; time: string } {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    txnId: "INV" + String(d.getTime()).slice(-10),
    time: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}.${pad(d.getMinutes())}`,
  };
}

/* ------------------------------------------------------------------ */
/* Direktori anggota (placeholder)                                     */
/* ------------------------------------------------------------------ */
export type DirectoryEntry = {
  id: string;
  company: string;
  city: string;
  /** Warna avatar inisial (kelas bg Tailwind). null = tanpa warna/abu. */
  color: string | null;
};

export const directory: DirectoryEntry[] = [
  { id: "bs", company: "PT Boga Sejahtera", city: "Jakarta", color: "bg-[#1c5fa8]" },
  { id: "rn", company: "CV Rasa Nusantara", city: "Bandung", color: null },
  { id: "sp", company: "PT Sajian Prima", city: "Surabaya", color: "bg-[#e0982f]" },
  { id: "mb", company: "PT Mitra Boga", city: "Semarang", color: null },
  { id: "ks", company: "CV Kuliner Sentosa", city: "Yogyakarta", color: "bg-emerald-600" },
  { id: "ba", company: "PT Berkah Aneka", city: "Medan", color: "bg-rose-500" },
  { id: "dr", company: "CV Dapur Rahayu", city: "Makassar", color: null },
];

/**
 * Filter chip direktori.
 * BPP = Badan Pengurus Pusat, BPC = Badan Pengurus Cabang,
 * BPD = Badan Pengurus Daerah.
 */
export const directoryFilters = ["Semua", "BPP", "BPC", "BPD"];

/** Ambil inisial dari nama perusahaan, mis. "PT Boga Sejahtera" -> "BS". */
export function initials(company: string): string {
  const skip = new Set(["pt", "cv", "ud", "tbk"]);
  const words = company
    .split(" ")
    .filter((w) => !skip.has(w.toLowerCase()));
  const pick = words.length ? words : company.split(" ");
  return pick
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

/* ------------------------------------------------------------------ */
/* Event (placeholder)                                                 */
/* ------------------------------------------------------------------ */
export type EventItem = {
  id: string;
  title: string;
  subtitle?: string;
  /** Rentang tanggal tampil apa adanya, mis. "20–22 Jun 2024". */
  dateText: string;
  location: string;
  /** "upcoming" tampil di tab Akan Datang, "done" di tab Selesai. */
  status: "upcoming" | "done";
  /** Tandai sebagai event unggulan (kartu biru besar + tombol daftar). */
  featured?: boolean;
  /** Deskripsi untuk halaman detail. */
  description?: string;
  /** Agenda singkat untuk halaman detail. */
  agenda?: string[];
  /** Foto sampul event. */
  image: string;
};

export const events: EventItem[] = [
  {
    id: "rakernas-2024",
    title: "Rakernas PPJI 2024",
    subtitle: "Sinergi & Inovasi Jasaboga",
    dateText: "20–22 Jun 2024",
    location: "Jakarta Convention Center",
    status: "upcoming",
    featured: true,
    description:
      "Rapat Kerja Nasional PPJI 2024 mempertemukan seluruh anggota untuk merumuskan arah strategis industri jasaboga, berbagi praktik terbaik, dan memperkuat jejaring antar pengusaha katering se-Indonesia.",
    agenda: [
      "Pembukaan & sambutan Ketua Umum",
      "Sesi pleno: Arah industri jasaboga 2025",
      "Workshop sertifikasi & keamanan pangan",
      "Networking dinner antar anggota",
    ],
    image: unsplash("1540575467063-178a50c2df87", 800),
  },
  {
    id: "business-forum",
    title: "PPJI Business Forum",
    dateText: "27 Jul 2024",
    location: "Bandung",
    status: "upcoming",
    description:
      "Forum bisnis untuk membahas peluang kemitraan, akses permodalan, dan tren pasar jasaboga bersama narasumber praktisi.",
    agenda: ["Talkshow peluang kemitraan", "Sesi business matching"],
    image: unsplash("1556761175-5973dc0f32e7", 800),
  },
  {
    id: "halal-bihalal-2024",
    title: "Halal Bihalal PPJI",
    dateText: "21 Apr 2024",
    location: "Surabaya",
    status: "done",
    description: "Silaturahmi anggota PPJI pasca Idulfitri 1445 H.",
    image: unsplash("1511795409834-ef04bbd61622", 800),
  },
  {
    id: "pelatihan-keamanan-pangan",
    title: "Pelatihan Keamanan Pangan",
    dateText: "10 Mar 2024",
    location: "Jakarta",
    status: "done",
    description: "Pelatihan bersertifikat tentang standar keamanan pangan.",
    image: unsplash("1559925393-8be0ec4767c8", 800),
  },
];

/* ------------------------------------------------------------------ */
/* Fitur Organisasi (grid di Beranda)                                  */
/* ------------------------------------------------------------------ */
export type OrgFeature = {
  label: string;
  icon:
    | "calendar"
    | "recruit"
    | "org"
    | "diploma"
    | "structure"
    | "forum"
    | "matrix"
    | "activity";
  /** Warna ikon & lingkaran background (kelas Tailwind). */
  color: string;
  bg: string;
};

export const orgFeatures: OrgFeature[] = [
  { label: "e-Kalender", icon: "calendar", color: "text-lime-600", bg: "bg-lime-100" },
  { label: "e-Rekrutmen", icon: "recruit", color: "text-sky-600", bg: "bg-sky-100" },
  { label: "e-Organisasi", icon: "org", color: "text-rose-500", bg: "bg-rose-100" },
  { label: "e-Diklat", icon: "diploma", color: "text-amber-500", bg: "bg-amber-100" },
  { label: "Struktur", icon: "structure", color: "text-violet-500", bg: "bg-violet-100" },
  { label: "Forum Bidang", icon: "forum", color: "text-emerald-500", bg: "bg-emerald-100" },
  { label: "e-Matriks", icon: "matrix", color: "text-cyan-500", bg: "bg-cyan-100" },
  { label: "Aktifitas", icon: "activity", color: "text-orange-500", bg: "bg-orange-100" },
];

/* ------------------------------------------------------------------ */
/* Berita / Pengumuman / Regulasi                                      */
/* ------------------------------------------------------------------ */
export type NewsTab = "berita" | "pengumuman" | "regulasi";

export type NewsItem = {
  id: string;
  tab: NewsTab;
  title: string;
  time: string;
  image: string;
  /** Ringkasan singkat untuk kartu/list. */
  excerpt: string;
};

export const newsTabs: { key: NewsTab; label: string }[] = [
  { key: "berita", label: "Berita" },
  { key: "pengumuman", label: "Pengumuman" },
  { key: "regulasi", label: "Regulasi" },
];

export const news: NewsItem[] = [
  // Berita
  {
    id: "b1",
    tab: "berita",
    title: "PPJI Jalin Kerja Sama dengan Kemendag",
    time: "2 jam lalu",
    image: unsplash("1559339352-11d035aa65de", 800),
    excerpt:
      "Penandatanganan MoU untuk memperkuat akses pasar produk jasaboga anggota.",
  },
  {
    id: "b2",
    tab: "berita",
    title: "Update Regulasi Jasaboga 2024",
    time: "1 hari lalu",
    image: unsplash("1556910103-1c02745aae4d", 800),
    excerpt: "Penyesuaian standar dapur & penyajian sesuai aturan terbaru.",
  },
  {
    id: "b3",
    tab: "berita",
    title: "Pelatihan Sertifikasi Halal Gelombang II",
    time: "3 hari lalu",
    image: unsplash("1504674900247-0877df9cc836", 800),
    excerpt: "Kuota 200 peserta, pendaftaran dibuka untuk seluruh anggota.",
  },
  // Pengumuman
  {
    id: "p1",
    tab: "pengumuman",
    title: "Jadwal Rakernas 2024 Resmi Dirilis",
    time: "5 jam lalu",
    image: unsplash("1540575467063-178a50c2df87", 800),
    excerpt: "Rakernas digelar 20–22 Juni di Jakarta Convention Center.",
  },
  {
    id: "p2",
    tab: "pengumuman",
    title: "Pembaruan Iuran Keanggotaan Tahun 2024",
    time: "2 hari lalu",
    image: unsplash("1505373877841-8d25f7d46678", 800),
    excerpt: "Skema iuran baru berlaku mulai Juli, bisa dibayar via PPJI Pay.",
  },
  // Regulasi
  {
    id: "r1",
    tab: "regulasi",
    title: "SK Standar Keamanan Pangan Jasaboga",
    time: "1 minggu lalu",
    image: unsplash("1577219491135-ce391730fb2c", 800),
    excerpt: "Surat keputusan standar HACCP untuk seluruh anggota katering.",
  },
  {
    id: "r2",
    tab: "regulasi",
    title: "Pedoman Sertifikasi Anggota PPJI",
    time: "2 minggu lalu",
    image: unsplash("1543353071-873f17a7a088", 800),
    excerpt: "Panduan lengkap alur sertifikasi kompetensi jasaboga.",
  },
];

/** Komunitas (di bawah list berita). */
export const community = {
  title: "Forum Diskusi",
  members: "125 anggota aktif",
};

/* ------------------------------------------------------------------ */
/* e-Sertifikasi / Training                                            */
/* ------------------------------------------------------------------ */
export type TrainingStatus = "available" | "progress" | "done";

export type Training = {
  id: string;
  title: string;
  /** Jam pelajaran, mis. 2 -> "2 JP". */
  jp: number;
  /** null = GRATIS, number = harga (Rupiah). */
  price: number | null;
  status: TrainingStatus;
  /** Persen progres 0–100 (untuk status "progress"). */
  progress?: number;
  /** Foto sampul modul. */
  image: string;
};

export const trainings: Training[] = [
  {
    id: "t1",
    title: "Higiene & Sanitasi Level 1",
    jp: 2,
    price: null,
    status: "progress",
    progress: 45,
    image: unsplash("1551218808-94e220e084d2", 600),
  },
  {
    id: "t2",
    title: "Manajemen Dapur Profesional",
    jp: 4,
    price: 150000,
    status: "available",
    image: unsplash("1556910103-1c02745aae4d", 600),
  },
  {
    id: "t3",
    title: "Food Safety for Catering",
    jp: 3,
    price: 200000,
    status: "available",
    image: unsplash("1577219491135-ce391730fb2c", 600),
  },
  {
    id: "t4",
    title: "Dasar Keamanan Pangan",
    jp: 2,
    price: null,
    status: "done",
    image: unsplash("1543353071-873f17a7a088", 600),
  },
  {
    id: "t5",
    title: "Pelayanan Prima Jasaboga",
    jp: 3,
    price: 120000,
    status: "done",
    image: unsplash("1555244162-803834f70033", 600),
  },
];

export const trainingTabs: { key: "all" | TrainingStatus; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "progress", label: "On Progress" },
  { key: "done", label: "Selesai" },
];

/** Format angka Rupiah, mis. 150000 -> "Rp150.000". */
export function formatRupiah(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

/* ------------------------------------------------------------------ */
/* E-Wallet (PPJI Pay) — gaya OVO                                      */
/* ------------------------------------------------------------------ */
export const wallet = {
  /** Saldo dompet (Rupiah). */
  balance: 250000,
  /** Poin loyalitas. */
  points: 1250,
};

/** Aksi cepat di kartu wallet. */
export type WalletAction = {
  label: string;
  icon: "tarik" | "transfer" | "topup" | "history";
};

export const walletActions: WalletAction[] = [
  { label: "Tarik Tunai", icon: "tarik" },
  { label: "Transfer", icon: "transfer" },
  { label: "Top Up", icon: "topup" },
  { label: "Riwayat", icon: "history" },
];

/** Gerai untuk tarik tunai. */
export type WithdrawMerchant = {
  id: string;
  name: string;
  color: string;
};
export const withdrawMerchants: WithdrawMerchant[] = [
  { id: "alfamart", name: "Alfamart", color: "bg-red-600" },
  { id: "indomaret", name: "Indomaret", color: "bg-blue-600" },
];

/** Pilihan nominal tarik tunai (kelipatan praktis). */
export const withdrawNominals: number[] = [
  50000, 100000, 150000, 200000,
];

/** Pilihan nominal top up saldo PPJI Pay. */
export const topupNominals: number[] = [
  50000, 100000, 150000, 200000, 500000, 1000000,
];

/** Metode pembayaran top up. */
export type PayMethod = {
  id: string;
  name: string;
  desc: string;
  /** Kunci logo brand (lihat BrandLogo). */
  brand: string;
};
export const payMethods: PayMethod[] = [
  { id: "va-bca", name: "Virtual Account BCA", desc: "Bayar via m-banking / ATM", brand: "bca" },
  { id: "va-mandiri", name: "Virtual Account Mandiri", desc: "Bayar via Livin / ATM", brand: "mandiri" },
  { id: "qris", name: "QRIS", desc: "Scan & bayar dari e-wallet lain", brand: "qris" },
  { id: "transfer", name: "Transfer Bank", desc: "Transfer manual antar bank", brand: "bank" },
];

/** Transaksi dompet. amount > 0 = masuk, < 0 = keluar. */
export type WalletTxn = {
  id: string;
  title: string;
  category: "topup" | "transfer" | "pay" | "reward";
  time: string;
  amount: number;
};

export const walletTxns: WalletTxn[] = [
  {
    id: "w1",
    title: "Top Up Saldo",
    category: "topup",
    time: "Hari ini, 09.12",
    amount: 200000,
  },
  {
    id: "w2",
    title: "Bayar Iuran Anggota",
    category: "pay",
    time: "Kemarin, 14.30",
    amount: -150000,
  },
  {
    id: "w3",
    title: "Transfer ke Budi S.",
    category: "transfer",
    time: "2 Jun, 10.05",
    amount: -50000,
  },
  {
    id: "w4",
    title: "Cashback Pelatihan",
    category: "reward",
    time: "1 Jun, 16.40",
    amount: 15000,
  },
  {
    id: "w5",
    title: "Token Listrik PLN",
    category: "pay",
    time: "30 Mei, 08.20",
    amount: -100000,
  },
];

/** Format Rupiah bertanda, mis. -150000 -> "- Rp150.000". */
export function formatSignedRupiah(n: number): string {
  const sign = n < 0 ? "- " : "+ ";
  return sign + "Rp" + Math.abs(n).toLocaleString("id-ID");
}

/* ------------------------------------------------------------------ */
/* Chat (DM perorangan & Grup/Room organisasi)                         */
/* ------------------------------------------------------------------ */
export type ChatMessage = {
  id: string;
  /** "me" = saya; selain itu nama pengirim (dipakai di grup). */
  from: "me" | string;
  text: string;
  time: string;
  read?: boolean;
};

export type Chat = {
  id: string;
  kind: "dm" | "group";
  name: string;
  /** Kelas warna avatar inisial. */
  color: string;
  /** DM: perusahaan/kota; Grup: keterangan. */
  subtitle?: string;
  /** Jumlah anggota (grup). */
  members?: number;
  lastText: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
};

export const chats: Chat[] = [
  // ---- Grup / Room organisasi ----
  {
    id: "grp-bpp",
    kind: "group",
    name: "Forum BPP",
    subtitle: "Badan Pengurus Pusat",
    color: "bg-[#1c5fa8]",
    members: 42,
    lastText: "Ketua Umum: Mohon konfirmasi kehadiran Rakernas.",
    lastTime: "08.06",
    unread: 3,
    messages: [
      { id: "m1", from: "Ketua Umum", text: "Selamat pagi rekan-rekan pengurus pusat.", time: "08.00" },
      { id: "m2", from: "Sekretaris", text: "Pagi, Pak Ketua 🙏", time: "08.02" },
      { id: "m3", from: "me", text: "Pagi semua.", time: "08.05", read: true },
      { id: "m4", from: "Ketua Umum", text: "Jangan lupa Rakernas 20 Juni. Mohon konfirmasi kehadiran ya.", time: "08.06" },
    ],
  },
  {
    id: "grp-bpc-jkt",
    kind: "group",
    name: "Forum BPC Jakarta",
    subtitle: "Badan Pengurus Cabang",
    color: "bg-emerald-600",
    members: 18,
    lastText: "Rina: Notulen rapat sudah saya kirim.",
    lastTime: "Kemarin",
    unread: 0,
    messages: [
      { id: "m1", from: "Rina", text: "Rekan-rekan, notulen rapat kemarin sudah saya kirim ke email.", time: "16.40" },
      { id: "m2", from: "me", text: "Terima kasih, Bu Rina.", time: "16.45", read: true },
    ],
  },
  {
    id: "grp-bpd-jabar",
    kind: "group",
    name: "Forum BPD Jawa Barat",
    subtitle: "Badan Pengurus Daerah",
    color: "bg-[#e0982f]",
    members: 25,
    lastText: "Anda: Siap, saya hadir.",
    lastTime: "2 hari",
    unread: 0,
    messages: [
      { id: "m1", from: "Koordinator", text: "Pertemuan daerah minggu depan di Bandung.", time: "10.00" },
      { id: "m2", from: "me", text: "Siap, saya hadir.", time: "10.12", read: true },
    ],
  },
  // ---- DM perorangan ----
  {
    id: "dm-bs",
    kind: "dm",
    name: "PT Boga Sejahtera",
    subtitle: "Jakarta",
    color: "bg-[#1c5fa8]",
    lastText: "Baik, untuk 150 porsi ya.",
    lastTime: "09.15",
    unread: 2,
    messages: [
      { id: "m1", from: "PT Boga Sejahtera", text: "Selamat siang, Pak. Apakah ada slot katering untuk acara tanggal 20?", time: "09.10" },
      { id: "m2", from: "me", text: "Siang. Untuk tanggal 20 masih tersedia, Pak.", time: "09.12", read: true },
      { id: "m3", from: "PT Boga Sejahtera", text: "Baik, untuk 150 porsi ya.", time: "09.13" },
      { id: "m4", from: "PT Boga Sejahtera", text: "Mohon dikirim penawarannya.", time: "09.15" },
    ],
  },
  {
    id: "dm-rn",
    kind: "dm",
    name: "CV Rasa Nusantara",
    subtitle: "Bandung",
    color: "bg-rose-500",
    lastText: "Anda: Sama-sama, Bu 🙏",
    lastTime: "Kemarin",
    unread: 0,
    messages: [
      { id: "m1", from: "CV Rasa Nusantara", text: "Terima kasih rekomendasinya kemarin!", time: "14.20" },
      { id: "m2", from: "me", text: "Sama-sama, Bu 🙏", time: "14.25", read: true },
    ],
  },
  {
    id: "dm-sp",
    kind: "dm",
    name: "PT Sajian Prima",
    subtitle: "Surabaya",
    color: "bg-violet-500",
    lastText: "Boleh, nanti saya kabari lagi.",
    lastTime: "Sen",
    unread: 0,
    messages: [
      { id: "m1", from: "me", text: "Pak, apakah bisa kolaborasi untuk event bulan depan?", time: "11.00", read: true },
      { id: "m2", from: "PT Sajian Prima", text: "Boleh, nanti saya kabari lagi.", time: "11.30" },
    ],
  },
];

/** Cari chat berdasarkan id. Jika "dm-<idDirektori>" belum ada, bangun kosong dari direktori. */
export function findChat(id: string): Chat | undefined {
  const found = chats.find((c) => c.id === id);
  if (found) return found;
  if (id.startsWith("dm-")) {
    const dir = directory.find((d) => `dm-${d.id}` === id);
    if (dir) {
      return {
        id,
        kind: "dm",
        name: dir.company,
        subtitle: dir.city,
        color: dir.color ?? "bg-neutral-400",
        lastText: "",
        lastTime: "",
        unread: 0,
        messages: [],
      };
    }
  }
  return undefined;
}

/** Total pesan belum dibaca (untuk badge). */
export function totalUnreadChats(): number {
  return chats.reduce((n, c) => n + c.unread, 0);
}

/* ------------------------------------------------------------------ */
/* Reels — video pendek vertikal (mock, gaya TikTok)                   */
/* ------------------------------------------------------------------ */
export type Reel = {
  id: string;
  author: string;
  /** Warna avatar inisial author. */
  authorColor: string;
  caption: string;
  audio: string;
  tag: string;
  likes: number;
  comments: number;
  shares: number;
  /** Kelas gradient untuk poster (overlay di atas foto). */
  gradient: string;
  /** Foto sampul (mock pengganti frame video). */
  image: string;
};

export const reels: Reel[] = [
  {
    id: "r1",
    author: "Dapur Bunda",
    authorColor: "bg-rose-500",
    caption: "Resep nasi goreng kampung anti gagal! 🍳🔥",
    audio: "Original Sound - Dapur Bunda",
    tag: "Resep",
    likes: 1240,
    comments: 89,
    shares: 45,
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    image: unsplash("1565299624946-b28f40a0ae38", 800),
  },
  {
    id: "r2",
    author: "PT Boga Sejahtera",
    authorColor: "bg-[#1c5fa8]",
    caption: "Behind the scenes katering 500 porsi 💪 #jasaboga",
    audio: "Suara asli - PT Boga Sejahtera",
    tag: "Katering",
    likes: 3200,
    comments: 210,
    shares: 120,
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    image: unsplash("1530103862676-de8c9debad1d", 800),
  },
  {
    id: "r3",
    author: "PPJI Official",
    authorColor: "bg-violet-600",
    caption: "Highlight Rakernas PPJI 2024 🎉 Sampai jumpa tahun depan!",
    audio: "PPJI Anthem - Official",
    tag: "Event",
    likes: 5600,
    comments: 430,
    shares: 380,
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    image: unsplash("1511795409834-ef04bbd61622", 800),
  },
  {
    id: "r4",
    author: "Chef Rian",
    authorColor: "bg-emerald-600",
    caption: "Tips plating biar makanan makin mahal ✨🍽️",
    audio: "Aesthetic Vibes - lofi",
    tag: "Tips",
    likes: 890,
    comments: 56,
    shares: 23,
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    image: unsplash("1577219491135-ce391730fb2c", 800),
  },
  {
    id: "r5",
    author: "Katering Berkah",
    authorColor: "bg-amber-500",
    caption: "Menu prasmanan favorit pelanggan 😋 mana favoritmu?",
    audio: "Dangdut Koplo Remix",
    tag: "Promo",
    likes: 2100,
    comments: 178,
    shares: 90,
    gradient: "from-amber-500 via-orange-600 to-red-600",
    image: unsplash("1414235077428-338989a2e8c0", 800),
  },
];

/** Format jumlah ringkas: 1240 -> "1,2rb", 5600 -> "5,6rb". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  const v = (n / 1000).toFixed(1).replace(".", ",").replace(",0", "");
  return `${v}rb`;
}

/* ------------------------------------------------------------------ */
/* Notifikasi (placeholder)                                            */
/* ------------------------------------------------------------------ */
export type Notification = {
  id: string;
  type: "event" | "iuran" | "info";
  title: string;
  body: string;
  /** Waktu relatif siap pakai, mis. "2 jam lalu". */
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "event",
    title: "Pendaftaran Rakernas dibuka",
    body: "Segera daftar Rakernas PPJI 2024 sebelum 18 Juni.",
    time: "2 jam lalu",
    unread: true,
  },
  {
    id: "n2",
    type: "iuran",
    title: "Iuran tahunan jatuh tempo",
    body: "Iuran keanggotaan 2024 jatuh tempo 30 Juni.",
    time: "1 hari lalu",
    unread: true,
  },
  {
    id: "n3",
    type: "info",
    title: "Kartu Tanda Anggota diperbarui",
    body: "Masa berlaku KTA Anda telah diperpanjang.",
    time: "3 hari lalu",
    unread: false,
  },
  {
    id: "n4",
    type: "event",
    title: "PPJI Business Forum",
    body: "Forum bisnis akan digelar di Bandung, 27 Juli 2024.",
    time: "5 hari lalu",
    unread: false,
  },
];

/** Jumlah notifikasi belum dibaca (untuk badge lonceng). */
export function totalUnreadNotifs(): number {
  return notifications.filter((n) => n.unread).length;
}

/* ------------------------------------------------------------------ */
/* Helper tanggal                                                      */
/* ------------------------------------------------------------------ */

const BULAN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/** Format ISO date -> "03 Jun 2028". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

/** Sisa masa berlaku dalam teks, relatif terhadap `now`. */
export function remainingText(validUntilIso: string, now: Date): string {
  const end = new Date(validUntilIso);
  const ms = end.getTime() - now.getTime();
  if (ms <= 0) return "Kedaluwarsa";

  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  if (years >= 1) {
    return months > 0
      ? `Berlaku ${years} tahun ${months} bulan lagi`
      : `Berlaku ${years} tahun lagi`;
  }
  if (months >= 1) return `Berlaku ${months} bulan lagi`;
  return `Berlaku ${days} hari lagi`;
}
