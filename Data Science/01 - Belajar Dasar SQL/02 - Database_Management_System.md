# Database Management System
## A. Mengenal Database Management System (DBMS)
### 1. Sejarah DBMS

* **1950–1960:** Penyimpanan menggunakan magnetic tape (akses berurutan).
* **1960–1970:** HDD mulai digunakan, data bisa diakses langsung.
* **1970:** Edgar F. Codd memperkenalkan konsep data abstraction.
* **1980:** Model relasional mulai digunakan luas; penelitian distributed database.
* **1990:** SQL berkembang, database paralel muncul, internet berkembang.
* **2000:** XML dan XQuery muncul untuk pertukaran & penyimpanan data kompleks.

### 2. Pengertian DBMS

DBMS adalah software yang menjadi perantara antara user dan basis data untuk mengelola, mengakses, dan memanipulasi data dengan lebih mudah, cepat, dan aman.

### 3. Jenis-Jenis DBMS

1. **Hierarchical DBMS** – Struktur parent-child, hubungan one-to-many.
2. **Network DBMS** – Hubungan many-to-many, lebih bebas dari hierarchical.
3. **Relational DBMS (RDBMS)** – Data dalam tabel baris & kolom, menggunakan SQL, paling umum.
4. **Object-Oriented DBMS** – Data berbentuk objek dengan atribut & metode.

### 4. Fungsi Utama DBMS

* Menjaga integritas data.
* Manajemen penyimpanan data.
* Mengelola kamus data.
* Transformasi & presentasi data.
* Menjamin keamanan data.
* Mendukung akses multi-user.
* Menyediakan backup & recovery.
* Mendukung bahasa pemrograman (DDL & DML).
* Menyediakan antarmuka komunikasi.
* Mengelola transaksi agar aman & konsisten.

---

## B. Berbagai Pilihan Database Management System (DBMS)
### 1. DBMS Client vs DBMS Server

* **Client:** Aplikasi yang digunakan pengguna untuk mengakses dan mengelola database (contoh: HeidiSQL, DB Browser SQLite, DBeaver).
* **Server:** Sistem yang melayani permintaan (query) dari client, mengelola penyimpanan, protokol, dan eksekusi data (contoh: MySQL Server, PostgreSQL Server).
* Client mengirim query → Server memproses → hasil ditampilkan kembali ke client.

### 2. Contoh Aplikasi Client dan Kompatibilitas

* **HeidiSQL:** MySQL, MariaDB, PostgreSQL.
* **DB Browser SQLite:** SQLite.
* **DBeaver:** MySQL, MariaDB, PostgreSQL, SQLite, dan banyak lainnya.

### 3. MySQL

* RDBMS populer untuk aplikasi web.
* Dapat digunakan lewat HeidiSQL, phpMyAdmin, DBeaver.
* Instalasi: unduh MySQL Installer → pilih paket → set password root → konfigurasi → selesai.

### 4. PostgreSQL

* RDBMS open source kelas enterprise.
* Mendukung SQL & JSON (relasional + NoSQL).
* Digunakan untuk aplikasi web, mobile, analitik, geospasial.
* Contoh tipe data: Boolean, CHAR/VARCHAR/TEXT, INT/FLOAT, DATE/TIME, ARRAY.

### 5. DBeaver

* Aplikasi client universal untuk berbagai jenis database relasional & NoSQL.
* Instalasi mudah, menyediakan GUI lengkap.

### 6. SQLite

* DBMS **serverless** (tanpa server).
* Aplikasi langsung membaca file database.
* Cocok untuk aplikasi ringan & belajar SQL.
* Tipe data: TEXT, INTEGER, REAL.
* Tools umum: DB Browser for SQLite, DBeaver.

### 7. DB Browser for SQLite

* Aplikasi GUI yang mudah digunakan untuk membuat & mengedit database SQLite.
* Ringan, open source, cocok untuk pemula.
* Instalasi simpel: unduh → klik Next → selesai.

---

## C. Eksplorasi Penggunaan DBMS di Industri
### Peran DBMS di Industri
DBMS memiliki peran penting dalam berbagai sektor industri untuk mengelola, menyimpan, dan menampilkan data secara akurat dan real-time. Berikut ringkasan penerapannya:

### 1. Sistem Rekam Medis

* DBMS mengintegrasikan data kesehatan.
* Data otomatis muncul ketika barcode dipindai, misalnya status vaksin.

### 2. Platform Travel

* Mengelola proses reservasi hotel, transportasi, hingga penggunaan kode promo.
* Memastikan data pengguna tidak tertukar dengan pengguna lainnya.

### 3. Perusahaan Transportasi Online

* Mengirimkan data driver (nama, plat, jenis kendaraan) ke pengguna.
* Mengirimkan data penumpang ke driver.
* Semua pertukaran data dikelola oleh DBMS.

### 4. Marketplace

* Mengelola persediaan secara otomatis.
* Contoh: stok berkurang ketika pembeli checkout.

### 5. Sistem Perpustakaan Nasional (iPusnas)

* Menyimpan daftar buku dan data peminjam skala nasional.
* DBMS diperlukan agar data tetap terkelola dengan baik meski jumlahnya besar.

DBMS digunakan di banyak industri lainnya seperti perbankan, e-commerce, logistik, pendidikan, dan pemerintahan karena kemampuannya mengelola data dalam jumlah besar secara efisien.
