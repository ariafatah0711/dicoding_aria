# Pengenalan Kubernetes

## Pengantar
Selamat! Anda telah mencapai materi **Bekerja dengan Kubernetes**. Sebelum melanjutkan, ambil waktu sejenak untuk bersantai, minum teh atau kopi, dan siapkan diri Anda untuk mempelajari lebih dalam mengenai Kubernetes.

## Apa itu Kubernetes?
Kubernetes adalah platform container orchestration yang mengotomatisasi **deployment**, **manajemen**, dan **scaling** aplikasi berbasis container.

Nama "Kubernetes" berasal dari bahasa Yunani yang berarti **juru mudi atau pilot**. Kubernetes sering disingkat **k8s**, yang merupakan singkatan dari delapan huruf antara "k" dan "s".

Awalnya dikembangkan oleh engineer di **Google**, Kubernetes terinspirasi dari sistem internal mereka bernama **Borg**. Dengan pengalaman bertahun-tahun mengembangkan Borg, Kubernetes menjadi solusi open-source yang banyak digunakan oleh individu, komunitas, dan perusahaan.

## Kemampuan Kubernetes
1. **Service Discovery & Load Balancing**
   - Memungkinkan service saling menemukan satu sama lain melalui **DNS name** atau **IP address**.
   - Mendistribusikan traffic secara merata untuk **load balancing**.

2. **Storage Orchestration**
   - Memungkinkan penggunaan berbagai jenis storage, seperti **local storage, persistent storage, dan cloud storage**.

3. **Automated Rollouts & Rollbacks**
   - Memungkinkan **deploy versi baru** dari aplikasi tanpa downtime.
   - Dapat melakukan **rollback** ke versi lama jika terjadi kesalahan.

4. **Self-Healing**
   - Secara otomatis **memulai ulang**, **mengganti**, atau **mematikan** container yang mengalami masalah.

5. **Secret & Configuration Management**
   - Menyimpan informasi sensitif seperti **password, OAuth token, dan SSH key** secara aman menggunakan komponen **Secret**.
   - Memungkinkan **deploy dan update konfigurasi** tanpa perlu build ulang container image.

## Metode Deploy Kubernetes
Terdapat beberapa metode untuk **men-deploy Kubernetes**, tergantung pada kebutuhan dan skala penggunaannya:

### 1. **Single-Node Kubernetes Cluster**
   - Cocok untuk **development** dan **testing environment**.
   - Opsi implementasi:
     - **Docker Desktop** (Aktifkan Kubernetes di Settings -> Kubernetes)
     - **Minikube** (Menjalankan Kubernetes secara lokal di macOS, Linux, dan Windows)
     - **Kubeadm** (Biasanya digunakan untuk **production**, tetapi bisa juga untuk single-node cluster)

### 2. **Single-Node Kubernetes Cluster for Continuous Integration**
   - Digunakan untuk pengujian aplikasi setiap kali ada perubahan kode.
   - Opsi implementasi:
     - **Kubernetes-in-Docker (kind)**

### 3. **Multi-Node Kubernetes Cluster**
   - Digunakan untuk **production environment**.
   - Memungkinkan **failover otomatis** jika satu node mengalami kegagalan.
   - Opsi implementasi:
     - **Full Control:** kubespray, kops, kubeadm
     - **Fully-Managed:** Amazon EKS

## Kesimpulan
Kubernetes menawarkan fleksibilitas tinggi dalam deployment, memungkinkan aplikasi berbasis container untuk berjalan secara **efisien, stabil, dan scalable**. Dalam materi selanjutnya, kita akan membahas metode praktis dalam menggunakan Kubernetes. Nantikan pembahasannya!

## Arsitektur Kubernetes

Sekarang Anda sudah cukup mengenal Kubernetes. Selanjutnya, kita akan menyelami materi lebih dalam dengan membahas arsitektur Kubernetes. Topik ini sangat penting untuk Anda ketahui karena amat berguna ketika nanti praktik dengan Kubernetes.

Sama seperti ketika Anda menggemari klub sepak bola. Bila Anda memang seorang penggemar dan pendukung dari suatu klub sepak bola, mengetahui setiap nama pemain adalah hal yang wajib hukumnya. Begitu juga dengan Kubernetes. Bila ingin praktik dengannya, Anda juga harus tahu setiap komponen-komponen yang dimiliki oleh Kubernetes.

Pada dasarnya, saat kita berbicara tentang arsitektur Kubernetes, maka yang dimaksud adalah dalam bentuk **Kubernetes Cluster**. Sebuah Kubernetes Cluster setidaknya (paling minimal) terdiri dari satu **Control Plane** dan satu **Node**. Tak mesti berbeda mesin, Control Plane dan Node juga bisa berjalan berdampingan dalam satu server yang sama yang disebut dengan **single node** atau **all-in-one node**.

Control Plane juga sering disebut sebagai **Master Node**, sedangkan Node acapkali disebut **Worker Node**. Sejatinya, keduanya sama-sama node, yakni mesin fisik atau virtual yang ada di suatu Cluster. Perbedaannya ada pada tugas masing-masing. Untuk memudahkan penyebutan, kita sebut saja **Control Plane** dan **Node**.

