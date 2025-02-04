# Continuous Integration aws
## CI Pipeline
- aplikasi Trivia App sudah disimpan di source control (di GitHub) dan memiliki automated test atau pengujian otomatis (di AWS CodeBuild)
  - yang dapat dijalankan untuk memastikan kode dalam keadaan stabil. Keren. 
- Akan tetapi, setiap fase (Code, Build, dan Test) yang kita lakukan masih manual. 
  - Lantas, bagaimana jika kita ingin menjalankan semuanya secara otomatis setiap kali commit kode terbaru? 
  - Jelas bahwa automasi diperlukan supaya kita bisa selalu menerima feedback (umpan balik) secara langsung yang menyatakan bahwa kode yang di-commit berfungsi dengan baik (kunci dari CI/CD).

## AWS CodePipeline
- AWS CodePipeline memungkinkan kita untuk membuat serangkaian langkah atau tahapan untuk mengimplementasikan CI/CD Pipeline.
- Dalam kasus Trivia App, kita ingin agar setiap kali Developer meng-commit perubahan kode ke repository akan secara otomatis memulai tahapan lain, yakni menjalankan test. 
- AWS CodePipeline tidak melakukan semua ini sendirian. 
  - Seperti yang tadi disebutkan, ia adalah sebuah orchestrator.
  - AWS CodePipeline bekerja sama dengan layanan lain, seperti AWS CodeBuild (Build & Test)
  - dan AWS CodeDeploy (Deploy) untuk menciptakan sebuah CI/CD Pipeline yang harmoni.
- Tak terbatas hanya pada layanan AWS saja, AWS CodePipeline juga dapat terintegrasi dengan third-party tools. Misalnya, apabila Anda ingin menggunakan GitHub sebagai remote repository (Code) dan Jenkins (untuk mem-build kode), tentu saja itu bisa.

## Berikut tahapan proses yang akan kita lakukan.
- Pertama, Anda akan membuat sebuah pipeline dan menentukan setiap stage di AWS CodePipeline.
- Selanjutnya, Anda akan membuat feature branch pada GitHub repository dengan nama feature-bonus-scores dari development environment (AWS CloudShell). 
- Kemudian, Anda akan mengedit kode untuk mengimplementasikan fitur skor bonus. Perubahan tersebut dilakukan di feature branch yang tadi dibuat.
- Saat kode sudah siap dan dalam keadaan stabil, Anda akan membuat pull request pada GitHub repository. 
  - Pull request tersebut memungkinkan anggota tim untuk mengomentari perubahan kode tersebut sebelum akhirnya di-merge. \
  - Usai pull request disetujui, proses merge akan terjadi, CI Pipeline akan berjalan, dan tak lama Trivia App pun memiliki fitur skor.

### Membuat Sebuah Pipeline
- Pada AWS Management Console Home, masuklah ke halaman AWS CodePipeline melalui fitur pencarian layanan (pastikan Anda masih berada di Region Singapore).
- Klik tombol Create pipeline.
- Pilih opsi Build custom pipeline dan klik Next. 
- Untuk Pipeline settings, sesuaikan dengan konfigurasi berikut.
  - Pipeline name: trivia-pipeline
  - Execution mode: Superseded
- Pada halaman Add source stage, sesuaikan dengan konfigurasi berikut (klik Next bila sudah).
  - Source provider: GitHub (via GitHub App)
  - Connection: klik Connect to GitHub -> isikan trivia-app -> klik Connect to GitHub -> Connect.
  - Repository name: <username_github>/trivia-app (abaikan bila muncul kotak warning)
  - Default branch: main (abaikan bila muncul kotak warning)
  - Output artifact format: CodePipeline default
  - Webhook - optional: centang "Start your pipeline on push and pull request events"
  - Webhook event filters - optional: 
    - Event type: Pull request
    - Events for pull request: centang semua opsi
    - Start pipeline under these conditions - optional:
      - Filter type: Branch
      - Branches or patterns: main
- Pada halaman Add build stage, klik Skip build stage.
- Untuk halaman Add test stage, sesuaikan dengan konfigurasi berikut (Klik Next bila sudah).
  - Test provider: AWS CodeBuild
  - Project name: trivia-unittests
- Pada halaman Add deploy stage, karena kita masih fokus pada implementasi continuous integration, maka saat ini kita tak memerlukan tahapan deployment. Jadi, silakan pilih Skip deploy stage.
- Pada halaman Review, pilih Create pipeline.
- Tunggu beberapa saat hingga muncul keterangan Success. Catatan: Bila tetiba muncul keterangan Failed pada bagian Source, klik saja tombol Release change.
- Kemudian, klik Release dan lakukan refresh pada halaman tersebut.
- Tak menunggu waktu lama, seharusnya kini semua stage pada pipeline menunjukkan Succeeded.

### Membuat Feature Branch
- Silakan akses AWS CloudShell dari ikon di pojok kanan atas.
- Pastikan Anda berada di direktori a428-cicd-labs/.
  ```bash
  cd ~/a428-cicd-labs/
  ```
