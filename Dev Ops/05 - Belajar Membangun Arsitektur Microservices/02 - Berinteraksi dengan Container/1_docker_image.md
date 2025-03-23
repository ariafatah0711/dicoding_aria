**Tutorial Membuat Aplikasi Flask dengan Docker**

---

### 1. Instalasi Flask dan Membuat Aplikasi Sederhana

Buat file `app.py` dan masukkan kode berikut:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

Aplikasi ini akan berjalan pada port `8080` dan menampilkan teks **"Hello World!"** saat diakses melalui browser.

---

### 2. Membuat Dockerfile

Buat file `Dockerfile` di direktori yang sama dengan `app.py`, lalu tambahkan kode berikut:

```dockerfile
FROM python:3.8

WORKDIR /app

COPY . .

RUN pip install flask

EXPOSE 8080

CMD ["python", "app.py"]
```

**Penjelasan:**
- **FROM python:3.8** → Menggunakan Python versi 3.8 sebagai base image.
- **WORKDIR /app** → Menentukan direktori kerja di dalam container.
- **COPY . .** → Menyalin semua file dari direktori lokal ke container.
- **RUN pip install flask** → Menginstal Flask.
- **EXPOSE 8080** → Mengekspos port 8080.
- **CMD ["python", "app.py"]** → Menjalankan aplikasi Flask.

---

### 3. Membangun dan Menjalankan Container

Jalankan perintah berikut untuk membangun image Docker:

```sh
docker build -t flask-app .
```

Setelah build selesai, jalankan container dengan perintah:

```sh
docker run --name flask-container -p 8080:8080 flask-app
```

Akses aplikasi di browser: [http://127.0.0.1:8080](http://127.0.0.1:8080)

---

### 4. Menjalankan Container dalam Mode Detach

Jika ingin menjalankan container tanpa mengganggu terminal, gunakan opsi `-d`:

```sh
docker run -d --name flask-container-detach -p 8080:8080 flask-app
```

---

### 5. Melihat Status Container

Gunakan perintah berikut untuk melihat container yang sedang berjalan:

```sh
docker ps
```

Untuk menghentikan container:

```sh
docker stop flask-container
```

Untuk menghapus container setelah dihentikan:

```sh
docker rm flask-container
```

---

### 6. Membuat Docker Image dari Container yang Berjalan

Jalankan perintah berikut untuk membuat image dari container yang sedang berjalan:

```sh
docker commit flask-container flask-app:v1
```

Lihat daftar image yang tersedia:

```sh
docker images
```

---

### 7. Port Mapping dalam Docker

Untuk mengubah port mapping, misalnya menjalankan aplikasi di `3000` pada host:

```sh
docker run --name flask-container-demo -p 3000:8080 flask-app
```

Akses aplikasi di browser: [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

### 8. Menghapus Image dan Container

Untuk menghapus container yang berjalan:

```sh
docker rm -f flask-container
```

Untuk menghapus image Docker:

```sh
docker rmi flask-app
```

---

Dengan tutorial ini, Anda sudah dapat menjalankan aplikasi Flask dalam container Docker dengan mudah. 🚀

