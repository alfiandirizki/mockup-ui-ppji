/**
 * Data dummy untuk mockup dashboard PPJI.
 * Ganti nilai-nilai di sini saat menyambungkan ke data asli.
 */

export type Member = {
  name: string;
  business: string;
  ktaNumber: string; // ditampilkan bergaya nomor kartu ATM
  issuedAt: string; // ISO date — tanggal terbit
  validUntil: string; // ISO date — masa berlaku (terbit + 4 tahun)
};

export const member: Member = {
  name: "Budi Santoso",
  business: "Katering Berkah Rasa",
  ktaNumber: "1234 5678 9012 3456",
  issuedAt: "2024-06-03",
  validUntil: "2028-06-03", // berlaku 4 tahun
};

/** Pintasan menu (placeholder — silakan sesuaikan). */
export type Shortcut = {
  label: string;
  icon: "profile" | "topup" | "doc" | "calendar";
  /** Tujuan navigasi; null = belum ada halaman. */
  href: string | null;
};

export const shortcuts: Shortcut[] = [
  { label: "Profil", icon: "profile", href: "/account" },
  { label: "Sertifikat", icon: "doc", href: "/sertifikasi" },
  { label: "Event", icon: "calendar", href: "/event" },
  { label: "Top Up", icon: "topup", href: "/ppob" },
];

/** Banner promo/info di Beranda. */
export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
};

export const banner: Banner = {
  id: "promo-rakernas",
  title: "Rakernas PPJI 2024",
  subtitle: "Daftar sekarang & dapatkan benefit anggota",
  cta: "Selengkapnya",
};

/** Layanan PPOB / Top Up (placeholder). */
export type PpobIcon =
  | "pulsa"
  | "pln"
  | "wallet"
  | "pdam"
  | "bpjs"
  | "internet"
  | "game";

export type PpobItem = {
  label: string;
  icon: PpobIcon;
  color: string;
  bg: string;
};

export const ppobItems: PpobItem[] = [
  { label: "Pulsa & Data", icon: "pulsa", color: "text-sky-600", bg: "bg-sky-100" },
  { label: "Token Listrik", icon: "pln", color: "text-amber-500", bg: "bg-amber-100" },
  { label: "Top Up e-Wallet", icon: "wallet", color: "text-emerald-500", bg: "bg-emerald-100" },
  { label: "PDAM", icon: "pdam", color: "text-blue-500", bg: "bg-blue-100" },
  { label: "BPJS", icon: "bpjs", color: "text-teal-600", bg: "bg-teal-100" },
  { label: "Internet & TV", icon: "internet", color: "text-violet-500", bg: "bg-violet-100" },
  { label: "Voucher Game", icon: "game", color: "text-rose-500", bg: "bg-rose-100" },
];

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
  },
  {
    id: "halal-bihalal-2024",
    title: "Halal Bihalal PPJI",
    dateText: "21 Apr 2024",
    location: "Surabaya",
    status: "done",
    description: "Silaturahmi anggota PPJI pasca Idulfitri 1445 H.",
  },
  {
    id: "pelatihan-keamanan-pangan",
    title: "Pelatihan Keamanan Pangan",
    dateText: "10 Mar 2024",
    location: "Jakarta",
    status: "done",
    description: "Pelatihan bersertifikat tentang standar keamanan pangan.",
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
  },
  {
    id: "b2",
    tab: "berita",
    title: "Update Regulasi Jasaboga 2024",
    time: "1 hari lalu",
  },
  {
    id: "b3",
    tab: "berita",
    title: "Pelatihan Sertifikasi Halal Gelombang II",
    time: "3 hari lalu",
  },
  // Pengumuman
  {
    id: "p1",
    tab: "pengumuman",
    title: "Jadwal Rakernas 2024 Resmi Dirilis",
    time: "5 jam lalu",
  },
  {
    id: "p2",
    tab: "pengumuman",
    title: "Pembaruan Iuran Keanggotaan Tahun 2024",
    time: "2 hari lalu",
  },
  // Regulasi
  {
    id: "r1",
    tab: "regulasi",
    title: "SK Standar Keamanan Pangan Jasaboga",
    time: "1 minggu lalu",
  },
  {
    id: "r2",
    tab: "regulasi",
    title: "Pedoman Sertifikasi Anggota PPJI",
    time: "2 minggu lalu",
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
};

export const trainings: Training[] = [
  {
    id: "t1",
    title: "Higiene & Sanitasi Level 1",
    jp: 2,
    price: null,
    status: "progress",
    progress: 45,
  },
  {
    id: "t2",
    title: "Manajemen Dapur Profesional",
    jp: 4,
    price: 150000,
    status: "available",
  },
  {
    id: "t3",
    title: "Food Safety for Catering",
    jp: 3,
    price: 200000,
    status: "available",
  },
  {
    id: "t4",
    title: "Dasar Keamanan Pangan",
    jp: 2,
    price: null,
    status: "done",
  },
  {
    id: "t5",
    title: "Pelayanan Prima Jasaboga",
    jp: 3,
    price: 120000,
    status: "done",
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
