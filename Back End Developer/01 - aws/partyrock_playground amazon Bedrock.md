# Kanvas Latihan: Menggunakan PartyRock Playground Amazon Bedrock

Seperti yang Anda ketahui, Amazon Bedrock merupakan layanan yang dapat mendukung untuk kebutuhan membangun aplikasi Generative AI. Untuk mengakses layanan Amazon Bedrock, Anda membutuhkan akun AWS. Namun, jika ingin mencobanya tanpa membuat akun AWS, Anda dapat menggunakan platform PartyRock sebagai alternatif.

PartyRock adalah playground dari Amazon Bedrock yang dapat Anda coba untuk membangun aplikasi Generative AI. Untuk saat ini, PartyRock dapat diakses secara gratis. Anda dapat membuat dan bereksperimen dengan Generative AI melalui PartyRock tanpa menulis satu baris kode. Hanya dengan klik dan beberapa step, Anda sudah dapat membuat aplikasi yang didukung oleh fitur Generative AI. Anda dapat mengakses PartyRock melalui tautan [https://partyrock.aws/](https://partyrock.aws/).

Pada latihan kali ini, kita akan membuat sebuah aplikasi berbasis website yang dapat me-review tulisan bahasa Indonesia yang diunggah dalam sebuah dokumen berformat PDF. Berikut hasil akhir dari aplikasi yang dibuat.

Menarik, kan? Yuk, simak latihannya.

## Langkah-Langkah:

1. **Kunjungi halaman [https://partyrock.aws/](https://partyrock.aws/)**
2. **Daftar akun terlebih dahulu jika belum punya.** Daftarnya sangat sederhana, Anda dapat memilih daftar melalui akun Google, Apple, dan Amazon.
3. **Jika sudah memiliki akun, klik Log in.**
4. Setelah Log in, Anda akan masuk ke halaman Home.
5. Untuk membuat aplikasi, klik **Generate app** yang ada di sebelah kiri.
6. Akan muncul sebuah pop up. Pilih **Build manually** untuk membangun dari nol.
7. Anda akan dialihkan ke halaman editor.

## Ubah Nama Aplikasi

1. Klik ikon di sebelah kanan nama default app.
2. Akan muncul menu di sebelah kanan. Isilah nama app-nya, misalnya: `EditorBerkelas`.
3. Klik **Save**.

## Tambahkan Widget Upload Dokumen

1. Klik tombol **+ Add widget**.
2. Pilih jenis widget **Document** di sebelah kiri.
3. Ubah nama widget menjadi **Upload Dokumen**.
4. Klik **Save**.

## Tambahkan Widget Hasil Review

1. Klik tombol **+ Add widget** lagi.
2. Pilih widget jenis **Text Generation**.
3. Di bagian prompt, tulis perintah berikut:

```markdown
Kamu adalah seorang writing coach yang ahli dalam penulisan dan Bahasa Indonesia. Kamu memahami penulisan serta ejaan Bahasa Indonesia sesuai dengan kaidah yang baik dan benar.

"Beri ulasan mengenai @Upload Dokumen dan buat daftar bernomor berisi rekomendasi revisi untuk memperbaiki tata bahasa dan ejaan. Jangan ubah original teksnya.

Penilaian:
Apa yang Bagus:
Saran Perbaikan:
Revisi:"
```

4. Klik tab **Labels**, ubah nama widget menjadi **Hasil Review**.
5. Klik tab **Model**, pilih foundation model sesuai preferensi.
6. Atur nilai **Temperature** dan **Top P** sesuai eksperimen Anda.
7. Klik **Save**.

## Uji Aplikasi

1. Klik bagian **Upload Dokumen**, unggah dokumen PDF berisi teks bahasa Indonesia.
2. Jalankan aplikasi dengan menekan **CTRL + Enter** atau klik ikon **Play** (warna hijau).
3. Tunggu proses selesai, hasil review akan ditampilkan di widget "Hasil Review".

## Bagikan Aplikasi

1. Klik **Menu** di kanan atas.
2. Klik **App is private**.
3. Pilih salah satu:
    - **Public**: agar aplikasi dapat diakses semua orang.
    - **Shared**: agar aplikasi dapat diakses oleh orang yang memiliki link-nya.
4. Klik **Make app public** jika ingin menjadikannya publik.

---

Yeay, selamat! Anda sudah berhasil membuat aplikasi Generative AI melalui PartyRock yang memiliki kemampuan generate sebuah teks dan memberikan review dari sebuah dokumen yang diunggah.

Sejauh ini, Anda sudah memiliki pengetahuan terkait AI, Machine Learning, dan Generative AI. Selain itu, Anda sudah mengenali layanan AI yang tersedia di AWS seperti SageMaker, Bedrock, Amazon Q, dan sebagainya. Dengan bekal pengetahuan ini, Anda dapat memulai perjalanan untuk berinovasi dengan memanfaatkan AI, Machine Learning, dan Generative AI.

**Selamat bereksperimen!**