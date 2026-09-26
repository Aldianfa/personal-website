# Animasi Photo Stack di Journey

Dokumen ini merangkum cara kerja tumpukan foto pada bagian profil halaman Journey dan utility yang perlu disiapkan untuk menerapkannya di proyek lain.

## Model Animasi

Efek ini tidak menggunakan Framer Motion atau keyframe. Perpindahan dibuat dengan CSS transitions: saat pengguna mengeklik area foto, React mengubah `activePhoto`, lalu setiap foto mendapat posisi, skala, rotasi, bayangan, dan `z-index` baru. Browser menganimasikan perubahan properti tersebut.

Hanya tiga foto yang dirender sekaligus. Urutan relatif dihitung secara melingkar:

```js
const relativeIndex = (photoIndex - activePhoto + photos.length) % photos.length;
```

Foto dengan `relativeIndex` di atas `2` disembunyikan. Klik pada pembungkus menaikkan index aktif satu langkah dan kembali ke foto pertama setelah mencapai akhir daftar.

## Posisi dan Transform

Semua foto ditumpuk dengan `position: absolute` dan memenuhi pembungkus. Nilai berikut menggambarkan class Tailwind pada implementasi Journey:

| Posisi | Transform dan tampilan |
| --- | --- |
| Aktif (`relativeIndex = 0`) | `translate-z-0 translate-y-0 scale-100 rotate-0`, `z-30`, bayangan `shadow-2xl` |
| Berikutnya (`relativeIndex = 1`) | `-translate-z-10 translate-y-4 translate-x-4 scale-95 rotate-3`, `z-20`, bayangan `shadow-xl` |
| Ketiga (`relativeIndex = 2`) | `-translate-z-20 translate-y-8 translate-x-8 scale-90 rotate-6`, `z-10`, bayangan `shadow-lg` |

Pembungkus memiliki `perspective-1000` agar translasi sumbu Z memberi kesan kedalaman. Nilai translate X/Y Tailwind mengikuti spacing scale proyek; cek hasil CSS yang dihasilkan jika ingin angka piksel yang persis.

## Transisi Antar Foto

Class pada setiap kartu adalah:

```text
transition-all duration-500 ease-out-back
```

- `transition-all`: perubahan transform, bayangan, dan properti transisi lain dianimasikan.
- `duration-500`: durasi transisi `500ms`.
- `ease-out-back`: dimaksudkan sebagai easing yang melambat dengan sedikit efek overshoot.
- Saat index aktif berubah, foto lama dan foto yang masuk ke posisi aktif sama-sama bergerak ke transform tujuan masing-masing, sehingga terasa seperti kartu bergeser di dalam tumpukan.

**Catatan portabilitas:** `ease-out-back` tidak didefinisikan di `src/index.css` pada proyek ini. Jika dipakai mentah-mentah, browser/Tailwind mungkin tidak menerapkan kurva tersebut dan akan memakai timing function bawaan. Definisikan token easing pada konfigurasi/theme Tailwind atau gunakan nilai arbitrer yang didukung, misalnya:

```html
class="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
```

> Kurva di atas adalah contoh efek back/overshoot; sesuaikan titik kontrol jika ingin rasa gerak yang lebih halus.

## Hover

- Pembungkus diberi `group`.
- Setiap kartu memakai `group-hover:-translate-y-2`, sehingga seluruh tumpukan naik sedikit saat pointer berada di area foto.
- Ikon Apple Photos pada foto aktif memakai `hover:scale-105 transition-transform`, yaitu pembesaran kecil saat pointer berada di atas ikon.
- Hover hanya efek tambahan. Pergantian foto tetap dilakukan dengan klik pada tumpukan.

## Layer Foto

- Pembungkus berukuran persegi, maksimal `300px`, dengan `perspective-1000`.
- Kartu memakai sudut membulat besar, border putih semi-transparan, `backdrop-blur-md`, dan `overflow-hidden`.
- Gambar mengisi kartu menggunakan `object-cover`.
- Overlay gradasi gelap dari bawah ke transparan adalah lapisan statis untuk menjaga keterbacaan judul dan lokasi foto aktif.
- Judul dan lokasi hanya ditampilkan pada foto aktif. Ikon Apple Photos juga hanya muncul pada foto aktif; klik ikon menghentikan bubbling agar tidak ikut mengganti foto.
- Semua kartu mempertahankan `opacity-100`; kedalaman terutama dibedakan lewat transform, z-index, dan bayangan.

## Cara Menerapkan

1. Simpan index foto aktif dengan state React.
2. Hitung posisi relatif setiap foto dan render hanya tiga posisi pertama.
3. Buat satu set class transform untuk tiap posisi seperti tabel di atas.
4. Terapkan `transition-all` dan durasi `500ms` pada semua kartu agar perubahan posisi dianimasikan.
5. Tambahkan perspektif pada pembungkus dan pastikan kartu memakai `position: absolute`.
6. Pada klik pembungkus, majukan index secara melingkar. Untuk kontrol/link di dalam kartu, panggil `stopPropagation()`.
7. Uji easing di browser; definisikan utility sendiri jika class easing khusus tidak tersedia di proyek tujuan.

## Checklist

- [ ] Hanya foto aktif dan dua foto berikutnya yang terlihat.
- [ ] Foto aktif berada paling depan; foto berikutnya makin kecil dan bergeser.
- [ ] Klik mengganti foto dengan transisi sekitar `500ms`.
- [ ] Hover mengangkat tumpukan tanpa mengubah ukuran layout.
- [ ] Overlay dan teks hanya membantu presentasi, bukan mengubah urutan foto.
- [ ] Easing khusus benar-benar tersedia dan terpakai di proyek tujuan.
- [ ] Pembungkus tetap persegi dan muat di viewport ponsel.