# Machine Learning Workflow
## A. Pengantar Machine Learning Workflow

---

## 01 - Data Collecting
### **1. Komponen Utama Dataset**
Dalam setiap baris data yang kamu kumpulkan, pastikan ada dua bagian ini:

* **Features ():** Variabel input (misal: suhu, usia, durasi).
* **Target ():** Variabel output yang ingin ditebak (misal: beli/tidak, harga, kategori).

### **2. Metode Pengambilan Data (Pilih satu)**
| Metode | Alat (Library Python) | Digunakan Jika... |
| --- | --- | --- |
| **Download Langsung** | `Pandas` | Data sudah tersedia dalam format `.csv`, `.xlsx`, atau `.json` (misal dari Kaggle). |
| **Web Scraping** | `BeautifulSoup`, `Selenium` | Data berada di halaman website dan tidak bisa diunduh langsung. |
| **API Request** | `Requests` | Data disediakan resmi oleh penyedia (Google Maps, Twitter, OpenWeather) dalam format JSON. |

### **3. Struktur Data (Mengenal Format File)**
* **CSV (Comma Separated Values):** Paling umum dan ringan. Mirip tabel Excel tapi dipisahkan tanda koma.
* **JSON:** Format standar API. Bentuknya seperti *dictionary* di Python (ada kunci dan nilai).
* **SQL:** Jika data diambil dari database perusahaan.

### **4. Checklist Sebelum Gas ke Tahap Berikutnya**
Setelah data terkumpul (di- *load* ke codingan), jangan langsung buat model! Lakukan pengecekan cepat ( *Data Auditing* ):
1. **Missing Values:** Cek baris kosong menggunakan `df.isnull().sum()`.
2. **Data Types:** Pastikan angka jangan sampai terbaca teks. Cek pakai `df.info()`.
3. **Jumlah Data:** Apakah sudah cukup mewakili variasi? (Minimal ratusan baris untuk latihan sederhana).
4. **Korelasi:** Apakah fiturnya nyambung dengan target? (Contoh: Menghitung harga rumah tapi datanya warna favorit pemilik, itu tidak relevan).

### **5. Alur Logika Praktik**
1. **Tentukan Masalah:** "Saya mau prediksi stok barang."
2. **Cari Sumber:** "Data ada di file Excel gudang."
3. **Eksekusi:** Gunakan Python untuk baca file tersebut.
4. **Validasi:** "Oh, ternyata ada data tanggal yang formatnya berantakan, harus diperbaiki."

---

## 02. Data Loading
### 1. CSV (Comma-Separated Values)
- **Ekstensi:** `.csv`
- **Deskripsi:** Format file umum untuk data tabular, setiap baris adalah record, dipisahkan koma atau delimiter lain.
- **Cara Load:**
  ```python
  pd.read_csv('file.csv')
  ```

### 2. Excel Files
- **Ekstensi:** `.xls`, `.xlsx`
- **Deskripsi:** Format spreadsheet, bisa membaca berbagai sheet.
- **Cara Load:**
  ```python
  pd.read_excel('file.xlsx')
  ```

### 3. JSON (JavaScript Object Notation)
- **Ekstensi:** `.json`
- **Deskripsi:** Format data berbasis objek, sering untuk transfer data.
- **Cara Load:**
  ```python
  pd.read_json('file.json')
  ```

### 4. HTML
- **Ekstensi:** `.html`
- **Deskripsi:** Membaca tabel data dari file HTML, sering untuk web scraping.
- **Cara Load:**
  ```python
  pd.read_html('file.html')
  ```

### 5. SQL Database
- **Ekstensi:** Tidak ada, data dari database.
- **Deskripsi:** Mengakses data dari tabel SQL ke DataFrame.
- **Cara Load:**
  ```python
  pd.read_sql_query('SELECT * FROM table_name', connection)
  ```

### 6. Parquet
- **Ekstensi:** `.parquet`
- **Deskripsi:** Format efisien untuk data kolumnar, sering di big data.
- **Cara Load:**
  ```python
  pd.read_parquet('file.parquet')
  ```

### 7. HDF5 (Hierarchical Data Format)
- **Ekstensi:** `.h5`, `.hdf5`
- **Deskripsi:** Format untuk data besar dan terstruktur.
- **Cara Load:**
  ```python
  pd.read_hdf('file.h5')
  ```

### 8. Feather
- **Ekstensi:** `.feather`
- **Deskripsi:** Format cepat dan efisien untuk data tabular.
- **Cara Load:**
  ```python
  pd.read_feather('file.feather')
  ```

### 9. Stata
- **Ekstensi:** `.dta`
- **Deskripsi:** Format statistik dari software Stata.
- **Cara Load:**
  ```python
  pd.read_stata('file.dta')
  ```

### 10. SAS (Statistical Analysis System)
- **Ekstensi:** `.sas7bdat`
- **Deskripsi:** Format statistik dari software SAS.
- **Cara Load:**
  ```python
  pd.read_sas('file.sas7bdat')
  ```

### 11. SPSS (Statistical Package for the Social Sciences)
- **Ekstensi:** `.sav`
- **Deskripsi:** Format statistik dari software SPSS.
- **Cara Load:**
  ```python
  pd.read_spss('file.sav')
  ```

### 12. Pickle
- **Ekstensi:** `.pkl`
- **Deskripsi:** Format serialisasi Python untuk objek DataFrame.
- **Cara Load:**
  ```python
  pd.read_pickle('file.pkl')
  ```

### 13. ORC (Optimized Row Columnar)
- **Ekstensi:** `.orc`
- **Deskripsi:** Format kolumnar untuk Hadoop.
- **Cara Load:**
  ```python
  pd.read_orc('file.orc')
  ```

### 14. SQLite
- **Ekstensi:** `.db`, `.sqlite`
- **Deskripsi:** Database ringan dan file-based.
- **Cara Load:**
  ```python
  pd.read_sql_table('table_name', connection)
  ```

### 15. LaTeX
- **Ekstensi:** `.tex`
- **Deskripsi:** Membaca/menulis tabel LaTeX untuk dokumen akademik.
- **Cara Load:**
  ```python
  pd.read_stata('file.tex')
  ```

### 16. Clipboard
- **Ekstensi:** Tidak ada, data dari clipboard.
- **Deskripsi:** Membaca data langsung dari clipboard (copy-paste).
- **Cara Load:**
  ```python
  pd.read_clipboard()
  ```

## 03 - Data Cleaning dan Transformation
merupakan tahap penting setelah data di-*load*. Beberapa langkah umum meliputi:
1. **Menangani Missing Values:** Isi nilai kosong dengan rata-rata, median, modus, atau hapus baris/kolom.
2. **Menghapus Duplikasi:** Gunakan `df.drop_duplicates()` untuk menghilangkan
    data yang sama.
3. **Normalisasi/Standarisasi:** Skala fitur numerik agar berada dalam rentang yang sama.
4. **Encoding Kategori:** Ubah data kategori menjadi numerik menggunakan One-Hot Encoding atau Label Encoding.
5. **Transformasi Data:** Terapkan log-transformasi atau polynomial features jika diperlukan.
