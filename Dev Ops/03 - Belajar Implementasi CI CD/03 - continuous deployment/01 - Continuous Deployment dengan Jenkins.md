# Continuous Deployment dengan Jenkins
- Opsi pertama yang harus Anda ketahui adalah bisa melakukan deployment ke local environment alias komputer pribadi.
  - Dengan cara ini, Anda bisa membuktikan bahwa aplikasi benar-benar sudah berjalan sesuai rencana. 
  - Namun, itu berarti aplikasi hanya akan tersedia dan bisa diakses oleh Anda seorang. Ini mungkin tak masalah jika Anda bekerja seorang diri untuk proyek pribadi.
  - Akan tetapi, jika Anda bekerja pada sebuah perusahaan atau tim, aplikasi perlu di-deploy ke environment lain, 
  - yakni staging environment untuk proses testing dan production environment untuk deliver ke pengguna di seluruh dunia.

## Heroku
- Heroku adalah platform cloud yang memungkinkan Developer untuk build, deliver, dan monitor aplikasi dengan cepat
- Heroku dikenal sebagai Platform-as-a-Service (PaaS) sebab Developer hanya perlu fokus pada aplikasi tanpa perlu pusing memikirkan soal server atau infrastruktur. 
  - Kita hanya perlu deploy aplikasi, selanjutnya biarkan Heroku mengurusi perihal infrastruktur dan konfigurasi yang diperlukan untuk menjalankan kode.