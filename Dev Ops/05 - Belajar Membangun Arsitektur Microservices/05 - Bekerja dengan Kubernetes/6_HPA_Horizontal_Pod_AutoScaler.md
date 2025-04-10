## Kanvas Berinteraksi dengan Kubernetes Object: HorizontalPodAutoscaler

Pada materi sebelumnya, kita telah melihat bagaimana sebuah object `Deployment` di Kubernetes mampu melakukan scaling pada jumlah `Pod` secara manual. Namun, untuk aplikasi berskala besar atau di production environment, manual scaling bukanlah solusi efisien. Solusinya adalah melakukan **autoscaling** secara otomatis.

### Stateless vs Stateful

Autoscaling hanya cocok untuk aplikasi **stateless**. Misalnya, pada aplikasi counter yang digunakan sebelumnya, `app tier` bersifat stateless karena menyimpan data pada `data tier`, sehingga aman untuk melakukan scaling. Sebaliknya, `data tier` adalah stateful, dan scaling tanpa kontrol bisa menyebabkan inkonsistensi data. Untuk kasus ini, gunakan `StatefulSet`.

### HorizontalPodAutoscaler (HPA)

`HPA` merupakan salah satu jenis autoscaling di Kubernetes. Ia berfungsi untuk memperbarui workload resource (`Deployment`, `StatefulSet`, dll) secara otomatis berdasarkan metrik tertentu seperti CPU usage.

**Cara kerja:**
- Menentukan target persentase penggunaan CPU (misal 50%)
- Menentukan jumlah minimum dan maksimum replica
- Berdasarkan metric CPU rata-rata dari semua Pod, HPA akan menambah/mengurangi jumlah replica

> **Catatan:** Pod harus memiliki `CPU request` agar autoscaling berfungsi.

### Persiapan: Metrics Server
Autoscaling memerlukan metric untuk menentukan kapan harus scaling. Di sini kita menggunakan **Metrics Server**, yang merupakan komponen resmi dari Kubernetes.

#### Langkah-langkah:
1. Buat file bernama `metric-server.yaml`
2. Salin konfigurasi berikut:

```yaml
# Berisi konfigurasi ServiceAccount, ClusterRole, ClusterRoleBinding, Deployment, Service, APIService
# (lihat detail manifest di atas)
```

3. Jalankan:
```bash
kubectl apply -f metric-server.yaml
```

4. Verifikasi bahwa Metrics Server berjalan:
```bash
kubectl get pods -n kube-system
```
Contoh output:
```
coredns-565d847f94-92rgs           1/1     Running
etcd-minikube                      1/1     Running
metrics-server-xxxxxxxxx          1/1     Running
```

......

### Ringkasan
- Gunakan `HorizontalPodAutoscaler` untuk autoscaling berbasis metrik
- Hanya cocok untuk aplikasi stateless
- Pastikan Pod memiliki resource request CPU
- Aktifkan dan jalankan Metrics Server agar autoscaling bisa berfungsi

Setelah Metrics Server berjalan, kita bisa mulai mengonfigurasi HPA untuk workload kita.

