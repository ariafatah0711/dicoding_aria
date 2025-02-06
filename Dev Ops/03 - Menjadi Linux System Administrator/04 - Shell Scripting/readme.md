# Pengenalan Shell Scripting
- Anda tentu masih ingat saat kita membahas tentang shell di modul Berinteraksi dengan Linux, di mana shell bertugas menerima input dari user, kemudian ada program yang dieksekusi, dan hasilnya ditampilkan kembali ke user.
- Lantas, Anda punya ide nih, bagaimana ya kalo program yang dieksekusi tidak hanya 1, melainkan dua sekaligus? Apakah bisa? Oh, jelas bisa, dong. Yuk kita coba.
- Misalnya, kita ingin menampilkan informasi tanggal terlebih dahulu setiap kali akan melihat daftar berkas pada suatu directory (direktori). Itu artinya, kita akan menggunakan perintah date, kemudian dilanjutkan dengan perintah ls. Kuncinya adalah dengan menempatkan tanda “;” (titik koma) di antara dua perintah tersebut.

- Seperti ini contohnya.
  ```
  date; ls
  ```

# Variable
## Shell Variable vs Environment Variable
- Shell variable (terkadang disebut local variable) adalah sebuah variable hanya ada di shell di mana ia didefinisikan. Acapkali shell variable digunakan untuk menyimpan data sementara, seperti directory yang diakses saat ini.
  ```bash
  name="aria"
  ```
- Environment variable (terkadang disebut global variable) adalah variabel yang diekspor ke semua proses yang dihasilkan oleh shell.
  ```bash
  export name="aria"

  kelas=12
  export kelas
  ```

## show var
```bash
set
env
printenv
```

---
# Data Type
- default type data di linux adalah string meskipun kita memasukan value nya adalah integer

## operasi aritmatika (int)
```bash
# expresi
$(( ekspresi ))

# contoh
Sum=$((10+3))  
echo Sum = $Sum
```

| Operator |                                    Nama                                    |                                  Penggunaan                                 |        Contoh       |
|:--------:|:--------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:-------------------:|
| +        | Addition (penjumlahan)                                                     | Menjumlahkan bilangan satu dengan lainnya.                                  |     echo $((4+2))   |
| –        | Substraction (pengurangan)                                                 | Mengurangkan bilangan satu dengan lainnya.                                  |     echo $((4-2))   |
| *        | Multiplication (perkalian)                                                 | Mengalikan bilangan satu dengan lainnya.                                    |     echo $((4*2))   |
| /        | Division (pembagian)                                                       | Menghasilkan hasil bagi dari bilangan pertama dan bilangan kedua.           |     echo $((4/2))   |
| %        | Modulo (modulus)                                                           | Menghasilkan sisa bagi dari bilangan pertama dan bilangan kedua.            |     echo $((4%2))   |
| +=       | Increment by constant (penambahan nilai oleh konstanta)                    | Menambahkan bilangan dengan nilai sebuah konstanta.                         |  x=4 echo $((x+=2)) |
| -=       | Decrement by constant (pengurangan nilai oleh konstanta)                   | Pengurangan bilangan dengan nilai sebuah konstanta.                         |  x=4 echo $((x-=2)) |
| *=       | Multiply by constant (perkalian nilai oleh konstanta)                      | Perkalian bilangan dengan nilai sebuah konstanta.                           |  x=4 echo $((x*=2)) |
| /=       | Divide by constant (pembagian nilai oleh konstanta)                        | Membagi bilangan dengan nilai sebuah konstanta dan menghasilkan hasil bagi. |  x=4 echo $((x/=2)) |
| %=       | Remainder by dividing with constant (sisa dari pembagian dengan konstanta) | Membagi bilangan dengan nilai sebuah konstanta dan menghasilkan sisa bagi.  |  x=4 echo $((x%=2)) |
| **       | Exponen (perpangkatan)                                                     | Bilangan pertama dipangkatkan dengan bilangan kedua.                        |    echo $((4**2))   |

## Array
- Meski tidak mengenal konsep data types seperti bahasa pemrograman lain, shell masih memiliki beberapa kemiripan, salah satunya kemampuannya untuk memasukkan beberapa nilai sekaligus ke dalam suatu variable yang sama. Hal ini disebut sebagai array (atau dalam bahasa Indonesia disebut larik).
- Jadi, walaupun selalu menganggap semua nilai variable sebagai teks (string), shell tetap memungkinkan kita untuk menggunakan array seperti berikut.

