# Latihan Membangun Blue/Green Deployment dengan Amazon ECS

## AWS Resources yang Digunakan
- **Amazon ECR repository**
- **Amazon S3 bucket**
- **AWS IAM role**
- **AWS CodeBuild build project**
- **Amazon ECS cluster**
- **Application Load Balancer**
- **Target Group**

Semua layanan di atas tercakup dalam **AWS Free Tier**. Pastikan Anda menghapus semua resources setelah latihan untuk menghindari penagihan.

## Amazon ECS dan Blue/Green Deployment
**Amazon ECS** adalah layanan manajemen container yang scalable dan cepat. Dengan ECS, Anda dapat menjalankan, menghentikan, dan mengelola container dalam sebuah cluster. Task dan service dalam ECS dapat dijalankan di:
- **AWS Fargate** (nirserver)
- **Amazon EC2** (dikelola sendiri)

### Blue/Green Deployment
- **Blue environment**: Versi lama aplikasi
- **Green environment**: Versi baru aplikasi
- Traffic secara bertahap dipindahkan dari **blue** ke **green**.
- Jika terjadi masalah, bisa dilakukan **rollback** ke **blue**.

## Layanan Tambahan
- **Amazon ECR**: Menyimpan container image.
- **Amazon S3**: Menyimpan berkas aplikasi.
- **AWS IAM**: Mengontrol perizinan.
- **AWS CodeBuild**: Melakukan build Docker image dan push ke Amazon ECR.

## Tahapan Latihan
1. **Persiapan**: Buat ECR repository, S3 bucket, dan IAM role.
2. **Build Docker Image**: Gunakan AWS CodeBuild dan push ke Amazon ECR.
3. **Deploy ke Amazon ECS**: Implementasi Blue/Green Deployment.

## Membuat Private Repository di Amazon ECR
Untuk tahapan pertama, kita akan membuat repository pada **Amazon ECR**. Ini mirip seperti membuat repository di Docker Hub, tetapi kali ini kita akan membuat **private repository**.

1. **Pilih Region**
   - Pada halaman **AWS Management Console**, pastikan Anda berada di **region Singapore (ap-southeast-1)**.
   - Region ini dipilih karena lebih lengkap dibandingkan Jakarta.

2. **Buka Amazon ECR**
   - Gunakan kolom pencarian dan masuk ke layanan **Elastic Container Registry**.
   
3. **Membuat Repository**
   - Buka panel menu di sebelah kiri dan pilih **Repositories** di bawah **Private registry**.
   - Klik tombol **Create repository**.
   
4. **Konfigurasi Repository**
   - Pada **Visibility settings**, pilih **Private**.
   - Isi **Repository name** dengan `ecr-repository`.
   - Biarkan konfigurasi lainnya sesuai bawaan.
   - Klik tombol **Create repository**.

5. **Salin Repository URI**
   - Setelah repository berhasil dibuat, salin **URI** dari repository tersebut.
   - Simpan URI ini untuk digunakan pada langkah selanjutnya.

Saat ini, repository masih kosong. Kita akan menggunakannya nanti untuk menyimpan dan mengambil **Docker image**. 🚀

## Upload Berkas ke Amazon S3
Amazon Simple Storage Service a.k.a **Amazon S3** adalah layanan penyimpanan yang menawarkan skalabilitas, ketersediaan data, keamanan, dan kinerja terdepan di kelas industri. Dalam latihan ini, Amazon S3 akan digunakan untuk menyimpan berkas aplikasi yang diperlukan dalam **Blue/Green Deployment**.

