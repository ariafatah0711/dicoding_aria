# Kanvas Opsi Solusi Message Broker

Setelah mengetahui pengertian message broker, sekarang saatnya kita menilik beberapa opsi produk yang menawarkan message broker. Seperti yang sering disinggung sebelumnya, meski sebagian besar message broker sebenarnya mendukung dua atau lebih pola perpesanan, tetapi yang akan kita sorot di kelas ini hanya untuk fungsionalitas message queueing. Beberapa di antaranya adalah Apache ActiveMQ, RabbitMQ, dan KubeMQ.

---

## Apache ActiveMQ

Apache ActiveMQ merupakan layanan perpesanan open source populer yang dibangun dalam bahasa pemrograman Java. Ia berfungsi sebagai message broker dan dirancang untuk memudahkan pengiriman message antara dua atau lebih komponen aplikasi.

![alt text](<images/5_opsi_message Broker/image.png>)

Sama seperti message broker lainnya, Apache ActiveMQ digunakan sebagai jembatan komunikasi (perantara) antara banyak komponen aplikasi, baik yang berjalan di satu server yang sama maupun di server berbeda. Bahkan, Apache ActiveMQ pun dapat menjembatani komunikasi antara komponen dengan bahasa pemrograman yang berbeda.

Pada dasarnya, Apache ActiveMQ merupakan hasil implementasi dari JMS alias Java Messaging Service. JMS adalah Java specification yang memungkinkan aplikasi untuk mengirim data bolak-balik antara satu sama lain dengan cara yang mudah dan terstandardisasi.

Anatomi dari Apache ActiveMQ terdiri dari data patterns yang disebut message, queue, dan topics. Tentu Anda familier dengan ketiga istilah tersebut karena kita sudah membahasnya.

Spesifiknya, message di sini dapat berisi payload (muatan) seperti header dan properties yang dapat memudahkan kita dalam mengategorikan dan merutekan message tersebut. Payload dalam komunikasi via Apache ActiveMQ dapat berupa Java object apa pun dalam implementasi Java murni. Namun, biasanya dapat berbentuk pesan teks, biasanya berformat XML atau JSON.

Oke, mari kita bedah cara kerja dari Apache ActiveMQ. Jadi, setelah producer mengirim message ke Apache ActiveMQ, message tersebut dapat disampaikan ke consumer melalui dua pola: queue dan topic.

- **Queue**: Bersifat FIFO (first in first out), artinya message yang masuk pertama akan diproses dan dikirim duluan. Producer hanya perlu membuat message dan mengirimnya ke queue, kemudian message akan diambil oleh consumer (satu message dalam satu waktu).

- **Topic**: Bersifat subscription-based (berbasis langganan). Saat publisher mengirim sebuah message ke Apache ActiveMQ, sejumlah subscriber (yang berlangganan ke topic tersebut) akan segera menerima message.

![alt text](<images/5_opsi_message Broker/image-1.png>)

---

## RabbitMQ

RabbitMQ adalah perangkat lunak open-source yang menawarkan solusi message broker, menghubungkan komponen aplikasi untuk saling bertukar message. Sebuah message bisa berupa perintah proses di aplikasi lain atau sekadar pesan teks sederhana.

Sebagai message broker, RabbitMQ menyimpan message yang dikirim oleh producer hingga akhirnya diambil dan diproses oleh consumer.

![alt text](<images/5_opsi_message Broker/image-2.png>)

RabbitMQ menggunakan protokol **Advanced Messaging Queuing Protocol (AMQP)** sebagai standar utama, namun juga mendukung protokol lain seperti **STOMP**, **MQTT**, **HTTP**, dan **WebSocket**. Ini membuat RabbitMQ fleksibel dalam integrasi antar sistem.

## Mekanisme Dasar RabbitMQ

Saat producer mengirim message ke RabbitMQ, message **tidak langsung** masuk ke queue, melainkan dikirim ke sebuah **exchange**. Tugas exchange adalah **merutekan** message ke queue dengan bantuan **binding** dan **routing key**.

> **Exchange** bertugas memutuskan ke queue mana sebuah message harus dikirim, tergantung pada tipe exchangenya.

## Tipe-Tipe Exchange di RabbitMQ

### 1. Direct Exchange

- **Cara kerja:** Mengirimkan message ke queue berdasarkan **routing key**.
- **Ilustrasi:**

  ![alt text](<images/5_opsi_message Broker/image-3.png>)

  - Queue A dengan binding key `pdf_create`
  - Queue B dengan binding key `pdf_log`
  - Jika publisher mengirim message dengan routing key `pdf_create`, maka akan diarahkan ke Queue A.

- **Kegunaan:** Memisahkan message menggunakan pengidentifikasi string sederhana.

### 2. Topic Exchange

- **Cara kerja:** Merutekan message berdasarkan **wildcard matching** antara routing key dan routing pattern.
- **Simbol penting:**
  - `*` untuk satu kata.
  - `#` untuk nol atau lebih kata.
- **Ilustrasi:**

  ![alt text](<images/5_opsi_message Broker/image-4.png>)

- **Kegunaan:** Cocok untuk skenario dinamis seperti pengelompokan lokasi, kategori berita, dsb.

### 3. Fanout Exchange

- **Cara kerja:** Mengirim message **ke semua queue** yang terikat tanpa memperhatikan routing key.
- **Ilustrasi:**

  ![alt text](<images/5_opsi_message Broker/image-5.png>)

- **Kegunaan:** Cocok untuk broadcast, misalnya mengirim notifikasi ke banyak perangkat.

