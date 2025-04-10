## Interaksi dengan Kubernetes Object: Deployment

Daripada membuat Pod secara langsung, best practice-nya adalah menggunakan Deployment. Deployment merepresentasikan beberapa Pod identik (replica) dan bertugas menjaga desired state (jumlah dan kondisi Pod yang diinginkan). Jika Pod terhapus, Deployment akan otomatis menggantinya.

Deployment cocok untuk aplikasi stateless. Untuk praktik, kita akan membuat aplikasi counter dengan 3 tier:

1. **Support tier** (multi-container Pod: counter dan poller)
2. **App tier** (Node.js server)
3. **Data tier** (Redis database)

Masing-masing tier akan berada di Pod berbeda, dan kita akan gunakan Service agar mereka bisa saling berkomunikasi. Service juga menyediakan static endpoint dan load balancing.

Kubernetes menyediakan dua cara service discovery:
- **Environment variable**: variabel otomatis berdasarkan nama Service.
- **DNS**: akses Service menggunakan nama DNS.

### Kubernetes Deployment: Counter Application (3-Tier)
#### 1. Namespace
Buat Namespace untuk memisahkan resource:

**File: `deployment-ns.yaml`**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: deployments
  labels:
    app: counter
```
Deploy dengan:
```bash
kubectl apply -f deployment-ns.yaml
```

---

#### 2. Data Tier
Berisi Redis sebagai penyimpanan nilai counter.

**File: `data-tier.yaml`**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: data-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 6379
    protocol: TCP 
    name: redis
  selector:
    tier: data 
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: data-tier
  labels:
    app: microservices
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: data
  template:
    metadata:
      labels:
        app: microservices
        tier: data
    spec:
      containers:
      - name: redis
        image: redis:latest
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 6379
```

---

#### 3. App Tier
Berisi server Node.js yang menangani request.

**File: `app-tier.yaml`**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: app-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 8080
  selector:
    tier: app
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-tier
  labels:
    app: microservices
    tier: app
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: app
  template:
    metadata:
      labels:
        app: microservices
        tier: app
    spec:
      containers:
      - name: server
        image: lrakai/microservices:server-v1
        ports:
          - containerPort: 8080
        env:
          - name: REDIS_URL
            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
```

---

#### 4. Support Tier
Terdiri dari dua container dalam satu Pod: `counter` dan `poller`.

**File: `support-tier.yaml`**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: support-tier
  labels:
    app: microservices
    tier: support
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: support
  template:
    metadata:
      labels:
        app: microservices
        tier: support
    spec:
      containers:
      - name: counter
        image: lrakai/microservices:counter-v1
        env:
          - name: API_URL
            value: http://app-tier.deployments:8080

      - name: poller
        image: lrakai/microservices:poller-v1
        env:
          - name: API_URL
            value: http://app-tier:$(APP_TIER_SERVICE_PORT)
```

---

#### 5. Deploy Semua Object
Deploy sekaligus semua tier ke namespace `deployments`:
```bash
kubectl apply -f data-tier.yaml -f app-tier.yaml -f support-tier.yaml -n deployments
```

Output:
```
service/data-tier created
deployment.apps/data-tier created
service/app-tier created
deployment.apps/app-tier created
deployment.apps/support-tier created
```

---

#### 6. Observasi dan Scaling
Setelah semua Pod berjalan, Anda bisa memverifikasi dengan:
```bash
kubectl get deployment -n deployments
kubectl get pod -n deployments
```

Untuk melihat log secara real-time dari container `poller`:
```bash
kubectl logs support-tier-<POD_NAME> poller -f -n deployments
```
Ganti `<POD_NAME>` dengan nama Pod support-tier Anda.

---

#### 7. Scaling dan Self-Healing
Deployment memungkinkan kita melakukan scaling secara deklaratif.
Contoh, ubah file `app-tier.yaml`:
```yaml
spec:
  replicas: 5
```
Kemudian jalankan:
```bash
kubectl apply -f app-tier.yaml -n deployments
```
Verifikasi:
```bash
kubectl get pod -n deployments
```

Jika Anda menghapus salah satu Pod:
```bash
kubectl delete pod <NAMA_POD> -n deployments
```
Maka Deployment akan otomatis membuat ulang Pod tersebut untuk menjaga jumlah yang diinginkan.

---

#### 8. Cek Endpoint Service
Untuk melihat endpoint yang terhubung ke service app-tier:
```bash
kubectl describe service app-tier -n deployments
```
Contoh output:
```
Endpoints: 172.17.0.10:8080, 172.17.0.11:8080, ...
```
Artinya Service berhasil mendistribusikan traffic ke semua Pod dengan label `tier=app`.

---

Dengan begini, seluruh arsitektur 3-tier untuk aplikasi counter berhasil di-deploy di Kubernetes menggunakan Deployment dan Service. Deployment menjaga state, melakukan scaling, serta self-healing dengan mudah.