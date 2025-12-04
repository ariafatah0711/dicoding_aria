# Hi, Machine Learning! Part 2
## D. Machine Learning Use Case
Machine learning dipakai di banyak hal dalam keseharian kita. Sistem-sistem ini bekerja dengan cara mempelajari pola dari data, lalu menggunakan pola tersebut untuk membuat prediksi atau keputusan.

Berikut ringkasan penerapannya dalam kehidupan sehari-hari:
##### 1. Sistem Rekomendasi (Netflix, YouTube, Tokopedia)
- Mempelajari riwayat tontonan/belanja pengguna.
- Memakai supervised & unsupervised learning.
- Tujuan: Menebak apa yang kemungkinan besar kamu suka.

##### 2. Penyaringan Email Spam (Gmail)
- Mengidentifikasi email spam berdasarkan pola kata & struktur email.
- Menggunakan supervised learning dengan data berlabel spam / not spam.

##### 3. Asisten Suara (Siri, Google Assistant)
- Memahami perintah suara dan konteks percakapan.
- Menggunakan supervised + unsupervised learning untuk memproses bahasa alami.

##### 4. Pengenalan Wajah / Gambar (Instagram, Facebook)
- Mempelajari fitur wajah dari banyak foto berlabel.
- Menggunakan supervised learning untuk mengenali wajah baru.

##### 5. Deteksi Penipuan (Bank & Fintech)
- Menganalisis pola transaksi normal vs mencurigakan.
- Unsupervised learning → menemukan pola aneh.
- Supervised learning → jika ada data penipuan berlabel.

##### 6. Chatbot Customer Service
- Belajar dari percakapan berlabel untuk menjawab pertanyaan.
- Supervised learning untuk pelatihan awal.
- Unsupervised learning untuk memahami pola baru.

##### 7. Diagnostik Kesehatan (MRI, Rontgen)
- Model belajar dari gambar medis yang sudah diberi label diagnosis.
- Menggunakan supervised learning untuk mengenali penyakit.-

---

## E. Merumuskan Masalah dalam Machine Learning
Merumuskan masalah ML adalah langkah paling awal dan paling penting karena menentukan arah seluruh proyek. Prosesnya meliputi:

##### 1. Identifikasi Tujuan Bisnis
- Tentukan apa yang ingin dicapai (misal: kurangi churn, prediksi harga, deteksi fraud).
- Pakai metode SMART supaya tujuan jelas:
  - Specific → tujuan detail
  - Measurable → punya metrik
  - Achievable → realistis
  - Relevant → sesuai strategi bisnis
  - Time-bound → punya batas waktu

> Contoh: Mengurangi churn 15% dalam 12 bulan.

##### 2. Memahami Data yang Tersedia
- Setelah tahu tujuan, cek apakah data mendukung.
- Tahapannya:
1. Inventarisasi Data
   - Kumpulkan semua sumber data (internal & eksternal).
2. Evaluasi Kualitas Data
   - cek missing value, duplikasi, error, konsistensi
   - pastikan fitur relevan
3. Eksplorasi Data (EDA)
   - lihat pola, hubungan variabel, distribusi
   - gunakan histogram, scatter plot, korelasi
4. Pemilihan Fitur
   - Pilih fitur yang paling berpengaruh pada target.
5. Pembersihan & Transformasi
   - isi missing value
   - hapus duplikat
   - normalisasi data
   - encoding data kategorikal

> Contoh: Untuk prediksi churn, data historis pelanggan, interaksi layanan, dan demografi penting.

##### 3. Tentukan Jenis Masalah Machine Learning
Jenis masalah menentukan algoritma & cara evaluasi:

**A. Klasifikasi**
- Memetakan data ke kategori (spam/tidak, fraud/tidak).
- Algoritma: KNN, Decision Tree, Random Forest, SVM, Logistic Regression

> Evaluasi: Akurasi, Precision, Recall, F1, ROC-AUC

**B. Regresi**
- Memrediksi nilai numerik (harga rumah, suhu).
- Algoritma: Linear Regression, SVR, Random Forest Regressor

> Evaluasi: MSE, MAE, R²

**C. Clustering**
- Mengelompokkan data tanpa label (segmentasi pelanggan).
- Algoritma: K-Means, DBSCAN, Hierarchical

> Evaluasi: Silhouette score, Davies-Bouldin

##### 4. Definisikan Target dan Fitur
- Fitur → input yang menjelaskan data
- Target → variabel yang ingin diprediksi

> Contoh (Iris Dataset):

- Fitur: sepal length, sepal width, petal length, petal width
- Target: spesies bunga (Setosa/Versicolor/Virginica)