Meski terkesan simpel karena hanya memiliki dua komponen utama, tetapi nyatanya tidak sesederhana itu. Di dalam **Control Plane** dan **Node** sendiri pun masing-masing memiliki berbagai komponen pendukung.

Control Plane bertanggung jawab untuk mengoordinasikan semua aktivitas di Kubernetes Cluster, termasuk mengelola Node, menempatkan container ke Node, dan sebagainya. Dalam melakukan tugasnya itu, Control Plane dibantu oleh komponen-komponen, seperti **API Server, Scheduler, Controller-Manager, dan etcd**.

Sementara itu, Node berlaku bak pekerja (**worker**) yang meng-hosting **Pod** (grup yang terdiri dari satu atau lebih container) untuk menjalankan aplikasi. Ia memiliki beberapa komponen, antara lain **kubelet, Kubernetes proxy (kube-proxy), dan container runtime**.

---

## Komponen pada Control Plane

Bisa dibilang, **Control Plane** adalah pusat saraf yang menampung komponen-komponen dalam rangka mengontrol Kubernetes Cluster. Control Plane selalu berkomunikasi dengan Node untuk memastikan bahwa Kubernetes Cluster berjalan sesuai konfigurasi.

Beberapa komponen utama dari **Control Plane** adalah **Kubernetes API Server, Kubernetes Scheduler, Kubernetes Controller-Manager, dan etcd**.

### 1. Kubernetes API Server
Kubernetes API Server adalah komponen yang mengekspos Kubernetes API. Komponen ini menyediakan API untuk mendukung berbagai jenis orchestration, seperti scaling, update, dan lain sebagainya dalam mendukung deployment aplikasi.

Kubernetes API Server juga bertindak sebagai pintu gerbang ke Cluster. Dengan komponen inilah, kita mengakses Node dan Pod, entah itu melalui UI (Kubernetes Dashboard) ataupun CLI (kubectl).

### 2. Kubernetes Scheduler
Kubernetes Scheduler bertanggung jawab atas peluncuran container di seluruh node dalam Cluster. Ia mempertimbangkan berbagai faktor, seperti kebutuhan sumber daya, batasan perangkat keras atau perangkat lunak, lokalitas data, interferensi antar workload, serta tenggat waktu.

### 3. Kubernetes Controller-Manager
Kubernetes Controller-Manager adalah komponen yang mengawasi keadaan Cluster dan membuat perubahan untuk mengarahkan **observed state** (kondisi/spesifikasi saat ini) ke **desired state** (kondisi/spesifikasi yang diinginkan) melalui API server.

Beberapa tipe controller yang ada di Kubernetes:
- **Node controller**: mengamati dan merespons saat Node down.
- **Job controller**: mengawasi objek Job dalam membuat Pod untuk menjalankan suatu tugas hingga selesai.
- **EndpointSlice controller**: menjaga objek EndpointSlice yang menghubungkan komponen Service dan Pod.
- **ServiceAccount controller**: membuat ServiceAccount bernama “default” untuk setiap Namespace baru.

### 4. etcd
etcd merupakan key-value database yang menyimpan konfigurasi dan informasi tentang kondisi/status Cluster. Komponen ini bertindak sebagai **single source of truth** untuk semua komponen Kubernetes Cluster.

---

## Komponen pada Node

Sekarang kita berbicara soal **Node**, yakni mesin untuk menjalankan container yang juga dikelola oleh Control Plane. Setiap Node (dalam hal ini, Worker Node) yang ada di Kubernetes Cluster menjalankan sebuah agen untuk mengelola Node itu sendiri dan berkomunikasi dengan Control Plane yang disebut **kubelet**. Selain itu, setiap Node juga menjalankan **container runtime** dan sejumlah komponen tambahan untuk monitoring, logging, service discovery, dan lain-lain.

### 1. kubelet
kubelet merupakan sebuah agen yang berjalan pada setiap Node dalam Kubernetes Cluster. Komponen ini berkomunikasi dengan Control Plane untuk memastikan container yang ada di dalam sebuah Pod berjalan normal.

### 2. Kubernetes proxy (kube-proxy)
kube-proxy memfasilitasi jaringan di Kubernetes dengan mengelola **network rule** pada Node. Ini memungkinkan komunikasi jaringan ke Pod, baik dari dalam maupun luar Kubernetes Cluster.

### 3. Container runtime
Setiap Node mengelola siklus hidup container menggunakan **container runtime**. Kubernetes mendukung sejumlah container runtime, seperti **containerd, CRI-O, dan Kubernetes CRI (Container Runtime Interface)**.

---

Itu dia beberapa komponen Kubernetes, baik pada **Control Plane** maupun **Node**. Bila mengeksplor arsitektur Kubernetes di internet, Anda mungkin akan menemukan arsitektur Kubernetes yang jauh lebih kompleks daripada materi ini.

Tak bisa dipungkiri bahwa implementasi Kubernetes akan jauh lebih kompleks di **production environment**, terutama pada perusahaan yang memiliki aplikasi besar. Akan tetapi, kita tak perlu melangkah terlalu jauh ke arah sana. Kita fokus dulu pada arsitektur Kubernetes yang paling sederhana supaya lebih mudah dipahami.

Selanjutnya, kita akan melihat sejumlah **Kubernetes object** yang perlu Anda ketahui saat berinteraksi dengan Kubernetes. **Check it out!**