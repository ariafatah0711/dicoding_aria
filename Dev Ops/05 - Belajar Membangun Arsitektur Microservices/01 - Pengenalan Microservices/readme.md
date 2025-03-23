**Pengertian Microservices**
Arsitektur microservices adalah pendekatan dalam pengembangan aplikasi yang membagi sistem menjadi sekumpulan layanan kecil (service) yang dapat dikembangkan, di-deploy, dan dikelola secara independen. Setiap service biasanya merupakan web service yang bertanggung jawab atas satu bagian domain bisnis tertentu dan berkomunikasi dengan service lain menggunakan API seperti REST atau gRPC.

**Perbedaan Monolithic vs Microservices**
- **Monolithic**: Aplikasi dibangun sebagai satu unit tunggal dengan satu codebase yang mengelola semua urusan bisnis.
- **Microservices**: Aplikasi dibagi menjadi beberapa service independen dengan business logic dan database masing-masing, sehingga update, testing, deployment, dan scaling dapat dilakukan secara terpisah.
- Microservices tidak mengurangi kompleksitas, tetapi membuatnya lebih terlihat dan mudah dikelola dengan memisahkan tugas menjadi unit independen.

**Cara Membangun Arsitektur Microservices**
1. Mulai dengan arsitektur monolithic terlebih dahulu.
2. Restrukturisasi tim agar sesuai dengan layanan yang akan dikembangkan.
3. Pecah monolithic untuk membangun arsitektur microservices.
4. Gunakan komunikasi sederhana antara service dengan RESTful API.
5. Bagi data berdasarkan domain bisnis masing-masing.
6. Persiapkan mitigasi kegagalan dengan baik.
7. Tekankan monitoring untuk mempermudah testing.
8. Implementasikan CI/CD untuk meminimalkan risiko kegagalan saat deployment.

**Monolithic atau Langsung Microservices?**
- Martin Fowler menyarankan memulai dengan monolithic agar lebih mudah memahami kompleksitas sistem sebelum beralih ke microservices.
- Stefan Tilkov berpendapat bahwa jika tujuan akhirnya adalah microservices, lebih baik langsung membangun dengan pendekatan tersebut.
- Keputusan harus disesuaikan dengan karakteristik aplikasi dan kesiapan tim dalam mengelola risiko.

Tidak ada pendekatan yang mutlak benar, sehingga pilihan harus dibuat dengan pertimbangan matang berdasarkan kebutuhan aplikasi dan tujuan jangka panjang.