##### 5. Membuat Pernyataan Masalah
- Pernyataan harus jelas & spesifik.

> Contoh: "Memprediksi apakah pelanggan akan churn dalam 3 bulan ke depan berdasarkan riwayat transaksi dan interaksi."

##### 6. Contoh Studi Kasus
| Aspek                  | Deteksi Penipuan                          | Prediksi Harga Rumah               | Segmentasi Pelanggan                 |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------ |
| **Tujuan**             | Kurangi kerugian fraud                    | Estimasi harga rumah               | Mengelompokkan pelanggan             |
| **Jenis Masalah**      | Klasifikasi                               | Regresi                            | Clustering                           |
| **Evaluasi**           | Precision, Recall                         | MSE                                | Silhouette                           |
| **Target**             | Penipuan / bukan                          | Harga                              | Tidak ada (unsupervised)             |
| **Fitur**              | Waktu, lokasi, jumlah transaksi           | Lokasi, ukuran, kamar              | Frekuensi belanja, total pengeluaran |
| **Pernyataan Masalah** | Bagaimana mendeteksi fraud secara akurat? | Bagaimana memprediksi harga rumah? | Bagaimana mengelompokkan pelanggan?  |

## F. Tantangan dalam Machine Learning
Machine learning memiliki banyak potensi, namun juga menghadapi berbagai tantangan yang perlu diperhatikan agar model yang dikembangkan efektif dan andal. Tantangan utama meliputi:

1. Kualitas Data – Data harus bersih, lengkap, dan akurat. Kesalahan seperti data hilang atau duplikasi dapat menurunkan kinerja model.
2. Keterbatasan Data – Jumlah data yang sedikit atau tidak seimbang antar kelas dapat membuat model sulit belajar dengan baik.
3. Pemilihan Model dan Algoritma – Memilih model yang sesuai serta mengatur hyperparameter dengan tepat sangat penting untuk hasil optimal.
4. Etika dan Privasi – Penggunaan data harus memperhatikan privasi, keamanan, serta menghindari bias yang dapat menyebabkan keputusan diskriminatif.
5. Pemeliharaan dan Pembaruan Model – Model harus diperbarui secara berkala karena pola data dapat berubah seiring waktu.

---

# list algoritma yang sering digunakan
##### 1. Linear Regression
- Untuk apa? → Prediksi angka (nilai kontinu).
- Contoh: harga rumah, suhu, pendapatan, berat badan, dll.

> Inti konsep: mencari garis lurus terbaik untuk memprediksi nilai.

##### 2. Logistic Regression
- Untuk apa? → Prediksi kelas (ya/tidak, spam/bukan spam).
- Contoh: apakah akun spam, apakah pelanggan churn.

> Inti konsep: menghasilkan probabilitas, lalu diubah jadi kategori.

##### 3. Decision Tree
- Untuk apa? → Bisa untuk classification dan regression.
- Contoh: memutuskan seseorang eligible pinjaman, atau memprediksi harga rumah.

> Inti konsep: model berbentuk pohon dengan “jika … maka …”.

##### 4. Random Forest
- Untuk apa? → Classification & Regression yang lebih kuat dari Decision Tree.
- Contoh: deteksi spam, prediksi harga rumah, prediksi risiko.

> Inti konsep: gabungan banyak decision tree → hasil lebih akurat & stabil.

##### 5. Naive Bayes
- Untuk apa? → Classification, terutama teks.
- Contoh: email spam, sentimen teks.

> Inti konsep: menggunakan probabilitas antar kata.

##### 6. K-Means Clustering
- Untuk apa? → Clustering (tanpa label), yaitu mengelompokkan data secara otomatis.
- Contoh: segmentasi pelanggan bank.

> Inti konsep: membagi data menjadi beberapa kelompok mirip.

##### 7. Support Vector Machine (SVM)
- Untuk apa? → Classification.
- Contoh: deteksi penipuan, pengenalan pola.

> Inti konsep: mencari garis pemisah terbaik antar kelas.

| Algoritma               | Tugas                       | Contoh               |
| ----------------------- | --------------------------- | -------------------- |
| **Linear Regression**   | Regression                  | Harga rumah          |
| **Logistic Regression** | Classification              | Spam / tidak         |
| **Decision Tree**       | Classification & Regression | Eligible pinjaman    |
| **Random Forest**       | Classification & Regression | Risiko, spam         |
| **Naive Bayes**         | Classification              | Spam teks            |
| **K-Means**             | Clustering                  | Segmentasi pelanggan |
| **SVM**                 | Classification              | Deteksi fraud        |
