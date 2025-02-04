# Blog App
- DevOps Blog App benar-benar simpel karena hanya menggunakan HTML dan CSS, aplikasi ini sekadar menampilkan artikel blog mengenai DevOps, mulai dari penjelasan DevOps itu sendiri hingga beberapa istilah yang sering dijumpai.
- Selain berisi berkas untuk artikel blog (index.html), aplikasi ini juga memiliki berkas lain, seperti acctests-buildspec.yml (untuk kebutuhan latihan berikutnya, untuk saat ini tak perlu dihiraukan) dan appspec.yml (kita bahas lebih detail soal ini).

- AppSpec (application specification) merupakan berkas yang ditulis dalam format YAML atau JSON yang digunakan oleh AWS CodeDeploy untuk mengelola sebuah deployment.
- Berkas ini digunakan oleh AWS CodeDeploy untuk beberapa hal berikut
  - Memetakan berkas aplikasi ke destinasi pada instance.
  - Menentukan permission tertentu untuk deploy berkas.
  - Menentukan script untuk menjalankan instance pada berbagai tahapan ketika proses deployment.

## example
```yaml
version: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html/WordPress
hooks:
  BeforeInstall:
    - location: scripts/install_dependencies.sh
      timeout: 300
      runas: root
  AfterInstall:
    - location: scripts/change_permissions.sh
      timeout: 300
      runas: root
  ApplicationStart:
    - location: scripts/start_server.sh
    - location: scripts/create_test_db.sh
      timeout: 300
      runas: root
  ApplicationStop:
    - location: scripts/stop_server.sh
      timeout: 300
      runas: root
```

### Version
- Berikut kode untuk bagian version.
```version: 0.0```
- Bagian ini mengacu pada versi dari CodeDeploy AppSpec, bukan aplikasi atau deployment Anda. Saat ini, satu-satunya value (nilai) yang diterima adalah 0.0.
### OS
- Berikut kode untuk bagian os.
```os: linux```
- Seperti yang mungkin Anda kira, os adalah singkatan dari operating system alias sistem operasi. Bagian ini hanya menerima 2 value: linux atau windows. EC2 instance yang akan kita gunakan nanti adalah Linux, makanya kita isikan nilai linux.

### Files
- Berikut kode untuk bagian files.
```files:```
- source: /index.html
- destination: /var/www/html/

- Bagian ini sebenarnya opsional. Bagian files hanya diperlukan apabila Anda ingin menyalin berkas ke instance Anda selama proses deployment. 
- Di sini kita memiliki 2 subbagian, yakni source dan destination.
- Subbagian source mengidentifikasi berkas atau direktori dari aplikasi (revision) Anda yang nanti disalin.
- Subbagian destination mengidentifikasi lokasi pada instance tempat berkas atau direktori akan ditaruh.

### Hooks
- Berikut kode untuk bagian hooks.
  ```yaml
  hooks:
    BeforeInstall:
      - location: scripts/install_dependencies
        timeout: 300
        runas: root
    ApplicationStop:
      - location: scripts/stop_server
        timeout: 300
        runas: root
    ApplicationStart:
      - location: scripts/start_server
        timeout: 300
        runas: root
  ```

- BeforeInstall
- Hooks yang satu ini digunakan untuk menjalankan script sebelum proses penginstalan terjadi. Di sini, kita mengarahkan CodeDeploy ke script yang berlokasi di scripts/install_dependencies untuk menginstal dependencies yang diperlukan untuk menjalankan aplikasi DevOps Blog App.
  ```
  #!/bin/bash -ex
  yum install -y httpd
  systemctl enable httpd.service
  ```

- ApplicationStop
- Hooks ini digunakan untuk menjalankan script dalam rangka menghentikan aplikasi. Di sini, kita mengarahkan CodeDeploy ke script yang berlokasi di scripts/stop_server.
  ```bash
  #!/bin/bash -ex
  isExistApp=`pgrep httpd`
  if [[ -n  $isExistApp ]]; then
    service httpd stop        
  fi
  ```

- ApplicationStart
- Hooks ini digunakan untuk menjalankan script dalam rangka memulai aplikasi. Di sini, kita mengarahkan CodeDeploy ke script yang berlokasi di scripts/start_server.
  ```bash
  #!/bin/bash -ex
  touch /var/www/html/index.html
  service httpd start
  ```