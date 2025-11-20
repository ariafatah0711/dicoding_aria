# Pengenalan Data dan Basis Data
## 1. Mengenal Data
##### Pengertian Data
Beberapa definisi dari KBBI, Cambridge, dan ahli:
- Data = keterangan/informasi yang benar, nyata, dan dapat diproses komputer.
- Data = fakta atau angka yang dikumpulkan untuk dianalisis.
- Data = kenyataan mentah (raw facts) yang belum bisa bercerita banyak sebelum diolah.

> Inti dari definisi data: Informasi yang benar, fakta, dan nyata.

##### Pentingnya Data
- Data membantu pengambilan keputusan.
- Tanpa data, manusia akan “buta informasi”.
- Semua hal di sekitar kita adalah data:
  > contoh → petunjuk jalan, jumlah wisatawan, makanan khas, statistik pengguna aplikasi, dll.

Data menjadi dasar untuk:
- memahami kondisi
- melakukan prediksi
- membuat kebijakan

Contoh nyata:
- WhatsApp adalah media sosial paling banyak digunakan di Indonesia (2022). Indonesia juga menempati posisi ke-4 pengguna WhatsApp terbanyak di dunia.

##### Metode Pengumpulan Data
Data dapat dikumpulkan menggunakan:
1. Metode kualitatif
2. Metode kuantitatif

| Data Kualitatif          | Data Kuantitatif                  |
| ------------------------ | --------------------------------- |
| Bentuk teks/gambar/opini | Bentuk angka                      |
| Subjektif                | Objektif                          |
| Menjelaskan kualitas     | Mengukur kuantitas                |
| Mudah dicerna manusia    | Mudah dianalisis secara statistik |

###### a. Data Kualitatif
Definisi:
- Data yang berbentuk kata, deskripsi, gambar, opini, atau kualitas tertentu.

Ciri:
- Bersifat verbal, subjektif, dan berdasarkan persepsi.
- Menjelaskan pengalaman, pendapat, atau deskripsi objek.

> Contoh: testimoni teman tentang kereta panoramic (worth it / tidak).

###### b. Data Kuantitatif
Definisi:
- Data yang berbentuk angka, hasil dari pengukuran atau survei.

Ciri:
- Bersifat objektif dan mutlak (karena angka).
- Biasanya dikumpulkan melalui kuesioner atau instrumen yang terukur.

> Contoh: persentase pengguna transportasi umum dalam bentuk pie chart.

---

## 2. Jenis-Jenis Data
##### 1. Data Terstruktur
- Data yang tersusun rapi dan memiliki format tetap seperti tabel.
- Mudah dibaca dan dipahami.

> Contoh: tabel jumlah penumpang wisata, data siswa, data penjualan.

##### 2. Data Tidak Terstruktur
- Tidak memiliki bentuk atau pola tertentu.
- Berisi berbagai format seperti gambar, video, audio, teks bebas.

> Contoh: flyer, postingan media sosial, foto, rekaman video.

#####3. Data Semi Terstruktur
- Kombinasi antara data terstruktur dan tidak terstruktur.
- Tidak mengikuti format tabel, tetapi masih memiliki atribut yang bisa dibaca atau dianalisis.

> Contoh: email, halaman web (HTML), file dalam zip.

##### 4. Data Numerik
Data berupa angka hasil perhitungan atau pengukuran.

###### a. Data Kontinu
- Bisa memiliki nilai yang berbeda-beda dan dapat berupa desimal.

> Contoh: suhu tubuh (36.2°C), tinggi badan, berat badan.

###### b. Data Diskrit
- Hanya berupa bilangan bulat, tidak bisa dibagi menjadi unit lebih kecil.

> Contoh: jumlah penumpang (125 orang), jumlah mobil, jumlah buku.

##### 5. Data Kategorikal
Data yang berupa kelompok atau kategori.

###### a. Data Nominal
- Kategori tanpa urutan.
- Tidak menunjukkan peringkat.

> Contoh: jenis transportasi (bus, kapal, kereta), warna, jenis kelamin.

###### b. Data Ordinal
- Kategori dengan urutan atau peringkat.

> Contoh: rating destinasi wisata (bintang 1–5), tingkat kepuasan, peringkat lomba.


## kesimpulan
- Terstruktur = rapi seperti tabel
- Tidak terstruktur = bebas (gambar, teks, video)
- Semi terstruktur = campuran (email, web)
- Numerik = angka (kontinu/desimal, diskrit/bulat)
- Kategorikal = kelompok (nominal/tanpa urutan, ordinal/berurutan)

---

## 3. Tipe Data
Tipe data adalah klasifikasi jenis nilai yang dapat disimpan dalam sebuah variabel atau kolom dalam pemrograman dan SQL.
Setiap tipe data menentukan bentuk data, cara penyimpanan, dan operasi yang bisa dilakukan.

