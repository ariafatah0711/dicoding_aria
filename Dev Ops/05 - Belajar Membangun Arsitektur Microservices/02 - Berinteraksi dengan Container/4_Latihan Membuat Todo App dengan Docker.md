## Latihan Membuat Todo App dengan Docker

### 1. Clone Repository
Pastikan Git sudah terinstal, lalu jalankan perintah berikut:
```sh
git clone -b todo-app https://github.com/dicodingacademy/a433-microservices.git
```
Buka folder hasil clone di Visual Studio Code.

### 2. Membuat Dockerfile
Buat berkas `Dockerfile` dan isi dengan:
```dockerfile
FROM node:12-alpine

RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production

CMD ["node", "src/index.js"]
EXPOSE 3000
```

### 3. Build Docker Image
Buka terminal dan jalankan perintah berikut:
```sh
docker build -t todo-app:v1 .
```

### 4. Menjalankan Container
Jalankan container dengan:
```sh
docker run -dp 3000:3000 --name todo-app todo-app:v1
```
Akses aplikasi melalui: [http://localhost:3000](http://localhost:3000)

Todo App kini berjalan di dalam container Docker. Selanjutnya, kita akan melakukan modifikasi lebih lanjut pada aplikasi ini.

---

## Memodifikasi Aplikasi Todo App

### 1. Mengubah Teks di Aplikasi
Buka berkas `src/static/js/app.js` di Visual Studio Code, lalu ubah teks:
```js
"No items yet! Add one above!"
```
menjadi:
```js
"You have no todo items yet! Add one above!"
```
Simpan perubahan dengan `CTRL+S`.

### 2. Build Ulang Image
Jalankan perintah berikut untuk membangun ulang image dengan versi baru:
```sh
docker build -t todo-app:v2 .
```

### 3. Menghentikan dan Menghapus Container Lama
Sebelum menjalankan container baru, hapus container lama:
```sh
docker rm -f todo-app
```

### 4. Menjalankan Container Baru
Jalankan container dengan image yang telah diperbarui:
```sh
docker run -dp 3000:3000 --name todo-app todo-app:v2
```
Buka kembali aplikasi di browser: [http://localhost:3000](http://localhost:3000).

Sekarang, perubahan teks telah diterapkan! Namun, semua data sebelumnya hilang karena container lama dihapus. Selanjutnya, kita akan belajar menambahkan volume agar data tetap tersimpan meskipun container dihapus.

