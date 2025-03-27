# Latihan Membuat Todo App dengan Docker: Menambahkan Volume untuk SQLite

## Pendahuluan
Pada tahapan sebelumnya, kita menyadari bahwa semua item pada aplikasi Todo App terhapus saat meluncurkan container baru. Untuk mengatasi hal ini, kita memerlukan penyimpanan yang bersifat persisten. Dalam latihan ini, kita akan menggunakan **volume** pada Docker.

## Mengapa Menggunakan Volume?
Volume memungkinkan kita menghubungkan path tertentu dari filesystem container ke mesin host. Jika sebuah direktori dalam container di-mount, perubahan dalam direktori tersebut juga terlihat pada mesin host. Bahkan, jika volume yang sama digunakan untuk semua container, file yang tersimpan akan tetap tersedia meskipun container dihapus atau dihentikan.

Secara default, aplikasi Todo App menyimpan data di sebuah database SQLite pada path berikut:

```
/etc/todos/todo.db
```

SQLite adalah database relasional yang menyimpan semua data ke dalam satu file. Database ini cocok digunakan untuk pengembangan, demo, atau aplikasi skala kecil seperti Todo App.

## Langkah-Langkah

### 1. Membuat Volume
Buatlah sebuah volume dengan nama `todo-db` menggunakan perintah berikut:

```sh
docker volume create todo-db
```

### 2. Menghapus Container Lama
Hentikan dan hapus container `todo-app` sebelumnya karena container tersebut belum menggunakan volume:

```sh
docker rm -f todo-app
```

### 3. Menjalankan Container Baru dengan Volume
Jalankan container baru untuk Todo App dengan menambahkan opsi `-v` guna menyertakan volume:

```sh
docker run -dp 3000:3000 --name todo-app -v todo-db:/etc/todos todo-app:v2
```

### 4. Menguji Penyimpanan Data
Akses kembali Todo App melalui:

```
http://localhost:3000/
```

Tambahkan beberapa item untuk menguji penyimpanan data.

### 5. Menghapus dan Menjalankan Ulang Container
Uji coba apakah data tetap ada dengan menghentikan dan menghapus container `todo-app`:

```sh
docker rm -f todo-app
```

Kemudian jalankan container baru lagi dengan perintah yang sama:

```sh
docker run -dp 3000:3000 --name todo-app -v todo-db:/etc/todos todo-app:v2
```

Akses kembali Todo App melalui **http://localhost:3000/** dan periksa apakah item yang telah dibuat sebelumnya masih ada.

## Kesimpulan
Dengan menggunakan volume, aplikasi Todo App kini dapat menyimpan data secara persisten. Meskipun container dihapus, data tetap tersimpan di volume yang telah dibuat. Selamat mencoba! 🎉