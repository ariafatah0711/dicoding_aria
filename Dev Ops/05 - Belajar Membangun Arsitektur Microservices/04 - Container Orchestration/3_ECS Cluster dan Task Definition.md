# Latihan Membangun Blue/Green Deployment dengan Amazon ECS: Membuat Amazon ECS Cluster dan Task Definition

Amazon Elastic Container Service atau Amazon ECS adalah sebuah layanan pengelolaan container yang powerful dan mudah digunakan dari AWS. Anda bisa menggunakan Amazon ECS untuk menjalankan, menghentikan, dan mengelola sejumlah container di dalam sebuah cluster yang disebut ECS cluster.

Dengan Amazon ECS, container didefinisikan dalam task definition yang kemudian digunakan untuk menjalankan task (satu atau lebih container) di dalam service (konfigurasi untuk menjalankan dan memelihara sejumlah task secara bersamaan dalam ECS cluster).

Salah satu keunggulannya adalah Anda dapat menjalankan task dan service pada infrastruktur nirserver (serverless) yang dikelola oleh AWS Fargate. Atau, untuk kontrol lebih fleksibel, Anda dapat menjalankan task dan service di cluster pada infrastruktur Amazon EC2 instance yang Anda kelola sendiri.

Task definition diperlukan untuk menjalankan task (container) di ECS cluster. Dengan task definition ini, kita bisa mendefinisikan image yang akan digunakan container, jenis resource yang dialokasikan, spesifikasi jaringan, dan detail lainnya.

## Membuat Amazon ECS Cluster dan Task Definition

Pada latihan ini kita akan belajar membuat Amazon ECS cluster dan task definition yang diperlukan dalam Blue/Green Deployment. Lebih tepatnya, kita akan membuat 2 task definition masing-masing untuk blue dan green environment.

### Membuat ECS Cluster

1. Melalui kolom pencarian, masuklah ke halaman layanan **Elastic Container Service**.
2. Pada panel sebelah kiri, pilih menu **Clusters**, lalu klik tombol **Create Cluster**.
3. Untuk bagian **Create cluster**, sesuaikan dengan konfigurasi berikut ini:

   **Cluster configuration**
   - Cluster name: `ecs-cluster`

   **Infrastructure**
   - AWS Fargate (serverless): **Tidak dicentang**.
   - Amazon EC2 instance: **Centang**.
   - Auto Scaling group (ASG): **Create new ASG**.
   - Provisioning Model: **On-demand**.
   - Container instance Amazon Machine Image (AMI): **Amazon Linux 2 (kernel 5.10)**.
   - EC2 instance type: `t2.micro`.
   - EC2 instance role: **Create new role**.
   - Desired capacity:
     - Minimum: `1`
     - Maximum: `1`
   - Key pair: **None - unable to SSH**.
   - Root EBS Volume Size (GiB): `30`.

   **Network settings for Amazon EC2 instances**
   - VPC: **Default VPC**.
   - Subnets: **Clear current selection -> Pilih "ap-southeast-1a" dan "ap-southeast-1b"**.
   - Security group: **Create a new security group**.
   - Inbound rules for security groups:
     - Port range: `80`
     - Source: **Anywhere**
   - Auto assign public IP: **Turn on**.

4. Klik tombol **Create** dan tunggu beberapa saat hingga ECS Cluster berhasil dibuat.

### Membuat Task Definition untuk Blue Environment

1. Pada panel sebelah kiri, buka menu **Task definitions**, lalu klik tombol **Create new task definition -> Create new task definition**.
2. Isi konfigurasi berikut:
   - **Task definition family**: `ecs-blue-taskdefinition`
   - **Infrastructure requirements**:
     - **Amazon EC2 instances**: **Centang**.
     - **AWS Fargate**: **Jangan dicentang**.
3. Pada bagian **Container - 1**, sesuaikan dengan konfigurasi berikut:
   - **Name**: `ecs-blue-container`
   - **Image URI**: `<ECR-Repository-URI>:blue` (contoh: `574015448616.dkr.ecr.ap-southeast-1.amazonaws.com/ecr-repository:blue`)
   - **Port mappings**:
     - Container port: `8081`
     - Protocol: `TCP`
4. Klik tombol **Create**.

### Membuat Task Definition untuk Green Environment

1. Pada panel sebelah kiri, buka menu **Task definitions**, lalu klik tombol **Create new task definition -> Create new task definition**.
2. Isi konfigurasi berikut:
   - **Task definition family**: `ecs-green-taskdefinition`
   - **Infrastructure requirements**:
     - **Amazon EC2 instances**: **Centang**.
     - **AWS Fargate**: **Jangan dicentang**.
3. Pada bagian **Container - 1**, sesuaikan dengan konfigurasi berikut:
   - **Name**: `ecs-green-container`
   - **Image URI**: `<ECR-Repository-URI>:green` (contoh: `574015448616.dkr.ecr.ap-southeast-1.amazonaws.com/ecr-repository:green`)
   - **Port mappings**:
     - Container port: `8081`
     - Protocol: `TCP`
4. Klik tombol **Create**.

### Kesimpulan

Anda telah berhasil membuat **ECS cluster** beserta **2 task definition** untuk **Blue/Green Deployment**. Langkah selanjutnya adalah melanjutkan ke materi berikutnya untuk melakukan deployment dengan menggunakan konfigurasi ini.