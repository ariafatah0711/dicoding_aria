- install package

        npm install

    - Perintah tersebut berfungsi untuk memasang seluruh package yang terdapat di devDependencies dan dependencies pada berkas package.json. Setelah proses memasang package selesai, akan muncul folder node_modules beserta package-package yang terpasang pada root proyek (folder) Dicoding Books.

    - Sebagaimana yang telah kita pelajari pada modul sebelumnya, proyek ini menggunakan webpack dengan konfigurasi sama seperti yang sudah kita pelajari. Untuk menjalankan proyek pada local server, kita tuliskan perintah berikut pada terminal.

        npm run start-dev

    - Buka browser dan arahkan ke alamat localhost:8080. Proyek Dicoding Books akan tampil pada browser seperti berikut ini.

URL = https://books-api.dicoding.dev/

- fungsi getbook
    Endpoint (URL): /list
    method: GET

- fungsi insertBook
    - Setelah kita berhasil melengkapi kode pada fungsi getBook, giliran fungsi insertBook yang akan kita lengkapi kodenya. Fungsi ini digunakan untuk menambahkan data buku melalui Web API. Dokumentasi menyebutkan bahwa untuk menambahkan data buku, kita perlu membuat request dengan ketentuan berikut:

    endpoint : /add
    method: POST
    Header:
    Content-Type: application/json
    X-Auth-Token: 12345
    Body:  {"id" : number, "title" : string, "author" : string }

- fungsi updateBook

    - fungsi selanjutnya yang harus kita lengkapi adalah fungsi updateBook. Fungsi ini digunakan untuk mengubah data buku yang ada, baik itu mengubah title atau author dari buku melalui Web API. Dokumentasi menyebutkan bahwa untuk mengubah data buku kita perlu membuat request dengan ketentuan berikut:

    endpoint : /edit/:id
    method: PUT
    Header:
    Content-Type: application/json
    X-Auth-Token: 12345
    Body:  {"id" : number, "title" : string, "author" : string }

- fungsi deleteBook
    - Fungsi terakhir yang perlu kita lengkapi adalah removeBook. Fungsi ini digunakan untuk menghapus data buku yang ada melalui Web API. Dokumentasi menyebutkan bahwa untuk menghapus data buku kita perlu membuat request dengan ketentuan berikut:

    endpoint : /delete/:id
    method: DELETE
    Header:
    X-Auth-Token: 12345