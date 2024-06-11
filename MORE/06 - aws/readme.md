# 0
IAAS (Infrastucture as a service => full service) => vm, netwrok, machine
- EC2 => server virtual


PAAS (Platform as a service => app) => developmenet, production, application
SAAS (Software as a serrvicee => simple service) => goggle workspace, netflix

# 1
- EC2 => Amazon Elastic Compute Cloud
- labmda => Serverles Service (hanya menjalankan application)
- ECS => Amazon Elastic Container Service
- EKS = > Amazon Elastic Kubernetes Service
- Fargate => Container ECS dan EKS tanpa mengelola sendiri

EC2 instance
- General purpose (tujuan umum)
- Compute optimized (teroptimasi untuk komputasi)
- Memory optimized (teroptimasi untuk memori)
- Accelerated computing (terakselerasi untuk komputasi)
- Storage optimized (teroptimasi untuk penyimpanan).

Notification Message
- SQS (Amazon Simple Queue Service) => memisahkan komponen sistem
- SNS (Amazon Simple Notification Service) => mengirim pesan seperti email, pesan teks, push notification, atau bahkan permintaan HTTP.

```
Jika Anda ingin menjalankan aplikasi dan menginginkan akses penuh ke sistem operasinya seperti Linux atau Windows, Anda bisa menggunakan Amazon EC2.
Jika Anda ingin menjalankan fungsi yang berjalan singkat, aplikasi berbasis kejadian, dan Anda tak ingin mengelola infrastrukturnya sama sekali, gunakanlah layanan AWS Lambda.
Jika Anda ingin menjalankan beban kerja berbasis Docker container di AWS, langkah yang perlu Anda lalui adalah:
Anda harus memilih layanan orkestrasinya terlebih dahulu. Anda bisa menggunakan Amazon ECS atau Amazon EKS.
Setelah memilih alat orkestrasinya, kemudian Anda perlu menentukan platformnya. Anda dapat menjalankan container pada EC2 instance yang Anda kelola sendiri atau dalam lingkungan serverless seperti AWS Fargate yang dikelola oleh AWS.
```

# 2 network
- VPC => Virtual Private Cloud

- firewall
    - Security Group => firewall untuk masuk keluar instance EC2
    - ACL => security firewall untuk masuk keluar wilayah subnet

- Amazone Route 53

```
vpc>your vpc
    ipv4:192.168.0.0/16
vpc>internet gateway
    buat internet gateway => untuk menghubungkan vpc ke internet
    attent vpc
vpc>subnets
    ipv4:192.168.0.0/24
vpc>route table
    pilih subnet, acl edit rule
    tambahkan 0.0.0.0/0 internet-gateway(yang dibuat tadi)
EC2>instance
    add instance / lauch instance
    pilih network vpc nya jadi vpc yang tadi sudah dibuat
```

# 3 Database
- EBS => elastis block store (storage yang berada di disk (read))
- S3 => Simple Storage (storage yang bisa mencandangkan file)
- EFS => elastis file system (storage file system (read, write) berbagi data antar EC2)
- RDS =>  Relational Database Service
    - Amazon Aurora
    - PostgreSQL
    - MySQL
    - MariaDB
    - Oracle Database
    - Microsoft SQL Server
- Dynamo DB
    - database NoSQL
- RedShit
- DMS => Database Migration Service (memigrasikan database yang Anda miliki--baik relasional, nonrelasional (NoSQL), atau tipe penyimpanan data lain--ke AWS)
    - AWS Schema Conversion Tool => mengubah type database yang digunakan
- dll
    - Amazon DocumentDB (database document (lebih komplek datanya bisa untuk data profil))
    - Amazon Neptune (graph database)
    - Managed Blockchain
    - Amazon QLDB

- ElastiCache => enambahkan lapisan cache pada database yang dapat meningkatkan read time (waktu baca)
- DynamoDB Accelerator (DAX) => native caching layer yang dirancang untuk meningkatkan waktu read (baca) untuk data nonrelasional.
