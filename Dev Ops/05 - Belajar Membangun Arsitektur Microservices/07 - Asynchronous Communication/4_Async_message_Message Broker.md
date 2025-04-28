# Asynchronous Communication dengan Message Broker

## Pengantar

Seseorang yang hebat dari Amazon, Werner Vogels (CTO dan Vice President of Amazon), pernah berkata, “Everything fails, all the time.” Artinya, "Sistem Anda lambat laun akan gagal." Baik arsitektur aplikasi sederhana atau kompleks, monolithic atau microservices, synchronous atau asynchronous, kegagalan akan selalu mengintai, entah karena beban berlebih, serangan siber, atau bencana.

Salah satu solusi untuk mengatasi kegagalan ini adalah dengan memisahkan (decoupling) tiap komponen aplikasi menggunakan pola perpesanan seperti message queueing dan publish/subscribe messaging.

## Pengertian Message Broker

Message broker adalah komponen yang memungkinkan aplikasi, sistem, dan service untuk berkomunikasi dan bertukar informasi. Ia menerjemahkan message dari messaging protocol pengirim ke messaging protocol penerima.

Dengan message broker, komunikasi antar services menjadi indirect (tidak langsung), sehingga memungkinkan interoperability bahkan antar services yang berbeda bahasa pemrograman dan platform.

### Analogi Restoran

Misalkan Service A adalah Kasir dan Service B adalah Koki.

1. Pelanggan memesan makanan ke Kasir.
2. Kasir memberi tahu pesanan ke Koki.
3. Koki membuat makanan sesuai pesanan.
4. Koki menyerahkan makanan ke Kasir.
5. Kasir menyerahkan makanan ke pelanggan.

Dengan message broker, kita memasukkan "papan pesanan" di antara Kasir dan Koki:
- Kasir cukup menaruh pesanan di papan.
- Koki mengambil pesanan dari papan saat siap.

Ini mengurangi ketergantungan dan beban antara Kasir dan Koki.

### Fungsi Teknis Message Broker

- **Validasi:** Memeriksa kebenaran pesan.
- **Penyimpanan:** Menyimpan pesan hingga siap diproses.
- **Routing:** Mengarahkan pesan ke penerima yang tepat.
- **Pengiriman:** Mengirimkan pesan ke penerima.
- **Persistence:** Menjamin pesan tidak hilang.
- **Client State Management:** Mengelola status client yang berinteraksi.

> Catatan: Message broker biasanya mendukung beberapa messaging pattern seperti message queueing dan publish/subscribe messaging. Fokus di sini adalah pada message queueing.

## Konsep Message Queue

Dalam message queue:
- Producer mengirim pesan ke queue.
- Pesan disimpan sesuai urutan.
- Consumer mengambil dan memproses pesan.
- Pesan tetap berada di queue hingga dikonfirmasi diterima oleh consumer.

Komponen dalam message broker meliputi:
- **Queue Manager:** Mengelola interaksi antar queue.
- **Routing Services:** Menentukan arah pengiriman data.
- **Translation Services:** Menerjemahkan format pesan.
- **Persistence Services:** Menyimpan data secara tahan lama.
- **Client State Management Services:** Mengelola status koneksi client.

![alt text](<images/4_Async_message_Message Broker/image.png>)

## Penutup

Untuk mengimplementasikan message broker, kita perlu melihat produk atau tools yang tersedia. Selanjutnya, kita akan membahas berbagai opsi message broker yang populer dan penggunaannya dalam sistem asynchronous communication. Stay tuned!