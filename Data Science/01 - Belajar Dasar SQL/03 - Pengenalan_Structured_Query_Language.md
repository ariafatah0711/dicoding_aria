# Pengenalan Structured Query Language
## A. Mengenal Teori Structured Query Language (SQL)
### 1. Pengantar

Modul ini membahas dasar-dasar SQL, meliputi teori SQL, DDL, DML, constraints, dan diagram SQL.

### 2. Sejarah SQL

* **1970**: Dr. E. F. Codd dari IBM memperkenalkan model data relasional dan bahasa DSL/Alpha.
* IBM mengembangkan **System R**, yang kemudian memunculkan bahasa SQUARE → SEQUEL → SQL.
* **1986**: SQL menjadi standar resmi ANSI, diperbarui pada 1989, 1992, dan 1999.
* SQL tetap digunakan karena stabil, mudah dipahami, dan kompatibel di berbagai DBMS.

### 3. Data Definition Language (DDL)

DDL digunakan untuk membangun struktur dasar database seperti tabel, skema, dan indeks.
Perintah utama:

* **CREATE TABLE** – membuat tabel baru.
* **DROP TABLE** – menghapus tabel.
* **CREATE VIEW** – membuat view sebagai representasi virtual dari data.

### 4. Data Manipulation Language (DML)

DML digunakan untuk memanipulasi data dalam tabel.
Perintah utama:

* **INSERT** – menambahkan data baru.
* **SELECT** – mengambil dan menampilkan data.
* **UPDATE** – memperbarui data.
* **DELETE** – menghapus data.

---

## B. Data Definition Language (DDL)

### 1. Pengantar

DDL adalah sub-perintah SQL yang digunakan untuk membangun kerangka dasar basis data. Pada modul ini Anda mempelajari CREATE TABLE, DROP TABLE, dan VIEW.

### 2. CREATE TABLE & Tabel
![alt text](<images/03 - Pengenalan_Structured_Query_Language/image.png>)

* Tabel adalah struktur utama dalam basis data yang berisi kolom dan baris.
* Contoh tabel: daftar_bus berisi nama bus dan tujuan.
* Tabel dapat diimplementasikan di berbagai aplikasi seperti jadwal bus, Spotify (title, album, duration), dan playlist YouTube.

#### Tipe Data Utama

* INT, CHAR/TEXT, BOOLEAN, FLOAT.
* **NULL**: nilai kosong.
* **NOT NULL (NN)**: kolom wajib memiliki nilai.
* **UNIQUE (U)**: nilai harus unik.
* **Primary Key (PK)**: identifikasi unik baris.
* **Foreign Key (FK)**: referensi ke primary key tabel lain.
* **AUTO INCREMENT (AI)**: nilai bertambah otomatis.

Catatan perbedaan umum antar DBMS:

- SQLite: pengetikan dinamis; `INTEGER PRIMARY KEY` membuat kolom menjadi alias `rowid` dan bertambah otomatis. Gunakan `AUTOINCREMENT` hanya jika benar-benar diperlukan.
- MySQL/MariaDB: gunakan `AUTO_INCREMENT`.
- PostgreSQL: gunakan `GENERATED ... AS IDENTITY` (standar) atau tipe lama `SERIAL`.

#### Konsep Kunci: Constraints

- **PRIMARY KEY**: memastikan keunikan dan tidak NULL untuk baris.
- **FOREIGN KEY**: menjaga relasi antar tabel; bisa diberi aksi `ON UPDATE`/`ON DELETE` (CASCADE/RESTRICT/SET NULL).
- **UNIQUE**: mencegah duplikasi nilai pada kolom/kolom gabungan.
- **NOT NULL**: mencegah kolom bernilai NULL.
- **CHECK**: validasi nilai (misal usia >= 0). Didukung SQLite modern.
- **DEFAULT**: nilai bawaan saat tidak diberikan.

#### Sintaks Umum CREATE TABLE (contoh lintas DBMS)

```sql
CREATE TABLE penumpang (
		id              INTEGER PRIMARY KEY,
		nama_depan      TEXT NOT NULL,
		nama_belakang   TEXT,
		jenis_kelamin   TEXT CHECK (jenis_kelamin IN ('L','P')),
		umur            INTEGER CHECK (umur >= 0),
		riwayat_penyakit TEXT DEFAULT 'Tidak Ada',
		departure       TEXT NOT NULL,
		arrival         TEXT NOT NULL
);
```

