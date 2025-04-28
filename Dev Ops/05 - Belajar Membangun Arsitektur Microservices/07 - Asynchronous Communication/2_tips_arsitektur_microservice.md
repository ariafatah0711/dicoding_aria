# Tips Komunikasi dalam Arsitektur Microservices

Setelah mempelajari jenis-jenis komunikasi dalam arsitektur microservices, berikut beberapa tips yang dapat Anda terapkan untuk menciptakan komunikasi yang efektif.

---

## Smart Endpoints and Dumb Pipes

Ketika membangun aplikasi berbasis microservices, penting untuk meminimalkan komunikasi antar-services. Semakin sedikit komunikasi, semakin baik.

Filosofi yang populer adalah "**smart endpoints and dumb pipes**". Ini berarti:

- **Smart Endpoints**: Setiap service harus memiliki business logic yang lengkap dan cohesive di dalam dirinya.
- **Dumb Pipes**: Infrastruktur pengiriman pesan (seperti message broker) hanya bertindak sebagai penyimpan dan perute pesan tanpa menambahkan logika.

### Contoh
- **Payment Service** mengolah pembayaran secara mandiri.
- **Order Service**, **Product Service**, dan **Shipping Service** dipisahkan dan hanya berinteraksi bila diperlukan.

Gunakan message broker seperti RabbitMQ, Kafka, atau yang lain sebagai jalur komunikasi (pipes) tanpa logika tambahan.

---

## Asynchronous Communication

Praktik terbaik untuk menghubungkan services adalah dengan **komunikasi asynchronous**.

**Catatan Penting:**
- Bukan tentang protokolnya saja (HTTP, AMQP, dll), tetapi tentang pola komunikasi.
- Hindari ketergantungan synchronous antar services.

> Meskipun menggunakan HTTP, Anda bisa membuat komunikasi asynchronous dengan teknik seperti event-driven atau callbacks.

### Mengapa harus asynchronous?
- Mengurangi potensi kegagalan berantai.
- Services tetap independen dan resilient.

**Contoh:**
- Client melakukan HTTP request ke API Gateway.
- API Gateway mendistribusikan perintah via message queue ke Cart Service, Inventory Service, Payment Service, dan Shipping Service secara asynchronous.

Jika Shipping Service down, sistem lainnya tetap berjalan.

---

## Consistency Across Multiple Services

Dalam arsitektur microservices:
- Setiap service memiliki database sendiri.
- Tidak ada service yang boleh langsung mengakses database service lain.

### Tantangan: Menjaga Konsistensi Data

Gunakan **Eventual Consistency** dengan **asynchronous messaging** untuk sinkronisasi data antar service.

**Contoh Kasus:**
- **Product Service** memperbarui harga produk.
- **Product Service** mengirim event ke **Cart Service** melalui message broker.
- **Cart Service** memperbarui harga item di keranjang secara mandiri.

### Data Replication dan Bounded Context

Tidak masalah mereplikasi data antar service, asalkan:
- Hanya atribut yang diperlukan yang disalin.
- Setiap service memiliki model datanya sendiri sesuai domain bisnis.

**Contoh:**
- "Users" di Conference Management bisa muncul sebagai "Buyers" di Orders Service, "Payers" di Payment Service, dan "Customers" di Customer Service.
- Masing-masing menggunakan data yang relevan saja.

---

## Query to Retrieve Data from Several Microservices

Anda sudah mengerti bagaimana cara menyimpan data yang baik dalam arsitektur microservices. Namun, muncul tantangan baru, “Bagaimana cara melakukan query (misal, mengambil data) dari beberapa service?”

Sebagai contoh, client app ingin menampilkan informasi pengguna, yang mana data tersebut tersebar dan dimiliki oleh Cart service, Product service, dan User identity service. Bagaimana praktik terbaik untuk mendapatkan data tersebut?

Mungkin salah satu solusi yang terpikirkan oleh Anda saat ini adalah menggunakan kueri yang kompleks. Sebenarnya, itu tidak salah. Namun, bagaimanapun juga, jika Anda ingin meningkatkan efisiensi dalam komunikasi sistem, Anda memerlukan cara untuk menggabungkan data-data tersebut. Solusi paling populer adalah sebagai berikut.

### API Gateway

Untuk kebutuhan agregasi data sederhana dari sejumlah service yang memiliki database berbeda, pendekatan yang disarankan adalah melalui API Gateway. Ia adalah sebuah API management tool yang berada di antara client dan sekumpulan service. API gateway juga bertindak sebagai sebuah reverse proxy yang menerima semua API calls, meneruskannya ke services untuk mengolah request tersebut, dan mengembalikan hasil pemrosesan kembali ke client.

