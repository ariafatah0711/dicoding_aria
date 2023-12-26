postman => Postman merupakan tools yang sangat cocok untuk menguji sebuah Web API karena terdapat fungsi yang relatif lengkap sebagai API caller dalam melakukan HTTP Request. Melalui Postman, kita dapat menetapkan parameter dan mengirimkan data pada body atau header request dengan mudah, tanpa memerlukan kode.

    Postman tersedia secara gratis dan dapat berjalan pada sistem operasi Windows, Linux maupun MacOS. Untuk mendapatkan aplikasi Postman, kita bisa mengunduhnya melalui

        https://www.postman.com.

    - Setelah mengunduhnya, silakan Anda pasang aplikasi postman pada komputer. Saat selesai, Anda bisa langsung membukanya.
    - Ketika pertama kali membuka aplikasi Postman, kita perlu login atau registrasi untuk membuat akun baru. Setelah berhasil login, berikut tampilan pada halaman utamanya.

    - Untuk melakukan sebuah HTTP Request, kita dapat memilih menu “create a request” yang tersedia pada halaman tersebut.
        - new
        - http

    - Kemudian, untuk mengirimkan request kita tentukan dulu endpoint (request URL) mana yang akan kita tuju pada kolom yang sudah tersedia. Kita akan mencoba melakukan request pada Web API dengan endpoint berikut: https://books-api.dicoding.dev/list.
    - Setelah mengisikan request URL-nya, coba kita tekan tombol “Send”. Lalu, respon yang akan didapatkan adalah daftar buku dalam bentuk JSON.

    - Jika penyedia data menyediakan Web API secara terbuka atau dapat diakses umum, biasanya ia akan membuat sebuah dokumentasi cara penggunaan API. Di sana kita dapat menemukan informasi endpoint mana saja yang dapat kita akses, method apa saja yang diperlukan, ataupun format atau struktur seperti apa yang perlu diterapkan untuk mengirim data. Dokumentasi tersebut sangatlah penting karena melalui itulah seorang developer jadi tahu bagaimana ia bisa memanfaatkan atau berinteraksi Web API tersebut.

    - Dokumentasi dari Web API yang kita gunakan pada contoh di atas dapat dilihat pada tautan berikut: https://books-api.dicoding.dev/