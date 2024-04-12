- Continuous Integration (CI) merupakan teknik pengembangan aplikasi yang membantu developer menjalankan proses pengujian (testing) secara otomatis pada sebuah repository terpusat (central repository). Beberapa peristiwa (event) yang memicu proses otomatis tersebut seperti melakukan pembaruan kode (push) atau melakukan penggabungan kode (merging).
    - Source control version management
        - Proyek yang dikembangkan oleh tim pasti memiliki basis kode (codebase) yang sama. Dalam hal ini, kita memerlukan alat komunikasi dengan banyak fitur seperti menyelesaikan konflik yang timbul akibat perbedaan penulisan kode dari setiap developer. Alat tersebut adalah git. Selain itu, kita juga dapat menggunakan GitHub untuk bekerja dengan codebase yang sama di cloud sebagai central repository.

    - Build automation
        - Untuk masuk dalam bentuk final atau siap deploy ke production, terdapat proses “build” dari file dan aset lain yang dibuat. Hasil dari proses ini dinamakan build artifact. Proses pembentukan build artifact dilakukan secara otomatis. Contohnya, ketika developer mengunggah atau menggabungkan kode ke main branch di central repository. Tools yang dapat digunakan adalah Jenkins.

    - Automated testing
        - Pengujian merupakan hal yang sangat penting dalam pengembangan aplikasi. Salah satu tujuan utamanya adalah memastikan atau memvalidasi basis kode berjalan dengan baik dan lancar. Testing yang biasa dilakukan adalah unit testing.

- Continuous Deployment (CD) adalah teknik deployment terhadap aplikasi secara otomatis jika hasil proses automated test berstatus hijau atau passed. Dengan teknik ini, semua perubahan atau penggabungan kode yang berhasil melewati tahap testing dan/atau tahap review akan langsung di-deploy dan tersaji secara instan ke pengguna. Jika terjadi kegagalan, perubahan yang dilakukan terhadap aplikasi akan dicegah untuk di-deploy ke production.

Platform untuk CI/CD
- Travis CI
- Jenkins
- GitHub Action
- Netlify