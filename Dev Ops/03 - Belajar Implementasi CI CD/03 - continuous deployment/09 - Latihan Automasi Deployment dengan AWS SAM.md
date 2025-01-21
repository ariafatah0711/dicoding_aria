# Latihan Automasi Deployment dengan AWS SAM

## Membuat Berkas Konfigurasi
- Di AWS Management Console, buka AWS CloudShell dari ikon di pojok kanan atas.
- Pastikan Anda berada di folder a428-cicd-labs dan buatlah berkas deployspec.yaml di dalam folder buildspecs.
  ```bash
  cd a428-cicd-labs/
  nano buildspecs/deployspec.yaml
  ```
- Salin kode berikut ini ke dalam berkas tersebut
  ```yaml
  version: 0.2
 
  phases:
    install:
        runtime-versions:
        nodejs: 16
        commands:
        - pyenv install -s 3.9.0
        - pyenv global 3.9.0
    
    build:
        commands:
        - sam build
        - sam deploy --no-fail-on-empty-changeset
        - cd front-end-react
        - npm install
        - npm run build
        - aws s3 sync --acl public-read build s3://<nama><angka>-trivia-app-bucket/
  ```
- Jangan lupa untuk mengganti s3://<nama><angka>-trivia-app-bucket/ sesuai dengan nama S3 bucket yang pernah Anda buat untuk Trivia App. Simpan berkas ini dengan CTRL+X -> Y -> Enter. Kembali ke berkas deployspec.yaml, jangan lupa sesuaikan bagian nama S3 bucket .
- Bila Anda cermati baik-baik, sebenarnya ini adalah perintah yang sama ketika kita pertama kali berurusan dengan Trivia App. Jika Anda lupa, silakan kembali lagi ke materi Latihan Menyiapkan Development Environment.
  - [https://www.dicoding.com/academies/428/tutorials/24695/](https://www.dicoding.com/academies/428/tutorials/24695/)
  - Perbedaannya adalah kita akan menjalankannya secara otomatis alih-alih manual. Kita bagi menjadi 2 fase, yakni install (untuk menetapkan versi bahasa pemrograman Python yang dipakai) dan build (untuk langkah-langkah dalam deploy Trivia App).
- Perhatikan, alih-alih menggunakan sam deploy –guided, kita menggantinya dengan --no-fail-on-empty-changeset. Kita menggunakan option ini agar proses pembuatan stack tidak gagal meski tak ada pembaruan padanya. Jika Anda penasaran dengan apa yang di-deploy oleh perintah ini, silakan buka berkas template.yaml.
- Berikutnya, push ke GitHub repository Anda.
  ```bash
  git add buildspecs/deployspec.yaml
  git commit -m "adding deploy"
  git push origin maingit add buildspecs/deployspec.yaml
  git commit -m "adding deploy"
  git push origin main
  ```

## Membuat Build Project
- Masuk ke halaman IAM. Buka menu Roles, lalu pilih Create role.
- Pada halaman Select trusted entity, sesuaikan seperti berikut (klik Next bila sudah).
  - Trusted entity type: AWS service
  - Service or use case: CodeBuild
  - Use case: CodeBuild.
- Pada halaman Permission policies, centang AdministratorAccess, lalu klik Next.
  - Catatan: Jika Anda bekerja di skenario dunia nyata, hindari permission untuk AdministratorAccess ini. Ingatlah bahwa ini sekadar latihan.
- Untuk Role name, isikan trivia-deploy-administrator-access. Klik Create role.
- Setelah itu, masuk ke halaman CodeBuild. Pilih Create project. Lalu, sesuaikan dengan konfigurasi berikut.
  - Project name: trivia-deploy
  - Source provider: GitHub
  - Repository: Public repository
  - Repository URL: https://github.com/<username_github>/trivia-app
  - Source version: main
  - Operating system: Ubuntu
  - Runtime(s): Standard
  - Image: aws/codebuild/standard:7.0
  - Service role: Existing service role
  - Role ARN: trivia-deploy-administrator-access
  - Build specifications: Use a buildspec file
  - Buildspec name: buildspecs/deployspec.yaml
- Jika sudah, klik Create build project.

## Menambahkan Tahapan Deploy pada Pipeline
- Buka menu Pipeline -> Pipelines pada panel navigasi. Klik pada nama trivia-pipeline.
- Pilih Edit, scroll ke bawah, dan klik Add stage pada bagian setelah tahapan Test.
- Isikan Deploy untuk Stage name. Klik Add stage.
- Pada Deploy stage, klik Add action group.
- Lalu, sesuaikan dengan konfigurasi berikut.
  - Action name: Deploy
  - Action provider: AWS CodeBuild
  - Region: Singapore
  - Input artifacts: SourceArtifact
  - Project name: trivia-deploy
- Seperti inilah hasilnya.
- Jika sudah, klik Done.
- Simpan pipeline dengan klik Save, lalu Save sekali lagi
- Oke, kini pipeline telah memiliki 3 stage: Source, Test, dan Deploy. Mari kita uji coba dengan melakukan perubahan pada source code.
- Kembali ke AWS CloudShell terminal. Buka berkas a428-cicd-labs -> front-end-react -> src -> App.js.
  ```bash
  cd ~/a428-cicd-labs/
  nano front-end-react/src/App.js
  ```
- Ubah baris kode “Get Started” menjadi “Let’s Get Started”. Simpan dengan CTRL+X -> Y -> Enter.
- Commit dan push perubahan ke GitHub repository.
  ```bash
  git add .
  git commit -m "frontend change"
  git push origin main
  ```
- Kembali ke halaman AWS CodePipeline untuk trivia-pipeline. Klik Release change -> Release untuk memicu eksekusi pipeline. Tunggu beberapa saat (atau refresh) untuk melihat proses eksekusi. Secara bertahap, bagian Source akan mendeteksi adanya perubahan pada repository, lalu lanjut ke Test untuk dilakukan unit test, dan pada akhirnya proses untuk bagian Deploy dilakukan.
- Silakan klik View details pada bagian Deploy untuk menilik lebih lanjut. Kemudian, Anda akan melihat log yang ditampilkan berisi berbagai perintah yang kita tuliskan pada deployspec.yaml.
- Saat bagian Deploy sudah menunjukkan sukses, coba buka lagi Trivia App dari URL berikut untuk melihat perubahannya https://<nama><angka>-trivia-app-bucket.s3.amazonaws.com/index.html.

## Mengimplementasikan Continuous Delivery
- Buka halaman SNS melalui fitur pencarian layanan.
- Klik menu Topics pada panel navigasi, lalu pilih Create topic.
- Sesuaikan dengan konfigurasi berikut.
  - Type: Standard
  - Name: trivia-approval
  - Display name: Trivia Approval
- Jika sudah, lanjut klik Create topic.
- Setelah itu, klik tombol Create subscription. Sesuaikan dengan konfigurasi berikut.
  - Protocol: Email
  - Endpoint: Isikan dengan email Anda
- Klik Create subscription.
- Segera cek email, Anda akan menerima pesan dari AWS terkait subscription confirmation.
- Buka email tersebut dan klik Confirm subscription.
- Itu akan membuka browser tab baru yang menyajikan bahwa Anda telah berhasil berlangganan ke SNS topic bernama trivia-approval.
- Oke, kembali ke browser tab yang berisi subscription dari SNS topic untuk trivia-approval. Masuk ke halaman AWS CodePipeline. Pilih trivia-pipeline dan klik Edit.
- Setelah bagian Test dan sebelum Deploy, klik tombol Add stage.
- Isikan ManualApproval untuk Stage name dan klik Add stage.
- Kemudian, klik Add action group pada bagian ManualApproval.
- Lalu, sesuaikan dengan konfigurasi berikut (klik Done bila sudah).
  - Action name: ManualApproval
  - Action provider: Manual approval
  - SNS topic ARN: trivia-approval
  - URL for review: Isikan dengan URL GitHub repository Trivia App Anda, misal: https://github.com/<username_github>/trivia-app
  - Comments: Isikan Please review my code
- Klik tombol Save dan klik Save sekali lagi untuk menyimpan konfigurasi pipeline.
- Perhatikan bahwa kini Anda memiliki 4 tahapan, yakni Source, Test, ManualApproval, dan Deploy.
- Coba Anda buat sebuah perubahan pada source code (misal mengubah “Let's Get Started” menjadi “Let's Get Started!” pada berkas App.js), lalu commit dan push ke GitHub repository. Kemudian, kembali lagi ke halaman trivia-pipeline dan klik Release change -> Release.
- Tunggu beberapa saat (atau refresh) untuk melihat proses eksekusi. Secara bertahap, bagian Source akan mendeteksi bahwa adanya perubahan pada repository, lalu lanjut ke Test untuk dilakukan unit test, dan setelah itu bagian ManualApproval akan masuk ke status Pending dan Waiting for approval.
- Segera cek email, Anda seharusnya mendapatkan pesan dari AWS bahwa trivia-pipeline memerlukan approval (persetujuan).
- Silakan klik tautan yang disertakan pada bagian Approve or reject. Sebenarnya, itu akan membawa Anda ke halaman trivia-pipeline. 
- Pada bagian ManualApproval, klik tombol Review.
- Di sini, tertera Comments about this action dan URL for review yang tadi kita sertakan sebelumnya. Silakan tuliskan komentar Anda pada bagian Comments, lalu klik tombol Approve.
- Tak berselang lama, tahapan ManualApproval akan berubah statusnya menjadi Succeeded dan Approved. 
- Setelah itu, proses Deploy pun dimulai. Tunggu beberapa saat hingga statusnya berubah menjadi Succeeded.
- Coba sekarang Anda buka lagi Trivia App dari URL berikut untuk melihat perubahannya https://<nama><angka>-trivia-app-bucket.s3.amazonaws.com/index.html.