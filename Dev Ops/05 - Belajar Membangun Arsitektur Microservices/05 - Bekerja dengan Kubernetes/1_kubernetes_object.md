## Berinteraksi dengan Kubernetes Object

Sekarang Anda sudah tahu seluk-beluk arsitektur Kubernetes. Itu artinya, Anda sudah siap untuk praktik menggunakan Kubernetes. Pada materi ini, kita akan berlatih berinteraksi dengan Kubernetes object.

### Apa itu Kubernetes Object?
Kubernetes object adalah entitas persisten dalam sistem Kubernetes. Kubernetes menggunakan entitas ini untuk merepresentasikan status/kondisi Cluster Anda. Setelah Anda membuat suatu object, sistem Kubernetes akan terus memastikan object tersebut bekerja. Contohnya, jika Anda membuat sebuah Deployment, Kubernetes akan memastikannya tetap berjalan, bahkan jika Cluster restart (karena kendala) sekalipun.

Dengan membuat Kubernetes object, Anda dapat mengetahui berbagai hal terkait Cluster, seperti:
- Aplikasi apa yang sedang berjalan (dan di node mana)
- Sumber daya mana yang tersedia untuk aplikasi tersebut
- Kebijakan seperti restart policy, upgrade, fault-tolerance, dll.

### Kategori Kubernetes Object
Pada dasarnya, terdapat dua kategori utama perihal object di Kubernetes:
1. **Basic Object**: Bersifat independen dan tidak membutuhkan object lain. Contoh: Pod, Service, Volume, Namespace, dll.
2. **High-Level Objects (Controllers)**: Dibangun di atas basic object. Contoh: Deployments, Replication Controllers, ReplicaSets, StatefulSets, Jobs, dll.

### Berinteraksi dengan Kubernetes API Server
Untuk berinteraksi dengan Kubernetes object (membuat, memodifikasi, atau menghapus), Anda harus melakukan request ke Kubernetes API Server. Ada beberapa cara untuk berkomunikasi dengan API server:
- REST API
- Client Libraries
- Web Dashboard
- **kubectl** (paling umum digunakan)

#### Menggunakan `kubectl`
`kubectl` adalah command-line tool yang memungkinkan kita untuk menjalankan perintah terhadap Kubernetes Cluster. Kita dapat menggunakan `kubectl` untuk:
- Men-deploy aplikasi
- Memeriksa dan mengelola sumber daya Cluster
- Melihat log dan masih banyak lainnya

Saat menjalankan perintah dengan `kubectl`, ia akan menerjemahkannya menjadi format REST API request yang sesuai untuk API server.

#### Membuat Kubernetes Object dengan `kubectl`
Ada dua metode utama untuk membuat resource dengan `kubectl`:
1. **Imperatif** (langsung dengan perintah CLI)
2. **Deklaratif** (menggunakan berkas manifest YAML)

##### Contoh Perintah Imperatif
```sh
kubectl run nginx --generator=run-pod/v1 --image=nginx
```
Perintah ini membuat dan menjalankan sebuah Pod bernama `nginx` dengan image `nginx`. Namun, metode ini kurang efektif untuk infrastruktur yang kompleks.

##### Contoh Manifest YAML
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```
Perintah untuk menjalankan manifest ini:
```sh
kubectl apply -f app.yaml
```
Keunggulan metode deklaratif:
- Bisa menspesifikasikan object secara detail
- Bisa membuat beberapa resource sekaligus
- Bisa dibagikan dan digunakan kembali

### Membuat Kubernetes Cluster dengan Minikube
Sebelum membuat Kubernetes object, kita memerlukan Kubernetes Cluster. Dalam materi ini, kita akan menggunakan Minikube, tool yang memungkinkan kita menjalankan Kubernetes Cluster secara lokal.

#### Prasyarat Minikube
- 2 CPU atau lebih
- 2 GB RAM atau lebih
- 20 GB ruang penyimpanan kosong
- Koneksi internet
- Terinstal container atau virtual machine manager seperti Docker, VirtualBox, atau VMware

#### Instalasi Minikube
Silakan instal sesuai OS dan architecture dari [tautan resmi Minikube](https://minikube.sigs.k8s.io/docs/start/).

Setelah instalasi selesai, cek versi Minikube:
```sh
minikube version
```

#### Menjalankan Kubernetes Cluster dengan Minikube
```sh
minikube start
```
Atau dengan melihat penggunaan sistem:
```sh
time minikube start
```

Proses ini akan:
- Menampilkan versi Minikube dan Kubernetes
- Menggunakan Docker sebagai driver default
- Menjalankan Control Plane node
- Menyiapkan Kubernetes
- Mengaktifkan addon bawaan seperti default-storageclass dan storage-provisioner

#### Instalasi `kubectl`
Jika belum terinstal, Anda perlu menginstal `kubectl` sesuai versi Kubernetes yang digunakan oleh Minikube.
```sh
kubectl version
```
Pastikan tidak ada peringatan terkait perbedaan versi antara Client dan Server.

#### Memeriksa Kubernetes Cluster
```sh
kubectl cluster-info
kubectl get nodes
```
Contoh output:
```
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   38m   v1.25.2
```
Karena Minikube hanya membuat satu Node, hasilnya hanya menampilkan satu Node bernama `minikube` sebagai Control Plane.

#### Mengakses Kubernetes Web Dashboard
```sh
minikube dashboard
```
Perintah ini akan membuka dashboard di browser.

### Kesimpulan
- Kubernetes object adalah entitas persisten yang merepresentasikan status Cluster.
- Kubernetes memiliki dua kategori object utama: Basic Object dan High-Level Objects.
- `kubectl` adalah cara paling umum untuk berinteraksi dengan Kubernetes API Server.
- Minikube memungkinkan kita menjalankan Kubernetes Cluster secara lokal.
- Manifest YAML lebih direkomendasikan untuk mengelola resource Kubernetes.
- Kita bisa memeriksa status Cluster dengan perintah `kubectl cluster-info` dan `kubectl get nodes`.
- Kubernetes Web Dashboard dapat digunakan untuk memantau Cluster secara visual.