Contoh relasi dengan tabel lain (SQLite):

```sql
PRAGMA foreign_keys = ON; -- aktifkan FK di SQLite

CREATE TABLE rute (
		kode_rute   TEXT PRIMARY KEY,
		asal        TEXT NOT NULL,
		tujuan      TEXT NOT NULL
);

CREATE TABLE tiket (
		id_tiket     INTEGER PRIMARY KEY,
		penumpang_id INTEGER NOT NULL,
		kode_rute    TEXT NOT NULL,
		harga        INTEGER CHECK (harga > 0),
		FOREIGN KEY (penumpang_id) REFERENCES penumpang(id) ON DELETE CASCADE,
		FOREIGN KEY (kode_rute)    REFERENCES rute(kode_rute)
);
```

#### ALTER TABLE (ubah struktur)

- Tambah kolom: didukung luas.
- Ganti nama tabel/kolom: didukung SQLite versi modern (`RENAME TO`, `RENAME COLUMN`).
- Ubah tipe/hapus kolom: dukungan bervariasi; di SQLite sering perlu membuat tabel baru dan salin data.

Contoh (SQLite):

```sql
-- tambah kolom
ALTER TABLE penumpang ADD COLUMN email TEXT UNIQUE;

-- ganti nama kolom (SQLite 3.25+)
ALTER TABLE penumpang RENAME COLUMN email TO surel;

-- ganti nama tabel
ALTER TABLE penumpang RENAME TO penumpang_v2;
```

#### INDEX (untuk mempercepat query)

- Indeks mempercepat pencarian/penyortiran pada kolom yang sering dipakai di `WHERE`, `JOIN`, `ORDER BY`.
- Gunakan secukupnya; indeks memperlambat `INSERT/UPDATE/DELETE` dan memakan ruang.

Contoh:

```sql
CREATE INDEX idx_penumpang_departure_arrival
	ON penumpang (departure, arrival);

-- indeks unik (mencegah duplikasi kombinasi nilai)
CREATE UNIQUE INDEX idx_rute_asal_tujuan
	ON rute (asal, tujuan);
```

#### Contoh Praktik

Membuat tabel penumpang dengan kolom nomor, nama, jenis kelamin, usia, dan riwayat penyakit menggunakan DB Browser for SQLite.

Latihan cepat (DDL):

1) Buat tabel `kelas` dengan kolom: `kode` (TEXT PK), `nama` (TEXT NOT NULL UNIQUE), `kapasitas` (INTEGER CHECK(kapasitas > 0)).

```sql
CREATE TABLE kelas (
	kode TEXT PRIMARY KEY,
	nama TEXT NOT NULL UNIQUE,
	kapasitas INTEGER CHECK (kapasitas > 0)
);
```

2) Tambahkan kolom `keterangan` (TEXT) ke tabel `kelas` lalu ganti nama kolom `keterangan` menjadi `catatan`.

```sql
ALTER TABLE kelas ADD COLUMN keterangan TEXT;
ALTER TABLE kelas RENAME COLUMN keterangan TO catatan;
```

3) Buat indeks pada `penumpang(departure, arrival)` dan uji dengan query `WHERE departure='Jakarta' AND arrival='Bali'`.

#### Latihan Index (praktis, SQLite)

Tujuan: melihat pengaruh indeks saat melakukan filter dan sort.

Langkah:

```sql
-- 1) Buat indeks komposit pada kolom yang sering digunakan untuk filter
CREATE INDEX IF NOT EXISTS idx_penumpang_dep_arr
	ON penumpang (departure, arrival);

-- 2) Uji query dengan kondisi yang sesuai indeks
SELECT * FROM penumpang
WHERE departure = 'Jakarta' AND arrival = 'Bali'
ORDER BY umur DESC;

-- 3) Buat indeks untuk penyortiran kolom umur (opsional)
CREATE INDEX IF NOT EXISTS idx_penumpang_umur ON penumpang (umur);

-- 4) Uji penyortiran
SELECT nama_depan, umur FROM penumpang
ORDER BY umur ASC LIMIT 10;

-- 5) Jika indeks tidak diperlukan lagi, hapus
DROP INDEX IF EXISTS idx_penumpang_umur;
```

