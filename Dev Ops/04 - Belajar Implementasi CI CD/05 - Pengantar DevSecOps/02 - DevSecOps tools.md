# DevSecOps Tools
- Seperti yang sudah dijelaskan sebelumnya, dengan DevSecOps, keamanan harus diterapkan pada setiap fase dalam alur CI/CD, mulai dari plan, code, build, test, release, deploy, operate, hingga monitor.

## Kali ini, kita ulas DevSecOps tools yang dibagi ke dalam setiap tahapan mengikuti alur DevOps.
### plan
- Fase ini didominasi dengan proses manual ketimbang otomatis. Fase plan melibatkan kolaborasi, diskusi, peninjauan, dan strategi terhadap analisis keamanan. Tim wajib melakukan analisis keamanan dan membuat rencana untuk menguraikan lokasi, cara, dan waktu pengujian keamanan.
- DevSecOps tools yang digunakan pada fase plan ini biasanya adalah IriusRisk, yakni tools desain yang kolaboratif untuk threat modelling (pemodelan ancaman). Tools lain yang bisa digunakan adalah issue tracking (pelacakan masalah) dan manajemen proyek seperti Jira Software serta tools komunikasi semisal Slack.

### Code
- DevSecOps tools pada tahapan code sangat berguna untuk membantu Developer dalam menulis kode yang lebih aman. Praktik keamanan yang diterapkan pada fase ini mencakup:
  - static code analysis (memeriksa source code sebelum program dijalankan dengan menganalisis satu set kode terhadap satu atau beberapa set aturan kode),
  - code review (peninjauan kode), dan
  - pre-commit hooks (mekanisme git untuk mengeksekusi kode tepat sebelum proses commit).
- Contoh tools keamanan untuk tahapan code termasuk Gerrit (Code Review),, SpotBugs (Static Code Analysis - Java), PMD (Static Code Analysis), CheckStyle, dan Find Security Bugs. Saat tools tersebut diintegrasikan dalam proses pengembangan aplikasi, setiap commit dan merge yang dilakukan secara otomatis akan memicu pengujian atau peninjauan keamanan.

