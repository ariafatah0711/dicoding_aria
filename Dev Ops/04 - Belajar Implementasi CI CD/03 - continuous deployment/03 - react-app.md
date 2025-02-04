# Membangun CI/CD Pipeline dengan Jenkins
- Ingat kembali kondisi terakhir CI Pipeline kita di Jenkins. Kita sudah berhasil menerapkan continuous integration dengan memiliki tahapan Build dan Test (tahapan Code adalah saat kita commit code ke local git repository).

## Menambahkan Stage Deploy pada Jenkinsfile
- Buka Visual Studio Code untuk proyek React App, lalu buka berkas Jenkinsfile
- Salin sintaksis declarative pipeline berikut tepat di bawah Test stage pada Jenkinsfile Anda.
  ```INI
  stage('Deploy') {
      steps {
          sh './jenkins/scripts/deliver.sh'
          input message: 'Sudah selesai menggunakan React App? (Klik "Proceed" untuk mengakhiri)'
          sh './jenkins/scripts/kill.sh'
      }
  }
  ```
- Kini, keseluruhan Jenkinsfile akan tampak seperti berikut.

```
pipeline {
    agent {
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deploy') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Sudah selesai menggunakan React App? (Klik "Proceed" untuk mengakhiri)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}
```

## Commit ke Local Repository
- Pada VS Code terminal, pastikan Anda masih berada di folder a428-cicd-labs.
- Tambahkan perubahan ke staging area.
  ```bash
  git stage .
  ```
- Kemudian, jalankan perintah untuk commit ke local repository.
  ```bash
  git commit -m “Add Deploy stage”
  ```
- Oke, Anda sudah commit ke local repository. Lanjut, kita jalankan Jenkins Pipeline.

## Menjalankan Jenkins Pipeline
- Buka halaman Jenkins dengan URL http://localhost:8080/, login bila diperlukan, dan klik Open Blue Ocean di sisi kiri untuk mengakses antarmuka Blue Ocean pada Jenkins.
- Pilih react-app, lalu klik Run. Kemudian, segera klik tautan yang bertuliskan OPEN yang muncul di kanan bawah untuk melihat bagaimana Jenkins mengeksekusi Pipeline project Anda.
- Cermati setiap tahapan yang dilakukan oleh Jenkins. Anda sekarang menemukan ada stage baru bernama “Deploy”.
- Pada Deploy stage, Jenkins mengeksekusi script deliver.sh sebagaimana yang kita tentukan pada Jenkinsfile.
- Kemudian, muncul sebuah prompt yang meminta kita untuk memilih. Ini adalah hasil karya dari input message yang kita definisikan di Jenkinsfile.
- Sebelum berinteraksi dengan prompt tersebut, coba buka langkah ./jenkins/scripts/deliver.sh untuk menampilkan apa saja yang terjadi selama proses deployment.
- Scroll ke bawah hingga Anda menemukan http://localhost:3000.
- Klik pada tautan tersebut. Itu akan membuka browser tab baru dan menampilkan aplikasi React App.
- Hooree! Anda sudah berhasil deploy aplikasi React App menggunakan Jenkins. Kembali ke Blue Ocean interface, lalu pilih Proceed untuk mengakhiri aplikasi.
- Pada Visual Studio Code, buka berkas a428-cicd-labs -> src -> App.js.
- Cari baris kode yang berisi “Welcome to React”, lalu ubah menjadi “Welcome to React!”. Jangan lupa simpan berkas tersebut.
- Commit perubahan tersebut, lalu jalankan Jenkins Pipeline, dan buka lagi URL untuk aplikasi React App. Tampilannya akan seperti berikut.
- Jika sudah puas menjelajahi React App, silakan kembali ke halaman Jenkins Pipeline, lalu klik tombol Proceed untuk menyelesaikan eksekusi Pipeline.
- Klik tombol silang (X) di pojok kanan atas untuk kembali ke beranda antarmuka Blue Ocean.


- Keren! Anda sudah berhasil membangun CI/CD pipeline dengan Jenkins. Namun, sebenarnya kita tidak benar-benar mengimplementasikan continuous deployment karena masih harus menjalankan pipeline secara manual dengan klik tombol RUN pada Blue Ocean.
- Continuous deployment bisa dicapai bila Anda setidaknya menerapkan Poll SCM (sesuai saran pada submission pertama). Atau, untuk benar-benar mengimplementasikan continuous deployment, Anda bisa menggunakan fitur GitHub hook trigger for GITScm polling pada Jenkins.
- Jadi, ketika Jenkins menerima GitHub push hook (misalnya karena terjadi push atau merge pada GitHub repository), GitHub Plugin pada Jenkins kemudian memeriksa apakah hook tersebut berasal dari GitHub repository yang sesuai dengan konfigurasi pada bagian SCM/Git dari Pipeline Anda. 
  - Jika sesuai, GitHub Plugin kemudian memicu polling satu kali pada GITScm. Saat GITScm melakukan polling pada GitHub, ia akan menemukan bahwa ada perubahan dan memulai eksekusi pipeline (misal, menjalankan proses build).
- Namun, dalam rangka membuat sebuah GitHub Webhook, Anda memerlukan public IP address atau DNS untuk Jenkins server. Anda tak bisa memakai http://localhost:8080/. Solusinya, Anda bisa deploy Jenkins di cloud atau menggunakan webhook proxy service gratis seperti SocketXP dan ngrok.
