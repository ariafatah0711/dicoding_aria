# Latihan Membangun Blue/Green Deployment dengan Amazon ECS: Membuat Amazon ECS Service

## Pengenalan
Amazon ECS Service adalah mekanisme yang memungkinkan ECS untuk menjalankan dan memelihara sejumlah container tertentu dari task definition. Jika ada suatu task yang terkendala atau berhenti, ECS service scheduler akan segera meluncurkan task lain untuk menggantikannya.

Konsep ini mirip seperti Auto Scaling dalam mempertahankan jumlah instance yang diinginkan, tetapi tidak menambah atau mengurangi instance berdasarkan CloudWatch alarm atau mekanisme Auto Scaling lainnya.

ECS service bekerja sama dengan load balancer untuk mempertahankan satu endpoint (yang diakses pengguna), meski jumlah instance berubah secara dinamis.

Pada tahapan ini, kita akan membuat dua ECS service:
- **Blue environment**
- **Green environment**

## Membuat ECS Service untuk Blue Environment
1. Buka **Elastic Container Service** melalui kolom pencarian AWS.
2. Pada menu **Clusters**, klik nama `ecs-cluster`.
3. Pada tab **Services**, klik tombol **Create**.
4. Pada halaman **Step 1: Configure service**, gunakan konfigurasi berikut:

### Configure Service
- **Launch type**: EC2

#### Task Definition
- **Family**: `ecs-blue-taskdefinition`
- **Revision**: (latest)
- **Cluster**: `ecs-cluster`
- **Service name**: `ecs-blue-service`
- **Service type**: REPLICA
- **Number of tasks**: `2`
- **Minimum healthy percent**: `50`
- **Maximum percent**: `200`
- **Deployment circuit breaker**: Disabled

#### Deployments
- **Deployment type**: Rolling update

#### Task Placement
- **Placement Templates**: AZ Balanced Spread

5. Klik **Next step**.

### Configure Network
- **Load balancing**
  - **Load balancer type**: Application Load Balancer
  - **Service IAM role**: Create new role
  - **Load balancer name**: `ecs-alb`
  - **Container to load balance**: `ecs-blue-container:0:8081` -> Klik **Add to load balancer**
  - **Target group name**: `ecs-blue-targetgroup` (otomatis terisi)

- **Service discovery**
  - **Enable service discovery integration**: Jangan centang

6. Klik **Next step**.

### Set Auto Scaling (Optional)
- **Service Auto Scaling**: Pilih **Do not adjust the service’s desired count**

7. Klik **Next step**.
8. Pada halaman **Review**, klik tombol **Create Service**.
9. Jika mengalami kendala pembuatan role dan policy, tekan **Back**, lalu klik kembali **Create Service**.
10. Klik **View Service** untuk melihat hasilnya. Dalam waktu sekitar dua menit, status service akan berubah menjadi **Active** dan dua task akan berjalan.

## Membuat ECS Service untuk Green Environment
1. Pada panel sebelah kiri, buka menu **Clusters**, pilih `ecs-cluster`, dan klik tombol **Create** pada tab **Services**.
2. Gunakan konfigurasi berikut:

### Configure Service
- **Launch type**: EC2

#### Task Definition
- **Family**: `ecs-green-taskdefinition`
- **Revision**: (latest)
- **Cluster**: `ecs-cluster`
- **Service name**: `ecs-green-service`
- **Service type**: REPLICA
- **Number of tasks**: `0`
- **Minimum healthy percent**: `50`
- **Maximum percent**: `200`
- **Deployment circuit breaker**: Disabled

#### Deployments
- **Deployment type**: Rolling update

#### Task Placement
- **Placement Templates**: AZ Balanced Spread

3. Klik **Next step**.

### Configure Network
- **Load balancing**
  - **Load balancer type**: Application Load Balancer
  - **Service IAM role**: `ecsServiceRole`
  - **Load balancer name**: `ecs-alb`
  - **Container to load balance**: `ecs-green-container:0:8081` -> Klik **Add to load balancer**
  - **Target group name**: `ecs-green-targetgroup` (otomatis terisi)

- **Service discovery**
  - **Enable service discovery integration**: Jangan centang

4. Klik **Next step**.

### Set Auto Scaling (Optional)
- **Service Auto Scaling**: Pilih **Do not adjust the service’s desired count**

5. Klik **Next step**.
6. Pada halaman **Review**, klik tombol **Create Service**.
7. Klik **View Service** untuk melihat hasilnya. Karena **Number of tasks** diset ke `0`, tidak akan ada task yang berjalan.

## Kesimpulan
Anda telah berhasil membuat dua ECS service:
- `ecs-blue-service` dengan dua task yang aktif.
- `ecs-green-service` tanpa task yang berjalan untuk sementara waktu.

Selanjutnya, kita bisa melanjutkan ke tahap deployment dan testing Blue/Green Deployment pada Amazon ECS.