```bash
os=('linux' 'macos' 'windows')

echo ${os[0]} # show index pertama
echo ${os[@]} # show all
echo ${#os[@]} # show length
```

# run
```bash
alias test1='cp /mnt/c/Users/ariaf/OneDrive/Dokumen/github_aria/linux_aria/linux/shell_script/01 . && chmod +x 01 && sed -i '\''s/\r$//'\'' 01 && ./01'
alias test2='cp /mnt/c/Users/ariaf/OneDrive/Dokumen/github_aria/linux_aria/linux/shell_script/02 . && chmod +x 02 && sed -i '\''s/\r$//'\'' 02 && ./02'
alias test3='cp /mnt/c/Users/ariaf/OneDrive/Dokumen/github_aria/linux_aria/linux/shell_script/03 . && chmod +x 03 && sed -i '\''s/\r$//'\'' 03 && ./03'
```

# Control Flow
- Control flow memungkinkan kita untuk membuat percabangan (dengan sintaksis if) atau perulangan (dengan sintaksis for dan while) pada shell script yang dibuat agar bisa sesuai dengan kondisi yang diinginkan. Mari kita bedah satu per satu.

## Percabangan
### If
- Sintaksis if ini dibutuhkan apabila saat membuat script Anda perlu mengevaluasi suatu kondisi terlebih dahulu untuk menentukan perintah yang akan dijalankan. Penggunaan if pada shell memiliki format sebagai berikut.

```bash
if [ expression ]
then
  Statement yang akan dijalankan apabila hasil dari expression adalah true (benar)
else
  Statement yang akan dijalankan apabila hasil dari expression adalah false (salah)
fi
```

| Fitur              | Expression Operator | Penjelasan                                                                                  |
|--------------------|---------------------|---------------------------------------------------------------------------------------------|
| String comparison  | =                   | Bernilai true jika masing-masing nilai string sama.                                         |
|                    | !=                  | Bernilai true jika masing-masing nilai string tidak sama.                                   |
| Integer comparison | -eq                 | Bernilai true jika masing-masing nilai integer sama.                                        |
|                    | -ne                 | Bernilai true jika masing-masing nilai integer tidak sama.                                  |
|                    | -lt                 | Bernilai true jika satu nilai integer lebih kecil dari nilai integer yang lain.             |
|                    | -le                 | Bernilai true jika satu nilai integer lebih kecil atau sama dengan nilai integer yang lain. |
|                    | -gt                 | Bernilai true jika satu nilai integer lebih besar dari nilai integer yang lain.             |
|                    | -ge                 | Bernilai true jika satu nilai integer lebih besar atau sama dengan nilai integer yang lain. |

| Operator |    Kepanjangan   |               Fungsi              |       Contoh       |
|:--------:|:----------------:|:---------------------------------:|:------------------:|
| -gt      | greater than     | Lebih besar dari (>)              | [ 5 -gt 3 ] (true) |
| -lt      | less than        | Lebih kecil dari (<)              | [ 3 -lt 5 ] (true) |
| -ge      | greater or equal | Lebih besar atau sama dengan (>=) | [ 5 -ge 5 ] (true) |
| -le      | less or equal    | Lebih kecil atau sama dengan (<=) | [ 3 -le 5 ] (true) |

---
# Perulangan
## For
- Perulangan dengan sintaksis for berjalan pada sebuah daftar item yang kita buat. Perintah for akan mengulangi satu set perintah untuk setiap item dalam daftar. Format penulisannya sebagai berikut.

```bash
for var in teks1 teks2 ... teksN
do
  Statement yang akan dieksekusi tiap teks
done
```

- var pada contoh di atas adalah nama dari sebuah variable, sedangkan teks1 sampai teksN adalah urutan karakter/teks dengan pemisah spasi yang dimasukkan ke variable bernama var. Hasilnya, statement akan dieksekusi mulai dari teks1 sampai teksN satu per satu.

### contoh
```bash
#!/bin/sh
 
for angka in 0 1 2 3 4 5 6 7 8 9
do
  echo $angka
done
```

