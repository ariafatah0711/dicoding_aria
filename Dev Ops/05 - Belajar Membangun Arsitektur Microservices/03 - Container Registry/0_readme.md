# Opsi Container Registry

Kini Anda sudah mengetahui container registry dan fungsinya. Bahkan, mungkin Anda sudah familier karena kita sudah mempelajarinya dalam modul sebelumnya. Namun, tahukah Anda bahwa ada banyak opsi container registry yang tersedia saat ini, mulai dari self-hosted (on-premise) hingga hosted remotely, baik public maupun private.

Nah, pada materi ini kita akan bahas semuanya. Dengan ini, harapannya dapat membuka wawasan dan memperbanyak opsi dalam memilih container registry terbaik untuk kasus aplikasi Anda.

## Tipe Container Registry
Dari sisi deployment, ada 2 tipe container registry:
1. **Self-hosted**
2. **Hosted remotely**

Mari kita kupas satu per satu.

---

## Self-hosted
Bila concern utama Anda adalah soal keamanan, peraturan, atau ingin punya kontrol akses dan privasi yang ketat terhadap image, opsi container registry yang mungkin bisa menjadi solusi adalah menggunakan tipe **self-hosted (on-premise)**.

### Keunggulan Self-hosted
- Kontrol fleksibel atas penyimpanan dan distribusi image.
- Integrasi dengan pengembangan internal.
- Keamanan dan kepatuhan terhadap regulasi lebih tinggi.

Namun, untuk bisa menjalankan registry ini, Anda harus menginstal dan mengelola sebuah registry server. Berikut beberapa opsi yang bisa Anda pilih:

### Docker Registry
Docker Registry adalah server-side application yang berfungsi untuk menyimpan dan mendistribusikan Docker image secara mandiri dan aman. Docker Registry bersifat open-source di bawah Apache license.

- Ideal untuk organisasi yang ingin mengelola image secara privat.
- Bisa diintegrasikan ke dalam CI/CD pipeline.

### Harbor
Dibuat pada tahun 2014 dan menjadi open-source pada 2016, Harbor adalah produk container registry yang dapat diinstal, dikonfigurasi, dan dikelola oleh pengguna.

- Fitur utama: vulnerability scanning, garbage collection, cross-region replication, dan content trust.
- Alternatif solid selain Docker Registry untuk pengelolaan self-hosted.

### Sonatype Nexus Repository
Mirip dengan Harbor, Nexus Repository adalah solusi self-hosted container registry lainnya.

- Mendukung berbagai software package seperti Java/Maven, npm, NuGet, PyPI, RubyGems, CocoaPods.
- Kompatibel dengan IDE dan CI seperti Eclipse, IntelliJ, Visual Studio, dan Jenkins.

### Red Hat Quay
Quay adalah container registry yang telah berkembang dari CoreOS hingga Red Hat.

- **Project Quay**: Open-source distribution dari Red Hat Quay.
- **Red Hat Quay.io**: Hosted registry di Red Hat Cloud.
- **Red Hat Quay**: Private-cloud registry dengan berbagai fitur keamanan.

---

## Hosted Remotely
Bila Anda tak mau repot dengan penginstalan dan pengelolaan server, **hosted remotely** bisa jadi pilihan.

- **Public repository**: Bisa diakses oleh semua orang tanpa autentikasi.
- **Private repository**: Dapat diakses hanya dengan autentikasi tertentu.

Berikut beberapa layanan container registry hosted remotely yang populer:

### Amazon ECR
Amazon Elastic Container Registry (Amazon ECR) adalah layanan AWS untuk penyimpanan container image secara aman.

- Mendukung **public dan private repository**.
- Terintegrasi dengan AWS IAM untuk kontrol akses.
- Fitur **vulnerability scanning** dan **immutable image tags** untuk keamanan lebih tinggi.

### Docker Hub
Docker Hub adalah container registry paling populer dan merupakan opsi default dari Docker.

- Menyediakan lebih dari 100.000 container image siap pakai.
- **Public repository** untuk berbagi image secara luas.
- **Private repository** untuk penggunaan eksklusif.

### GitHub Packages
GitHub Packages adalah layanan penyimpanan software package dari GitHub, termasuk container image.

- Terintegrasi dengan **GitHub API, Actions, dan Webhooks**.
- Mendukung berbagai package manager seperti Docker, RubyGems, npm, Maven, dan NuGet.
- Menyediakan **GitHub Container Registry (ghcr.io)** untuk mengelola image secara public maupun private.

---

## Kesimpulan
Baik **self-hosted** maupun **hosted remotely**, keduanya memiliki keunggulan masing-masing.

### Hal yang perlu dipertimbangkan dalam memilih container registry:
1. **Harga**: Pilih sesuai dengan anggaran dan kebutuhan.
2. **Keamanan**: Public vs Private repository berpengaruh pada aksesibilitas dan proteksi data.

Selanjutnya, kita akan latihan menggunakan **Docker Registry**. Nantikan di materi selanjutnya!
