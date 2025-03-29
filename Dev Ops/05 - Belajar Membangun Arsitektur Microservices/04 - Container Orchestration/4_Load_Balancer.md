# Latihan Membangun Blue/Green Deployment dengan Amazon ECS: Membuat Target Group dan Load Balancer

## Pendahuluan

Dalam implementasi Blue/Green Deployment, kita perlu memindahkan traffic dari environment Blue ke Green secara mulus. Selain itu, kita ingin pengguna tetap mengakses aplikasi dengan satu endpoint tetap, meskipun jumlah container bertambah atau berkurang.

Untuk mencapai tujuan ini, kita akan membuat **Target Group** dan **Load Balancer**. **Target Group** adalah kumpulan resource (container atau EC2 instance) yang direferensikan oleh Load Balancer. **Application Load Balancer (ALB)** bertugas mendistribusikan traffic ke target berdasarkan aturan routing yang telah dikonfigurasi.

Mari kita mulai!

---

## 1. Membuat Target Group

### Langkah-langkah:
1. Buka **EC2** melalui kolom pencarian di AWS Console.
2. Pada panel navigasi sebelah kiri, buka menu **Target Groups** dan klik **Create target group**.
3. Pada bagian **Specify group details**, gunakan konfigurasi berikut:
   - **Choose a target type**: Instances
   - **Target group name**: `ecs-targetgroup`
   - **Protocol:Port**: HTTP:80
   - **VPC**: Default VPC
   - **Protocol version**: HTTP1
4. Pada bagian **Health checks**:
   - **Health check protocol**: HTTP
   - **Health check path**: `/api/`
5. Klik **Next**.
6. Pada tahap **Register targets**, lewati proses pendaftaran instance dan klik **Create target group**.

---

## 2. Membuat Load Balancer

### Langkah-langkah:
1. Pada panel sebelah kiri, buka menu **Load Balancers** dan klik **Create Load Balancer**.
2. Pilih **Application Load Balancer** dan klik **Create**.
3. Pada halaman **Create Application Load Balancer**, gunakan konfigurasi berikut:
   - **Load balancer name**: `ecs-alb`
   - **Scheme**: Internet-facing
   - **IP address type**: IPv4
4. Pada bagian **Network mapping**:
   - **VPC**: Default VPC
   - **Mappings**: Centang `ap-southeast-1a` dan `ap-southeast-1b`
5. Pada bagian **Security groups**:
   - Hapus **default security group**
   - Pilih **EC2ContainerService...**
6. Pada bagian **Listeners and routing**:
   - **Protocol**: HTTP
   - **Port**: 80
   - **Default action**: ecs-targetgroup
7. Periksa konfigurasi pada bagian **Summary**, lalu klik **Create load balancer**.
8. Klik **View load balancer** untuk melihat konfigurasi yang telah dibuat.

---

## 3. Mengubah Konfigurasi Security Group

### Langkah-langkah:
1. Pada panel navigasi sebelah kiri, buka menu **Security Groups**.
2. Centang security group dengan nama **EC2ContainerService…**.
3. Pada panel konfigurasi di bawah, buka tab **Inbound rules**.
4. Klik **Edit inbound rules**.
5. Tambahkan rule baru dengan konfigurasi berikut:
   - **Type**: Custom TCP
   - **Port range**: 8081
   - **Source type**: Anywhere-IPv4
6. Tambahkan rule lagi dengan konfigurasi berikut:
   - **Type**: All TCP
   - **Source type**: Anywhere-IPv4
7. Klik **Save rules** untuk menyimpan perubahan.

---

## Kesimpulan

Anda telah berhasil membuat **Target Group** dan **Load Balancer** untuk mendukung Blue/Green Deployment pada Amazon ECS. Langkah berikutnya adalah membuat **ECS Service** agar deployment Anda berjalan secara optimal.

