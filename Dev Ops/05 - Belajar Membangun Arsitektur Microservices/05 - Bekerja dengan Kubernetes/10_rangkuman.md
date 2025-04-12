# **Pengenalan Kubernetes**

## **Pengertian Kubernetes**
Kubernetes adalah platform container orchestration untuk mengotomatisasi deployment, manajemen, dan scaling aplikasi berbasis container. Nama "Kubernetes" berasal dari bahasa Yunani yang berarti "juru mudi" atau "pilot", sering disingkat menjadi "k8s". Dikembangkan oleh Google, Kubernetes mengadaptasi pengalaman mereka dari sistem internal yang bernama **Borg**.

## **Kemampuan Kubernetes**
- **Service discovery dan load balancing**
- **Storage orchestration**
- **Automated rollouts dan rollbacks**
- **Self-healing**
- **Secret dan configuration management**

---

# **Metode Deploy Kubernetes**

## **Single-Node Kubernetes Cluster**
Untuk pengembangan atau testing:
- **Docker Desktop**
- **Minikube**
- **Kubeadm (Linux)**

## **Single-Node Kubernetes Cluster for CI**
Untuk pengujian aplikasi berkelanjutan:
- **Kind (Kubernetes-in-Docker)**

## **Multi-Node Kubernetes Cluster**
Tergantung pada kebutuhan spesifik, beberapa tools yang digunakan untuk Multi-Node Kubernetes Cluster:
- **Kubespray**
- **Kops**
- **Kubeadm**
- **Amazon Elastic Kubernetes Service (Amazon EKS)**

---

# **Arsitektur Kubernetes**

- **Control Plane**: Bertanggung jawab untuk mengoordinasikan aktivitas Kubernetes Cluster.
  - Komponen: API Server, Scheduler, Controller-Manager, etcd.
  
- **Node**: Pekerja yang menjalankan Pod yang berisi aplikasi.
  - Komponen: Kubelet, Kube-Proxy, Container Runtime.

---

# **Berinteraksi dengan Kubernetes Object**

## **Pod**
- Grup container (biasanya satu container) yang berfungsi sebagai unit aplikasi.
- Setiap Pod memiliki IP address yang sama dan berbagi volume.

## **Service**
- Abstraksi yang mengekspos aplikasi yang berjalan pada Pod, memungkinkan komunikasi dan load balancing.
- Menggunakan IP address tetap untuk komunikasi antar Pod.

## **Namespace**
- Memisahkan resource dalam cluster, cocok untuk mengisolasi aplikasi atau tim.
- Namespace default: `default`, `kube-node-lease`, `kube-public`, `kube-system`.

## **Deployment**
- Menyediakan manajemen replikasi Pod untuk aplikasi stateless.
- Kubernetes menjaga jumlah Pod yang diinginkan agar tetap terjaga.

## **HorizontalPodAutoscaler (HPA)**
- Untuk scaling otomatis berdasarkan metrik seperti penggunaan CPU atau memori.

## **Volume dan Persistent Volume**
- **Volume**: Terikat pada Pod dan bertahan meski container restart.
- **Persistent Volume**: Dikelola secara terpisah dan bertahan meski Pod dihapus.

## **ConfigMap dan Secret**
- **ConfigMap**: Menyimpan konfigurasi yang tidak sensitif.
- **Secret**: Menyimpan informasi sensitif, seperti password dan API key.

## **StatefulSet**
- Untuk aplikasi stateful, dimana identitas Pod tetap terjaga meski Pod di-restart.