Catatan:
- Indeks berguna untuk `WHERE`, `JOIN`, dan `ORDER BY`. Hindari membuat indeks berlebihan.
- Di SQLite, gunakan `EXPLAIN QUERY PLAN <query>;` untuk melihat apakah indeks dipakai.

### 3. DROP TABLE

* `DROP TABLE` digunakan untuk menghapus tabel dari basis data.
* Gunakan `IF EXISTS` untuk menghindari error jika tabel belum ada.
* Hati-hati: menghapus tabel akan menghapus semua data di dalamnya.

Contoh:

```sql
DROP TABLE IF EXISTS tiket;
DROP TABLE IF EXISTS penumpang;
```

### 4. VIEW

* VIEW adalah tabel virtual yang muncul hanya saat digunakan dalam query.
* Tujuan penggunaan VIEW:

  * Menyederhanakan query kompleks.
  * Menyembunyikan data sensitif.
  * Mengurangi dampak perubahan struktur tabel.
* VIEW bertindak seperti subquery yang dapat dipanggil menggunakan SELECT.

Contoh membuat VIEW (SQLite):

```sql
CREATE VIEW v_ringkasan_tiket AS
SELECT t.id_tiket,
			 p.nama_depan || ' ' || COALESCE(p.nama_belakang,'') AS nama_lengkap,
			 r.asal,
			 r.tujuan,
			 t.harga
FROM tiket t
JOIN penumpang p ON p.id = t.penumpang_id
JOIN rute r ON r.kode_rute = t.kode_rute;

-- pakai view seperti tabel
SELECT * FROM v_ringkasan_tiket WHERE tujuan = 'Bali';
```

### latihan
```bash
CREATE TABLE "penumpang" (
	"nama_depan"	CHAR,
	"nama_belakang"	CHAR,
	"umur"	INTEGER,
	"riwayat_penyakit"	CHAR,
	"departure"	CHAR,
	"arrival"	CHAR
);
```
nama_depan| Nama Belakang | UMUR | Riwayat Penyakit | Departure | Arrival |
|------------|---------------|------|------------------|-----------|---------|
| Sri        | Rahma         | 20   | Vertigo          | Jakarta   | Bali    |
| Albila     | Subagja       | 13   | Tidak Ada        | Jakarta   | Surabaya|
| Banu       | Wiranata      | 24   | Maag             | Surabaya  | Bali    |
| Yudistira  | Prawira       | 10   | Tidak Ada        | Jakarta   | Bali    |
| Wiguna     | Adi           | 19   | Bronkitis        | Surabaya  | Bali    |
| Triwijaya  | Galuh         | 17   | Tidak Ada        | Jakarta   | Surabaya|

---

## C. Data Manipulation Language
DML adalah sub-perintah SQL yang digunakan untuk memanipulasi data dalam tabel. Empat perintah utamanya adalah SELECT, INSERT, DELETE, dan UPDATE.

> Catatan: sebagian literatur mengelompokkan `SELECT` sebagai DQL (Data Query Language). Dalam praktik pembelajaran dasar, `SELECT` sering dibahas bersama DML.

### 1. SELECT

* Digunakan untuk mengambil dan menampilkan data.
* `SELECT *` menampilkan semua kolom; dapat juga memilih kolom tertentu.
* Dapat digabungkan dengan `WHERE` untuk menampilkan data spesifik.
* Tipe data teks harus memakai tanda petik satu, numerik tidak.

Klausa penting:

- `WHERE` dengan operator: `=`, `<>`, `>`, `>=`, `<`, `<=`, `AND`, `OR`, `NOT`.
- Pencocokan pola: `LIKE` (gunakan `%` dan `_`).
- Himpuan: `IN (...)`, rentang: `BETWEEN a AND b`.
- Nullability: `IS NULL` / `IS NOT NULL`.
- Pengurutan: `ORDER BY kolom [ASC|DESC]`.
- Pembatasan baris: `LIMIT n [OFFSET m]` (SQLite, PostgreSQL) atau `LIMIT m, n` (MySQL).
- Hilangkan duplikasi: `DISTINCT`.

Contoh:

