## Latihan Implementasi Asynchronous Communication dengan RabbitMQ: Membuat Dockerfile dan Memperbarui Docker Compose

Kita sudah berhasil menuliskan kode untuk producer dan consumer. Sekarang, mari kita garap bagian Dockerfile. Kali ini, kita akan membuat berkas Dockerfile yang menggunakan praktik multi-stage builds.

Masih di root directory dari rabbitmq-emailservice, silakan buat berkas Dockerfile dengan konten berikut.

```Dockerfile
FROM node:18-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./*.js ./
CMD ["node", "consumer.js"]

FROM base as dev
RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

ENV NODE_ENV=development
RUN npm install
COPY ./*.js ./
CMD ["node", "consumer.js"]
```

Jangan lupa simpan berkas tersebut.

### Penjelasan

- Untuk base image, kita menggunakan Node.js LTS 18 dengan versi alpine sehingga berukuran kecil.
- Kemudian, kita menetapkan WORKDIR (work directory) untuk container adalah `/src`. Lalu, kita salin berkas package.json dan package-lock.json ke workdir (`./` saat ini adalah workdir, yaitu `/src`).
- Selanjutnya, kita mendefinisikan **production stage**, di mana kita menetapkan `NODE_ENV` sebagai `production` dan menjalankan perintah `npm ci` untuk menginstal dependencies yang diperlukan.
- Setelahnya, kita menyalin semua berkas berekstensi `.js` ke workdir. Lalu, saat nanti container bekerja, perintah `node consumer.js` akan dieksekusi untuk menjalankan komponen consumer.
- Kita juga mendefinisikan **dev stage**. Hal yang berbeda dari production stage adalah, kita pertama menginstal bash, lalu mengunduh berkas shell script bernama `wait-for-it.sh`, dan mengubah hak aksesnya agar bisa dieksekusi.
- Shell script `wait-for-it.sh` ini digunakan untuk memastikan agar RabbitMQ server berjalan terlebih dahulu sebelum consumer mencoba terhubung dengannya.
- Lanjut, kita mengisi nilai `NODE_ENV` dengan `development`, menjalankan `npm install` untuk menginstal semua dependencies, menyalin semua berkas `.js` ke workdir, dan menjalankan consumer dengan perintah `node consumer.js`.

Berkas Dockerfile sudah berhasil dibuat. Sekarang, giliran kita perbarui berkas docker-compose.yml supaya menyertakan berkas Dockerfile yang tadi dibuat. Silakan buka berkas docker-compose.yml dan sesuaikan agar menjadi seperti berikut.

```yaml
version: "3.2"
services:
  rabbitmq:
    image: rabbitmq:3.8-management-alpine
    container_name: 'rabbitmq_container'
    ports:
        - 5673:5672
        - 15673:15672
    volumes:
        - ~/.docker-conf/rabbitmq/data/:/var/lib/rabbitmq/
        - ~/.docker-conf/rabbitmq/log/:/var/log/rabbitmq
    networks:
        - rabbitmq_network

  consumer:
    build:
      context: ./
      target: dev
    volumes:
      - .:/src
    depends_on:
      - "rabbitmq"
    command: sh -c '/bin/wait-for-it.sh rabbitmq:5672 --timeout=30 -- node consumer.js'
    environment:
      NODE_ENV: production
      AMQP_URL: amqp://guest:guest@rabbitmq:5672
    networks:
      - rabbitmq_network

networks:
  rabbitmq_network:
    driver: bridge
```

Jangan lupa simpan berkas tersebut.

### Penjelasan

Perubahan utama dari berkas docker-compose.yml di atas adalah kita mendefinisikan service baru bernama `consumer`. Di dalamnya, kita menetapkan berbagai properti:

- Pertama, kita melakukan build terhadap berkas Dockerfile yang ada di current directory (folder saat ini) dengan targetnya adalah `dev` stage.
- Kemudian, untuk menyederhanakan, kita menyalin semua berkas yang ada di current directory di lokal ke `/src` (workdir pada container).
- Selanjutnya, kita menentukan bahwa consumer service ini baru akan dimulai setelah rabbitmq service dimulai. Properti ini hanya mendefinisikan urutan dalam memulai container, tetapi takkan membiarkan consumer service untuk menunggu rabbitmq service benar-benar aktif dan berjalan.
- Maka dari itu, kita menggunakan shell script `wait-for-it.sh` agar consumer service menunggu maksimal 30 detik hingga rabbitmq service aktif; setelah itu barulah consumer service mulai berjalan.
- Lanjut, kita menetapkan sejumlah environment variable, yakni `NODE_ENV` dengan `production` dan `AMQP_URL` dengan `amqp://guest:guest@rabbitmq:5672`.
- AMQP_URL ini memberi tahu consumer service sekiranya RabbitMQ server mana untuk terhubung dalam rangka menggunakan protokol AMQP. URL tersebut memetakan kredensial (username: guest dan password: guest) disertai host (rabbitmq service) dan port (5672) yang sesuai.

Oke, berkas Dockerfile dan Docker Compose sudah siap untuk dieksekusi. Saatnya kita tes!
