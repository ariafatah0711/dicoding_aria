# Latihan Menyimpan Docker Image ke Docker Registry

Setelah mengetahui beberapa opsi container registry, kali ini kita akan praktik menggunakan Docker Registry sebagai solusi on-premise atau self-hosted private registry server.

## Tahapan Proses
1. Menjalankan Docker Registry container.
2. Menggunakan NGINX untuk membuat web "Hello, World!".
3. Membuat image dari NGINX container dan mengunggahnya ke Docker Registry.

Mari kita mulai!

## Menjalankan Docker Registry Container
```sh
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```
Perintah di atas menjalankan Docker Registry dalam mode detach, menggunakan port 5000, dengan nama `registry`, dan image `registry:2` dari Docker Hub.

## Menjalankan NGINX Container
```sh
docker run -d --name my-nginx -p 80:80 nginx
```
Cek di browser dengan mengakses `http://localhost:80/`. Jika berhasil, Anda akan melihat halaman default NGINX.

## Memodifikasi Halaman NGINX
Buat file `index.html`:
```sh
nano index.html
```
Isi file:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Docker Nginx</title>
</head>
<body>
  <h2>Hello, World!</h2>
</body>
</html>
```
Simpan dengan `CTRL+X`, lalu `Y`, dan `Enter`.

Salin file ke dalam container:
```sh
docker cp index.html my-nginx:/usr/share/nginx/html
```
Coba akses kembali `http://localhost:80/` untuk melihat perubahan.

## Membuat Image Baru dari Container
```sh
docker commit my-nginx nginx-hello-world
```
Cek apakah image sudah tersimpan:
```sh
docker images
```

## Menyimpan Image ke Docker Registry
Ubah nama image agar sesuai dengan Docker Registry:
```sh
docker tag nginx-hello-world localhost:5000/nginx-hello-world
```
Cek ulang dengan:
```sh
docker images
```

Unggah image ke Docker Registry:
```sh
docker push localhost:5000/nginx-hello-world
```

## Memverifikasi Docker Registry
Cek isi registry dengan:
```sh
curl -X GET http://localhost:5000/v2/_catalog
```
Jika berhasil, outputnya akan berisi daftar image yang tersedia.

## Menggunakan Image dari Docker Registry
Hapus container dan image lama:
```sh
docker stop my-nginx && docker container rm my-nginx && docker image rm nginx-hello-world localhost:5000/nginx-hello-world
```
Jalankan container baru dari image yang diunggah:
```sh
docker run -d --name my-nginx -p 80:80 localhost:5000/nginx-hello-world
```
Coba akses `http://localhost:80/` untuk memastikan image berjalan dengan benar.

## Membersihkan Container
```sh
docker container stop registry my-nginx && docker container rm -v registry my-nginx
```
Jangan hapus image karena akan digunakan untuk materi berikutnya.
