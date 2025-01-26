# Pengantar DevSecOps
- Anda tiba di materi terakhir pada kelas ini. Sejauh ini, Anda sudah menyelesaikan seluruh rangkaian alur CI/CD, mulai dari plan, code, build, test, release, deploy, operate, hingga monitor. Apakah ini artinya materi kita selesai sampai di sini?
- Bisa ya, bisa juga tidak. Dari segi alur, kita sudah membahas semuanya. Namun, dari segi aspek, ada satu hal penting yang belum dicakup, yakni soal security alias keamanan.
- Sering kali, saat perusahaan membangun CI/CD pipeline, orientasi mereka hanya tertuju pada keberhasilan proses teknis dan keuntungan bisnis semata. Tidak salah sih, tetapi itu bukanlah praktik yang baik. 
- Wajar saja bila perusahaan fokus pada bisnis sebab itu adalah aspek terpenting mereka. Namun, jika fokus hanya satu titik dan melupakan hal lain, niscaya hal yang tak disangka dapat berbalik menghancurkan kita. 
- Sebagai contoh, bila kita melalaikan aspek keamanan, kelak jika infrastruktur diserang (karena punya banyak celah keamanan) sehingga menyebabkan aplikasi down, tentu bisnis pun jadi tidak berdaya dan akhirnya melumpuhkan semua hal yang telah dibangun dengan susah payah. 
- Syukur kalau bisa diperbaiki dan bisnis beroperasi kembali. Bagaimana jika tidak? Tamatlah riwayat perusahaan. Pun, kalau bisa diperbaiki, pasti pengguna akan melontarkan segala keluh kesahnya, entah via customer service, media sosial, atau channel lainnya. Jelas ini dapat melahirkan kredibilitas yang buruk bagi perusahaan.
- Sebagian perusahaan telah menyadari hal ini sehingga mereka menerapkan keamanan, meski hanya di akhir siklus pengembangan aplikasi (misal setelah deployment aplikasi, yakni dengan mengamankan sisi infrastruktur saja). Ya, ini setidaknya lebih baik ketimbang tidak sama sekali. Namun, pendekatan ini masih belum cukup.
- Ketika tim merilis pembaruan atau fitur aplikasi sekali atau dua kali dalam setahun, proses mengamankan infrastruktur dapat dikelola dengan baik. Namun, bagaimana jadinya kalau tim merilis pembaruan lebih cepat, misal setiap minggu atau bahkan setiap hari? Bila seperti ini, keamanan malah dapat menjadi faktor penghalang. Tim akan kesulitan untuk deploy aplikasi dengan cepat ke production.
- Sebab ingin deliver fitur secepat-cepatnya ke pengguna (mungkin karena ingin meraup keuntungan bisnis lebih cepat), perusahaan terkadang meninggalkan praktik keamanan yang ruwet dan pada akhirnya mengabaikan potensi kerentanan keamanan mereka. Ini membuat tim menjadi gambling, berharap semoga tidak akan terjadi apa-apa dan berdoa semoga semuanya berjalan normal. Padahal, di balik itu semua, celah keamanan menganga lebar dan hacker menghantui mereka siang malam.
- Namun, Anda tak perlu cemas lagi soal ini. Di sini, kita akan belajar cara agar mampu mengintegrasikan keamanan pada siklus pengembangan aplikasi. Salah satu praktik yang mungkin perlu Anda pertimbangkan adalah dengan menerapkan DevSecOps. Apa itu? Mari kita ulas.

---
# Pengertian DevSecOps
- DevSecOps merupakan kependekan dari development (pengembangan), security (keamanan), dan operations (operasional IT). 
- DevSecOps adalah sebuah praktik yang mengotomatiskan integrasi keamanan di setiap fase pada siklus pengembangan aplikasi, mulai dari tahapan plan (perencanaan dan perancangan), code (penulisan kode), build (pembentukan/pembangunan kode), test (pengujian), release (penghasilan artifact), deploy (penggelaran), operate (pengoperasian), hingga monitor (pemantauan).
- Dengan upaya ini, perusahaan diharapkan mampu menghadirkan pembaruan atau fitur aplikasi ke pengguna secara cepat dan aman.
- Sama seperti DevOps, DevSecOps juga merupakan metodologi yang menggabungkan alur kerja manajemen proyek dengan IT tools. DevSecOps mengintegrasikan audit dan pengujian keamanan dalam alur DevOps. Jadi, keamanan diterapkan dalam aplikasi pada saat ia dikembangkan, bukan setelah di-deploy atau sampai ke pengguna.
- Untuk mengimplementasikan DevSecOps dengan baik dan tepat, tim harus
  - menerapkan keamanan di seluruh siklus pengembangan aplikasi guna meminimalkan kerentanan keamanan pada kode; 
  - memastikan seluruh tim, termasuk Developer dan IT Operations, berbagi tanggung jawab untuk mengikuti security best practices (praktik terbaik keamanan); dan 
  - mengaktifkan pemeriksaan keamanan otomatis dengan mengintegrasikan kontrol keamanan, tools, dan proses dalam setiap tahapan pada alur CI/CD.
- Sebelum hadirnya DevSecOps, aspek keamanan hanya dipikirkan dan diuji oleh tim tersendiri, misal oleh Information Security atau QA (Quality Assurance). 
  - Ini membuat hubungan masing-masing tim di perusahaan menjadi renggang.
  -  Developer hanya perlu melempar kode ke Information Security untuk diuji dari sisi keamanannya, lalu mengopernya lagi ke IT Operations untuk kemudian di-deploy. 
  - Terus begitu hingga hubungan di antara mereka menjadi tak berkualitas.
- Nah, dengan hadirnya DevSecOps, kini setiap tim bisa saling bekerja sama, berkomunikasi, dan berunding. Hal ini untuk menciptakan mekanisme yang dapat mengotomatiskan delivery aplikasi dengan menggabungkan setiap concern dan solusi masing-masing.

---
# Manfaat Implementasi DevSecOps
- Jika berhasil menerapkan DevSecOps, niscaya banyak hal yang akan Anda rasakan manfaatnya. Percayalah, jerih payah yang dikeluarkan untuk mengimplementasikan DevSecOps akan sebanding dengan manfaatnya.

## DevSecOps menawarkan banyak manfaat baik bagi perusahaan maupun Developer, di antaranya sebagai berikut. 
- Menyertakan aspek keamanan dalam praktik DevOps dengan tangkas. 
- Membantu dalam mengembangkan aplikasi yang berkualitas tinggi tanpa masalah keamanan.
- Membantu tim Developer untuk berpikir kritis, memahami kebutuhan keamanan, dan merancang aplikasi dengan tepat sejak awal. 
- Membantu tim IT Operations dalam mengonfigurasi environment karena menghilangkan proses manual. 
- Membantu tim Information Security untuk menegakkan berbagai aspek keamanan di sepanjang alur DevOps, baik itu mengenai kontrol akses, firewall, pemindaian kerentanan keamanan, dan semacamnya.
- Kerentanan keamanan dapat diidentifikasi dengan cepat sehingga membantu menghindari adanya serangan siber.
- Tak kalah penting, DevSecOps membantu meningkatkan komunikasi dan kolaborasi antar tim.