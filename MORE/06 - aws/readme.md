# 0.
IAAS (Infrastucture as a service => full service) => vm, netwrok, machine
    - EC2 => server virtual
PAAS (Platform as a service => app) => developmenet, production, application
SAAS (Software as a serrvicee => simple service) => goggle workspace, netflix

# 1.
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

# 2. network
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

# 3. Database
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

# 4. keamanan
- AWS mengontrol security of the cloud (keamanan dari cloud).
- Pelanggan mengontrol security in the cloud (keamanan di cloud).

- authentication => email, password
- authorization => apa yang kita bisa akses di akun ini

- IAM (Identity and Access Management)
    - IAM users => user
    - IAM policies => permission
    - IAM groups => group
    - IAM roles => akses sementara
- AWS organisation
- multi-factor authentication (MFA).

- tipe serangan DDOS
    - UDP flood => meminta request terhadap service lain yang nantinya penerimnya adalah server kita
    - HTTP level attack => exploitasi
    - Slowloris attack => berpura-pura memiliki koneksi yang sangat lambat. Ini menyebabkan server Anda terus menunggu pelanggan, alias, penyerang tersebut menyelesaikan permintaannya dan membuat pelanggan lain tak terlayani

- mempertahankan serangan DDOS
    - ELB => Elastis Load Balancer (menangani setiap permintaan hingga selesai terlebih dahulu, tak peduli ia memiliki koneksi yang cepat atau bahkan lambat)
    - AWS Shield => melindungi aplikasi Anda dari serangan DDoS.
        - Standar (free) => mendeteksi dan memitigasi traffic berbahaya secara real time saat memasuki aplikasi Anda
        - Advanced (pay) => mendiagnostik, mendeteksi, dan memitigasi serangan DDoS yang canggih. 
        - AWS WAF( web application firewall) => alat tambahan untuk aws shield 

- encrypt
    - Encryption at rest =>  enkripsi terjadi saat data Anda dalam keadaan tidak bergerak (tersimpan dan tidak berpindah).
        - telah aktif otomatis pada DynamoDb
    - Encryption in-transit =>  terjadi saat data Anda berpindah antara A dan B. A dan B ini bisa berupa apa pun, seperti layanan AWS dan klien yang mengakses layanan tersebut.
        - seperti ketika melakukan sql client dia akan menggunakan SSL

- AWS Security
    - AWS KMS (Key Management Service)
        - layanan yang memungkinkan Anda untuk melakukan enkripsi menggunakan cryptographic key (kunci kriptografi)
    - AWS WAF (Web Application Firewall)
    - Amazon Inspector
        - find vuln in ur app
    - Amazon GuardDuty
        - deteksi ancaman cerdas untuk infrastruktur dan sumber daya AWS Anda
        - menggunakan integrated threat intelligence (kecerdasan ancaman terintegrasi) seperti alamat IP berbahaya, deteksi anomali, dan machine learning untuk mengidentifikasi ancaman dengan lebih akurat.
        - 
```
- “principle of least privilege”. Maksudnya, berikanlah akses sesuai dengan kebutuhan saat itu saja.
```

# 5. anyalitik / monitoring(pemantauan)
- environment
    - Amazon CloudWatch => memantau infrastruktur dan aplikasi yang Anda jalankan di AWS secara real time
        - CloudWatch alarm dapat terintegrasi dengan layanan Amazon SNS(bisa dpt email notificatsi gitu)
        - cloydWath Logs => api activty in your aws account
    - AWS CloudTrail => melihat riwayat lengkap dari aktivitas pengguna dan panggilan API untuk aplikasi maupun sumber daya Anda.
        - etiap permintaan yang dikirimkan ke AWS, seperti meluncurkan EC2 instance; menambahkan baris ke tabel DynamoDB; atau mengubah izin pengguna, semuanya akan tercatat di mesin CloudTrail.
        - AWS CloudTrail sebagai log tindakan atau “jejak” yang ditinggalkan seseorang
    - AWS Trusted Advisor =>  memeriksa lingkungan AWS Anda dan memberikan rekomendasi secara real time sesuai dengan praktik terbaik AWS.
        ```
        Cost optimization (pengoptimalan biaya)
        Performance (kinerja)
        Security (keamanan)
        Fault tolerance (toleransi terhadap kesalahan)
        Service limits (batas layanan)
        ```
- application
    - AWS X RAY => monitoring serverles service (labda)
- networking
    - VPC Flow log => melihat trafic masuk keluarnya request

# 6. harga
- aws tier
    - alwasy free => aws ladmda, dynamo db (25gb)
    - 12 months free => S3 (5gb), EC2 (750 jam), cloud front (50gb)
    - trials

- pembayaran
    - Pay for what you use (Bayar sesuai yang Anda gunakan)
    - Pay less when you reserve (Berhemat saat Anda memesan di awal)
    - Pay less with volume-based discounts when you use more (Bayar lebih murah dengan diskon berbasis volume saat Anda menggunakan lebih sering)

