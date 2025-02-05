# Pengenalan Shell dan Terminal
Ketika seorang user (pengguna) melakukan sebuah pekerjaan atau aktivitas pada komputer Linux miliknya, sebenarnya user tersebut sedang berinteraksi dengan kernel. Namun, interaksi tersebut dilakukan secara tidak langsung. User harus berkomunikasi melalui sebuah medium terlebih dahulu. Selain itu, diperlukan juga suatu interface (antarmuka) yang dapat meneruskan sebuah input dari user kepada kernel untuk diproses. Medium tersebut adalah shell, sedangkan interface-nya adalah terminal.

## Shell
Sederhananya, shell adalah sebuah program yang menerima perintah/input dari pengguna (melalui keyboard) dan meneruskannya ke kernel untuk diproses; kemudian hasil keluarannya akan ditampilkan kembali ke pengguna. 

Ada beberapa jenis shell yang tersedia di Linux, salah satu yang paling banyak dipakai adalah bash (bourne again shell). Bash ditulis oleh Brian Fox dan merupakan versi yang lebih sempurna dari Unix shell yang asli, yakni sh (sh alias bourne shell ditulis oleh Steve Bourne). Selain bash, shell lain yang terkenal adalah zsh (Z shell) yang baru-baru ini jadi shell default di macOS (ya, macOS juga Unix-like sehingga memiliki perintah shell yang mirip dengan Linux) [2]. 

## Terminal
Dahulu, shell adalah satu-satunya antarmuka yang tersedia pada sistem Unix-like seperti Linux. Namun, kini pengguna memiliki opsi, yakni memilih GUI (graphical user interface) atau CLI (command-line interface).

Bila Anda menggunakan Linux berbasis GUI (misalnya, Ubuntu Desktop), shell masih bisa diakses melalui aplikasi terminal emulator atau disingkat terminal.

Terminal adalah sebuah aplikasi yang menyediakan interface berisi shell agar pengguna dapat menjalankan berbagai perintah untuk sistem operasi. Ada banyak variasi jenis terminal yang biasanya berbeda-beda untuk setiap desktop environment. Jika menggunakan desktop environment GNOME, kita akan mendapatkan GNOME Terminal secara default. Sementara itu, bila menggunakan KDE, kita akan mendapatkan Konsole.

# Root User, Regular User, dan System User
## Root User
- Root user merupakan super user (memiliki hak akses paling tinggi) dan merupakan akun yang pertama kali dibuat saat instalasi sistem operasi Linux. Akun ini berfungsi untuk mengelola sistem operasi secara penuh dan memiliki hak akses paling tinggi dibandingkan akun user lainnya. Karenanya, kerap kali root user ini dipakai oleh admin (administrator) untuk mengonfigurasi sistem. 
- Saat berhasil masuk ke shell, root user ditandai dengan prompt "#" serta memiliki home directory spesial di /root/, tidak sama dengan kebanyakan user lain yang berlokasi di /home/.

## Regular User
- Sedari tadi kita menyebutkan tentang regular user? Apa sih regular user itu sebenarnya? Ia adalah user yang dibuat oleh seorang system administrator (root atau sudoers). User tipe ini memiliki direktori home di /home/namauser/. Regular user hanya bisa mengelola apa yang ada di direktori home atau direktori yang diberikan wewenang oleh admin untuk mengaksesnya. 
- Selain itu, masing-masing user bisa memiliki pengaturan bash dan riwayat bash yang berbeda. Perlu diketahui juga bahwa regular user memiliki User ID (UID) 1000 sampai 65533 dan 65536 sampai 4294967294. Shell dari regular user ditandai dengan prompt "$".

## System User
- Kita sudah mengenal root user dan regular user. Selain dua itu, ada satu user lagi yang harus Anda ketahui, yakni system user.
- Beberapa aplikasi secara khusus akan membuat sebuah akun agar aplikasi bisa beroperasi di latar belakang (running in background). Aplikasi tersebut umumnya berupa service atau daemon. User yang digunakan oleh sebuah service atau daemon dinamakan system user. Contohnya adalah user mysql yang digunakan oleh layanan database MySQL dan user www-data yang dipakai oleh layanan web Apache.
- System user tidak memiliki direktori home seperti regular user. Selain itu, system user memiliki UID 1 sampai 999. Umumnya, tipe user ini tak bisa digunakan oleh pengguna biasa (kita tidak bisa login atau berganti user ke system user).

# User Management
## User
Seperti penjelasan pada materi sebelumnya, setiap user memiliki UID (User ID). Kita bisa menjalankan perintah id di shell untuk melihat informasi user yang sedang log in saat ini. Kita juga bisa melihat informasi umum dari sebuah user (tidak hanya user kita sendiri) dengan menjalankan perintah id diikuti dengan username.

Pemetaan username ke UID didefinisikan pada sebuah database berbentuk file yang secara default terletak pada /etc/passwd. Setiap baris pada file /etc/passwd memuat informasi mengenai satu user. Tiap barisnya terbagi menjadi tujuh bagian dengan pemisah kolon ":".

## Group
Dalam nomenklatur Linux, group adalah kumpulan user yang membutuhkan akses bersama ke beberapa file atau sumber daya sistem. Kita tak perlu lagi memberikan akses ke setiap user satu per satu secara manual. Cukup tambahkan satu atau lebih user ke sebuah group, maka semua user yang ada pada group tersebut bisa mendapatkan hak akses file yang sama.

Sama seperti user, group memiliki nama grup untuk memudahkan kita dalam berinteraksi dengannya. Meski memiliki nama, secara internal, sistem membedakan group berdasarkan nomor identifikasi unik, yaitu GID alias Group ID.

Pemetaan nama group ke GID didefinisikan di dalam database informasi group, yang berlokasi pada file /etc/group. Tiap satu baris file /etc/group memuat informasi sebuah group. Setiap barisnya terbagi menjadi 4 bagian dengan pemisah kolon ":".