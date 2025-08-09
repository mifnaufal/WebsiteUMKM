# Izin.In — Website Layanan Perizinan UMKM

![Static Site](https://img.shields.io/badge/site-static-blue)
![HTML5](https://img.shields.io/badge/HTML5-Ready-E34F26)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-CDN-38B2AC)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E)

Izin.In adalah situs web statis yang membantu masyarakat/UMKM mengakses informasi layanan perizinan, berita & pengumuman, serta menyampaikan pengaduan dan menghubungi instansi. Proyek ini mengutamakan tampilan modern, akses cepat, dan kemudahan pemeliharaan.

## Fitur Utama

- **Beranda**: ringkasan fitur, akses cepat, highlight berita, CTA bantuan.
- **Tentang**: profil, visi misi, sejarah, struktur organisasi, profil pimpinan.
- **Layanan**: kartu layanan interaktif (accordion), pencarian layanan, detail persyaratan dan alur proses.
- **Berita & Pengumuman**: grid berita, halaman detail berita dinamis (`berita-detail.html`).
- **Pengaduan**: form pengaduan yang mengirim ke WhatsApp dan halaman terima kasih.
- **Kontak**: alamat, jam operasional, media sosial, dan peta Google Maps ter-embed.
- **Navbar seragam**: dimuat dinamis melalui `navbar.html` menggunakan `js/navbar.js`.

## Teknologi

- **UI**: HTML5 + Tailwind CSS (via CDN), Font Awesome.
- **Interaktivitas**: JavaScript vanilla, modular per halaman.
- **Data dinamis**: diambil dari berkas JSON statis di folder `data/` (mis. `data/news.json`, `data/services.json`).

## Struktur Proyek

```
WebsiteUMKM/
├─ index.html
├─ tentang.html
├─ layanan.html
├─ berita.html
├─ berita-detail.html
├─ pengaduan.html
├─ terima-kasih.html
├─ kontak.html
├─ navbar.html                # komponen navbar yang dimuat dinamis (dibutuhkan oleh js/navbar.js)
├─ css/
│  ├─ input.css               # sumber Tailwind (opsional)
│  └─ output.css              # CSS hasil build (dipakai di beberapa halaman)
├─ js/
│  ├─ navbar.js               # memuat navbar.html & toggle menu mobile
│  ├─ utils.js                # util umum: getUrlParam, formatDate, fetchData, setupForm
│  ├─ news.js                 # daftar & detail berita dari data/news.json
│  ├─ services.js             # render & pencarian layanan dari data/services.json
│  └─ isiPengaduan.js         # kirim pengaduan ke WhatsApp dan redirect
├─ images/
│  └─ ...                     # aset gambar (mis. foto pimpinan)
└─ data/
   ├─ news.json               # (buat file ini) sumber data berita
   └─ services.json           # (buat file ini) sumber data layanan
```

## Menjalankan Secara Lokal

Situs ini bersifat statis. Jalankan di server statis agar fetch JSON berfungsi.

- **Opsi 1 (Disarankan): VS Code — Live Server**

  - Buka folder proyek di VS Code
  - Klik "Go Live" (ekstensi Live Server)

- **Opsi 2: Python (tanpa instalasi tambahan)**

  - Windows CMD/PowerShell: `python -m http.server 5500`
  - Akses: `http://localhost:5500`

- **Opsi 3: Node (npx serve)**
  - `npx serve -l 5500`
  - Akses: `http://localhost:5500`

## Build Tailwind CSS (opsional)

Sebagian halaman menggunakan CDN Tailwind. Jika ingin memakai berkas CSS lokal (`/css/output.css`):

1. Pastikan `node` terpasang.
2. Jalankan build satu kali:
   ```bash
   npx tailwindcss -i ./css/input.css -o ./css/output.css --minify
   ```
3. Mode pengembangan (watch):
   ```bash
   npx tailwindcss -i ./css/input.css -o ./css/output.css --watch
   ```

Catatan: pastikan konfigurasi kelas utilitas yang dipakai ada dalam HTML agar tidak terpurge.

## Data Dinamis (Berita & Layanan)

Buat folder `data/` di root dan tambahkan 2 berkas berikut.

- `data/news.json`

  ```json
  {
    "news": [
      {
        "id": 1,
        "title": "Peluncuran Sistem Perizinan Online Terbaru",
        "date": "2025-08-12",
        "summary": "Platform Izin.In meluncurkan fitur terbaru.",
        "content": "Paragraf 1...\nParagraf 2..."
      }
    ]
  }
  ```

- `data/services.json`
  ```json
  {
    "services": [
      {
        "name": "Perizinan Usaha Baru",
        "description": "Pendaftaran usaha baru untuk UMKM.",
        "requirements": ["Fotokopi KTP", "Surat Domisili"],
        "flow": ["Isi formulir", "Verifikasi", "Pembayaran", "Penerbitan izin"]
      }
    ]
  }
  ```

## Formulir & Integrasi

- **Pengaduan ke WhatsApp**: diatur di `js/isiPengaduan.js`. Ubah nomor WhatsApp pada konstanta `waNumber` sesuai kebutuhan.
- **FormSubmit (email)**: util `setupForm` di `js/utils.js` menggunakan `formsubmit.co`. Ganti `your-email@domain.com` dengan email Anda sebelum produksi.

## Navbar Dinamis

- Semua halaman yang memiliki `<div id="navbar-container"></div>` akan memuat `navbar.html` secara otomatis via `js/navbar.js`.
- Pastikan file `navbar.html` tersedia di root dan berisi markup navbar.

## Halaman Penting

- `index.html` — Beranda & quick access
- `tentang.html` — Profil & sejarah instansi
- `layanan.html` — Kartu layanan interaktif + pencarian
- `berita.html` — Grid berita; `berita-detail.html` — detail berita
- `pengaduan.html` — Form pengaduan (WhatsApp) → `terima-kasih.html`
- `kontak.html` — Info kontak + peta Google Maps

## Pengembangan Selanjutnya (Ide)

- CMS ringan (mis. GitHub CMS/Netlify CMS) untuk mengelola `news.json`/`services.json`.
- Komponenisasi header/footer penuh (hilangkan duplikasi, konsisten di semua halaman).
- Validasi form yang lebih lengkap dan reCAPTCHA.
- Dark mode dan peningkatan aksesibilitas (kontras, ARIA, fokus).

## Lisensi

Gunakan untuk keperluan pembelajaran/demonstrasi internal. Sesuaikan lisensi sesuai kebutuhan organisasi Anda.
