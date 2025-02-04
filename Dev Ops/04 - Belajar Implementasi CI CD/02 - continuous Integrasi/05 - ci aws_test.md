# continuous integration aws
## testing manual
- Integration test: Jenis pengujian ini menguji beberapa modul yang saling berkaitan. 
  - Misal pada Trivia App, apakah permainan berhasil berjalan? Apakah aplikasi dapat menampilkan jumlah pemain dengan benar? Apakah pertanyaan dikirim ke setiap pemain? Apakah skor dihitung dengan tepat? Semua rangkaian aspek-aspek tersebut diuji dalam satu kesatuan.
- Unit test: Jenis pengujian ini menguji fungsionalitas secara terpisah (satu unit, bukan menjadi satu kesatuan). Misal pada Trivia App, apakah skor dihitung dengan tepat?

### Memahami Skenario Pengujian
- Pada AWS Management Console Home, masuklah ke AWS CloudShell melalui ikon di pojok kanan atas.
- Buka berkas test_handler.py seperti berikut
  ```bash
  nano ~/a428-cicd-labs/back-end-python/tests/unit/test_handler.py
  ```
- Lanjut ke bawah hingga Anda menemukan test_trivia_calculate_scores_correct
- Oke, cukup bedah kode di berkas tersebut. Tekan kombinasi CTRL+X untuk kembali ke shell prompt. 
- Sekarang mari kita buka berkas a428-cicd-labs -> back-end-python -> gameactions -> app.py. 
  ```bash
  nano ~/a428-cicd-labs/back-end-python/gameactions/app.py
  ```
- Gunakan tombol ↓ (downwards arrow) pada keyboard Anda untuk menelusuri kode. Silakan temukan fungsi trivia_calculate_scores.
- Oke, kita sudah selesai berurusan dengan berkas app.py. Tekan kombinasi CTRL+X untuk kembali ke shell prompt.

### Menjalankan Unit Test
- Pada AWS CloudShell terminal, pastikan Anda berada di direktori a428-cicd-labs.
  ```bash
  cd ~/a428-cicd-labs/
  ```
- Instal backend code requirement dan unit test requirement menggunakan pip3, lalu jalankan local_build.sh script.
  ```bash
  pip3 install -U -r back-end-python/gameactions/requirements.txt
  pip3 install -U -r back-end-python/tests/requirements.txt
  ./local_build.sh
  ```
- Setelah semua proses berjalan sukses, Anda akan melihat rating kode pada bagian static analysis (dilakukan oleh pylint).
- Anda juga dapat melihat pytest telah menjalankan unit test.

### Menjalankan Integration Test
- Pada AWS CloudShell terminal, jalankan integration test (yang mana akan menyimulasikan sebuah permainan) dengan menjalankan perintah berikut.
  ```bash
  AWS_SAM_STACK_NAME=trivia-app pytest -s back-end-python/tests/integration/test_api_gateway.py
  ```
- Proses integration test pun akan berlangsung. Integration test menggunakan AWS SAM stack untuk menemukan Websocket endpoint sehingga nama dari stack yang akan diuji harus diteruskan melalui AWS_SAM_STACK_NAME environment variable.
- Tunggu hingga proses pengujian benar-benar selesai.
- Di akhir test, Anda akan melihat pesan bahwa integration test telah sukses.

### Memperbarui Kode
- Pada AWS CloudShell terminal, buka berkas a428-cicd-labs -> back-end-python -> gameactions -> app.py.
  ```bash
  nano ~/a428-cicd-labs/back-end-python/gameactions/app.py
  ```
- Temukan fungsi trivia_calculate_scores. Perbarui kode agar Trivia App menambahkan score senilai 20 alih-alih 10. Perhatikan baris score += 10 dan ubah menjadi score += 20. 
  ```bash
  score += 20
  ```
- Pastikan Anda menyimpan berkas tersebut dengan menekan CTRL+X, tekan Y, kemudian Enter. 
- Karena telah terjadi perubahan, pastikan kode tetap dalam keadaan stabil dengan menjalankan perintah berikut di AWS Cloud9 terminal.
  ```bash
  ./local_build.sh
  ```
- Eh, kenapa gagal? Tenang, jangan panik. Kegagalan pasti akan datang. Coba perhatikan pada bagian atas dari failure report, Anda akan melihat bahwa pengujian untuk bagian test_trivia_calculate_scores_correct gagal.
- Untuk itu, Anda perlu memperbarui juga unit test untuk menyamakan nilai score yang baru. Buka berkas a428-cicd-labs -> back-end-python -> tests -> unit -> test_handler.py.
  ```bash
  nano ~/a428-cicd-labs/back-end-python/tests/unit/test_handler.py
  ```
