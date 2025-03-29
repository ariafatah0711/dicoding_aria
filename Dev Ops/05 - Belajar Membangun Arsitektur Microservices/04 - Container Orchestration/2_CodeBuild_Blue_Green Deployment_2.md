# Latihan Membangun Blue/Green Deployment dengan Amazon ECS: Build Docker Image dengan AWS CodeBuild

Sebagaimana yang tertuang di namanya, AWS CodeBuild adalah sebuah layanan untuk memudahkan kita dalam melakukan proses build. Kita dapat menggunakan AWS CodeBuild untuk berbagai hal, mulai dari mengompilasi (compile) kode, menjalankan pengujian (test), dan tentunya menghasilkan paket (package) yang diperlukan untuk deployment aplikasi. Pada kasus latihan ini, kita akan memakai AWS CodeBuild untuk melakukan proses build pada dua Docker image dalam rangka mengimplementasikan Blue/Green Deployment.

## Langkah-langkah

### 1. Masuk ke AWS CodeBuild

- Melalui kolom pencarian, masuklah ke layanan **CodeBuild**.
- Sesampainya di halaman **Build projects**, klik tombol **Create build project**.

### 2. Konfigurasi Blue Environment

Pada halaman **Create build project**, isi konfigurasi sebagai berikut:

#### Project Configuration
- **Project name**: `ecs-blue-buildproject`

#### Source
- **Source provider**: `Amazon S3`
- **Bucket**: `ecs-blue-green-<angka_unik>`
- **S3 object key**: `ecs-blue.zip`

#### Environment
- **Environment image**: `Managed image`
- **Operating system**: `Ubuntu`
- **Runtime(s)**: `Standard`
- **Image**: `aws/codebuild/standard:4.0`
- **Image version**: `Always use the latest image for this runtime version`
- **Privileged**: ✅ Centang
- **Service role**: `Existing service role`
- **Role ARN**: `CodeBuildRole`
- **Allow AWS CodeBuild to modify this service role**: ❌ Hilangkan centang

#### Additional Configuration
- **Environment variables**
  - **Name**: `AWS_ACCOUNT_ID`
  - **Value**: `Temukan Account ID dengan buka menu username di pojok kanan atas`
  - **Type**: `Plaintext`

#### Buildspec
- **Build specifications**: `Use a buildspec file`
- **Buildspec name**: `buildspec.yml`

#### Artifacts
- **Type**: `No artifacts`

Klik **Create build project**, lalu klik **Start build** untuk memulai proses build.

### 3. Periksa Log Build

Setelah build selesai (`Status: Succeeded`), buka tab **Build logs**. AWS CodeBuild akan:
1. **Install** runtime Docker versi 18.
2. **Pre-build**: Login ke Amazon ECR untuk mendapatkan akses ke repository.
3. **Build**: Jalankan `docker build` dan `docker tag` untuk membuat image.
4. **Post-build**: Jalankan `docker push` untuk mengunggah Docker image ke Amazon ECR repository.

### 4. Konfigurasi Green Environment

Buat **Build Project** baru untuk green environment:

#### Project Configuration
- **Project name**: `ecs-green-buildproject`

#### Source
- **Source provider**: `Amazon S3`
- **Bucket**: `ecs-blue-green-<angka_unik>`
- **S3 object key**: `ecs-green.zip`

#### Environment
- **Environment image**: `Managed image`
- **Operating system**: `Ubuntu`
- **Runtime(s)**: `Standard`
- **Image**: `aws/codebuild/standard:4.0`
- **Image version**: `Always use the latest image for this runtime version`
- **Privileged**: ✅ Centang
- **Service role**: `Existing service role`
- **Role ARN**: `CodeBuildRole`
- **Allow AWS CodeBuild to modify this service role**: ❌ Hilangkan centang

#### Additional Configuration
- **Environment variables**
  - **Name**: `AWS_ACCOUNT_ID`
  - **Value**: `Temukan Account ID dengan buka menu username di pojok kanan atas`
  - **Type**: `Plaintext`

#### Buildspec
- **Build specifications**: `Use a buildspec file`
- **Buildspec name**: `buildspec.yml`

#### Artifacts
- **Type**: `No artifacts`

Klik **Create build project**, lalu klik **Start build**.

### 5. Periksa Build Logs

Setelah **Status: Succeeded**, periksa tab **Build logs**. Prosesnya sama seperti sebelumnya, hanya saja akan menghasilkan Docker image dengan nama berbeda.

### 6. Verifikasi Docker Image di Amazon ECR

- Masuk ke layanan **Elastic Container Registry**.
- Buka menu **Repositories**, lalu klik nama repository Anda (`ecr-repository`).
- Pastikan terdapat dua Docker image, masing-masing untuk **blue** dan **green** environment.

---

Dengan langkah-langkah ini, kita telah berhasil menggunakan **AWS CodeBuild** untuk membuat **Docker image** dengan dua versi aplikasi yang berbeda!