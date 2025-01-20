# Continuous Deployment di AWS
## Amazon EC2
- Apabila Anda pernah mengambil kelas-kelas AWS dari kami (yang disebutkan di Prasyarat Kemampuan), seharusnya sudah sangat familier dengan Amazon EC2.
- Amazon Elastic Compute Cloud (Amazon EC2) adalah layanan yang masuk dalam kategori Infrastructure as a Service (IaaS) yang menyediakan kapasitas komputasi yang scalable (dapat disesuaikan kapasitasnya) dengan harga pay-as-you-go.
- berarti Anda bisa menggunakan Amazon EC2 dengan kontrol penuh layaknya komputer atau server pribadi. 
- Amazon EC2 memberikan Anda akses ke berbagai aspek pendukung, seperti jaringan, penyimpanan data, hingga keamanan. 
  - Dengan fleksibilitas seperti itu, Anda tak perlu lagi memikirkan soal bangunan, kelistrikan, pendingin, dan lain-lain karena itu semua ditanggung oleh AWS. 

## AWS Elastic Beanstalk
- AWS Elastic Beanstalk tergolong dalam kategori Platform as a Service yang berarti kita disediakan sebuah environment untuk aplikasi tanpa perlu mengurusi soal server atau infrastruktur yang mendasarinya.
- Cara penggunaannya pun sederhana, Anda hanya perlu unggah aplikasi dalam bentuk source bundle (misal, Java .war file atau compressed file .zip), 
  - AWS Elastic Beanstalk secara otomatis akan meluncurkan sebuah environment dan membuat konfigurasi AWS resource yang diperlukan untuk menjalankan aplikasi Anda.

## AWS CodeDeploy
- AWS CodeDeploy adalah layanan yang mampu mengotomatiskan proses deployment aplikasi ke Amazon EC2 instance (server virtual di AWS), on-premise instance (server pribadi), 
- AWS Lambda function (serverless computing), atau Amazon ECS service (layanan container di AWS). 
- Anda dapat deploy berbagai konten aplikasi tanpa batas, termasuk kode, Lambda function, file web dan konfigurasinya, executable, package, script, hingga berkas multimedia. 
- AWS CodeDeploy merupakan layanan yang terintegrasi dengan AWS CodePipeline sehingga kita bisa menggunakan AWS CodeDeploy bersamaan dengan layanan AWS lain.
- Dengan menambahkan AWS CodeDeploy pada CI Pipeline di AWS, kini CI/CD Pipeline sudah lengkap sehingga kita dapat mengimplementasikan continuous delivery atau continuous deployment.

- Untuk bekerja dengan AWS CodeDeploy, hal yang perlu kita lakukan adalah membuat application dan deployment group. Mari kita bahas apa arti dari kedua istilah tersebut.
  - Application: sebuah application dapat memiliki satu atau beberapa deployment group.
    - Application name: nama aplikasi sebagai identitas pada AWS CodeDeploy.
    - Compute platform: mendefinisikan platform komputasi yang akan digunakan. Beberapa opsi platform yang didukung ialah EC2/on-premises, Lambda, dan ECS.
  - Deployment group: Ini berisi pengaturan dan konfigurasi yang digunakan selama deployment. Sebagian besar konfigurasi bergantung pada platform komputasi yang Anda pilih. Contohnya, untuk EC2 compute platform, deployment group perlu mengetahui informasi tentang beberapa hal seperti berikut.
    - IAM role: Service role yang akan digunakan CodeDeploy untuk mengautentikasi ke layanan lain.
    - Deployment type: Untuk strategi deployment, Anda bisa pilih In-Place (memperbarui instance dengan versi aplikasi yang baru) atau Blue/Green (mengganti instance lama dengan instance yang baru dan deploy versi aplikasi baru ke instance baru tersebut). 
    - Environment configuration: Cara untuk menentukan instance. Untuk In-Place, bisa dengan Amazon EC2 Auto Scaling groups, Amazon EC2 instances tag group, atau bahkan On-premises instances tag group. Untuk Blue/Green, selain secara manual dengan Amazon EC2 Auto Scaling groups dan Amazon EC2 instances tag group, Anda juga bisa memilih opsi agar AWS CodeDeploy secara otomatis menyalin Amazon EC2 Auto Scaling group untuk menyediakan green environment.
    - Deployment configuration: Sesuai namanya, yakni konfigurasi yang diperlukan untuk deployment. Untuk In-Place, Anda bisa mengontrol seberapa cepat sebuah aplikasi akan di-deploy. Untuk Blue/Green, selain dapat mengontrol seberapa cepat sebuah aplikasi akan di-deploy, Anda juga bisa menentukan kapan harus merutekan traffic ke green environment, apakah langsung saat itu juga atau dalam hitungan waktu. Selain itu, pada Blue/Green, Anda juga dapat mengontrol berapa lama original instances (blue environment) disimpan setelah deployment sukses, apakah langsung saat itu juga atau dalam hitungan waktu.
    - Load balancer: Secara opsional, Anda dapat memilih load balancer sehingga CodeDeploy tahu di mana harus register dan deregister instances selama deployment.
    - Triggers: Anda bisa membuat sebuah trigger agar menerima notifikasi jika sesuatu terjadi terkait deployment dan instance, entah itu Deployment starts, Deployment succeeds, Deployment fails, Instance start, Instance fails, dan masih banyak lainnya.
    - Alarms: Anda bisa mengasosiasikan CloudWatch alarms. Deployment dapat dihentikan apabila CloudWatch alarms terpicu.
    - Rollbacks: Konfigurasi untuk rollback. Anda bisa melakukan rollback secara otomatis jika terjadi deployment fails dan/atau saat alarm terpicu.
- Hal penting lain untuk melakukan deployment menggunakan AWS CodeDeploy selain application dan deployment group adalah revision. Ia adalah artifact (berkas aplikasi) yang akan kita deploy. Revision umumnya berisi semua berkas dan instruksi yang akan dijalankan di instance selama deployment. Instruksi tersebut dikonfigurasi dalam AppSpec file. Kita bahas soal AppSpec file nanti.
- AWS CodeDeploy dapat mengambil revision dari S3 ataupun GitHub. Namun, apabila AWS CodeDeploy merupakan bagian dari AWS CodePipeline action, revision dapat diambil dari output CodePipeline action lain, misalnya, artifact yang dibuat dari Build stage. 