- Temukan fungsi bernama test_trivia_calculate_scores_correct.
- Pada bagian app.TABLE.update_item.assert_called_with, temukan AttributeUpdates, lalu perbarui Value dari 10 ke 20.
  ```bash
  AttributeUpdates={'score': {'Value': 20, 'Action': 'PUT'}}
  ```
- Anda juga perlu memperbarui app.MANAGEMENT.post_to_connection.assert_has_calls (untuk menguji API Gateway Websocket). Ubah nilai score dari 10 menjadi 20.
  ```bash
  mock.call(Data='{"action": "playerlist", "players": [{"connectionId": "connection-1", "playerName": "AliceBlue", "score": 20, "currentPlayer": true}]}', ConnectionId='connection-1'),
  ```
- Simpan berkas tersebut dengan CTRL+X -> Y -> Enter dan jalankan kembali perintah berikut di AWS CloudShell terminal.
  ```bash
  ./local_build.sh
  ```
- Seharusnya sekarang hasil pengujian menunjukkan bahwa semuanya lolos.

### Commit ke GitHub repository
- Pastikan Anda masih berada di direktori yang tepat.
  ```bash
  cd ~/a428-cicd-labs/
  ```
- Jalankan kode berikut di AWS CloudShell terminal Anda
  ```bash
  git add .
  git commit -m "update trivia app"
  git push origin main
  ```
- Apabila Anda mengalami kendala dalam push kode ke GitHub, lakukan kembali langkah yang sama seperti di bagian Menaruh Source Code di GitHub.

## testing otomatis
### Membuat Buildspec File
- Pada AWS Management Console Home, masuklah ke AWS CloudShell.
- Buka berkas a428-cicd-labs -> local_build.sh
  ```bash
  cd ~/a428-cicd-labs/
  nano local_build.sh
  ```
- Buildspec yang kita buat nantinya akan mirip seperti berkas local_build.sh ini. Bedanya, kita akan menjalankannya di AWS CodeBuild. Silakan perhatikan isi berkas local_build.sh baik-baik.
  ```bash
  #!/bin/bash
  pylint back-end-python/gameactions/app.py
  pytest back-end-python/tests/unit --cov-report=html --cov=gameactions --cov-branch
  ```
- Oke, sekarang mari buat buildspec file. Tekan CTRL+X untuk kembali ke shell prompt. Bikin folder baru bernama buildspecs dan buat berkas baru dengan nama unittests.yaml.
  ```bash
  mkdir buildspecs
  nano buildspecs/unittests.yaml
  ```
- Salin kode di bawah ini dan tempel ke berkas tersebut

```bash
version: 0.2
 
phases:
  install:
    commands:
      - pip3 install -U -r back-end-python/gameactions/requirements.txt
      - pip3 install -U -r back-end-python/tests/requirements.txt
 
  build:
    commands:
      - pylint --fail-under=8 back-end-python/gameactions/app.py
      - pytest back-end-python/tests/unit --junit-xml=unittests.xml --cov-report=xml --cov=gameactions --cov-branch
 
reports:
  UnitTests:
    files:
      - 'unittests.xml'
  NewCoverage: #
    files:
      - 'coverage.xml'
    file-format: COBERTURAXML
```

- Jangan lupa simpan berkas unittests.yaml dengan menekan CTRL+X -> Y -> Enter.
- Tambahkan berkas tersebut ke GitHub repository.
  ```bash
  git add .
  git commit -m "adding a unittests buildspec"
  git push origin main
  ```
- Bila perlu, silakan cek GitHub repository untuk trivia-app Anda apakah sudah tersinkron dengan baik.

### Menjalankan Unit Test dengan AWS CodeBuild
- Akses halaman AWS CodeBuild build projects di browser tab baru.
- Klik tombol Create project dan sesuaikan pengaturan build project dengan konfigurasi berikut.
  - Project name: trivia-unittests
  - Source provider: GitHub
  - Repository: Public repository
  - Repository URL: https://github.com/<username_github>/trivia-app
  - Source version: main
  - Operating system: Ubuntu
  - Runtime(s): Standard
  - Image: aws/codebuild/standard:7.0
  - Build specifications: Use a buildspec file
  - Buildspec name - optional: buildspecs/unittests.yaml
- Setelah itu, klik tombol Create build project.
- Tunggu hingga build project usai dibuat. Lanjut, jalankan proses build dengan klik tombol Start build.
- Untuk melihat log output dari proses build secara lebih detail, klik Tail logs.
- Ketika proses build menunjukkan Succeeded, tutup log window dengan klik Close (di bagian kanan bawah).
- Buka tab bernama Reports.
- Anda bisa melihat Pass rate dengan membuka laporan bertipe Test atau Line coverage dan Branch coverage dengan membuka laporan bertipe Code Coverage.