# Latihan Implementasi Asynchronous Communication dengan RabbitMQ: Mengembangkan Email Service

Sekarang kita akan mengembangkan email service. Kita akan mulai menuliskan kode untuk **producer** (anggap saja ini seperti Order service yang mengirim message ke queue) dan **consumer** (ini adalah email service yang akan mengambil message dari queue dan mengirimkan email ke pelanggan).

Di sini kita menggunakan skenario **work queue**, yakni sebuah queue sederhana di mana message dapat diproses oleh banyak consumer; dan consumer dapat menyesuaikan kapasitas (scale up dan scale down) tergantung pada panjangnya queue.

Contohnya pada aplikasi e-commerce, di jam-jam sibuk di mana para pelanggan banyak memesan barang (misal jam 7 PM), kita bisa menempatkan puluhan consumer untuk memproses message di dalam queue dan mengirim email ke pelanggan. Akan tetapi, pada jam-jam yang sepi (misal jam 2 AM), cukup sediakan satu consumer saja.

Oke, mari kita mulai mengulik kode untuk producer yang akan mengirim message ke queue melalui RabbitMQ exchange (bertipe **direct exchange**) dengan sebuah routing key.

## 1. Menyiapkan Proyek

Buka Terminal atau WSL/Ubuntu Anda, lalu siapkan proyek Node.js:

```bash
npm init -y
```

Install AMQP library:

```bash
npm i --save amqplib
```

## 2. Membuat Producer

Buat file `producer.js` dengan konten berikut:

```javascript
const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');
    const exchange = 'user.signed_up';
    const queue = 'user.sign_up_email';
    const routingKey = 'sign_up_email';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);

    const msg = {id: Math.floor(Math.random() * 1000), email: 'user@domail.com', name: 'firstname lastname'};
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log('Message published');
  } catch (e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
})();
```

### Penjelasan Producer

- Menggunakan `amqplib` untuk berinteraksi dengan RabbitMQ.
- Menghubungkan ke `amqpUrl` (default `localhost:5673`).
- Membuat exchange `user.signed_up` dan queue `user.sign_up_email`.
- Mengikat queue ke exchange dengan routing key `sign_up_email`.
- Mengirim message dalam bentuk JSON.
- Menutup koneksi setelah selesai.

## 3. Membuat Consumer

Buat file `consumer.js` dengan konten berikut:

```javascript
const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

async function processMessage(msg) {
  console.log(msg.content.toString(), 'Call email API here');
  // call your email service here to send the email
}

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  channel.prefetch(10);

  const queue = 'user.sign_up_email';

  process.once('SIGINT', async () => {
    console.log('got sigint, closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, {durable: true});
  await channel.consume(queue, async (msg) => {
    console.log('processing messages');
    await processMessage(msg);
    await channel.ack(msg);
  }, {
    noAck: false,
    consumerTag: 'email_consumer'
  });

  console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();
```

### Penjelasan Consumer

- Membuka koneksi dan channel ke RabbitMQ.
- Mengatur `prefetch(10)` agar maksimal mengambil 10 message sekaligus.
- Meng-handle `SIGINT` (Ctrl+C) untuk shutdown yang rapi.
- Consume queue `user.sign_up_email`.
- Memproses message dengan `processMessage()` dan ack setiap selesai memproses.

---

Mantap! Kita sudah berhasil mengembangkan email service berbasis asynchronous communication dengan RabbitMQ. 🎉