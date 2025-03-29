# Pengenalan Container Orchestration

Container telah merevolusi dunia IT dalam membuat, mengirim, dan memelihara aplikasi. Docker sebagai engine container populer memungkinkan aplikasi dikemas dalam container, mendukung arsitektur microservices yang meningkatkan skalabilitas.

Namun, mengelola ribuan container secara manual sangat kompleks. Oleh karena itu, container orchestration hadir untuk mengotomatiskan deployment, management, scaling, networking, dan availability container dalam skala besar.

## Fungsi Container Orchestration

1. **Pengelolaan Container**  
   - Membuat dan menghapus container dengan mudah.
   - Mendukung konfigurasi imperatif (CLI) dan deklaratif (manifest YAML).
   - Skalabilitas terjamin dengan autoscaling.

2. **Perpindahan Container Antar Host**  
   - Menjalankan container di beberapa host.
   - Memindahkan container jika terjadi overload atau host down.

3. **Alokasi Sumber Daya**  
   - Menentukan batasan CPU dan memory untuk efisiensi.

4. **Ekspos Container ke Dunia Luar**  
   - Mengontrol akses internet berdasarkan IP, domain, atau port.

5. **Load Balancing**  
   - Menyeimbangkan beban antar container untuk meningkatkan availability dan reliability.

6. **Pemantauan Kondisi**  
   - Memastikan container tetap berjalan dengan mengganti yang down secara otomatis.

Container orchestration ideal untuk arsitektur microservices dan memungkinkan deployment yang konsisten di berbagai environment. Selanjutnya, kita akan membahas cara kerjanya lebih dalam!

# Cara Kerja Container Orchestration

Container orchestration bekerja dengan mendefinisikan konfigurasi dalam berkas YAML atau JSON. Tools seperti Kubernetes memungkinkan Anda menjalankan container di beberapa mesin host, sedangkan Docker Compose lebih sederhana, hanya untuk satu mesin host (kecuali menggunakan Docker Swarm).

Saat menggunakan Docker Compose, konfigurasi ditulis dalam `docker-compose.yml`, mencakup jumlah service, image, network, volume, dll. Setelah siap, cukup jalankan satu perintah untuk meluncurkan semua resource tersebut. Konsep ini juga berlaku di Kubernetes, dengan berkas konfigurasi yang disebut manifest.

Berkas konfigurasi biasanya disimpan dalam version control system seperti Git agar deployment tetap konsisten di berbagai environment (development, testing, production). Bahkan, bisa diintegrasikan dalam CI/CD, mendukung prinsip GitOps.

Saat konfigurasi di-deploy, container akan diluncurkan dalam replicated group di mesin host. Container orchestrator akan memilih host terbaik berdasarkan CPU, memori, atau label tertentu. Setelah berjalan, orchestrator akan mengelola siklus hidup container sesuai spesifikasi.

Container orchestration tools dapat digunakan di berbagai environment, baik on-premise maupun public cloud, serta mendukung berbagai container engine, termasuk Docker.

# Opsi Container Orchestration

## Pengenalan
Container orchestration tools menyediakan framework untuk mengelola container dan arsitektur microservices dalam skala besar. Beberapa opsi populer adalah Kubernetes, Docker Swarm, Red Hat OpenShift, Apache Mesos, dan Hashicorp Nomad.

## Kubernetes
Kubernetes (K8s) adalah container orchestration tool open-source yang awalnya dikembangkan oleh Google dan kini dikelola oleh Cloud Native Computing Foundation. Kubernetes memungkinkan deployment, scaling, dan monitoring container secara otomatis.

### Komponen Utama Kubernetes:
- **Cluster**: Kumpulan node yang dikelola oleh control plane.
- **Control Plane (Master)**: Bertugas mengatur scheduling dan manajemen container.
- **Kubelet**: Agent yang mengelola status node.
- **Pod**: Grup container yang berjalan bersama.
- **Deployment & ReplicaSet**: Mengatur jumlah instance container.

### Keunggulan Kubernetes:
- Otomatisasi operasional.
- Abstraksi infrastruktur.
- Pemantauan kondisi container.
- Mendukung banyak container runtime (Docker, CRI-O, containerd).

## Docker Swarm
Docker Swarm adalah container orchestration tool yang memungkinkan pengelolaan container dalam cluster dengan konfigurasi yang lebih sederhana dibandingkan Kubernetes. Swarm menawarkan high availability, load balancing, dan scaling otomatis.

## Red Hat OpenShift
OpenShift adalah distribusi Kubernetes yang berfokus pada pengalaman developer dan keamanan. Mendukung pengembangan, deployment, dan orkestrasi aplikasi container dengan kemudahan integrasi cloud.

## Apache Mesos
Mesos adalah framework open-source untuk mengelola cluster besar hingga ribuan node. Digunakan oleh perusahaan seperti Twitter dan Uber. Mendukung Java, C++, Python, dan framework seperti Marathon.

## Hashicorp Nomad
Nomad adalah orchestrator yang mendukung berbagai workload seperti Docker, microservices, dan aplikasi non-container. Digunakan oleh perusahaan besar seperti eBay dan Trivago untuk automasi deployment aplikasi.