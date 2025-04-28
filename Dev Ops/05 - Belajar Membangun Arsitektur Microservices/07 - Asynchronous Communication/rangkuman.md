# Rangkuman Asynchronous Communication

## Komunikasi dalam Arsitektur Monolithic dan Microservices

- **Monolithic**: Komunikasi antar komponen melalui pemanggilan langsung method/function.
- **Microservices**: Komponen dipisahkan oleh hard boundaries (domain bisnis), komunikasi lebih kompleks.
- **Tantangan**: Perubahan mekanisme komunikasi.
- **Solusi**: Mengisolasi services dan menggunakan asynchronous communication.
- **Protokol umum**:
  - HTTP request/response (query data)
  - Asynchronous messaging (AMQP untuk pembaruan data)

## Masalah Komunikasi dalam Microservices

- Banyak service tersebar berpotensi mengalami kegagalan.
- **HTTP** sebagai protokol synchronous bisa memperburuk kinerja saat traffic tinggi.
- **Solusi**:
  - Minimalkan synchronous HTTP.
  - Implementasikan asynchronous communication berbasis message/event.

## Jenis Komunikasi dalam Microservices

### 1. Synchronous vs Asynchronous

- **Synchronous**: HTTP/HTTPS, service menunggu response.
- **Asynchronous**: AMQP/message broker, service tidak menunggu response.

### 2. Single Receiver vs Multiple Receiver

- **Single Receiver**: Point-to-point messaging (message queue).
- **Multiple Receiver**: Publish/subscribe messaging (event bus).

> Penting: Integrasi services harus asynchronous dan independen.

## Tips Komunikasi dalam Microservices

### Smart Endpoints and Dumb Pipes

- **Smart endpoints**: Logic di masing-masing service.
- **Dumb pipes**: Message broker hanya merutekan pesan, tidak memproses.

### Asynchronous Communication

- Komunikasi antar services harus asynchronous.
- Hindari ketergantungan HTTP antar services.

### Consistency across Multiple Services

- Setiap service punya database sendiri.
- **Eventual Consistency**:
  - Gunakan message queue atau publish/subscribe.
  - Replikasi data bila perlu antar services.

### Query Data dari Banyak Microservices

- **API Gateway**: Agregasi data sederhana.
- **Cold Data**: Ekspor data untuk laporan non-realtime.
- **CQRS & Materialized Views**: Buat tabel read-only untuk kebutuhan client.

## Pola Perpesanan pada Asynchronous Communication

### Message Queueing (Point-to-Point)

- Producer mengirim message ke queue.
- Message diproses hanya oleh satu consumer.
- Setelah diproses, message dihapus dari queue.

### Publish/Subscribe Messaging

- Publisher mengirim message ke topic.
- Semua subscriber menerima message tersebut.
- Cocok untuk broadcasting informasi.

## Asynchronous Communication dengan Message Broker

### Pengertian

- Message broker = Komponen perantara antar aplikasi/system.
- Menerjemahkan protokol pesan dari sender ke receiver.
- Mendukung komunikasi lintas bahasa pemrograman dan platform.

### Opsi Solusi Message Broker

- **Apache ActiveMQ**:
  - Open source berbasis Java.
  - Implementasi Java Messaging Service (JMS).

- **RabbitMQ**:
  - Open source.
  - Fleksibel dan banyak digunakan untuk message queueing.

- **KubeMQ**:
  - Modern, cloud-native message broker.

---

> **Kesimpulan**: Dalam microservices, komunikasi antar services idealnya dilakukan secara asynchronous melalui message broker menggunakan pola message queue atau publish/subscribe untuk mencapai kinerja, skalabilitas, dan ketahanan sistem yang optimal.