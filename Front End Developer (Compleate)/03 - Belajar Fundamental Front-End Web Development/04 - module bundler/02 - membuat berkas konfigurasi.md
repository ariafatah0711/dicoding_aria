berkas konfigurasi => 

    - Kita dapat membuat berkas webpack configuration dengan membuat berkas JavaScript baru dengan nama webpack.config.js pada root folder proyek kita.

        const path = require('path');
        
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
            }
        };

    - secara default, meskipun webpack telah mengatur nilai standar di dalam properti entry sebagai output bundle dari berkas javascript, tetapi kita tetap menuliskannya agar terlihat jelas berkas utama mana yang akan dijadikan sebagai berkas javascript utama. Selain itu, kita juga mengubah nilai output sebagai penamaan berkas hasil bundle dari main.js (nilai standar) menjadi bundle.js. Dengan demikian, ketika kita jalankan kembali script build di terminal dengan:

        npm run build

    maka nanti di dalam folder dist akan muncul bundle.js

    - Namun, kita juga masih dapat melihat berkas main.js yang merupakan berkas lama hasil proses build sebelumnya. Kita dapat menghapusnya karena sudah tidak digunakan lagi. Namun, jangan lupa mengubah target berkas JavaScript yang dilampirkan pada index.html menjadi bundle.js.

    Pada saat proses bundle, coba kita lihat pada Terminal. Terdapat warning yang menunjukkan bahwa kita tidak menetapkan mode pada berkas webpack configuration.

    - Jika kita tidak menetapkan nilai pada properti mode maka nilai standar akan diterapkan, yakni nilai production. Namun, ketimbang kita tidak menetapkan nilai pada properti mode, sebaiknya kita tetapkan saja nilai modenya agar tidak muncul warning message (pesan peringatan) dari webpack lagi tentangnya. Silakan kita tambahkan properti mode dengan nilai production seperti berikut.

        const path = require('path');
        
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
            },
            mode: 'production'
        };

    Sebenarnya kita juga dapat melihat warning lain yang menunjukkan ukuran bundle.js sudah melampaui batas. Kita sendiri bisa lihat dengan membuka berkas bundle.js. Di sana kita akan menemukan banyak sekali kode yang dihasilkan dibandingkan dengan sebelumnya.

    Hal ini disebabkan kode yang kita tulis memiliki ketergantungan (dependencies) terhadap package JQuery dan Moment. Sehingga package tersebut perlu dibundel juga pada berkas bundle.js. karena itulah berkas bundle.js menjadi bengkak ukurannya.

    Ini merupakan salah satu alasan mengapa sebaiknya kita hindari penggunaan package pihak ketiga yang kita bawa hingga tingkat production. Membengkaknya berkas bundle.js, tentu akan berdampak terhadap performa web yang kita bangun nantinya.