### 4. Headers Exchange

- **Cara kerja:** Merutekan message berdasarkan **header** dan nilai yang cocok.
- **Properti khusus:**
  - `x-match: all` → Semua header harus cocok.
  - `x-match: any` → Salah satu header cukup cocok.

- **Kelebihan:** Mendukung tipe data lebih luas (integer, hash) dan fleksibilitas tinggi dalam filtering.

### 5. Default Exchange

- **Cara kerja:**
  - Direct exchange yang **tidak diberi nama**.
  - Mengirim message ke queue dengan **nama yang sama** seperti routing key.

> Semua queue otomatis terikat ke default exchange dengan nama queue sebagai routing key.

### Visualisasi Tipe Exchange

![alt text](<images/5_opsi_message Broker/image-6.png>)

## Alur Kerja RabbitMQ Secara Umum

1. Producer mengirim message ke **exchange**.
2. Exchange merutekan message berdasarkan **routing key** dan **tipe exchange**.
3. Message diteruskan ke **queue** yang terikat melalui **binding**.
4. Message **menunggu di queue** hingga **diambil dan diproses** oleh consumer.

### Ilustrasi Alur Kerja

![alt text](<images/5_opsi_message Broker/image-7.png>)

## Kesimpulan

Dengan memahami konsep dasar exchange, binding, dan queue di RabbitMQ, Anda bisa membangun sistem komunikasi antar layanan yang handal dan scalable. Fleksibilitas RabbitMQ dalam mendukung berbagai protokol dan tipe exchange memungkinkan Anda memilih strategi routing message yang paling sesuai untuk kebutuhan aplikasi Anda.

---

> Sudah lebih paham tentang RabbitMQ? Kalau mau, saya bisa bantu buatin contoh kode publish/consume sederhana juga 😉

---

## KubeMQ

KubeMQ adalah platform message broker yang dirancang khusus untuk Kubernetes. Bila aplikasi Anda menggunakan Kubernetes untuk implementasi microservices, KubeMQ dapat menjadi solusi yang tepat karena dapat di-deploy menggunakan container hanya dalam hitungan menit.

KubeMQ populer di kalangan Developer berkat fiturnya yang kaya dan dukungan terhadap berbagai SDK, seperti:
- C#
- Java
- Go
- Python
- cURL
- Node
- PHP
- Ruby
- jQuery

KubeMQ ditulis dalam bahasa Go, membuatnya cepat dan ringan. Selain itu, ia mendukung berbagai protocol komunikasi:
- **Synchronous:** gRPC, REST, WebSocket
- **Asynchronous:** FIFO Queue, Publish-Subscribe Events, Event Store

KubeMQ juga dilengkapi dengan **KubeMQ Dashboard** untuk memantau fungsi-fungsinya secara visual tanpa harus menulis kode.

![alt text](<images/5_opsi_message Broker/image-8.png>)

KubeMQ mendukung berbagai pola perpesanan:
- Queue (Message Queuing)
- Publish/Subscribe (Pub/Sub)
- Remote Procedure Call (RPC)

---

## Queue

KubeMQ mendukung pola **message queueing** berbasis FIFO (first in first out).

![alt text](<images/5_opsi_message Broker/image-9.png>)

### Fitur-fitur Queue:
- **Guaranteed Delivery**: At-least-once dan at-most-once delivery.
- **Single and Batch Messages Send and Receive**: Kirim satu atau banyak pesan dalam satu panggilan.
- **RPC and Stream Flows**: Insert dan pull message dalam satu call atau konsumsi message secara transaksional.
- **Message Policy**: Atur expiration, delay timers, dan dead-letter queue.
- **Long Polling**: Consumer menunggu message tersedia di queue.
- **Peek Messages**: Intip isi queue tanpa mengambil message.
- **Ack All Queue Messages**: Menandai semua message dalam queue sebagai discarded.
- **Visibility Timers**: Menyembunyikan message dari consumer lain untuk jangka waktu tertentu.
- **Resend Messages**: Kirim kembali atau modifikasi message ke queue lain atau sama.

---

## Pub/Sub

Selain Queue, KubeMQ juga mendukung pola **Publish/Subscribe**.

![alt text](<images/5_opsi_message Broker/image-10.png>)

### Fitur-fitur Pub/Sub:

- **Events**:
  - Real-time messaging.
  - Subscriber hanya menerima pesan saat terhubung.

  ![alt text](<images/5_opsi_message Broker/image-11.png>)

- **Events Store**:
  - Mendukung persistence.
  - Subscriber tetap menerima semua message meskipun baru terhubung setelah beberapa waktu.

  ![alt text](<images/5_opsi_message Broker/image-12.png>)

- **Grouping**:
  - Load balancing antar beberapa subscriber.

---

## RPC

**Remote Procedure Call (RPC)** memungkinkan suatu program melakukan request ke program lain di komputer berbeda dalam jaringan tanpa memahami detail jaringan tersebut.

![alt text](<images/5_opsi_message Broker/image-13.png>)

*Catatan: Untuk pembahasan lebih dalam tentang RPC, Anda bisa melihat referensi lanjutan.*

---

## Penutup

Itulah ringkasan tentang KubeMQ sebagai solusi message broker, meliputi berbagai pola komunikasi yang didukung seperti Queue, Pub/Sub, dan RPC.

Selanjutnya, kita akan mengimplementasikan asynchronous communication menggunakan salah satu solusi tersebut. Jangan lewatkan!