# Latihan Implementasi Asynchronous Communication dengan RabbitMQ: Pengantar

Mungkin Anda bertanya-tanya, “Mengapa kita menggunakan RabbitMQ sebagai solusi message broker? Bukankah KubeMQ merupakan solusi native untuk Kubernetes?”

Sejujurnya, KubeMQ masih terbilang produk yang baru dalam bidang message broker sehingga resource (dokumentasi, forum, dll) yang disediakan masih sangat sedikit.

Berbeda dengan RabbitMQ yang telah lahir sejak 2007. Karena telah berdiri sejak lama, RabbitMQ menyediakan banyak resource yang bisa kita pakai ketika menggunakannya. Jadi, apabila kelak mengalami kendala, niscaya banyak forum dan dokumentasi lengkap yang akan membantu. Selain itu, faktanya memang RabbitMQ merupakan message broker yang open source dan paling populer digunakan di seluruh dunia.

---

## Tujuan Latihan

Kali ini kita akan coba mengimplementasikan asynchronous communication dengan RabbitMQ menggunakan pola perpesanan message queueing.

Kita **tidak akan langsung menerapkannya ke Kubernetes**. Kita akan gunakan **Docker Compose** terlebih dahulu agar setidaknya Anda memahami cara kerja RabbitMQ secara sederhana. Sekaligus, ini sebagai pengingat kembali materi Docker Compose yang sudah diajarkan di awal kelas.

Latihan kali ini kita akan menggunakan **Email service** sederhana yang akan mengambil message dari queue dan kemudian mengirim email ke pelanggan.

Anggap saja saat ini kita memiliki sebuah aplikasi **E-Commerce** yang harus mengirim konfirmasi pesanan ke email tiap kali pelanggan memesan barang. Nah, email service ini yang akan kita garap.

---

## Tahapan Latihan

Berikut tahapan proses untuk latihan ini:

1. **Menjalankan RabbitMQ via Docker Compose.**
2. **Mengembangkan Email service.**
3. **Membuat Dockerfile dengan multi-stage builds.**
4. **Memperbarui Docker Compose.**
5. **Menguji coba RabbitMQ queue.**

---

## Catatan Penting

Sebelum mengerjakan latihan, pastikan hal-hal berikut sudah terinstal di komputer Anda:

- Docker dan Docker Compose.
- Node.js (direkomendasikan versi 14 atau 16) beserta NPM.

Sudah tidak sabar? Ayo, kita mulai latihan ini! 🚀