## while
- Perulangan while memungkinkan kita untuk menjalankan satu set perintah secara berulang sampai sebuah kondisi terpenuhi. Umumnya, metode ini digunakan untuk memanipulasi sebuah value dari variable secara berulang. Cara penulisannya seperti di bawah ini.

```bash
while command
do
  Statement dijalankan saat command menghasilkan nilai true
done
```

- Di sini, command (perintah) akan dievaluasi. Jika nilai yang dihasilkan adalah true (benar), maka statement (pernyataan a.k.a set perintah) akan dieksekusi. Sebaliknya, jika command bernilai false (salah), maka tidak ada statement yang akan dieksekusi dan program akan melompat ke bagian done (akhir/selesai).

### command
```bash
#!/bin/sh
 
i=0
 
while [ $i -le 2 ]
do
  echo Number: $i
  i=$((i+=1))
done
```

### contoh check df
```bash
#!/bin/sh

print("Check disk free in /d/ev/sda: ")
while true
do
    usage=$( df -h /dev/sda | grep /dev | awk '{ print $5 }')
    echo $usage
    # sleep 3600
    sleep 2
done
```

# Function
- Tak terasa kode pada shell script yang kita tulis ternyata makin panjang dan kompleks, ya? Kondisi ini tentu akan menyulitkan proses dalam mengelola kode dan debugging (mencari kesalahan) jika terjadi masalah. Salah satu solusi yang bisa kita lakukan adalah dengan merestrukturisasi kode pada script menjadi modular. Artinya, kita akan pisah-pisahkan kodenya menjadi segmen-segmen (potongan-potongan) kode yang mudah untuk dipakai dan digunakan ulang (reusable), yakni menggunakan function (fungsi).
- Function memungkinkan kita untuk memecah fungsionalitas keseluruhan script menjadi subbagian logis yang lebih kecil, yang kemudian dapat dipanggil untuk melakukan masing-masing tugas bila diperlukan.
- Menggunakan function untuk melakukan tugas berulang adalah cara terbaik dalam membuat kode menjadi reusable. Ini adalah bagian penting dalam prinsip pemrograman modern. 
- Function pada shell mirip dengan function dalam bahasa pemrograman lain sehingga mungkin sebagian dari Anda sudah cukup familier.

- Ada dua cara untuk mengimplementasikan function:
  - Di dalam sebuah berkas script.
  - Langsung di terminal sebagai sebuah perintah.

## cara 1
```bash
function_name () {
  command
}

# alternatif
function_name () { command; }
```

## cara 2
```bash
function function_name {
  command
}

# alternatif 1 baris
function function_name { command; }
```

- function_name merupakan nama dari sebuah function yang nantinya akan kita gunakan untuk memanggil function di tempat lain pada shell script yang dibuat.
- Gunakan nama function yang deskriptif. Meskipun penamaan tidak begitu penting saat menguji sebuah function, tetapi nama yang deskriptif sangat membantu ketika Developer lain melihat atau mempelajari kode kita.
- Nama function harus diikuti oleh tanda kurung () dan diikuti oleh rangkaian command atau perintah yang diperlukan di dalam bracket{}.
- Jika kita menambahkan kata function, maka tanda kurung menjadi opsional.
- Saat menulis function dalam satu baris, command atau perintah harus diakhiri dengan titik koma (;), baik dalam berkas script maupun terminal secara langsung.
- Command atau perintah di antara kurung kurawal { command } disebut sebagai function's body, yang mana dapat berisi sejumlah declaration (deklarasi), variable (variabel), loop (perulangan), atau conditional statement (alias percabangan).

## contoh
```bash
#!/bin/sh
 
# Tulis function di sini
Hello () {
  echo "Hello World"
}
 
# Panggil function
Hello
```

---
# Input/Output
- Sebagian besar command atau perintah pada sistem Linux/Unix mengambil input dari terminal dan mengirimkan output yang dihasilkan kembali ke terminal. Maka dari itu, kali ini kita akan bahas lebih detail tentang input dan output pada shell.
- Pada dasarnya, shell menyediakan fitur yang sangat powerful terkait input dan output, yakni kemampuan untuk redirect (mengarahkan) output dari perintah atau script; dan mengirimkannya ke file, perangkat, atau bahkan sebagai input ke perintah atau script lain. Ini disebut sebagai stream atau data stream (aliran data). 