- Buat feature branch bernama feature-bonus-scores dengan menjalankan perintah berikut.
  ```bash
  git checkout -b feature-bonus-scores
  ```
- Anda seharusnya melihat bahwa branch baru sudah berhasil dibuat dan sekaligus beralih ke branch tersebut.

### Mengedit Kode
- Buka berkas a428-cicd-labs -> back-end-python -> gameactions -> app.py
  ```bash
  nano back-end-python/gameactions/app.py
  ```
- Temukan fungsi bernama trivia_calculate_scores, lalu fokus pada bagian last_answer.
- Pada baris berikutnya, tambahkan kode untuk mengatur variabel bonus (hindari tab, gunakan 8 spasi).
  ```bash
  last_answer = connection["lastAnswer"] if "lastAnswer" in connection else ""
  bonus = question["bonus"] if "bonus" in question else 0
  ```
- Anda juga perlu menambahkan variabel bonus ke logika perhitungan. Silakan perbarui kode terkait penambahan variabel score agar ia menyertakan variabel bonus.
  ```bash
  # before
  if last_question_id == question["id"] and last_answer == question["answer"]:
            score += 20
  
  # ubah menjadi
  if last_question_id == question["id"] and last_answer == question["answer"]:
            score += 20 + bonus
  ```
- Jangan lupa simpan berkas tersebut dengan CTRL+X -> Y -> Enter.
- Setelah itu, Anda juga perlu memperbarui kode untuk unit test agar ia juga menguji skor bonus yang baru ditambahkan. Buka berkas a428-cicd-labs -> back-end-python -> tests -> unit -> test_handler.py.
  ```bash
  nano back-end-python/tests/unit/test_handler.py
  ```
- Gantikan SCORES_EVENT dengan kode baru berikut yang menyertakan skor bonus.
  ```bash
  SCORES_EVENT = {
        "gameid" : "01234567012301230123012345678901",
        "questions" : [
            { "id" : "q-1111", "question" : "Good question?", "answer" : "Yes", "bonus" : 20},
        ],
        "iterator" : { "questionpos" : 0 }
  }
  ```
- Kemudian, cari fungsi bernama test_trivia_calculate_scores_correct dan ubah assert statement agar berekspektasi bahwa score adalah 40.
  ```bash
  # assert we updated the game item, score is incremented
    app.TABLE.update_item.assert_called_with(
        Key={'gameId': '01234567012301230123012345678901', 'connectionId': 'connection-1'},
        AttributeUpdates={'score': {'Value': 40, 'Action': 'PUT'}}
    )
 
    app.MANAGEMENT.post_to_connection.assert_has_calls([
        mock.call(Data='{"action": "playerlist", "players": [{"connectionId": "connection-1", "playerName": "AliceBlue", "score": 40, "currentPlayer": true}]}', ConnectionId='connection-1'),
        mock.call(Data='{"action": "gameover"}', ConnectionId='connection-1')
        ])
  ```
- Simpan berkas tersebut dengan CTRL+X -> Y -> Enter.
- Verifikasi bahwa kode tetap dalam keadaan stabil dengan menjalankan unit test secara lokal menggunakan local_build.sh script pada AWS CloudShell terminal.
  ```bash
  ./local_build.sh
  ```
- Seharusnya Anda melihat bahwa semua pengujian telah lolos.

### Merge Fitur Baru
- Pada AWS CloudShell terminal, cek status dari git local repository Anda dengan menjalankan perintah berikut.
  ```bash
  git status
  ```
- Tambahkan berkas ke git index, buat commit, dan push perubahan kode ke remote repository bernama origin (trivia-app repository) pada feature-bonus-scores branch.
  ```bash
  git add .
  git commit -m "new bonus score feature"
  git push origin feature-bonus-scores
  ```
- Buka browser tab baru, akses trivia-app repository Anda di GitHub, dan klik tombol Compare & pull request (bila belum muncul, coba refresh).
- Untuk base, biarkan opsi main terpilih. Untuk compare, tetap pada pilihan feature-bonus-scores.
- Anda bisa scroll ke bawah untuk melihat perubahan kode yang dibuat.
- Kembali scroll ke atas. Isi kolom Title dengan “New feature: Bonus scoring”. Setelah itu, klik tombol Create pull request.
- Kemudian, klik tombol Merge pull request.
- Klik Confirm merge untuk melanjutkan.
- Usai itu, kembali ke browser tab yang memuat halaman AWS CodePipeline dan lakukan refresh.
- Pada bagian Source, Anda seharusnya melihat ada commit baru: Source: new bonus score feature. Bila belum muncul otomatis, klik tombol Release change -> Release.
- Perhatikan pada bagian Test. Pull request yang kita lakukan tadi telah memicu proses build.
- Tunggu beberapa saat hingga keseluruhan pipeline selesai dieksekusi.
- Buka kembali AWS CloudShell Anda.
- Fitur skor bonus yang Anda commit sebelumnya sudah di-merge ke main branch. Perbarui main branch secara lokal dengan perintah berikut.
  ```bash
  git checkout main
  git pull origin main
  git log
  ```