- [https://github.com/dicodingacademy/assets/raw/main/microservices_academy/ecs-blue.zip](https://github.com/dicodingacademy/assets/raw/main/microservices_academy/ecs-blue.zip)
- [https://github.com/dicodingacademy/assets/raw/main/microservices_academy/ecs-green.zip](https://github.com/dicodingacademy/assets/raw/main/microservices_academy/ecs-green.zip)

Berkas aplikasi tersebut berekstensi `.zip` dan berisi:
- `Dockerfile`: untuk build Docker image.
- `buildspec.yml`: untuk keperluan AWS CodeBuild dalam melakukan build dan push Docker image.
- `package.json`: untuk mendefinisikan dependencies aplikasi.
- `server.js`: kode aplikasi yang menampilkan teks **"Hello - I'm BLUE"** dan **"Hello - I'm GREEN"**.
- `README.md`: keterangan bahwa aplikasi ini untuk latihan ECS.

### Mengunggah Berkas ke Amazon S3
1. **Buka Amazon S3**
   - Gunakan kolom pencarian dan masuk ke layanan **S3**.

2. **Buat Bucket Baru**
   - Pilih menu **Buckets** pada panel kiri, lalu klik **Create bucket**.
   - Konfigurasi sebagai berikut:
     - **Bucket name**: `ecs-blue-green-<angka_unik>`
     - **AWS Region**: **Asia Pacific (Singapore) ap-southeast-1**
     - **Object Ownership**: 
       - Pilih **ACLs enabled**
       - Pilih **Object writer**
     - **Block Public Access settings**:
       - Hilangkan centang **Block all public access**
       - Centang **I acknowledge that the current settings might result in this bucket and the objects within becoming public**
   - Klik **Create bucket**.

3. **Unggah Berkas ke Bucket**
   - Klik nama bucket yang dibuat (`ecs-blue-green-<angka_unik>`).
   - Klik tombol **Upload**, lalu pilih **Add files**.
   - Pilih berkas **ecs-blue.zip** dan **ecs-green.zip** dari komputer Anda.
   - Klik **Open**, lalu klik **Upload**.
   - Setelah selesai, klik **Close**.

4. **Atur Permissions**
   - Buka tab **Permissions** di bucket Anda.
   - Klik **Edit** pada bagian **Access control list (ACL)**.
   - Untuk **Everyone (public access)**, centang **List** dan **Read**.
   - Centang **I understand the effects of these changes on my objects and buckets**.
   - Klik **Save changes**.

Sekarang, berkas-berkas aplikasi telah tersimpan di **Amazon S3** dan siap digunakan! 🚀

## Langkah-langkah Membuat IAM Role untuk AWS CodeBuild

### 1. Masuk ke Layanan IAM
- Buka AWS Management Console.
- Melalui kolom pencarian, cari dan masuk ke layanan **IAM**.

### 2. Membuat IAM Policy
- Pilih menu **Policies** di panel sebelah kiri.
- Klik tombol **Create policy**.
- Pilih tampilan **JSON** dan salin kode berikut:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetRepositoryPolicy",
                "ecr:DescribeRepositories",
                "ecr:ListImages",
                "ecr:DescribeImages",
                "ecr:BatchGetImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:PutImage",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "s3:PutObject",
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
```

- Klik **Next** untuk melanjutkan.
- Isi kolom **Policy name** dengan `CodeBuildPolicy`.
- Klik tombol **Create policy**.

### 3. Membuat IAM Role
- Pilih menu **Roles** di panel sebelah kiri.
- Klik tombol **Create role**.
- Pada bagian **Select trusted entity**, pilih:
  - **Trusted entity type:** AWS service
  - **Use case:** Service or use case → CodeBuild → CodeBuild
- Pada bagian **Add permissions**, cari dan centang **CodeBuildPolicy**, lalu klik **Next**.
- Isi kolom **Role name** dengan `CodeBuildRole`.
- Klik tombol **Create role**.

## Kesimpulan
IAM role `CodeBuildRole` sudah berhasil dibuat dan siap digunakan oleh AWS CodeBuild untuk berinteraksi dengan Amazon ECR, Amazon CloudWatch Logs, dan Amazon S3. Selanjutnya, kita bisa melanjutkan ke tahap berikutnya dalam proses Blue/Green Deployment dengan Amazon ECS.