```sql
-- pilih kolom tertentu
SELECT nama_depan, departure, arrival FROM penumpang;

-- filter baris
SELECT * FROM penumpang
WHERE umur BETWEEN 18 AND 25
	AND departure IN ('Jakarta','Surabaya')
ORDER BY arrival ASC
LIMIT 5;

-- pencarian pola nama
SELECT * FROM penumpang WHERE nama_depan LIKE 'A%';
```

Agregasi dan pengelompokan:

```sql
-- hitung jumlah penumpang per tujuan
SELECT arrival, COUNT(*) AS jumlah
FROM penumpang
GROUP BY arrival
HAVING COUNT(*) >= 2
ORDER BY jumlah DESC;
```

### 2. INSERT

* Digunakan untuk menambahkan baris baru ke dalam tabel.
* Urutan nilai harus sesuai urutan kolom.
* Mendukung tipe data teks maupun numerik.

Contoh:

```sql
-- selalu sebutkan kolom untuk lebih aman
INSERT INTO penumpang (nama_depan, nama_belakang, umur, riwayat_penyakit, departure, arrival)
VALUES ('Aria', 'Fatah', 19, 'Tidak Ada', 'Depok', 'Jakarta');

-- multi-baris sekaligus
INSERT INTO penumpang (nama_depan, umur, riwayat_penyakit, departure, arrival)
VALUES
	('Bima', 22, 'Maag', 'Jakarta', 'Bali'),
	('Citra', 20, 'Tidak Ada', 'Surabaya', 'Bali');
```

### 3. DELETE

* Digunakan untuk menghapus baris tertentu dalam tabel.
* Harus menggunakan `WHERE` agar tidak menghapus seluruh data.
* Berbeda dengan `DROP TABLE`, yang menghapus seluruh struktur tabel.

Contoh dan tips aman:

```sql
-- selalu uji dulu dengan SELECT baris yang akan terhapus
SELECT * FROM penumpang WHERE umur = 24;

-- baru eksekusi DELETE jika sudah yakin
DELETE FROM penumpang WHERE umur = 24;
```

### 4. UPDATE

* Digunakan untuk memperbarui nilai pada kolom tertentu dalam baris.
* Gunakan `WHERE` agar perubahan tidak diterapkan ke semua baris.
* Perintah `SET` menentukan kolom mana yang diperbarui.

Contoh:

```sql
-- update satu kolom berdasarkan kondisi
UPDATE penumpang
SET arrival = 'Depok'
WHERE umur = 20;

-- update beberapa kolom sekaligus
UPDATE penumpang
SET riwayat_penyakit = 'Tidak Ada', departure = 'Jakarta'
WHERE nama_depan = 'Banu';
```

### 5. TRANSAKSI (BEGIN/COMMIT/ROLLBACK)

Gunakan transaksi untuk operasi yang saling terkait agar konsisten:

```sql
BEGIN TRANSACTION;
	INSERT INTO penumpang (nama_depan, umur, riwayat_penyakit, departure, arrival)
	VALUES ('Dewi', 21, 'Tidak Ada', 'Jakarta', 'Bali');

	-- misal juga menambah tiket terkait (jika tabel tiket ada)
	-- INSERT INTO tiket (...)
COMMIT;  -- gunakan ROLLBACK; jika ingin membatalkan
```

DML memungkinkan pengambilan, penambahan, penghapusan, dan pembaruan data secara efisien dalam basis data.

Latihan cepat (DML):

- Tambahkan 3 penumpang baru sekaligus ke tabel `penumpang`.
- Tampilkan 5 penumpang termuda menuju `Bali`.
- Perbarui `departure` menjadi `Jakarta` untuk semua penumpang yang `arrival='Bali'` dan `umur>=18`.
- Hapus penumpang yang `umur < 12` (uji dulu dengan SELECT).

Contoh jawaban singkat:

```sql
INSERT INTO penumpang (nama_depan, umur, riwayat_penyakit, departure, arrival) VALUES
('Eka', 18, 'Tidak Ada', 'Jakarta', 'Bali'),
('Fajar', 23, 'Maag', 'Depok', 'Jakarta'),
('Gita', 19, 'Tidak Ada', 'Surabaya', 'Bali');

SELECT * FROM penumpang WHERE arrival='Bali' ORDER BY umur ASC LIMIT 5;

UPDATE penumpang
SET departure = 'Jakarta'
WHERE arrival = 'Bali' AND umur >= 18;

SELECT * FROM penumpang WHERE umur < 12; -- cek dulu
DELETE FROM penumpang WHERE umur < 12;
```