##### Tipe Data yang Sering Digunakan
| **No** | **Tipe Data**        | **Pengertian**                                                      | **Contoh**                             |
| ------ | -------------------- | ------------------------------------------------------------------- | -------------------------------------- |
| **1**  | **Integer (INT)**    | Bilangan bulat tanpa pecahan, bisa positif atau negatif.            | 0, 1, 59, -20, -3                      |
| **2**  | **Float**            | Angka yang memiliki nilai pecahan/desimal.                          | 0.7, 0.4, 9.4                          |
| **3**  | **Boolean (BOOL)**   | Nilai logika benar/salah.                                           | 0 = False, 1 = True                    |
| **4**  | **Array**            | Kumpulan elemen berurutan, biasanya tipe datanya sama.              | [Bali, Bandung, Bogor] → indeks: 0,1,2 |
| **5**  | **Character (CHAR)** | Satu karakter tunggal (huruf, angka, simbol, emoji).                | A, d, 4, #, 😊                         |
| **6**  | **String (STR)**     | Rangkaian karakter yang membentuk teks, termasuk angka atau simbol. | "Bali", "Bandung", "Bogor"             |

---

## 4. Data, Basis Data, dan Dataset
![alt text](<images/01 - Pengenalan Data dan Basis Data/image.png>)

##### 1. Data
Data adalah informasi atau fakta mengenai suatu objek atau kejadian yang bisa dicatat atau disimpan.
> Contoh: nama penumpang, tujuan perjalanan, jam keberangkatan.

##### 2. Basis Data (Database)
- Basis data adalah tempat penyimpanan data yang terstruktur dan terorganisasi sehingga mudah diakses, dikelola, dan diperbarui.
- Biasanya terdiri dari banyak tabel yang saling terhubung.
- Menyimpan berbagai tipe data (teks, angka, gambar, dll.).

- Analogi: hanggar pesawat — menyimpan berbagai jenis pesawat (data) untuk berbagai kebutuhan.
- Contoh tools: MySQL, BigQuery, DB Browser SQL.

##### 3. Dataset
- Dataset adalah kumpulan data yang disajikan dalam format tertentu (CSV, Excel, JSON, dsb.) dan biasanya digunakan untuk tujuan spesifik.
- Dataset dapat berasal dari bagian kecil sebuah basis data atau dari sumber lain.

- Analogi: showroom kendaraan — menampilkan model kendaraan tertentu hasil dari pabrik (database).
- Contoh tools: Excel, Google Sheets, situs public dataset.

##### Platform Penyedia Dataset
1. Kaggle
- Komunitas data science internasional.
- Menyediakan banyak dataset (CSV, JSON, SQLite, BigQuery).
- Ada fitur code sharing & forum komunitas.

2. Open Data Jabar
- Portal data publik Jawa Barat.
- Dataset berformat CSV & Excel.

3. Badan Pusat Statistik (BPS)
- Menyediakan data nasional.
- Format utama: Excel (perlu dikonversi jika ingin dipakai dalam database).

---

## 5. Basis Data Relasional, NoSQL, Aljabar Relasional, dan ERD
##### 1. Basis Data Relasional (SQL)
**Database relasional** = pakai tabel (baris & kolom).
Data antar tabel bisa saling berhubungan.

- Istilah penting:
  - Relasi = tabel
  - Derajat = jumlah kolom
  - Tuple = baris
  - Kardinalitas = jumlah baris

- Setiap baris biasanya punya:
  - Primary Key (ID unik)
  - Foreign Key (penghubung antartabel)

##### 2. Basis Data Nonrelasional (NoSQL)
Database nonrelasional = tidak wajib tabel, bisa berbentuk:
- Dokumen (seperti JSON)
- Key–value
- Graph
- Column-based

Dipakai ketika:
- Data besar & terdistribusi
- Tidak butuh aturan transaksi ketat (ACID)
- Butuh kecepatan tinggi
- Struktur data fleksibel
- Data temporal (shopping cart, wishlist)

###### SQL vs NoSQL
| SQL                             | NoSQL                                   |
| ------------------------------- | --------------------------------------- |
| Berbasis tabel                  | Tidak wajib tabel                       |
| Skala vertikal (upgrade server) | Skala horizontal (tambah banyak server) |
| Struktur kaku (schema fixed)    | Struktur fleksibel                      |
| Cocok untuk data teratur        | Cocok untuk data besar & variatif       |

##### 3. Aljabar Relasional (untuk SQL)
Aljabar relasional = operasi matematika untuk mengolah tabel dan menghasilkan tabel baru.

Dua operasi penting yang kamu pelajari:
###### 1. Selection (σ / sigma)
- Memilih baris tertentu.
> Contoh: “Ambil data destinasi yang dari Alun-Alun Bandung.”

###### 2. Projection (π / pi)
- Memilih kolom tertentu.
> Contoh: “Tampilkan hanya kolom NO ID, NAMA, TOTAL HARGA.”

##### 4. Entity Relationship Diagram (ERD)
ERD = gambar rancangan database sebelum dibuat.

Komponen:
1. Entity (persegi panjang) → objek, misalnya Penumpang, Destinasi
2. Atribut (oval) → ciri-ciri, misalnya Nama, Gender
3. Relasi (belah ketupat) → hubungan antarenentity

> Contoh: Penumpang —(memesan)—> Destinasi

![alt text](<images/01 - Pengenalan Data dan Basis Data/image-1.png>)

ERD juga digunakan untuk menentukan Primary Key & Foreign Key.

###### kesimpulanya
- SQL = database pakai tabel
- NoSQL = lebih fleksibel, tidak wajib tabel
- Aljabar relasional = cara matematis memilih baris/kolom
- ERD = blueprint database
