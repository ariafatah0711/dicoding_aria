**Container**
Container adalah unit perangkat lunak yang mengemas kode dan semua dependensinya agar dapat berjalan dengan konsisten di berbagai lingkungan tanpa bergantung pada sistem operasi utama.

Contoh: Aplikasi web dalam container dapat dijalankan di laptop, server, atau cloud tanpa perubahan konfigurasi.

**Container Image**
Container image adalah paket yang dapat dieksekusi berisi kode, libraries, dan konfigurasi yang dibutuhkan container. Image bersifat immutable, sehingga setiap perubahan akan menghasilkan layer baru.

Contoh: Ubuntu, Nginx, dan PostgreSQL memiliki container image yang siap digunakan.

**Container Image Format**
Struktur standar untuk container image yang kini banyak menggunakan Open Container Initiative (OCI), sehingga bisa digunakan lintas platform.

Contoh: Docker V2 image format yang digunakan oleh Docker dan CRI-O.

**Container Engine**
Platform yang menjalankan container, menangani pembuatan, penghapusan, dan pengelolaan lifecycle container.

Contoh: Docker, Podman, LXD, CRI-O, Railcar.

**Container Runtime**
Komponen dalam container engine yang menangani eksekusi container dan mengisolasi aplikasi dalam sistem.

Contoh: RunC digunakan oleh Docker dan CRI-O, kata-runtime untuk Kata Containers.

**Container Registry**
Layanan untuk menyimpan dan mendistribusikan container image. Container registry dapat bersifat public atau private.

Contoh: Docker Hub, Google Container Registry, Amazon ECR, Quay.io.

**Namespace**
Pemisah dalam container registry untuk mengelola image berdasarkan pengguna atau organisasi, memastikan isolasi antara proyek yang berbeda.

Contoh: "nginx" di Docker Hub merujuk pada repository resmi Nginx, sedangkan "mycompany/nginx" bisa menjadi image milik perusahaan tertentu.

**Repository**
Tempat menyimpan container image dalam container registry, berisi beberapa versi dari container image.

Contoh: "library/nginx" di Docker Hub menyimpan berbagai versi image Nginx.

**Image Layer**
Setiap container image terdiri dari beberapa lapisan (layer) yang membangun image secara bertahap untuk efisiensi penyimpanan dan deployment.

Contoh: Image Ubuntu memiliki layer dasar OS, kemudian layer tambahan seperti aplikasi atau libraries.

**Tag**
Label untuk menandai versi tertentu dari container image agar mudah diidentifikasi.

Contoh: "nginx:latest" menunjuk ke versi terbaru Nginx, "nginx:1.21" menunjuk ke versi 1.21.

**Container Orchestration**
Manajemen otomatis container dalam skala besar untuk deployment, scaling, dan networking container.

Contoh: Kubernetes digunakan untuk mengelola banyak container secara efisien di berbagai server, Docker Swarm sebagai solusi bawaan Docker untuk clustering, dan OpenShift yang berbasis Kubernetes.

**Container Management Tools**
Selain orchestration tools, ada juga tools untuk manajemen container tanpa daemon seperti Podman yang bisa menggantikan Docker dengan model rootless.

Contoh: Podman digunakan untuk menjalankan container tanpa daemon, Buildah untuk membuat container image tanpa Docker.