---

## D. Constraints dalam SQL
Constraints adalah aturan atau batasan yang diterapkan pada kolom dalam sebuah tabel untuk menjaga integritas dan kualitas data. Berikut ringkasan jenis-jenis constraints yang umum digunakan:

### 1. NOT NULL

* Memastikan kolom **tidak boleh kosong**.
* NULL ≠ 0; NULL berarti *tidak ada nilai sama sekali*.
* Contoh penggunaan:

  ```sql
  nama VARCHAR(50) NOT NULL
  ```

### 2. UNIQUE

* Menjamin bahwa setiap nilai dalam kolom **harus unik** (tidak boleh duplikat).
* Dapat digunakan pada satu atau beberapa kolom.
* Contoh:

  ```sql
  email VARCHAR(100) UNIQUE
  ```

### 3. PRIMARY KEY

* Identitas unik tiap baris dalam tabel.
* Menggabungkan aturan **NOT NULL + UNIQUE**.
* Hanya ada **satu primary key** per tabel, tetapi dapat terdiri dari satu kolom atau lebih (composite key).
* Contoh:

  ```sql
  id_penumpang INT PRIMARY KEY
  ```
* Contoh composite key:

  ```sql
  PRIMARY KEY (kode_bus, tanggal_berangkat)
  ```

### 4. INDEX

* Digunakan untuk **mempercepat pencarian** data.
* Tidak memengaruhi isi tabel, tetapi membuat struktur tambahan agar pencarian lebih efisien.
* Cocok untuk kolom yang sering digunakan dalam pencarian atau filter.
* Contoh:

  ```sql
  CREATE INDEX warna_bus_idx ON info_bus (warna_bus);
  ```

### latihan
```bash

```
### Latihan Constraints (praktis, SQLite)

Tujuan: mempraktikkan NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY (dengan aksi), CHECK, DEFAULT, serta composite constraints.

Siapkan skema latihan:

```sql
DROP TABLE IF EXISTS pelanggan;
DROP TABLE IF EXISTS pesanan;

CREATE TABLE pelanggan (
	id_pelanggan   INTEGER PRIMARY KEY,
	nama           TEXT NOT NULL,
	email          TEXT UNIQUE,
	umur           INTEGER CHECK (umur >= 0),
	kota           TEXT DEFAULT 'Jakarta'
);

CREATE TABLE pesanan (
	id_pesanan     INTEGER PRIMARY KEY,
	id_pelanggan   INTEGER NOT NULL,
	kode_produk    TEXT NOT NULL,
	jumlah         INTEGER NOT NULL CHECK (jumlah > 0),
	status         TEXT CHECK (status IN ('baru','proses','kirim','selesai')) DEFAULT 'baru',
	FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan)
		ON DELETE CASCADE ON UPDATE CASCADE
);

-- composite uniqueness: kombinasi pelanggan + kode_produk tidak boleh duplikat untuk status 'baru'
CREATE UNIQUE INDEX uniq_pesanan_baru
	ON pesanan (id_pelanggan, kode_produk)
	WHERE status = 'baru';
```

Tantangan:

1) Coba masukkan `nama` kosong (NULL) ke tabel `pelanggan`. Apa yang terjadi? Mengapa?
2) Masukkan 2 baris `email` yang sama. Apa efek constraint?
3) Masukkan `umur` bernilai negatif. Apakah diterima?
4) Tidak mengisi `kota` saat insert. Nilai apa yang tersimpan?
5) Buat beberapa `pesanan` untuk satu `pelanggan`, lalu hapus `pelanggan` tersebut. Apa yang terjadi pada pesanan terkait?
6) Uji composite UNIQUE: tambahkan dua pesanan dengan kombinasi `(id_pelanggan, kode_produk)` sama dan `status='baru'`. Apakah gagal? Ubah salah satunya ke `status='proses'` lalu coba lagi.

Contoh eksekusi dan verifikasi:

```sql
-- 1) NOT NULL pada nama
INSERT INTO pelanggan (nama, email, umur) VALUES (NULL, 'a@x.com', 20); -- expected: error (NOT NULL)

-- 2) UNIQUE pada email
INSERT INTO pelanggan (nama, email, umur) VALUES ('Andi', 'a@x.com', 20);
INSERT INTO pelanggan (nama, email, umur) VALUES ('Budi', 'a@x.com', 22); -- expected: error (UNIQUE)

-- 3) CHECK pada umur
INSERT INTO pelanggan (nama, email, umur) VALUES ('Citra', 'c@x.com', -1); -- expected: error (CHECK)

-- 4) DEFAULT pada kota
INSERT INTO pelanggan (nama, email, umur) VALUES ('Dewi', 'd@x.com', 25);
SELECT nama, kota FROM pelanggan WHERE email='d@x.com'; -- expected: kota = 'Jakarta'

-- siapkan lebih banyak data valid
INSERT INTO pelanggan (nama, email, umur, kota) VALUES ('Eko', 'e@x.com', 30, 'Depok');

-- 5) FOREIGN KEY + ON DELETE CASCADE
INSERT INTO pesanan (id_pelanggan, kode_produk, jumlah) VALUES ( (SELECT id_pelanggan FROM pelanggan WHERE email='e@x.com'), 'P001', 2 );
INSERT INTO pesanan (id_pelanggan, kode_produk, jumlah) VALUES ( (SELECT id_pelanggan FROM pelanggan WHERE email='e@x.com'), 'P002', 1 );

SELECT * FROM pesanan;
DELETE FROM pelanggan WHERE email='e@x.com';
SELECT * FROM pesanan; -- expected: baris terkait pelanggan 'e@x.com' terhapus otomatis

-- 6) Composite UNIQUE bersyarat (partial index)
INSERT INTO pelanggan (nama, email, umur) VALUES ('Fajar', 'f@x.com', 28);
INSERT INTO pesanan (id_pelanggan, kode_produk, jumlah, status)
VALUES ((SELECT id_pelanggan FROM pelanggan WHERE email='f@x.com'), 'P003', 1, 'baru');

-- duplikat kombinasi untuk status 'baru' (harus error)
INSERT INTO pesanan (id_pelanggan, kode_produk, jumlah, status)
VALUES ((SELECT id_pelanggan FROM pelanggan WHERE email='f@x.com'), 'P003', 1, 'baru'); -- expected: error (UNIQUE partial)

-- jika status berbeda, boleh
INSERT INTO pesanan (id_pelanggan, kode_produk, jumlah, status)
VALUES ((SELECT id_pelanggan FROM pelanggan WHERE email='f@x.com'), 'P003', 1, 'proses'); -- expected: OK
```

Catatan:

- Di SQLite, `PRAGMA foreign_keys = ON;` perlu diaktifkan pada sesi untuk menjalankan aksi FK.
- Partial index (UNIQUE dengan `WHERE`) didukung SQLite, PostgreSQL; tidak tersedia di MySQL lama.

---

## #. Pengenalan Diagram dalam SQL
**Ringkasan Pengenalan Diagram dalam SQL**

Diagram dalam SQL digunakan untuk memvisualisasikan struktur data serta hubungan antar tabel. Diagram membantu memahami bagaimana data tersusun di dalam basis data.

### Apa itu Diagram?

Diagram adalah representasi visual untuk menjelaskan suatu hal. Dalam SQL, diagram digunakan untuk melihat struktur tabel dan relasinya.

### Entity Relationship Diagram (ERD)

ERD adalah diagram yang menggambarkan entity (tabel), atribut, dan hubungan antar tabel. Pada level dasar, fokusnya adalah *entity* atau tabel tunggal.

### Diagram Entity

* Mewakili satu tabel dalam basis data.
* Kolom-kolom dalam tabel ditampilkan sebagai atribut.
* PRIMARY KEY ditunjukkan sebagai identitas unik setiap baris.
* Sebuah primary key dapat berupa satu kolom atau lebih (composite key).

### Fungsi Diagram Entity

* Memahami struktur tabel secara visual.
* Menjelaskan atribut penting seperti PRIMARY KEY.
* Menjadi dasar sebelum mempelajari relasi antar tabel dalam ERD lengkap.

Diagram membantu memperjelas bagaimana data disusun dan menjadi fondasi dalam memahami struktur basis data yang lebih kompleks.
