**Ringkasan Materi: StatefulSet dalam Kubernetes**

**1. Stateless vs Stateful Application:**
- **Stateless:** Tidak menyimpan data; cocok untuk aplikasi seperti web server.
- **Stateful:** Menyimpan data secara persisten, misalnya MySQL, MongoDB. Butuh storage yang tidak hilang meski Pod di-restart.

**2. Kelemahan Deployment untuk Stateful Application:**
- Deployment cocok untuk stateless application.
- Pod dalam Deployment mudah diganti dan tidak mempertahankan identitas.
- Tidak cocok untuk aplikasi yang butuh konsistensi data karena Pod bisa berpindah-pindah.

**3. Solusi: StatefulSet**
- Objek Kubernetes khusus untuk mengelola stateful application.
- Menyediakan identitas unik dan stabil untuk setiap Pod.
  - **Network Identity:** DNS name tetap meski Pod di-restart.
  - **Storage Identity:** Persistent Volume tetap meski Pod dipindahkan ke Node lain.

**4. Perbedaan Volume:**
- Deployment: Volume bisa diakses bersama oleh semua Pod.
- StatefulSet: Setiap Pod punya Persistent Volume Claim (PVC) sendiri.
  - Contoh: StatefulSet dengan 3 replica menghasilkan 3 PVC.
  - Jika Pod gagal, Pod baru tetap bisa pakai volume lama.

**5. Konsep Ternak vs Hewan Peliharaan:**
- Deployment memperlakukan Pod seperti ternak (mudah diganti).
- StatefulSet memperlakukan Pod seperti hewan peliharaan (punya identitas dan perhatian khusus).

**6. Controller dan Naming Convention:**
- StatefulSet adalah controller, tapi tidak membuat ReplicaSet.
- Pod dinamai dengan pola: `<statefulset_name>-<ordinal_index>`, contoh: `mysql-0`, `mysql-1`, dst.

**7. Komponen Utama StatefulSet:**
- **StatefulSet**: Objek utama pengelola Pod stateful.
- **Persistent Volume (PV)**: Penyimpanan fisik untuk data.
- **Headless Service**: Memungkinkan Pod diakses langsung via DNS.

# praktek
```bash
kubectl create namespace statefulset-ns

kubectl apply -f mysql-pv.yaml -n statefulset-ns
kubectl apply -f mysql-pvc.yaml -n statefulset-ns

kubectl apply -f mysql-service.yaml -n statefulset-ns
kubectl apply -f mysql-statefulset.yaml -n statefulset-ns

kubectl get statefulset,service,po,pv,pvc -n statefulset-ns
```

Struktur StatefulSet Manifest
Tidak jauh berbeda dengan Deployment.

Contoh konfigurasi env, ports, dan volumeMounts tetap digunakan.

Gunakan volumeMounts untuk mount direktori data (misal: /var/lib/mysql).

Gunakan persistentVolumeClaim untuk persistent storage.

