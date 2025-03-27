# Latihan Membuat Todo App dengan Docker: Deploy Todo App via Docker Compose

## Pengenalan Docker Compose

Docker Compose adalah tools yang membantu kita mendefinisikan dan berbagi multi-container application. Dengan Docker Compose, kita dapat:
- Membuat berkas YAML untuk mendefinisikan berbagai service.
- Menjalankan semua service dengan satu perintah.

Dalam konteks microservices, **service** adalah unit/komponen berisi satu atau lebih container yang menjalankan aplikasi atau layanan tertentu, seperti HTTP server, database, atau message broker.

### Keuntungan Menggunakan Docker Compose
- Menentukan berbagai service yang dibutuhkan dalam satu berkas YAML.
- Menyimpan konfigurasi dalam version control seperti git repository.
- Memudahkan kolaborasi dengan tim atau developer lain.

## Memeriksa Instalasi Docker Compose
Pastikan Docker Compose telah terinstal dengan menjalankan perintah berikut:
```sh
docker compose version
```
Jika belum tersedia, ikuti langkah-langkah instalasi sesuai dengan dokumentasi resmi.

## Menghapus Resource Lama
Sebelum memulai, hapus semua container yang berkaitan dengan Todo App agar tidak ada konflik:
```sh
docker rm -f todo-app mysql-db \
    && docker volume rm todo-db todo-mysql-data \
    && docker network rm todo-app \
    && docker image rm todo-app:v1 todo-app:v2 mysql:5.7 node:12-alpine
```

## Membuat Berkas `docker-compose.yml`
Di root directory dari proyek (`a433-microservices`), buat berkas `docker-compose.yml` dan tambahkan konfigurasi berikut:

```yaml
version: "3.7"

services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: dicoding
      MYSQL_DB: todo-db

  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: dicoding
      MYSQL_DATABASE: todo-db

volumes:
  todo-mysql-data:
```

Penjelasan:
- **app**: Service untuk aplikasi Todo App berbasis Node.js.
- **mysql**: Service untuk database menggunakan MySQL 5.7.
- **volumes**: Digunakan untuk menyimpan data MySQL agar tidak hilang saat container dihentikan.

## Menjalankan Todo App dengan Docker Compose
Jalankan perintah berikut di terminal:
```sh
docker compose up -d
```
Jika berhasil, output yang muncul akan serupa dengan berikut:
```
[+] Running 4/4
 ⠿ Network a433-microservices_default           Created
 ⠿ Volume "a433-microservices_todo-mysql-data"  Created
 ⠿ Container a433-microservices-mysql-1         Started
 ⠿ Container a433-microservices-app-1           Started
```

Sekarang, akses Todo App melalui:
```
http://localhost:3000/
```

## Menghapus Resource Setelah Selesai
Setelah selesai mencoba, hapus semua resource yang dibuat dengan perintah berikut:
```sh
docker compose down --volumes
```
Selain itu, hapus semua container dan image yang masih ada jika diperlukan.

---
### **Kesimpulan**
Dalam latihan ini, kita telah belajar:
- Deploy aplikasi menggunakan satu container.
- Menambahkan volume untuk menyimpan data.
- Menambahkan container baru untuk database.
- Menggunakan Docker Compose untuk menyederhanakan pengelolaan multi-container application.

Sekarang Anda siap untuk menerapkan Docker Compose dalam proyek lainnya! 🚀

