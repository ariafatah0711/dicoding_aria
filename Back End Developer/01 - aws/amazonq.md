# Latihan: Menggunakan Amazon Q Developer di VSCode

Sebelumnya, Anda sudah berhasil memasang Amazon Q Developer dan autentikasi dengan akun AWS Builder. Nah, berikutnya adalah latihan menggunakan Amazon Q Developer di VSCode. Yuk, kita mulai!

## Membuka Amazon Q Developer

1. Buka kembali VSCode dan menu Amazon Q Developer.
2. Anda akan melihat tampilan Chat seperti berikut ini.

Amazon Q Developer memiliki fitur utama seperti **Chat**, **Inline chat**, dan **Inline suggestions**. Anda dapat mengetik "/" pada halaman chat sehingga tampilannya terlihat seperti berikut.

### Perintah yang Tersedia

- `/dev`: Perintah untuk generate kode.
- `/doc`: Perintah untuk generate dokumentasi seperti desain teknikal.
- `/review`: Perintah untuk meminta Amazon Q me-review kode yang Anda tulis.
- `/test`: Perintah untuk generate unit tests.
- `/transform`: Perintah untuk upgrade proyek Java.

## Contoh Penggunaan

### 1. Membuat Fungsi Luas Persegi Panjang

Misalnya, kita sudah memiliki function berikut:

```js
function calculateSquareArea(side) {
  return side * side;
}

const square = calculateSquareArea(5)
console.log(square);
```

Untuk menambahkan function menghitung luas persegi panjang:

- Gunakan **inline chat** dengan menekan `CTRL + I`.
- Ketik perintah: `/dev generate function calculate rectangle area`.

### 2. Menjelaskan Kode

Select kode berikut:

```js
function calculateRectangleArea(length, width) {
  return length * width;
}
```

Kemudian, di dalam fitur Chat, ketik perintah: `Explain this code`.

Anda juga dapat memberikan pertanyaan lanjutan seperti:

- "What are edge cases for this function?"
- "Can this be optimized?"

### 3. Generate Function Baru

Minta Amazon Q Developer membuat function menghitung luas segitiga:

- Ketik: `Create function to calculate triangle area`.
- Anda dapat memilih **Copy** atau **Insert at cursor** untuk menambahkan hasil kode ke dalam file.

### 4. Code Completion

Amazon Q Developer juga memiliki fitur **inline suggestions** seperti code completion untuk mempercepat penulisan kode Anda.

> ⚠️ Kode yang dihasilkan oleh AI tidak valid 100%, jadi Anda tetap harus melakukan pengecekan dan review.

### 5. Membuat Testing

- Select kode yang ada di `index.js`
- Di dalam Chat, ketik: `Create test for this code`

Amazon Q Developer akan menghasilkan file testing.

Jalankan dengan perintah:

```bash
npm run test
```

---

## Tips Prompting

Untuk hasil terbaik, berikan perintah yang spesifik dan jelas. Ini membantu AI memahami ekspektasi Anda dengan lebih baik.

Pelajari lebih lanjut tentang teknik ini di: **Prompt Engineering Guide**.

Selamat mencoba!

