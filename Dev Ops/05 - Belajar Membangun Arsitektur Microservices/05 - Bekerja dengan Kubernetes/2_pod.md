## Berinteraksi dengan Kubernetes Object: Pod

### Apa itu Pod?
Pod merupakan unit terkecil dalam platform Kubernetes. Pod adalah sebuah grup yang terdiri dari satu atau beberapa container (umumnya hanya satu), volume (untuk penyimpanan), dan IP address (untuk komunikasi jaringan). Seluruh container dalam satu Pod:
- Berbagi volume penyimpanan.
- Memiliki IP address yang sama.
- Saling berkomunikasi secara lokal.

### Karakteristik Pod:
- **Unit aplikasi**: Mewakili bagian logis dari aplikasi.
- **Terikat ke Node**: Pod diluncurkan di Node tertentu dan tetap di sana sampai dihentikan atau dihapus.
- **Pod bersifat sementara**: Namun tetap bisa digunakan untuk aplikasi yang stateful dengan bantuan persistent storage.
- **Satu Node bisa menjalankan banyak Pod**.

### Struktur Pod di Kubernetes
Contoh manifest YAML untuk Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  labels:
    app: webserver
spec:
  containers:
  - name: mycontainer
    image: nginx:latest
    resources:
      requests:
        memory: "128Mi"
        cpu: "500m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    ports:
      - containerPort: 80
```

### Penjelasan:
- **apiVersion**: Versi API Kubernetes (v1 untuk resource inti seperti Pod).
- **kind**: Jenis resource yang didefinisikan (Pod).
- **metadata**: Informasi identifikasi (nama dan label).
- **spec**: Spesifikasi Pod:
  - **containers**: Daftar container dalam Pod.
    - **name**: Nama container.
    - **image**: Image Docker yang digunakan.
    - **resources**: Resource request dan limit (CPU dan memory).
    - **ports**: Port yang digunakan container (80 untuk NGINX).

### Cara Deploy Pod
1. Buat direktori untuk latihan:
   ```bash
   mkdir Kubernetes && cd Kubernetes
   ```
2. Buat file `pod.yaml` dan salin manifest di atas.
3. Jalankan perintah untuk membuat Pod:
   ```bash
   kubectl apply -f pod.yaml
   ```
4. Cek status Pod:
   ```bash
   kubectl get pods
   ```

### Cek Detail Pod
Gunakan perintah berikut:
```bash
kubectl describe pod mypod
```
Informasi yang didapat:
- Nama Pod, Namespace, Node tempat Pod dijalankan.
- Label, IP address, container, port, status, dan event.

### Akses Pod dari Dalam
Karena Pod berada dalam jaringan internal Kubernetes, kita tidak bisa langsung mengaksesnya dari komputer host. Tapi kita bisa mengakses dari dalam Pod:
```bash
kubectl exec mypod -- curl http://<Pod-IP>:80
```

Gantilah `<Pod-IP>` dengan IP Pod yang didapat dari perintah `kubectl describe pod`.

Jika berhasil, akan muncul halaman welcome dari NGINX.

### Kesimpulan
- Pod adalah fondasi utama deploy aplikasi di Kubernetes.
- Kita bisa mendefinisikan Pod dengan manifest YAML secara deklaratif.
- Pod dapat menjalankan satu atau beberapa container.
- Kita akan membutuhkan Service untuk mengekspos Pod ke luar, yang akan dibahas pada materi berikutnya.

---
**Selanjutnya:** Kita akan mempelajari Kubernetes Service untuk mengekspos Pod ke komputer host.

