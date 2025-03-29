# Latihan Mengunggah Docker Image ke Docker Hub

Latihan sebelumnya sudah mengajarkan kita untuk menyimpan image ke Docker Registry. Seperti yang disebutkan sebelumnya, Docker Registry sangat berguna bila Anda memerlukan keamanan dan kontrol yang tinggi terkait penyimpanan image.

Namun, bagaimana bila kita tidak membutuhkannya? Bagaimana bila kita hanya memerlukan penyimpanan container image yang siap pakai, tak perlu menyiapkan server, dan mudah dalam pemakaiannya? Jawabannya tidak lain dan tidak bukan adalah **Docker Hub**.

Docker Hub adalah layanan yang disediakan oleh Docker untuk memudahkan Developer dalam menemukan dan berbagi container image. Bisa dikatakan bahwa ini adalah container registry terbesar di dunia dengan berbagai jenis image dari sejumlah sumber, seperti komunitas, proyek open source, hingga vendor perangkat lunak.

Ketika membuat repository di Docker Hub, Anda akan mendapatkan dua opsi, apakah akan bersifat **public** atau **private**. Latihan ini akan mengajarkan Anda cara membuat **public repository**.

## Tahapan Proses
1. **Membuat akun Docker Hub.**
2. **Membuat repository di Docker Hub.**
3. **Mengunggah container image ke Docker Hub.**

Mari kita mulai!

## 1. Membuat Akun Docker Hub
Langkah pertama yang wajib Anda lakukan adalah **membuat akun Docker Hub** (alias Docker ID). Silakan buat akun terlebih dahulu di [Docker Hub](https://hub.docker.com/) dan login ke akun Anda.

Ketika berhasil login, biasanya Anda akan diarahkan ke halaman repository pribadi.

## 2. Membuat Repository di Docker Hub
Untuk membuat repository baru:
1. Klik tombol **Create Repository**.
2. Isi **Repository name** dengan `nginx-hello-world`.
3. Isi **Description** sesuai keinginan.
4. Pilih **Visibility** sebagai **Public**.
5. Klik **Create** untuk membuat repository.

Sekarang repository sudah berhasil dibuat, tetapi masih kosong karena belum ada image di dalamnya.

## 3. Mengunggah Container Image ke Docker Hub
### 3.1 Periksa Daftar Image di Lokal
Periksa daftar image yang ada di lokal Anda dengan perintah berikut:
```sh
docker images
```
Seharusnya tersedia image `localhost:5000/nginx-hello-world` karena sudah diunduh dari latihan sebelumnya.

### 3.2 Ubah Nama Image
Ubah nama image agar sesuai dengan repository di Docker Hub dengan perintah berikut:
```sh
docker tag localhost:5000/nginx-hello-world:latest <username>/nginx-hello-world:v1
```
Sesuaikan `<username>` dengan username Docker ID Anda.

Cek kembali daftar image di lokal dengan perintah:
```sh
docker images
```
Perhatikan bahwa image ID tetap sama, hanya nama repository yang berubah.

### 3.3 Login ke Docker Hub
Login ke Docker Hub menggunakan terminal:
```sh
docker login
```
Masukkan username dan password Docker Hub Anda.

### 3.4 Unggah Image ke Docker Hub
Setelah login berhasil, unggah image dengan perintah berikut:
```sh
docker push <username>/nginx-hello-world:v1
```
Jika berhasil, akan muncul pesan seperti:
```sh
The push refers to repository [docker.io/<username>/nginx-hello-world]
...
Status: Downloaded newer image for <username>/nginx-hello-world:v1
```

### 3.5 Cek di Docker Hub
Buka kembali halaman repository di Docker Hub, masuk ke bagian **Tags**, dan pastikan bahwa `nginx-hello-world:v1` sudah tersedia di sana.

## 4. Menguji Image dari Docker Hub
Hapus image yang berkaitan dengan `nginx-hello-world` di lokal:
```sh
docker image rm <username>/nginx-hello-world:v1 localhost:5000/nginx-hello-world:latest
```
Kemudian jalankan container menggunakan image dari public repository di Docker Hub:
```sh
docker run -d --name my-nginx -p 80:80 <username>/nginx-hello-world:v1
```
Akses aplikasi NGINX Anda di `http://localhost:80/`.

## 5. Membersihkan Resource
Setelah selesai, hapus semua resource dengan perintah berikut:
```sh
docker stop my-nginx && docker container rm my-nginx && docker image rm <username>/nginx-hello-world:v1
```

## Kesimpulan
Dalam latihan ini, Anda telah belajar cara:
1. Membuat repository di Docker Hub.
2. Mengunggah Docker image ke Docker Hub.
3. Menjalankan container menggunakan image dari Docker Hub.

Selamat mencoba! 🎉

