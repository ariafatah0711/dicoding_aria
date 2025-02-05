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
- Variabel adalah nama yang dapat menampung nilai yang dapat diubah. Variabel mempunyai type tertentu, yang menentukan type nilai yang disimpannya.
- Integer (bilangan bulat), yaitu angka tanpa titik desimal.
  - Contoh nilai integer : 10 (artinya sepuluh).
- Bilangan riil, yaitu angka yang dapat mempunyai pecahan yang dituliskan sebagai angka di belakang titik desimal.
  - Contoh nilai riil : 0.5 (artinya setengah).
- Karakter (huruf), yaitu huruf atau karakter lainnya yaitu angka, karakter khusus, atau bahkan yang tidak kelihatan misalnya “spasi”, akhir baris.

- Pengisian nilai variabel dapat dilakukan dengan dua cara, yaitu:
  - Saat dideklarasikan, atau
  - Dengan instruksi “assignment.” 

# Pengisian Nilai dengan Inisialisasi 
```bash
#include<stdio.h>
int main()
{   
  int i = 5;
}
```

```bash
/* File : initvar.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Mengisi variabel i yg bertype in dengan nilai 5 dan menuliskannya */
#include<stdio.h>
int main ()
{/* Kamus */
  int i = 5; /* deklarasi dan inisialisasi nilai variabel i dengan 5 */
  /* Algoritma */
  printf ("Ini nilai i : %d \n", i);/*untuk mengamati dampak inisialisasi*/
  return 0;
}
```

# Pengisian Nilai dengan Assignment 
- Pengisian nilai variabel I pada program ini dilakukan dengan melakukan assignment, yang dalam bahasa C dituliskan dengan tanda =.

```bash
/* File : assigni.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Mengisi variabel i yg ber-type in dengan nilai 5 dan menuliskannya */
#include<stdio.h>
 
int main ()
{/* Kamus */
  int i;
 
  /* Algoritma */
  i = 5; /* sekarang variabel i akan bernilai 5 */
  printf ("Ini nilai i : %d \n", i);
 
  i = i+1; /* nilai i ditambah 1, hasilnya disimpan kembali di i */
  printf ("Ini nilai i : %d \n", i);
 
  return 0;
}
```

# Inisialisasi dan Assignment Nilai Bilangan Riil 
- Type bilangan riil dalam bahasa C dituliskan sebagai float. Ada dua cara untuk menuliskan nilai bilangan riil, yaitu: bilangan bertitik desimal, atau bilangan bertitik desimal diikuti dengan pangkatnya.
- Nilai yang dapat disimpan pada bilangan ber-type float adalah antara 1.175494351 E – 38 sampai dengan 3.402823466 E + 38.

```bash
/* File : assignf.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Mengisi variabel i yg bertype in dengan nilai 5 dan menuliskannya */
#include<stdio.h>
int main()
{ /* Kamus */
  float f = 0.555;
  float x = 1.5E3;
/* Algoritma */
   printf ("Ini nilai f : %f \n", f);
   printf ("Ini nilai f : %5.2f \n", f);
   printf ("Ini nilai x : %10.2f \n", x);
return 0;
}
```

# Pengisian Nilai Bertipe Karakter (Char) 
- Sebuah karakter dikodekan menjadi kode ASCII atau kode lainnya dalam komputer. Karakter dapat berupa : angka [‘0’ ..  ‘9’], abjad huruf kecil [‘a’..’z’], abjad huruf kapital ‘’A’..’Z’], karakter khusus selain abjad dan huruf yang dapat Anda amati pada keyboard  {!, @, #, $, ^, &, *, (, ), ?, “, ! ……. } atau karakter lainnya  yang tidak kelihatan.
- Deklarasi sebuah nama yang isinya adalah karakter dalam bahasa C dinyatakan dengan char. Sebuah variabel ber-type char hanya dapat menampung satu karakter saja, dan nilainya dapat diberikan dalam penulisan karakternya, atau kodenya.

- Program berikut ini adalah contoh bagaimana Anda menyimpan sebuah “nilai” karakter dalam variabel bertipekan char.

```bash
/* File: assignKar.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Deskripsi : */
/* Program ini berisi contoh sederhana untuk mendefinisikan */
/* variabel bertype karakter */
#include<stdio.h>
int main ()
{
/* KAMUS */
  char c = 65; /* inisialisasi nilai karakter dengan 65, kode huruf ‘A’ */
  char c1;
/* Algoritma */
/* penulisan karakter sebagai huruf */
  printf ("Karakter = %c\n", c);
  c1 = 'Z'; /* variabel c1 diisi dengan huruf ‘Z’ */
  printf ("Karakter = %c\n", c1);
 
/* penulisan karakter */
  printf ("Karakter dalam kode ASCII = %d\n", c);
  printf ("Karakter sebagai huruf = %c\n", c);
  printf ("Karakter dalam kode ASCII = %d\n", c1);
  printf ("Karakter sebagai huruf = %c\n", c1);
 
  return 0;
}
```

# Apa itu Konstanta 
- Konstanta secara konseptual adalah sebuah nama yang isinya tidak boleh diubah, berbeda dengan variabel yang isinya (nilainya) dapat diubah-ubah. Konstanta dapat dituliskan dalam bentuk literal sesuai dengan nilai yang dimaksud. Kenapa konstanta dituliskan sebagai nama dari pada sebagai literal ? agar sekali sebut nilainya dapat dipakai berkali-kali sesuai makna yang terkandung dalam nama konstanta, dan untuk menghindari literal yang bertebaran dalam sebuah program, yang dapat menimbulkan ke-tidak-konsisten-an dalam penulisan (jika salah ketik, maka konstanta yang maksudnya sama akan berbeda nilainya).

## Ada tiga cara mendefinisikan konstanta dalam bahasa C, yaitu:
- Dengan menuliskan nilainya secara langsung (disebut sebagai "literal" sesuai konvensi penulisan dalam bahasanya). Dengan cara ini, tidak mungkin muncul dalam deklarasi nama (karena tidak bernama), dan juga tidak mungkin ditulis di ruas kiri tanda assignment = karena akan menimbulkan salah sintaks.
- Dengan memanfaatkan macro berkata kunci #define.
- Dengan mendeklarasikan sebagai const kemudian menyebutkan type dan nilainya.

- Best practices : tuliskan nama konstanta sesuai dengan artinya, dan biasanya dituliskan dalam huruf kapital.

```bash
/* File: konstanta.c */
/* Penulis : Bu Dengklek, email inge@bebras.or.id */
/* Deskripsi : */       
/* Mendefinisikan konstanta bertype int, float, char  */
#include<stdio.h>
#define FALSE 0
#define NOL 0
#define SATU 1
#define pi 3.1415
int main ()
{/* Kamus */
  const int maks=3;
  const float param =2.5;
  const char cc = 65 ;
  const char cA = 'A' ;
 /* Algoritma */
  printf ("PI  = %6.2f\n", pi);
  printf ("NOL  = %d\n", NOL);
  printf ("SATU  = %d\n", SATU);
  printf ("FALSE  = %d\n", FALSE);
  printf ("maks  = %d\n", maks);
  printf ("param  = %f\n", param);
  printf ("cc  = %c\n", cc);
  printf ("cA  = %c\n", cA);
  printf ("%d\n", 3);
  printf ("3\n"); /* tanpa memakai nama, tidak disarankan */
  return 0;
}
```

