## Berinteraksi dengan Kubernetes Object: Namespace

### Apa itu Namespace?
Namespace merupakan Kubernetes object yang memungkinkan kita untuk mengatur Cluster menjadi sub-cluster virtual. Namespace berguna untuk memisahkan resource dalam cluster berdasarkan tim, proyek, environment (dev, test, prod), atau aplikasi.

### Namespace Default
Saat pertama kali membuat Kubernetes Cluster, terdapat 4 Namespace yang dibuat secara otomatis:

1. **default**: Lokasi semua object yang dibuat tanpa menyebutkan Namespace.
2. **kube-node-lease**: Lokasi Node Lease object untuk heartbeat node ke Control Plane.
3. **kube-public**: Lokasi object bersifat publik.
4. **kube-system**: Lokasi object sistem Kubernetes.

> Catatan: Namespace `kubernetes-dashboard` dapat muncul jika menjalankan `minikube dashboard`.

### Melihat Daftar Namespace
```bash
kubectl get namespace
```

### Penjelasan Singkat
- Namespace memudahkan pengelolaan resource dalam cluster besar.
- Untuk proyek kecil, cukup gunakan `default` Namespace.

### Membuat Namespace
1. Buat berkas `namespace.yaml`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: webserver-ns
  labels:
    app: webserver
```

2. Hapus Pod dan Service sebelumnya:
```bash
kubectl delete pod mypod && kubectl delete service webserver
```

3. Deploy Namespace:
```bash
kubectl apply -f namespace.yaml
```

4. Verifikasi Namespace:
```bash
kubectl get namespace
```

### Deploy Pod dan Service ke Namespace Baru
```bash
kubectl apply -f pod.yaml -n webserver-ns
kubectl apply -f service.yaml -n webserver-ns
```

### Memeriksa Detail Object
```bash
kubectl describe pod mypod -n webserver-ns
```

Contoh output:
```
Name:             mypod
Namespace:        webserver-ns
Priority:         0
Service Account:  default
Node:             minikube/192.168.39.189
Start Time:       Sat, 29 Oct 2022 13:24:25 +0700
Labels:           app=webserver
Status:           Running
IP:               172.17.0.6
```

### Catatan Penting
- Namespace dapat menyimpan: Pod, Deployment, Service, dll.
- Tidak dapat menyimpan: Node, PersistentVolumes.

### Melihat Object Berdasarkan Namespace
- Object dalam Namespace:
```bash
kubectl api-resources --namespaced=true
```
- Object di luar Namespace:
```bash
kubectl api-resources --namespaced=false
```

