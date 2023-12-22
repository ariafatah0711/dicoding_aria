konfigurasi webpack env => 
    development webpack => akan menerapkan konfigurasi yang selalu optimal untuk mempercepat proses perubahan pada browser (hot reloading).
    proses production => kita ingin fokus terhadap optimasi bundling dan kompatibilitasnya pada browser.

    webpack configuration

    production
    - entry : entry-point.js
    - output : bundle.js
    - mode : "production"
    - loader : - style loader
               - css-loader
               - babel-loader
    - plugin : HtmlWebpackPlugin

    development
    - entry : entry-point.js
    - output : bundle.js
    - mode : "development"
    - loader : - style-loader
               - css-loader
    - plugin : HtmlWebpackPlugin

Namun jika berpatokan pada bagan di atas, antara keduanya terdapat konfigurasi umum (common) seperti entry, output, style-loader, css-loader dan HtmlWebpackPlugin. Untuk menghindari penulisan berulang, kita dapat menggunakan tools yang bernama webpack-merge yang berfungsi untuk menggabungkan konfigurasi umum dengan konfigurasi unik tiap environment-nya.

    menggabungkan 3 mode webpack configuration

    Untuk menggunakan webpack-merge langkah awal adalah dengan memasang package tersebut pada devDependencies menggunakan NPM.

        npm install webpack-merge --save-dev

    Kemudian kita buat berkas webpack konfigurasi baru dengan nama webpack.common.js.

    Kemudian kita buat 2 (dua) berkas webpack configuration baru dengan nama webpack.prod.js dan webpack.dev.js.

Di dalam berkas webpack.common.js kita sudah menetapkan nilai entry, output beberapa loader, dan plugin yang nilainya digunakan pada kedua environment. Sehingga kita tidak perlu menetapkannya lagi pada masing-masing berkas konfigurasi environment-nya.

    Perhatikan juga bahwa kita menggunakan merge() dari package webpack-merge, untuk memasukkan konfigurasi umum pada konfigurasi tiap environment-nya.

    module.exports = merge(common, ... );

Setelah menetapkan konfigurasi umum dan konfigurasi pada tiap environment, mari ubah perintah script build dan start-dev pada package.json menjadi seperti ini:

    "scripts": {
        "build": "webpack --config webpack.prod.js",
        "start-dev": "webpack serve --config webpack.dev.js"
    }

    Dengan menambahkan flag --config [config-files] pada script build dan start-dev, maka Anda dapat secara leluasa menghapus berkas webpack.config.js karena memang sudah tidak digunakan lagi. Sehingga pada proyek WebClock hanya terdapat 3 (tiga) berkas webpack configuration.

    