Meski API Gateway dapat menjadi solusi dalam melakukan query ke sejumlah service, Anda harus berhati-hati dalam mengimplementasikan pola ini. Pasalnya, pola API Gateway dapat menjadi choke point (a.k.a single point of failure atau satu titik yang ketika terkendala dapat meruntuhkan seluruh sistem) untuk aplikasi Anda. Maka dari itu, untuk memitigasi kemungkinan ini, Anda dapat memiliki beberapa API Gateway API yang masing-masing berfokus pada area bisnis sistem.

### "Cold data" in central databases

Bila Anda perlu menjalankan query untuk membuat laporan atau analisis bisnis yang tak memerlukan data real-time, pendekatan yang cocok adalah dengan mengekspor "hot data" (data real-time seperti data transaksional dari database tiap services) menjadi "cold data" (data yang tidak real-time) ke satu database besar. Database ini yang hanya boleh digunakan untuk keperluan spesifik, misalnya membuat laporan atau analisis bisnis.

Database terpusat ini dapat berupa sistem berbasis Big Data, seperti Hadoop, data warehouse, atau SQL database yang hanya digunakan untuk laporan (bila ukuran tidak menjadi masalah).

Perlu diingat bahwa database terpusat ini hanya boleh digunakan untuk query yang tidak memerlukan data real-time. Pembaruan dan transaksi asli tetap harus berada dalam database tiap service yang Anda miliki.

Cara untuk menyinkronkan data dari database tiap service ke database terpusat adalah dengan event-based communication atau menggunakan import/export tools untuk infrastruktur database.

Bila Anda memutuskan untuk menggunakan event-based communication, proses integrasi data akan serupa dengan CQRS.

### CQRS with query/reads tables

Solusi lain untuk query data dari sejumlah services adalah melalui Materialized View pattern. Singkatnya, dalam pendekatan ini, Anda perlu membuat read-only table berisi data yang dimiliki oleh tiap service yang dibutuhkan. Pastikan tabel tersebut mempunyai format yang sesuai dengan kebutuhan client app.

Mari kita ambil contoh sebelumnya. Bayangkan seorang pengguna (via client app) ingin melihat informasi pengguna, yang mana data tersebut tersebar dan dimiliki oleh Cart service, Product service, dan User identity service.

Jika Anda memiliki database tunggal (seperti dalam arsitektur monolithic), Anda mungkin hanya perlu menggabungkan data menggunakan SQL query yang melakukan operasi JOIN kompleks yang melibatkan beberapa tabel. Akan tetapi, jika Anda memiliki banyak database dan tiap database dimiliki oleh services yang berbeda, jelas bahwa Anda tak dapat melakukan query terhadap semua database tersebut dan membuat SQL JOIN.

Oke, lantas apa solusinya? Nah, solusi yang tepat untuk masalah ini adalah dengan menggunakan pendekatan CQRS (Command and Query Responsibility Segregation), yakni Anda membuat tabel yang didenormalisasi (denormalized table) pada database yang berbeda yang hanya digunakan untuk query. Tabel ini dapat dirancang khusus untuk data yang Anda perlukan saja 1:1 (one-to-one) relationship antara field (informasi) yang diperlukan oleh client app dan column (kolom) dalam tabel query tersebut. Selain itu, tabel ini juga bisa berfungsi sebagai pembuatan laporan atau analisis data bisnis.

Pendekatan ini tidak hanya menyelesaikan masalah awal (cara mengambil data dari seluruh services), tetapi juga meningkatkan kinerja sistem secara signifikan bila dibandingkan dengan SQL JOIN yang kompleks. Pasalnya, Anda akan memiliki tabel di database yang berbeda.

---

# Kesimpulan

- Buat endpoints cerdas dan pipes sederhana.
- Gunakan komunikasi asynchronous sebanyak mungkin.
- Terapkan prinsip eventual consistency.
- Hindari ketergantungan synchronous antar services.
- Adaptasikan model data sesuai domain masing-masing service.
- Gunakan teknik API Composition, API Gateway, "cold data" database, atau CQRS untuk kebutuhan query lintas services.

Dengan strategi ini, arsitektur microservices Anda akan lebih scalable, resilient, dan maintainable!

---

> Semangat membangun microservices yang robust dan tangguh! 🚀