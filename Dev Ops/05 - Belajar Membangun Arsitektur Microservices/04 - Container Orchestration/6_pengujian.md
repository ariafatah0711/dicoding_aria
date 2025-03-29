# Latihan Membangun Blue/Green Deployment dengan Amazon ECS

## Menguji Coba Aplikasi

Setelah berhasil membuat berbagai AWS resource yang diperlukan, kini saatnya untuk menguji coba aplikasi. Kita akan mengakses blue environment, lalu beralih ke green environment.

### 1. Mengakses Blue Environment

1. **Masuk ke layanan EC2** melalui kolom pencarian AWS.
2. **Buka menu Load Balancers** di panel navigasi sebelah kiri, lalu centang `ecs-alb`.
3. **Salin DNS name** dari tab *Description*.
4. **Buka browser tab baru**, paste DNS name yang tadi Anda salin, tambahkan `/api/` di akhir URL, lalu tekan *Enter*.
5. Anda akan melihat pesan dari *blue environment*.

### 2. Beralih ke Green Environment

1. **Masuk ke layanan Amazon ECS** melalui EC2 Management Console.
2. **Pilih `ecs-cluster`**, lalu buka tab *Services*.
3. **Pilih `ecs-green-service`**, lalu klik *Update*.
4. **Ubah nilai `Number of tasks` dari `0` menjadi `2`**.
5. **Klik Next step berulang kali hingga halaman Review**, lalu klik *Update Service* dan *View Service*.
6. Pada tab *Deployments*, tunggu hingga *Running count* menjadi `2`, menandakan green environment siap.
7. **Kembali ke browser tab yang memuat aplikasi Anda dan refresh**. Pesan akan bergantian antara:
   - "Hello - I'm BLUE"
   - "Hello - I'm GREEN"

### 3. Mengalihkan Seluruh Traffic ke Green Environment

1. **Masuk ke Amazon ECS** dan pilih `ecs-cluster`.
2. **Klik `ecs-blue-service`**, lalu klik *Update*.
3. **Ubah `Number of task` dari `2` menjadi `0`**.
4. **Klik Next step hingga halaman Review**, lalu klik *Update Service* dan *View Service*.
5. **Kembali ke aplikasi di browser dan refresh**. Sekarang hanya pesan dari green environment yang tampil:
   - "Hello - I'm GREEN"

Anda telah berhasil bertransisi dari *blue* ke *green environment*!

## Clean Up
Untuk menghapus semua resource latihan ini, lakukan langkah-langkah berikut:

- **Amazon ECR repository**: `ecr-repository`
- **Amazon S3 bucket**: `ecs-blue-green-<angka_unik>`
- **AWS IAM role**: `CodeBuildRole`
- **AWS CodeBuild build project**: `ecs-blue-buildproject` dan `ecs-green-buildproject`
- **Amazon ECS cluster**: `ecs-cluster`
- **Amazon ECS task definition**: `ecs-blue-taskdefinition` dan `ecs-green-taskdefinition`
- **Application Load Balancer**: `ecs-alb`
- **Target Group**: `ecs-targetgroup`

Selamat! Anda telah menyelesaikan latihan *Blue/Green Deployment* dengan Amazon ECS. 🚀

