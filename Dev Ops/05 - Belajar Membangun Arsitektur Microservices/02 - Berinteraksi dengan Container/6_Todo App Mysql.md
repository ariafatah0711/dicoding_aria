# Latihan Membuat Todo App dengan Docker: Menambahkan Container Baru untuk MySQL

## Pendahuluan
SQLite adalah opsi yang bagus untuk menyimpan data relasional dalam aplikasi Todo App. Namun, untuk skala yang lebih besar, kita perlu belajar menggunakan database engine lain, seperti MySQL.

Dalam arsitektur microservices, setiap service (dalam hal ini adalah container) seharusnya hanya mengerjakan satu hal. Oleh karena itu, kita akan memperbarui arsitektur Todo App agar MySQL berada dalam container terpisah.

---

## Menyiapkan Network
Sebelum memulai, hapus container `todo-app` terlebih dahulu karena kita akan membuat yang baru nantinya:

```sh
docker rm -f todo-app
```

Selanjutnya, buat custom network bertipe bridge dengan nama `todo-app`:

```sh
docker network create todo-app
```

Pastikan network sudah terbuat dengan menjalankan:

```sh
docker network ls
```

---

## Menjalankan Container MySQL
Jalankan container baru untuk MySQL dengan perintah berikut:

```sh
docker run -d \
     --name mysql-db \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=dicoding \
     -e MYSQL_DATABASE=todo-db \
     mysql:5.7
```

> **Catatan:** Jika menggunakan prosesor berbasis ARM (seperti Mac dengan Apple Silicon), tambahkan opsi `--platform "linux/amd64"`.

Untuk Windows, gunakan perintah berikut:

```sh
docker run -d `
     --name mysql-db `
     --network todo-app --network-alias mysql `
     -v todo-mysql-data:/var/lib/mysql `
     -e MYSQL_ROOT_PASSWORD=dicoding `
     -e MYSQL_DATABASE=todo-db `
     mysql:5.7
```

---

## Menguji MySQL
Masuk ke dalam container MySQL untuk memeriksa apakah database berjalan dengan baik:

```sh
docker exec -it mysql-db mysql -u root -p
```

Masukkan password `dicoding`, lalu jalankan perintah berikut untuk melihat database:

```sql
SHOW DATABASES;
```

Pastikan terdapat database bernama `todo-db`.

Keluar dari container dengan perintah:

```sh
exit
```

---

## Menjalankan Todo App dengan MySQL
Jalankan container `todo-app` dengan MySQL sebagai database:

```sh
docker run -dp 3000:3000 --name todo-app \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=dicoding \
   -e MYSQL_DB=todo-db \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"
```

### Penjelasan Perintah:
- `docker run -dp 3000:3000 --name todo-app` → Menjalankan container dalam mode detach dan mengekspos port 3000.
- `-w /app -v "$(pwd):/app"` → Menentukan working directory di dalam container dan menggunakan bind mount.
- `--network todo-app` → Menghubungkan container ke jaringan `todo-app`.
- `-e MYSQL_HOST=mysql` → Menggunakan network alias `mysql` sebagai host database.
- `-e MYSQL_USER=root` → Username MySQL.
- `-e MYSQL_PASSWORD=dicoding` → Password MySQL.
- `-e MYSQL_DB=todo-db` → Database yang akan digunakan.
- `node:12-alpine` → Menggunakan image Node.js versi `12-alpine`.
- `sh -c "yarn install && yarn run dev"` → Menginstall dependencies dan menjalankan aplikasi.

Periksa log container untuk memastikan koneksi ke MySQL berhasil:

```sh
docker logs todo-app
```

Jika berhasil, akan muncul log seperti:

```
Waiting for mysql:3306.
Connected!
Connected to mysql db at host mysql
Listening on port 3000
```

Akses aplikasi di `http://localhost:3000/` dan tambahkan beberapa item.

---

## Memeriksa Data di MySQL
Masuk ke container MySQL dan periksa apakah data telah tersimpan:

```sh
docker exec -it mysql-db mysql -p todo-db
```

Jalankan perintah berikut untuk melihat data dalam tabel `todo_items`:

```sql
SELECT * FROM todo_items;
```

Jika berhasil, data yang dimasukkan melalui aplikasi akan terlihat dalam tabel.

Keluar dari container dengan perintah:

```sh
exit
```

---

## Kesimpulan
Kita telah berhasil menghubungkan Todo App dengan MySQL yang berjalan di container terpisah. Dengan cara ini, kita bisa mengelola database secara lebih fleksibel dan scalable.

Namun, proses deploy aplikasi ini cukup kompleks. Oleh karena itu, pada bagian selanjutnya, kita akan belajar tentang **Docker Compose** untuk mengelola multi-container dengan lebih mudah.

Tetap semangat belajar! 🚀

