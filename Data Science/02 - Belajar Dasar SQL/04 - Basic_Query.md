# Basic Query
- https://www.kaggle.com/datasets

## A. Pengenalan Basic Query
- CREATE digunakan untuk membuat tabel baru di dalam database.
- Tabel adalah struktur data yang menyimpan informasi dalam bentuk baris dan kolom.

1. Siapkan DB Browser for SQLite sebagai alat untuk menjalankan query.
2. Unduh dataset Shinkansen Station (CSV atau Kaggle) sebagai sumber latihan.
  - [https://drive.google.com/file/d/1VCXMSxEFkcLzYkscHiRqcXutNYj7AapZ/view?usp=sharing](https://drive.google.com/file/d/1VCXMSxEFkcLzYkscHiRqcXutNYj7AapZ/view?usp=sharing)
  - [https://www.kaggle.com/datasets/japandata509/shinkansen-stations-in-japan](https://www.kaggle.com/datasets/japandata509/shinkansen-stations-in-japan)

3. Buat tabel (CREATE TABLE) minimal 10 baris berdasarkan dataset yang dipilih.
Kolom yang digunakan:
- Station_Name
- Shinkansen_Line	Year	Prefecture	Distance from Tokyo st	Company
- Year
- Prefecture
- Distance from Tokyo st
- Company

```sql
CREATE TABLE shinkansen_stations (
    Station_Name CHAR NOT NULL,
    Shinkanses_Line CHAR NOT NULL,
    Year INT NOT NULL,
    Prerfecture CHAR NOT NULL,
    Distance_From_Tokyo NUMERIC,
    Company CHAR
)
```

4. tambahkan data ke dalam tabel dengan copy paste dari dataset yang sudah diunduh.

| Station_Name | Shinkansen_Line        | Year | Prefecture | Distance from Tokyo st | Company     |
|--------------|------------------------|------:|------------|------------------------:|-------------|
| Tokyo        | Tokaido_Shinkansen     | 1964 | Tokyo      | 0.0                     | JR_Central  |
| Shinagawa    | Tokaido_Shinkansen     | 2003 | Tokyo      | 6.8                     | JR_Central  |
| Shin-Yokohama| Tokaido_Shinkansen     | 1964 | Kanagawa   | 28.8                    | JR_Central  |
| Odawara      | Tokaido_Shinkansen     | 1964 | Kanagawa   | 83.9                    | JR_Central  |
| Atami        | Tokaido_Shinkansen     | 1964 | Shizuoka   | 104.6                   | JR_Central  |
| Mishima      | Tokaido_Shinkansen     | 1969 | Shizuoka   | 120.7                   | JR_Central  |
| Shin-Fuji    | Tokaido_Shinkansen     | 1988 | Shizuoka   | 146.2                   | JR_Central  |
| Shizuoka     | Tokaido_Shinkansen     | 1964 | Shizuoka   | 180.2                   | JR_Central  |
| Kakegawa     | Tokaido_Shinkansen     | 1988 | Shizuoka   | 229.3                   | JR_Central  |
| Hamamatsu    | Tokaido_Shinkansen     | 1964 | Shizuoka   | 257.1                   | JR_Central  |

> Semua kolom diatur sebagai NOT NULL.
Setelah tabel siap, Anda bisa mulai mempraktikkan basic query di modul ini.

## B. INSERT
- INSERT digunakan untuk menambahkan baris baru ke dalam tabel.

```sql
INSERT INTO shinkansen_stations
(Station_Name,Shinkanses_Line,Year,Prerfecture,Distance_From_Tokyo,Company)
VALUES
('Toyohashi','Tokaido_Shinkansen',1964,'Aichi',293.6,'JR_Central'),
('Mikawa-Anjo','Tokaido_Shinkansen',1988,'Aichi',336.3,'JR_Central')
```

## C. SELECT & FROM
- SELECT digunakan untuk memilih kolom yang ingin ditampilkan.
- FROM digunakan untuk menentukan tabel sumber data.

```sql
select * FROM shinkansen_stations;
select Station_Name FROM shinkansen_stations;
```

## D. WHERE
- WHERE digunakan untuk memfilter baris berdasarkan kondisi tertentu.


```sql
-- Numeric
select * from shinkansen_stations
WHERE Distance_From_Tokyo = 229.3;

-- Non-numeric
select * from shinkansen_stations
WHERE Prerfecture == "Kanagawa";

-- Tantangan Implementasi Non-numeric
select * from shinkansen_stations
WHERE Station_Name = "Atami";
```

## E. AND, OR, NOT
- AND digunakan untuk menggabungkan dua kondisi yang harus terpenuhi.
- OR digunakan untuk menggabungkan dua kondisi dimana salah satu harus terpenuhi.
- NOT digunakan untuk membalikkan kondisi.

| Operator     | Deskripsi                          |
|--------------|------------------------------------|
| =            | Sama dengan                        |
| <> / !=      | Tidak sama dengan                  |
| >            | Lebih besar dari                   |
| <            | Lebih kecil dari                   |
| >=           | Lebih besar atau sama dengan       |
| <=           | Lebih kecil atau sama dengan       |

```sql
-- WHERE - AND
select * from shinkansen_stations
WHERE Year = '1964'
AND Prerfecture = "Shizuoka";

-- WHERE - OR
select * from shinkansen_stations
WHERE Prerfecture = "Tokyo"
OR Prerfecture = "Aichi";

-- WHERE - NOT
select * from shinkansen_stations
WHERE NOT Year = '1964';
```

### Tantangan Implementasi AND, OR, NOT
```sql
-- AND
select * from shinkansen_stations
WHERE Prerfecture = "Shizuoka"
AND Year = "1988";

-- OR
select * from shinkansen_stations
WHERE Prerfecture = "Shizuoka"
OR Prerfecture = "Kanagawa";

-- NOT
select * from shinkansen_stations
WHERE NOT Year = "1988";
```

## F. LIKE
- LIKE digunakan untuk mencari pola tertentu dalam kolom teks.
- Operator LIKE digunakan dalam pernyataan WHERE untuk mencari pola yang ditentukan pada kolom.
- Ada dua pola yang sering digunakan bersama operator LIKE.
  - Tanda persen (%) mewakili nol, satu, atau beberapa karakter.
  - Tanda garis bawah ( _ ) mewakili satu karakter tunggal.

| Pola LIKE                      | Deskripsi                                                                                  |
|---------------------------------|-------------------------------------------------------------------------------------------|
| `WHERE (nama kolom) LIKE 'a%'`   | Mencari nilai pada kolom yang dimulai dengan huruf "a" (atau huruf lain sesuai kebutuhan).|
| `WHERE (nama kolom) LIKE '%a'`   | Mencari nilai pada kolom yang diakhiri dengan huruf "a".                                 |
| `WHERE (nama kolom) LIKE '%or%'` | Mencari nilai pada kolom yang mengandung huruf "or" di mana saja.                        |
| `WHERE (nama kolom) LIKE '_r%'`  | Mencari nilai pada kolom yang karakter keduanya adalah "r".                              |
| `WHERE (nama kolom) LIKE 'a_%'`  | Mencari nilai pada kolom yang dimulai dengan "a" dan minimal dua karakter.               |
| `WHERE (nama kolom) LIKE 'a__%'` | Mencari nilai pada kolom yang dimulai dengan "a" dan minimal tiga karakter.              |
| `WHERE (nama kolom) LIKE 'a%o'`  | Mencari nilai pada kolom yang dimulai dengan "a" dan diakhiri dengan "o".                |

```sql
-- contoh LIKE
select * from shinkansen_stations
WHERE Prerfecture like 't%'

-- tantangan implementasi LIKE
select * from shinkansen_stations
WHERE Station_Name like '_a%'
```

## G. ALIAS
- ALIAS digunakan untuk memberikan nama sementara pada kolom atau tabel dalam hasil query.

```sql
-- contoh ALIAS
SELECT Prerfecture as wilayah
FROM shinkansen_stations;

-- tantangan implementasi ALIAS
SELECT Station_Name as nama_stasiun, Year as tahun,
Distance_From_Tokyo as jarak_dari_tokyo
FROM shinkansen_stations;
```

## H. UPDATE
- UPDATE digunakan untuk mengubah data yang sudah ada di dalam tabel.

```sql
-- contoh UPDATE
UPDATE shinkansen_stations
SET Distance_From_Tokyo = 29.05
WHERE Station_Name = "Tokyo";

-- tantangan implementasi UPDATE
UPDATE shinkansen_stations
SET Station_Name = "Bandung"
WHERE Station_Name = "Atami";
```

## I. ORDER BY
- ORDER BY digunakan untuk mengurutkan hasil query berdasarkan satu atau lebih kolom.
- Secara default, ORDER BY mengurutkan hasil dalam urutan menaik (ASC).
  - ASC: Ascending (menaik)
  - DESC: Descending (menurun)
- Jika ingin mengurutkan berdasarkan beberapa kolom, pisahkan nama kolom dengan koma.

```sql
-- contoh ORDER BY
SELECT *
FROM shinkansen_stations
ORDER BY Station_Name;

SELECT *
FROM shinkansen_stations
ORDER BY Station_Name ASC;

-- tantangan implementasi ORDER BY
SELECT *
FROM shinkansen_stations
ORDER BY Prerfecture DESC;
```

## J. LIMIT
- LIMIT digunakan untuk membatasi jumlah baris yang dikembalikan oleh query.

```sql
-- contoh LIMIT
SELECT *
FROM shinkansen_stations
LIMIT 5;

-- tantangan implementasi LIMIT
SELECT *
FROM shinkansen_stations
ORDER BY Station_Name DESC limit 7;
```

## K. OFFSET
- OFFSET digunakan untuk melewati sejumlah baris sebelum mulai mengembalikan hasil query.

```sql
-- contoh OFFSET
SELECT *
FROM shinkansen_stations
LIMIT 5;

SELECT *
FROM shinkansen_stations
LIMIT 5 OFFSET 1;

-- Tantangan Implementasi OFFSET
SELECT *
FROM shinkansen_stations
LIMIT 7 OFFSET 3;
```

## L. DELETE
- DELETE digunakan untuk menghapus baris dari tabel berdasarkan kondisi tertentu.

```sql
-- contoh DELETE
DELETE FROM shinkansen_stations
WHERE Prerfecture = "Aichi";

-- Tantangan Implementasi DELETE
DELETE FROM shinkansen_stations;
```

## M. Latihan Basic Query
```sql
DROP TABLE Traveler_Trip
CREATE TABLE Traveler_Trip (
  trip_id NUMBER NOT NULL UNIQUE,
  tujuan CHAR NOT NULL,
  durasi_liburan INT NOT NULL,
  nama_traveler CHAR NOT NULL,
  jenis_kelamin TEXT CHECK (jenis_kelamin IN ('Laki-Laki', 'Perempuan')) NOT NULL,
  kewarnegaraan CHAR NOT NULL
)
```

```sql
INSERT INTO Traveler_Trip
(trip_id, tujuan, durasi_liburan, nama_traveler, jenis_kelamin, kewarnegaraan)
VALUES
(1, 'London, UK', 7, 'John Smith', 'Laki-Laki', 'American'),
(2, 'Phuket, Thailand', 5, 'Jane Doe', 'Perempuan', 'Canadian'),
(3, 'Bali, Indonesia', 7, 'David Lee', 'Laki-Laki', 'Korean'),
(4, 'New York, USA', 14, 'Sarah Johnson', 'Perempuan', 'British'),
(5, 'Tokyo, Japan', 7, 'Kim Nguyen', 'Perempuan', 'Vietnamese'),
(6, 'Paris, France', 5, 'Michael Brown', 'Laki-Laki', 'American'),
(7, 'Sydney, Australia', 10, 'Emily Davis', 'Perempuan', 'Australian'),
(8, 'Rio de Janeiro, Brazil', 7, 'Lucas Santos', 'Laki-Laki', 'Brazilian'),
(9, 'Amsterdam, Netherlands', 7, 'Laura Janssen', 'Perempuan', 'Dutch'),
(10, 'Dubai, United Arab Emirates', 7, 'Mohammed Ali', 'Laki-Laki', 'Emirati');
```

```sql
SELECT * FROM Traveler_Trip LIMIT 5;
```

## Rangkuman Basic Query
| Statement       | Query                                                                                      | Deskripsi                                               |
|-----------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------|
| INSERT          | `INSERT INTO nama_tabel (nama_kolom1, nama_kolom2, ...) VALUES ('values1','values2', ...);` | Menambahkan data pada tabel yang telah dibuat sebelumnya. |
| SELECT & FROM   | `SELECT kolom(s) FROM nama_tabel;` or `SELECT * FROM nama_tabel;`                          | Memilih seluruh (`*`) atau sebagian kolom dari tabel.   |
| WHERE           | `SELECT * FROM nama_tabel WHERE nama_kolom = 'value';`                                     | Memfilter baris sesuai kondisi tertentu.                |
| ALIAS           | `SELECT nama_kolom AS nama_alias FROM nama_tabel;`<br>`SELECT nama_kolom FROM nama_tabel AS nama_alias;` | Mengganti nama kolom atau tabel sementara pada hasil.   |
| UPDATE          | `UPDATE nama_tabel SET nama_kolom = newvalue WHERE nama_kolom = somevalue;`                | Mengubah nilai pada baris yang sudah ada.               |
| ORDER BY        | `SELECT * FROM nama_tabel ORDER BY nama_kolom ASC;`<br>`SELECT * FROM nama_tabel ORDER BY nama_kolom DESC;` | Mengurutkan hasil (ASC = naik, DESC = turun).           |
| LIMIT           | `SELECT * FROM nama_tabel LIMIT jumlah_data;`                                              | Membatasi jumlah baris yang dikembalikan.               |
| OFFSET          | `SELECT * FROM nama_tabel LIMIT jumlah_data OFFSET jumlah_baris_terlewati;`                | Menetapkan posisi awal pengambilan (paging).            |
| DELETE          | `DELETE FROM nama_tabel WHERE nama_kolom = 'value';`                                       | Menghapus satu atau beberapa baris berdasarkan kondisi. |
