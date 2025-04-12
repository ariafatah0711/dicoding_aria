## Berinteraksi dengan Kubernetes Object: Volume dan Persistent Volume

Container di dalam sebuah Pod berbagi **network stack** yang sama, tetapi memiliki **filesystem** sendiri-sendiri. Hal ini berguna untuk berbagi data antar-container dalam Pod yang sama. Namun, filesystem ini terkait erat dengan masa hidup container, sehingga jika container mati atau di-restart, data di dalamnya akan hilang.

Untuk itu, Kubernetes menyediakan solusi penyimpanan data melalui **Volume** dan **Persistent Volume**. Keduanya memungkinkan penyimpanan data yang bertahan, bahkan setelah Pod dihentikan.

### Volume

- **Volume** melekat pada Pod, bukan pada container.
- Data dalam Volume tetap ada meskipun container di-restart.
- Cocok untuk berbagi data antar-container dalam Pod yang sama.
- Namun, jika Pod dihapus, Volume juga akan ikut terhapus.

**Tipe Volume yang umum:**
- `emptyDir`: Directory kosong dibuat pada Node saat Pod dijalankan.
  - Data akan hilang jika Pod dijadwalkan ulang ke Node lain.

> Gunakan Volume untuk penyimpanan sementara (ephemeral) dan bukan untuk data yang perlu bertahan jangka panjang.

### Persistent Volume (PV)

- PV tidak melekat pada Pod.
- Dikelola oleh Kubernetes secara terpisah.
- Tetap ada meski Pod dihapus.
- Dapat digunakan oleh beberapa Pod dari Node berbeda (jika storage mendukung).

**Untuk menggunakan PV:**
1. Buat Persistent Volume (PV) - statis (oleh admin) atau dinamis.
2. Buat Persistent Volume Claim (PVC) - request storage oleh Pod.
3. Gunakan Volume bertipe `persistentVolumeClaim` dalam Pod.

**Access Modes:**
- `ReadOnlyMany`: banyak Node dapat mount volume sebagai read-only.
- `ReadWriteOnce`: hanya satu Node yang dapat melakukan read-write.
- `ReadWriteMany`: banyak Node dapat melakukan read-write.

---

## Berinteraksi dengan Kubernetes Object: ConfigMap dan Secret

Seiring berkembangnya konfigurasi Pod dan Deployment, menyimpan konfigurasi langsung dalam manifest menjadi tidak praktis dan berisiko, terutama untuk informasi sensitif seperti password dan API key.

Kubernetes menyediakan dua object untuk memisahkan konfigurasi dari manifest utama:

### ConfigMap
- Menyimpan konfigurasi non-sensitif (contoh: host database, nama environment).
- Disusun dalam format key-value.
- Dapat digunakan sebagai environment variable atau dimount sebagai file.

### Secret
- Menyimpan informasi sensitif (contoh: token, password, API key).
- Lebih aman karena terenkripsi dan tidak mudah terlihat.
- Juga disusun dalam format key-value.

Untuk menggunakannya:
1. Buat ConfigMap atau Secret.
2. Referensikan dalam Pod melalui environment variable atau Volume.

### Contoh Praktik

Cek semua object dalam namespace `deployments`:
```bash
kubectl get all -n deployments
```

Contoh output:
```
pod/app-tier-788ddcbbbb-wwb74       1/1     Running   2 (22h ago)   2d5h
pod/data-tier-5c8b575884-b2swq      1/1     Running   1 (22h ago)   3d23h
...
```

### Membuat ConfigMap untuk Redis

Buat file `data-tier-configmap.yaml`:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-config
data:
  config: |
    tcp-keepalive 240
    maxmemory 1mb
```

Konfigurasi Redis disimpan sebagai multiline string dengan key `config`. Untuk menggunakannya, modifikasi manifest `data-tier.yaml` agar Deployment dapat membaca ConfigMap ini.

## Melanjutkan Implementasi Kubernetes Microservices: Konfigurasi dengan Secret dan ConfigMap

### 1. **Konfigurasi Redis dengan ConfigMap**

Sudah dilakukan:
- Membuat ConfigMap `redis-config` berisi konfigurasi `tcp-keepalive` dan `maxmemory`.
- Mendefinisikan Volume bertipe `configMap` pada `data-tier.yaml`:
  ```yaml
  volumes:
    - name: config
      configMap:
        name: redis-config
        items:
        - key: config
          path: redis.conf
  ```
- Mount volume tersebut ke `/etc/redis` dengan `volumeMounts`, sehingga Redis bisa membaca konfigurasi dari `/etc/redis/redis.conf`.
- Menambahkan command:
  ```yaml
  command:
    - redis-server
    - /etc/redis/redis.conf
  ```

Deploy berhasil:
```sh
kubectl apply -f data-tier-configmap.yaml -f data-tier.yaml -n deployments
```

Verifikasi berhasil:
```sh
kubectl exec -it -n deployments data-tier-<pod-name> -- /bin/bash
cat /etc/redis/redis.conf
```
Output:
```
tcp-keepalive 240
maxmemory 1mb
```

### 2. **Menggunakan Secret pada App Tier**

Membuat file `app-tier-secret.yaml`:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-tier-secret
stringData:
  username: dicoding
data:
  api-key: MWYyZDFlMmU2N2Rm
  password: YWRtaW4=
```

Deploy Secret:
```sh
kubectl apply -f app-tier-secret.yaml -n deployments
```

Verifikasi isi Secret:
```sh
kubectl describe secret app-tier-secret -n deployments
```
Output akan menampilkan jumlah byte dari masing-masing key.

### 3. **Menghubungkan Secret ke App Tier**

Update `app-tier.yaml`, tambahkan:
```yaml
env:
  - name: REDIS_URL
    value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
  - name: PASSWORD
    valueFrom:
      secretKeyRef:
        name: app-tier-secret
        key: password
```

Deploy ulang app-tier:
```sh
kubectl apply -f app-tier.yaml -n deployments
```

Verifikasi environment variable:
```sh
kubectl exec -n deployments <pod-name> -- env
```
Output:
```
PASSWORD=admin
REDIS_URL=redis://<ip-data-tier>:6379
...
```

> ✅ Dengan demikian, Secret berhasil digunakan untuk mengatur konfigurasi environment yang aman dan terpisah dari source code atau manifest utama.

Selanjutnya bisa dilanjutkan dengan pengamanan komunikasi antar layanan, penggunaan Resource Limit, atau penambahan Ingress.

```bash
kubectl apply -f data-tier-configmap.yaml -f data-tier.yaml -n deployments
kubectl get pod -n deployments
kubectl exec -it -n deployments data-tier-54665bd65f-s4ghf  -- bash
cat /etc/rredis/rediis.conf

kubectl apply -f app-tier-secret.yaml -n deployments
kubectl describe secret app-tier-secret -n deployments

kubectl apply -f app-tier.yaml -n deployments
kubectl get pod -n deployments
```
