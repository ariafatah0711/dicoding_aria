# Basic Query
## A. Pengenalan Basic Query
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

```bash
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