- AWS Pricing Calculator => menjelajahi layanan AWS dan membuat estimasi biaya untuk kasus penggunaan di AWS

- Billing Dashboard =>  layanan yang dapat Anda gunakan untuk melihat informasi penagihan, 
    - membayar tagihan AWS, memantau penggunaan, menganalisis, dan mengontrol biaya.

- Consolidated Billing =>  fitur yang memungkinkan Anda untuk mendapatkan satu tagihan untuk semua akun AWS yang ada di organisasi.
- AWS Budgets => menetapkan anggaran pada berbagai skenario, seperti biaya atau penggunaan layanan. Bahkan, 
    - layanan ini bisa mengirimkan notifikasi saat penggunaan Anda sudah melebihi jumlah batas anggaran.
- AWS Cost Explorer => layanan berbasis konsol yang dapat meninjau dan menganalisis secara visual pengeluaran Anda di AWS.
- AWS Support Plans
    - Basic
    - Developer
    - Business
    - Enterprise =>  menerima dukungan dari AWS Technical Account Manager (TAM).
- AWS Marketplace => menyederhanakan langkah Anda guna menemukan, melakukan pengujian, dan membeli software pihak ketiga yang berjalan di arsitektur AWS.
    - Infrastructure Software, Business Applications, Data & Analytics, DevOps, dll.

# 6. migrasi dan inovasi
- CAF (Cloud Adoption Framework) => Framework atau kerangka kerja tersebut membagi panduan menjadi 6 area yang disebut dengan perspektif. Masing-masing perspektif meliputi tanggung jawab dari kelompok yang berbeda.
    - BUSENIS
    - PEOPLE
    - GOVERNANCE
    - PLATFORM
    - SECURITY
    - OPRATIONS

- strategi migrasi (6 R migrasi)
    - rehosting =>  sebagai lift and shift (angkat dan pindahkan). 
        - Opsi ini mudah dilakukan karena Anda tak perlu membuat perubahan apa pun. Cukup pindahkan aplikasi yang Anda miliki ke AWS.
    - replatform =>  lift, tinker, and shift (angkat, perbaiki, dan pindahkan). 
        - Pada dasarnya, opsi ini masih berupa lift and shift namun Anda dapat melakukan beberapa pengoptimalan cloud. Dalam strategi ini, Anda tak akan mengubah arsitektur inti (core architecture) apa pun pada proses migrasi aplikasi.
    - retring => hapuslah aplikasi yang tidak lagi Anda butuhkan.
    - reetaining => hanya memigrasikan aplikasi yang sekiranya masuk akal dan berguna untuk bisnis.
    - repurchasing => meninggalkan vendor perangkat lunak lama dan memulai yang baru
    - Refactoring/re-architecting => menulis kode yang bar


- AWS Snow Family =>  kumpulan perangkat fisik yang dapat membantu Anda untuk memindahkan data sampai dengan ukuran exabyte ke dalam dan keluar AWS.
    - AWS Snowcone => AWS Snowcone dapat menampung data sampai dengan ukuran 8 TB (terabyte) dan berisi edge computing (sistem komputasi yang dapat melakukan pemrosesan dan analisis data sedekat mungkin ke lokasi yang dibutuhkan).
    - AWS Snowball
        - Snowball Edge Storage Optimized => ukuran lebih besar (80tb)
        - Snowball Edge Compute Optimized => machine learning, analisis data, pemrosesan, dan penyimpanan lokal.
    - AWS Snowmobile => layanan transfer data dengan skala exabyte yang digunakan untuk memindahkan data dalam jumlah besar ke AWS.
        - 100pb (100.000tb)

# 7. pengantar cloud
- AWS Well-Architected Framework =>  dirancang untuk membantu Anda memahami bagaimana cara merancang dan mengoperasikan sistem yang andal, aman, efisien, dan hemat biaya di AWS Cloud.
    - Operational Excellence (Keunggulan Operasional)
    - Security (Keamanan)
    - Reliability (Keandalan)
    - Performance Efficiency (Efisiensi Kinerja)
    - Cost Optimization (Pengoptimalan Biaya)

- Lima pilar dari AWS Well-Architected Framework, di antaranya:
    - Operational excellence (Keunggulan Operasional)
    - Security (Keamanan)
    - Reliability (Keandalan) - Performance efficiency (Efisiensi Kinerja)
    - Cost optimization (Pengoptimalan Biaya)
- Enam manfaat dari komputasi cloud, antara lain:
    - Ubah pengeluaran di muka menjadi pengeluaran variabel.
    - Manfaatkan masifnya skala ekonomi.
    - Berhenti menebak kapasitas.
    - Tingkatkan kecepatan dan ketangkasan.
    - Hentikan biaya pengelolaan dan pemeliharaan data center.
    - Mendunia dalam hitungan menit.

# 8. certificate aws
- 