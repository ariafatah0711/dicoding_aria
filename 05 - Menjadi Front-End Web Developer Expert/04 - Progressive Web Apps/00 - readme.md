Progressive Web Apps => Artinya website yang akan kita bangun selangkah lebih maju dari website biasanya. 
    Dikarenakan website yang progressive memiliki sifat-sifat layaknya aplikasi native. Contohnya memiliki kerangka aplikasi, dapat diakses secara offline, dapat dipasang di homescreen perangkat selular dan desktop, hingga menampilkan notifikasi.

karasteristik progressive web
    - Progresif - Bekerja untuk setiap pengguna. Tak peduli apapun browsernya, tidak masalah. PWA dibangun dengan peningkatan progresif sebagai intinya.
    - Responsif - Mampu menyesuaikan dengan berbagai perangkat. Baik itu desktop, seluler, tablet, atau yang lainnya.
    - Konektivitas independen - Service Worker membantu meningkatkan proses load time ketika internet memiliki kualitas rendah, bahkan dapat diakses dalam keadaan offline.
    - Seperti Aplikasi Native - Experience yang diberikan tak kalah dengan aplikasi native, karena PWA dibangun dengan struktur Application Shell.
    - Aman - PWA mewajibkan web untuk berjalan pada HTTPS. Ini tentu membuat web aman dari berbagai ancaman.
    - Dapat ditemukan - Terdefinisi sebagai “Aplikasi” berkat Web App Manifest dan service worker. Dan dapat mudah ditemukan oleh search engine seperti Google. 
    - Re-engageable - Dengan fitur pemberitahuan seperti push notification, dapat mengajak (engaged) kembali pengguna untuk menggunakan aplikasi.
    - Dapat dipasang - Memungkinkan pengguna untuk “memasang” di layar beranda tanpa melalui application store.
    - Bisa ditautkan - Dapat dengan mudah dibagikan melalui URL.

Komponen Pembentuk PWA(s)
- Application Shell
- Web App Manifest
- Service Worker
- Cache API
- Fetch API
- IndexedDB
- Web Socket
- Notifications

struktuk web
src
├── public
├── scripts
│ ├── data
│ ├── globals
│ ├── routes
│ ├── utils
│ └── views
│   ├── pages
│   └── templates
├── styles
└── templates

static - Ketika webpack berjalan dalam mode development, konten statis yang digunakan berdasarkan konten yang ada di dalam folder ‘dist’.
open - Memberitahukan dev server untuk membuka browser setelah local server telah dimulai.
port - Menspesifikkan nomor port yang digunakan oleh server lokal
client.overlay - Menampilkan overlay di halaman browser yang berisikan pesan ketika terjadi error atau warning pada dari compiler.
compress - Mengaktifkan gzip compression sehingga berkas yang diperoleh dari server lokal lebih efisien.

- workbox => tool untuk mempermudah dalam pembuatan
    - npm install workbox-webpack-plugin -D
    - npm install workbox-routing
    - npm install workbox-strategies


- project 2
    ```
    npm install workbox-webpack-plugin --save-dev
    npm install workbox-window --save
    ```