- Untuk memahami hal itu, Anda harus mengerti tiga standard stream yang ada di Linux, yakni stdin, stdout, dan stderr. 
  - stdout: menampilkan output (keluaran) yang normal dari suatu perintah atau script (file descriptor 1).
  - stderr: menampilkan output (keluaran) berupa error dari suatu command atau script (file descriptor 2).
  - stdin: membaca/menerima input (masukan) dari keyboard (file descriptor 0).

- Catatan: File descriptor adalah sebuah pengidentifikasi unik untuk sebuah file atau sumber daya input/output lainnya.
- Oke, pembahasan kali ini dapat dibagi menjadi beberapa topik besar, yakni output redirection (yang melibatkan stdout dan stderr), input redirection (melibatkan stdin), dan diakhiri dengan pipe. Mari kita mulai pembahasannya.

## Output Redirection
- Output dari sebuah command yang biasanya dihasilkan pada terminal dapat dengan mudah dialihkan ke sebuah file. Kemampuan ini dikenal sebagai output redirection. Ada beberapa cara yang dapat kita lakukan untuk redirect (mengarahkan) sebuah output dari script ataupun command.

### Redirect STDOUT
- Coba buka terminal Anda, lalu jalankan perintah berikut.
  ```bash
  ls -alh
  ```
- Pada terminal, Anda akan melihat semua berkas yang ada di directory tersebut dengan format daftar panjang dan mudah dibaca.
- Nah, dari contoh di atas, kita bisa mengarahkan output dari perintah tersebut ke sebuah file dengan menambahkan tanda > diikuti dengan nama file.
- Berikut contoh perintah ls -alh yang mengarahkan output lengkap ke sebuah file bernama ls.txt.
  ```bash
  ls -alh > ls.txt
  ```
- Catatan: Secara default, simbol > akan redirect stdout. Alternatif lain, Anda juga bisa menggunakan 1> untuk redirect stdout, contoh: ls -alh 1> ls.txt. Ingat bahwa file descriptor dari stdout adalah 1 sehingga itu akan menghasilkan hal yang sama.
- Perhatikan. Saat perintah tersebut dijalankan, tidak ada output yang muncul di terminal. Hal ini karena output telah dialihkan dari terminal ke file yang kita tentukan. Anda dapat memeriksa file ls.txt untuk melihat hasilnya. Jalankan perintah berikut.
  ```bash
  cat ls.txt
  ```

- Bagaimana? Mudah, bukan? Operasi seperti ini sering dilakukan oleh seorang Linux System Administrator dalam pekerjaan sehari-hari. Jadi, pastikan Anda memahaminya dengan baik, ya.
- Perlu Anda ingat, apabila output dari sebuah perintah diarahkan ke sebuah file yang sudah ada isinya, maka isi data tersebut akan terhapus/tertimpa. Contohnya bisa dilihat di bawah ini.
  ```bash
  echo timpa baris > ls.txt
  cat ls.txt
  # timpa baris
  ```
- Lihat! Semua isi dari berkas ls.txt terhapus dan terimpa dengan teks "timpa baris". Lantas, bagaimana solusinya agar kita bisa mengarahkan output perintah ke berkas yang sudah ada isinya? Tenang, kita bisa menggunakan tanda >>. Coba jalankan perintah berikut.
  ```bash
  echo baris berikutnya >> ls.txt
  cat ls.txt
  ```

- Di sisi lain, Anda juga bisa mengosongkan sebuah berkas dengan menimpanya menggunakan output redirection. Caranya adalah dengan mengecek jumlah barisnya terlebih dahulu menggunakan perintah wc -l seperti berikut.
  ```bash
  wc -l ls.txt
  ```
- Catatan: wc atau word count adalah perintah untuk mencetak jumlah baris, kata, dan byte dari suatu berkas. Spesifiknya, wc -l digunakan untuk mencetak jumlah baris.

