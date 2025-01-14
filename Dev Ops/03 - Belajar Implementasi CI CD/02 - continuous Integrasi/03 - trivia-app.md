# trvia app
## persiapan
- Pada latihan ini, Anda akan membuat AWS resources berikut:
    - AWS CloudShell
    - Amazon Simple Storage Service (Amazon S3) bucket
    - Amazon API Gateway REST API
    - Amazon DynamoDB table
    - AWS Step Functions state machine
    - AWS Lambda functions

## Menjalankan AWS CloudShell dan Mengunduh Aplikasi Trivia App
- Silakan login ke AWS Management Console. Pilihlah Region yang diinginkan, disarankan untuk memilih Region Singapore karena paling dekat dengan Indonesia dan memiliki dukungan layanan yang cukup lengkap (dibandingkan Jakarta).
- clone the repo
  ```bash
  git clone -b trivia-app https://github.com/dicodingacademy/a428-cicd-labs.git
  ```
- deploy infrastructure backend
  ```bash
  cd a428-cicd-labs/
  sam build
  sam deploy --guided
  ```
- lalu masukan ini
  ```bash
  Stack Name [sam-app]: trivia-app
  AWS Region [ap-southeast-1]: <Tekan Enter>
  #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
  Confirm changes before deploy [y/N]: <Tekan Enter>
  #SAM needs permission to be able to create roles to connect to the resources in your template
  Allow SAM CLI IAM role creation [Y/n]: <Tekan Enter>
  Save arguments to configuration file [Y/n]: <Tekan Enter>
  SAM configuration file [samconfig.toml]: <Tekan Enter>
  SAM configuration environment [default]: <Tekan Enter>
  ```
- outputnya
  ```bash
  CloudFormation outputs from deployed stack
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Outputs                                                                                                                                                                                                     
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Key                 TriviaWebSocketApi                                                                                                                                                                      
  Description         API Gateway websockets endpoint                                                                                                                                                         
  Value               wss://hb6tyd6k7a.execute-api.us-east-1.amazonaws.com/Prod                                                                                                                               
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ```

## Menguji Coba Frontend di AWS CloudShell
- pindah dan edit
  ```bash
  cd front-end-react/
  nano src/config.js

  ##
  module.exports = {
    WebsocketEndpoint: 'wss://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/Prod'
  };
  ##
  ```
- Lanjut kita install NVM agar bisa mengatur versi Node.js
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
  ```
- Jalankan perintah berikut untuk mengonfigurasi NVM
  ```bash
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  ```
- Setelah itu, perintah berikut digunakan agar perintah nvmdapat digunakan
  ```bash
  source ~/.bashrc
  ```
- Kembali ke AWS CloudShell terminal, atur versi Node ke v16 (codename: Gallium).
  ```bash
  nvm install lts/gallium
  nvm alias default lts/gallium
  nvm use 16
  ```
- Instal NPM dependencies dan jalankan Trivia App.
  ```bash
  npm install
  npm run start
  ```

## Deploy Frontend ke S3 Bucket
- buatlah S3 bucket dengan nama yang unik. Misalnya, menggunakan nama depan Anda, disusul dengan angka acak, lalu trivia-app-bucket. Contohnya seperti format berikut: <nama><angka>-trivia-app-bucket.
  ```bash
  # aws s3 mb s3://<nama><angka>-trivia-app-bucket/
  aws s3 mb s3://aria1-trivia-app-bucket/
  ```
- Setelah itu, lakukan proses build untuk Trivia App dengan menjalankan perintah berikut.
  ```bash
  npm run build
  ```
- Setelah proses build usai, kini saatnya kita deploy frontend ke S3 bucket. Proses deploy ini sebenarnya adalah menyalin semua isi dari folder build ke S3 bucket yang barusan kita buat. Sebelum itu, kita perlu membuat S3 bucket menjadi public agar bisa diakses oleh siapa pun. 
- Pada browser tab baru, buka halaman Amazon S3. Lantas, klik pada nama bucket yang sudah Anda buat untuk masuk ke halaman detail.
- Setelah itu, buka tab Permissions. Pada bagian Block public access (bucket settings), pilih tombol Edit. 
- Hilangkan tanda centang pada Block all public access. Pilih Save changes, ketik confirm, dan klik tombol Confirm.
- Lanjut gulir halaman ke bawah. Pada bagian Object Ownership, klik tombol Edit. Pilih ACLs enabled, centang I acknowledge that ACLs will be restored, dan klik Save changes.
- Oke, sekarang kembali lagi ke browser tab yang berisi AWS CloudShell. Mari kita deploy aplikasi front-end dan sekaligus membuka public access agar bisa diakses (read) secara publik.
- Oke, sekarang kembali lagi ke browser tab yang berisi AWS CloudShell. Mari kita deploy aplikasi front-end dan sekaligus membuka public access agar bisa diakses (read) secara publik.
  ```bash
  npm run build
  # aws s3 sync --acl public-read build s3://<nama><angka>-trivia-app-bucket/
  aws s3 sync --acl public-read build s3://aria1-trivia-app-bucket/
  ```
- go to url
  - https://aria1-trivia-app-bucket.s3.amazonaws.com/index.html

## Menaruh Source Code di GitHub
- Buka GitHub website di browser tab baru dan login bila diperlukan. Pada halaman Dashboard, klik New untuk membuat repository baru.
- Untuk Repository name, isikan trivia-app, pilih opsi Public, kemudian pilih Create repository.
- Kembali ke browser tab yang memuat AWS CloudShell. Pada terminal, konfigurasikan git dengan nama dan email Anda.
  ```bash
  git config --global user.name "ariafatah999"
  git config --global user.email ariafatah999@gmail.com
  ```
- Mari kita buat SSH key terlebih dahulu agar bisa terhubung dengan GitHub.
  ```bash
  mkdir ~/.ssh/ 
  cd ~/.ssh/
  ssh-keygen -t rsa
  ```
- Jika muncul prompt "Enter file in which to save the key (/home/cloudshell-user/.ssh/id_rsa)", Anda bisa isikan trivia-app. Untuk passphrase, langsung tekan Enter saja dua kali.
- Setelah itu, lihat berkas key dengan perintah berikut.
  ```bash
  cat ~/.ssh/trivia-app.pub
  ```
- Salin semau teks yang ditampilkan. Kemudian, buka GitHub dan masuk ke Settings -> SSH and GPG Keys di browser tab baru. Klik New SSH key dan paste teks yang tadi disalin pada field Key. Lanjut pilih Add SSH key.
- Setelah itu, kembali ke tab browser AWS CloudShell dan jalankan perintah berikut di terminal.
  ```bash
  eval `ssh-agent -s`
  ssh-add trivia-app
  ```
- Berikutnya, inisialisasikan local repository Anda, navigasikan ke branch main, buat commit baru, lalu push source code Trivia App ke GitHub repository.
  ```bash
  cd ~/a428-cicd-labs/
  git init
  git checkout -b main
  git add .
  git commit -m "initial commit"
  git remote remove origin
  git remote add origin git@github.com:<username-github>/trivia-app.git
  git push origin main
  ```