### Build
- Tahapan build dimulai setelah Developer melakukan commit ke repository. DevSecOps tools untuk tahapan ini berfokus pada analisis keamanan otomatis terhadap build output artifact (hasil/keluaran dari proses build).
- Praktik keamanan yang dilakukan pada fase ini termasuk:
  - software component analysis (proses mengidentifikasi potensi risiko keamanan dari penggunaan component, library, dan dependencies yang open source), 
  - static application software testing atau SAST (serangkaian tools untuk memindai source code dalam kondisi statis alias tidak berjalan untuk mengidentifikasi kode yang lemah, tidak aman, atau berpotensi menyebabkan masalah pada keamanan, dan 
  - unit test (jenis pengujian ketika sebuah unit atau komponen terkecil dari perangkat lunak diuji untuk memvalidasi bahwa fungsinya sudah sesuai harapan).
- Kita tahu bahwa Developer acapkali menginstal code dependencies dari third-party yang mungkin berasal dari sumber tidak dikenal atau tidak tepercaya sehingga bisa saja mengandung hal-hal berbahaya. Maka dari itu, selama tahapan build, sangat penting untuk melakukan praktik keamanan di atas untuk mengetahui segala potensi kerentanan keamanan pada kode.
- Tools populer yang bisa digunakan pada tahapan build meliputi OWASP Dependency-Check, SonarQube, SourceClear, Retire.js, Checkmarx, CodeQL, dan Snyk. Tools tersebut bisa diintegrasikan ke CI/CD pipeline untuk mengotomatiskan proses pengujian.

### Test
- Tahapan test berjalan setelah build artifact berhasil dibuat dan sukses di-deploy ke testing atau staging environment. Pada tahapan ini, pengujian perlu dijalankan sekomprehensif mungkin agar Developer mendapatkan hasil yang optimal.
- Tahapan ini memerlukan praktik keamanan dynamic application security testing (DAST) untuk mendeteksi kerentanan keamanan pada aplikasi yang sedang berjalan seperti pengujian terkait autentikasi dan otorisasi pengguna, SQL injection, dan API endpoint.
- Ada banyak tools pengujian yang tersedia, baik open source maupun berbayar, dengan menawarkan berbagai fungsi dan dukungan untuk bahasa pemrograman tertentu, termasuk BDD Automated Security Tests, JBrofuzz, Boofuzz, OWASP ZAP, Arachni, StackHawk, OWASP PurpleTeam, sec-helpers, dan GAUNTLT.

### Release
- Pada tahapan release, kode aplikasi, artifact, atau executable file seharusnya sudah diuji secara menyeluruh sehingga siap untuk di-deploy ke production environment.
- Bila Anda menggunakan Infrastructure as Code tools semacam Terraform atau AWS CloudFormation untuk membuat environment, tahapan ini berfokus pada pengamanan kode infrastruktur dengan memeriksa nilai-nilai konfigurasi seperti kontrol akses pengguna, akses firewall jaringan, dan manajemen data pribadi.
- Jika Anda menggunakan container, diperlukan juga mekanisme untuk melakukan pengujian pada container image yang dipakai untuk mengidentifikasi kerentanan keamanan. Dengan begitu, Anda senantiasa memiliki container image yang tepercaya, aman, dan comply (patuh/sesuai) dengan konfigurasi yang ditetapkan.
- Contoh tools yang dapat digunakan pada tahapan release antara lain Terratest, Terraform-Compliance, TaskCat, Kitchen CI, Snyk Infrastructure as Code, dan Trivy.

### Deploy
- Jika tahapan sebelumnya berhasil, kini saatnya untuk deploy build artifact atau kode ke production environment. 
  - Aspek keamanan yang perlu diperhatikan selama tahapan deploy adalah kondisi saat aplikasi berada di production environment saja, yakni memeriksa setiap perbedaan konfigurasi antara production environment dan development atau staging environment secara menyeluruh, memvalidasi serta meninjau TLS certificate, dan lainnya.
- Tools yang cocok digunakan pada tahapan ini di antaranya adalah Osquery, Falco, dan Tripwire untuk verifikasi runtime. Mereka akan mengekstrak informasi dari sistem yang sedang berjalan guna menentukan apakah aplikasi dan infrastruktur berjalan sesuai harapan.
- Anda juga dapat menjalankan chaos engineering principle dengan bereksperimen pada sistem untuk membangun kepercayaan pada kemampuannya bertahan dalam kondisi turbulen. Misalnya, dengan simulasi server crash (server bermasalah), hard drive failures (kegagalan pada hard drive), atau severed network connections (koneksi jaringan yang terputus). 
  - Anda bisa menerapkan pengujian ini menggunakan Chaos Monkey tools yang dibuat oleh Netflix.

### Operate
- Setelah aplikasi di-deploy, kita perlu memastikan bahwa pengoperasian infrastruktur haruslah dilaksanakan secara aman. Hal ini bisa dilakukan melalui configuration management tools karena dapat memberikan visibilitas kepada konfigurasi statis dari infrastruktur yang dinamis.
- Dengan configuration management, konfigurasi sistem dapat diaudit dan ditinjau untuk pemeriksaan keamanan. Selain itu, praktik ini juga membuat konfigurasi menjadi tidak dapat diubah dan hanya dapat diperbarui melalui commit ke configuration management repository. Anda bisa menggunakan Ansible, Puppet, dan Chef untuk hal ini.
- Selain menggunakan configuration management tools, Anda juga harus memastikan bahwa semua orang termasuk admin memiliki akses kontrol yang minimal (sesuai kebutuhan saja) terhadap production server.

### Monitor
- Setelah aplikasi di-deploy dan keadaannya stabil di production environment, langkah-langkah keamanan tambahan mungkin saja diperlukan. Anda perlu memonitor serta mengamati aplikasi dan infrastruktur dari berbagai kemungkinan serangan atau kebocoran data dengan pemeriksaan keamanan otomatis dan continuous monitoring (pemantauan secara berkelanjutan).
- Anda mungkin memerlukan runtime application self-protection (RASP) yang otomatis dapat mengidentifikasi dan memblokir masuknya ancaman keamanan secara real time. RASP bertindak sebagai reverse proxy (proxy yang berada di sisi server) yang mengamati serangan masuk dan memungkinkan aplikasi untuk mengonfigurasi ulang secara otomatis tanpa campur tangan manusia.
- Di sisi lain, Anda juga dapat melakukan penetration testing, yakni simulasi serangan siber terhadap sistem Anda untuk menemukan kerentanan keamanan yang membahayakan. Teknik keamanan lainnya adalah menawarkan program bug bounty, yaitu dengan memberikan hadiah (bayaran) kepada individu eksternal yang berhasil menemukan dan melaporkan kerentanan keamanan pada sistem Anda.
- Anda juga harus menerapkan security monitoring menggunakan data analitik untuk memantau metrik penting terkait keamanan. Misalnya, dengan menandai setiap request yang bersifat sensitif seperti akses login pengguna atau database endpoint.
- Contoh tools yang bisa Anda pakai antara lain Imperva RASP, Alert Logic, dan Halo.