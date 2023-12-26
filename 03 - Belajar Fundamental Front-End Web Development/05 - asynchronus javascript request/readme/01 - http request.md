http request => client meminta sesuatu dari server
http response => server menerima sesuatu dari client, dan meresponse

web api(Application Programming Interface) => merupakan interface yang disediakan oleh penyedia data
    agar data yang ia miliki dapat dimanfaatkan dengan mudah oleh banyak aplikasi, 
    baik itu aplikasi web, mobile, desktop, ataupun lainnya.

    method web api
    - GET : Digunakan untuk mengambil informasi dari Web API.
    - POST : Digunakan untuk menambahkan data.
    - PUT : Digunakan untuk mengubah data.
    - DELETE : Digunakan untuk menghapus data.

    status response web api
    - 200 (OK) : Request berhasil dipenuhi oleh server (Web API).
    - 400 (Bad Request) : Server tidak mengerti request yang dikirimkan client.
    - 401 (Unauthorized) : Request membutuhkan authorization.
    - 403 (Forbidden) : Server mengerti request dari client namun menolak untuk memprosesnya karena request tersebut tidak boleh dilakukan.
    - 404 (Not Found) : Resource yang client minta, tidak ditemukan.
    - 500 (Server Error) : Server mengalami kendala untuk memproses request.

CORS (Cross-Origin Resource Sharing) => merupakan mekanisme yang memungkinkan server web memberikan izin kepada browser
    untuk mengizinkan permintaan dari suatu domain tertentu (asal) untuk mengakses sumber daya yang ada di domain lain

    contoh: jika kita ingin mengakses API yang bersumber dari google.com/api, maka kita sebagai client perlu menjadi google.com
            Jika kita berasal dari domain yang berbeda, contohnya bing.com, maka kita tidak dapat menggunakan AJAX pada google.com/api
            Hal ini dikenal sebagai same-origin policy

            Namun, jika memang Web API tersebut diperbolehkan untuk dikonsumsi umum berarti penyedia data harus menerapkan CORS
