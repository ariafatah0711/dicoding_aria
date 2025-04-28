# Pola Perpesanan pada Asynchronous Communication

## Pengantar
Dalam konteks komunikasi pada arsitektur microservices, *perpesanan* atau *messaging* berarti pengiriman data antar-services. Pada *synchronous communication*, messaging berjalan langsung dari satu service ke service lainnya. Sedangkan pada *asynchronous communication*, messaging dilakukan melalui sistem perantara. Service pengirim tidak mengetahui secara langsung keberadaan service penerima.

## Pola Perpesanan
Pola perpesanan (*messaging pattern*) dalam asynchronous communication terbagi menjadi dua:

- **Message Queueing (Point-to-Point Messaging)**
- **Publish/Subscribe Messaging**

Keduanya umum digunakan dalam sistem terdistribusi seperti microservices.

## Message Queueing
Message queueing atau point-to-point messaging menggunakan perantara message queue dengan hubungan one-to-one antara pengirim (*producer*) dan penerima (*consumer*).

### Cara Kerja
- *Producer* mengirimkan message ke queue.
- Message disimpan dalam queue sampai *consumer* mengambilnya.
- Setiap message hanya dikonsumsi satu kali.

### Contoh Kasus
**Payment Processing:** Penting untuk memastikan pembayaran hanya dikirim sekali. Message broker membantu menjamin transaksi keuangan tetap andal bahkan saat jaringan bermasalah.

## Publish/Subscribe Messaging
Pada pola publish/subscribe, *publisher* mengirim message ke sebuah *topic*. Semua *subscriber* yang berlangganan ke topic tersebut akan menerima message tersebut.

### Cara Kerja
- *Publisher* mengirim message ke *topic*.
- *Topic* menyebarkan message ke semua *subscriber*.
- Berbeda dengan message queue, message tidak harus antre lama karena segera dikirim.

### Contoh Kasus
**Sistem Notifikasi Maskapai:** Informasi delay penerbangan dikirim ke banyak pihak seperti awak darat, petugas bagasi, pramugari, pilot, dan operator bandara.

**Event-Driven Architecture:**
- Misal dalam aplikasi e-commerce, perubahan pada Order service dapat otomatis memicu Email service, Inventory service, dan Shipping service.
- Perubahan data User service dapat dikirim ke Cart service dan Order service untuk memperbarui database mereka.

## Kesimpulan
| Aspek                     | Message Queueing                | Publish/Subscribe                  |
|----------------------------|----------------------------------|-------------------------------------|
| Jumlah Penerima            | Satu                             | Banyak                              |
| Model                      | Pull (consumer mengambil)        | Push (topic mengirim ke subscriber) |
| Contoh Kasus               | Payment Processing               | Sistem Notifikasi, Event-Driven Apps|

> **Catatan:**
> Untuk pembelajaran selanjutnya, kita akan lebih berfokus pada pola **Message Queueing (Point-to-Point Messaging)**.