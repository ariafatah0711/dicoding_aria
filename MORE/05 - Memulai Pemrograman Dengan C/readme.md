# Mengenal Bahasa C 
- Bahasa C dikembangkan oleh Dennis M. Ritchie dan Brian W. Kernighan pada awal tahun 1970. Bahasa C berkembang di lingkungan UNIX (±90% sistem operasi UNIX ditulis dalam bahasa C).
- Terdapat beberapa standar untuk bahasa C, standar di sini dapat diartikan sebagai guideline dalam menuliskan bahasa C. Beberapa Standar yang ada:
    - Definisi Kernighan & Ritchie (K&R),
    - ANSI-C (X-3.159 -1989-),
    - Definisi AT&T (untuk superset C, C++), dan
    - GNU Coding Standards.

Versi pada PC misalnya:
    - Lattice C,
    - Microsoft C/Microsoft QuickC, dan
    - Turbo C/Borland C++.

- Pada tahun 1986, dikembangkan superset C (kompatibel dengan C, namun dilengkapi dengan kemampuan pemrograman berorientasi objek) oleh Bjarne Stroustrup [Stroustrup-86], yaitu bahasa C++ (C with Class).

## Aplikasi dalam bahasa C
- Bahasa C banyak dipakai untuk:
    - Membuat sistem operasi dan program-program sistem.
    - Pemrograman yang "dekat" ke perangkat keras (misalnya untuk kontrol peralatan).
    - Membuat tool kit.
    - Menulis program aplikasi.

- Kelebihan bahasa C, sehingga terpilih untuk aplikasi-aplikasi tersebut, adalah kemampuannya untuk membuat kode yang compact, efisien tanpa mengorbankan readability (beda dengan bahasa assembly yang efisien namun susah dibaca, atau bahasa tingkat tinggi lain yang enak dibaca namun tidak efisien). Walaupun tak dapat diingkari bahwa program dalam bahasa C lebih sulit dibaca (karena compact) dibandingkan dengan bahasa tingkat tinggi yang lain.

# IDE Online 
## compile online
- Jdoodle : https://www.jdoodle.com/c-online-compiler
- Glot : https://glot.io/new/c
- Onlinegdb : https://www.onlinegdb.com
- Repl : https://repl.it/languages/c
- TutorialsPoint : https://www.tutorialspoint.com/compile_c_online.php

# Pengantar Program Kecil dalam Bahasa C 
- Teks program dalam Bahasa C terdiri dari dua bagian:
  - Teks yang diproses oleh compiler.
  - Teks yang tidak diproses oleh compiler, yaitu yang dituliskan di antara /* dan */ berisi komentar yang memudahkan Anda untuk memahami sebuah program.

- Anda dapat membedakan kedua jenis teks tersebut dari contoh-contoh yang diberikan. Sebuah program dalam Bahasa C disimpan dengan ekstensi “.c”. Sebuah program utama terdiri dari dua bagian, yaitu:
  - Kamus, yang berisi nama-nama yang dideklarasi, yang selanjutnya dapat diacu untuk mengambil nilainya. 
  - Program, yaitu satu atau lebih deretan instruksi yang Anda tulis untuk dikerjakan.

Setiap kalimat dalam bahasa C, baik berupa deklarasi maupun instruksi, selalu diakhiri dengan ”;” , atau diakhiri dengan suatu blok yang terdiri dituliskan di antara { dan }.

# Program Tanpa Kembalian Nilai 
```c
/* File : halo.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Program menuliskan “Halo Dunia! ” dan “end-of-line” (ganti baris) */
#include<stdio.h>
int
main(void)
{ /* Badan Program */
    printf("Halo Dunia!\n ");
}
```

# Program Dengan Kembalian Nilai
- Perbedaan program ini dengan program sebelumnya adalah bahwa selain menuliskan sebuah string (deretan huruf) ke layar, pada akhir eksekusi, program ini mengirimkan atau mengembalikan ke Anda (return) sebuah nilai 0 yang dinyatakan oleh perintah return 0. Karena mengirimkan sebuah nilai integer (Nol), awal program adalah int main.
- Untuk contoh program ini, sepertinya pengiriman nilai 0 tersebut tidak ada gunanya. Tetapi kelak, saat Anda memrogram sistem dan program berinteraksi dengan lingkungan serta program lain, nilai kembalian ini sangat berguna untuk men-cek apakah program Anda melakukan tugasnya sesuai dengan spesifikasi, sampai selesai dengan baik yaitu mengirimkan nilai 0. Oleh karena itu, selanjutnya, bentuk penulisan ini yang dipakai sebagai “standar” penulisan dalam tutorial ini dan juga oleh banyak tim developer, karena jika program dieksekusi dengan benar, program lain yang memanfaatkannya dapat menangkap nilai 0 yang dikirimkannya.

```c
/* File : halo1.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Program untuk menuliskan Halo Dunia! ke layar */
#include<stdio.h>
int
main ()
{
/* KAMUS */
 
/* ALGORITMA */
  printf ("Halo Dunia!\n");
  return 0;
}
```

# Pengantar Pengisian Nilai Variabel 