### Redirect STDERR
- Anda sudah memahami bagaimana cara redirect stdout. Kini, saatnya kita beranjak untuk mengetahui redirect stderr. Coba jalankan perintah berikut.
- Nah, kita bisa mengarahkan error dari output perintah tersebut ke sebuah berkas. Ingat bahwa file descriptor dari stderr adalah 2. Dengan begitu, cara redirect stderr adalah seperti berikut.
  ```bash
  cat baru.txt 2> error.txt
  ```
- Saat perintah tersebut dijalankan, tidak ada output yang muncul di terminal. Sama seperti sebelumnya, ini karena output telah dialihkan dari terminal ke file yang kita tentukan. Anda dapat memeriksa file error.txt untuk melihat hasilnya. Jalankan perintah berikut.
  ```
  cat error.txt
  ```

## Input Redirection
- Dari output redirection, kini kita beralih ke pembahasan tentang input redirection. 

### Redirect STDIN
- Sama seperti output perintah yang dapat diarahkan ke sebuah file, input dari sebuah perintah juga dapat dialihkan dari sebuah file. Jika tanda > digunakan untuk output redirection, tanda < digunakan untuk input redirection. Mudah, kan, dalam membedakannya?

- Sebuah perintah biasanya akan mengambil input (masukan) dari terminal. Namun, dengan input redirection, sebuah perintah dapat memiliki input yang dialihkan dari file. Sebagai contoh, untuk menghitung jumlah baris dalam file ls.txt, kita dapat menjalankan perintah berikut.
  ```bash
  wc -l < ls.txt
  ```
- Contoh lain yang sering dipakai ketika menggunakan input redirection adalah saat kita me-restore sebuah database mysql/mariadb. Contoh penulisannya seperti di bawah ini.
  ```bash
  mysql -u USERNAME < database_dump.sql
  ```

# Pipe
- Setelah mempelajari bagaimana mengalihkan/mengarahkan (redirect) output dan input, kita akan belajar hal yang lebih kompleks, yakni mengalihkan output dari suatu program menjadi input bagi program lain. Hal ini disebut sebagai pipe atau dalam bahasa Indonesia disebut pipa (kata ini diambil dari notasi/karakter | di keyboard).
- Berikut adalah contoh penggunaan pipe.
  ```bash
  ls -l /var/log/*.log | wc -l
  ```
- Dalam contoh di atas, kita mendaftar semua berkas yang memiliki nama dengan akhiran .log, kemudian output dari perintah tersebut digunakan sebagai input dari program wc sehingga ia akan menghitung jumlah baris (dalam hal ini berarti jumah berkas) dari perintah sebelumnya. Singkatnya, kita akan tahu jumlah berkas log yang ada di direktori /var/log/.
- Pipe bisa digunakan untuk lebih dari satu rangkaian (satu output digunakan sebagai satu input). Kita coba tuliskan ulang contoh sebelumnya dalam bentuk perintah yang berbeda seperti ini.
  ```bash
  ls -l /var/log/ | grep "\.log$" | wc -l
  ```
- Contoh tersebut secara fungsi sama persis dengan sebelumnya, yakni mengetahui jumlah berkas .log yang ada di dalam directory /var/log/. Bedanya, kini kita menggunakan 2 buah pipe (|).
- Penjelasan untuk perintah grep "\.log$" adalah kita melakukan penyaringan/pemfilteran dengan pola "\.log$". Itu adalah pola ekspresi reguler (regular expression) yang artinya kita mencari teks yang diakhiri dengan .log. Untuk lebih jauh mengenal regular expression, Anda bisa belajar dari situs https://regex101.com. 
- Penjelasan lebih jauh mengenai pola "\.log$" adalah sebagai berikut.
  - Tanda $ di akhir mengartikan bahwa kita ingin memastikan bahwa kata ".log" berada di akhir teks, misalnya "file.log". Artinya, kata “file.logging” itu tidak cocok dengan pola tersebut. Pasalnya, meski mengandung kata “.log” tapi posisinya tidak di akhir.
  - Dalam regular expression, huruf titik . itu akan cocok untuk semua karakter. Artinya, jika kita menuliskan pola ".log$", maka akan cocok pula untuk “syslog”. Ini karena huruf “s” itu cocok untuk menggantikan karakter “.” pada regular expression. Namun, karena yang kita inginkan adalah cocok dengan karakter titik "." saja, maka cara penulisannya adalah “\.”.