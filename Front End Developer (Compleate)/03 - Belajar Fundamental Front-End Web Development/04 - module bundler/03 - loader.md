loader => 
    - Pada penjelasan core concepts kita sudah tahu bahwa dengan loader, webpack dapat memproses berkas selain JavaScript. Dengan adanya loader kita dapat menggunakan CSS sebagai modul dan ikut terbundel bersama berkas bundle.js. Sehingga kita tidak perlu lagi menerapkan tag <link> pada index.html.

    - Untuk menggunakan CSS modul pada webpack, kita membutuhkan dua buah loader. Yang pertama css-loader dan yang kedua style-loader. css-loader merupakan loader untuk memproses berkas dengan format .css. Sedangkan style-loader merupakan loader yang digunakan untuk membuat styling dapat diterapkan secara modular dengan menggunakan import statement. 

    Untuk menggunakan kedua loader tersebut, langkah pertama adalah memasangnya melalui npm dengan perintah: 

        npm install style-loader css-loader --save-dev

    Setelah berhasil, pada berkas webpack.config.js kita tambahkan properti module.rules dan isikan nilai loader seperti ini:

        const path = require('path');
        
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
            },
            mode: 'production',
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        }
                        ]
                    }
                ]
            }
        }

    - Setelah menambahkan loader pada webpack.config.js, sekarang kita dapat melakukan impor berkas CSS menggunakan import statement layaknya berkas JavaScript.

    Namun sebelum itu, pindahkan terlebih dahulu berkas style.css agar lebih rapi ke dalam direktori baru dengan lokasi src -> style -> style.css. Sehingga struktur proyek akan tampak seperti ini:

        import "./style/style.css";
        import $ from "jquery";
        import moment from "moment";

    Setelah itu, silakan jalankan kembali script build untuk menghasilkan berkas bundle.js yang baru dan buka index.html pada browser. Seharusnya proyek WebClock menampilkan hasil yang sama seperti sebelumnya.

Babel Loader
Kita sudah berhasil menggunakan dan merasakan manfaat dari style-loader dan css-loader. Namun sebenarnya masih banyak loader lain yang tak kalah pentingnya untuk diterapkan pada webpack. Salah satunya adalah babel-loader.

    Mungkin sebagian dari kita sudah ada yang mengetahui apa itu babel atau babel.js? Babel merupakan sebuah transpiler yang bertugas untuk mengubah sintaks JavaScript modern (ES6+) menjadi sintaks yang dapat didukung penuh oleh seluruh browser.

    Dengan babel Anda dapat menuliskan sintaks JavaScript versi terbaru tanpa khawatir memikirkan dukungan pada browser. Karena babel akan mengubah sintaks yang kita tuliskan menjadi kode yang dapat diterima browser.

    - Untuk menggunakan babel pada webpack sebagai loader, kita perlu memasang tiga package menggunakan npm pada devDependencies. Yang pertama package @babel/core, yang kedua babel-loader, dan yang ketiga @babel/preset-env.

    Untuk menggunakan babel pada webpack sebagai loader, kita perlu memasang tiga package menggunakan npm pada devDependencies. Yang pertama package @babel/core, yang kedua babel-loader, dan yang ketiga @babel/preset-env.

        npm install @babel/core babel-loader @babel/preset-env --save-dev

    Package @babel/core merupakan package inti yang harus dipasang ketika kita hendak menggunakan babel, baik pada webpack maupun tools yang lain.

    Package babel-loader merupakan package yang diperlukan untuk menggunakan babel sebagai loader pada webpack.

        Yang terakhir package @babel/preset-env merupakan package preset yang akan kita gunakan untuk membantu babel-loader dalam melakukan tugasnya. @babel/preset-env merupakan preset cerdas yang memungkinkan kita menggunakan sintaks JavaScript terbaru tanpa menetapkan secara spesifik sintaks JavaScript versi apa yang kita gunakan.

    Setelah berhasil memasang ketiga package tersebut, langkah selanjutnya kita dapat gunakan babel-loader dan preset-nya pada webpack configuration.

        const path = require('path');
    
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js'
            },
            mode: 'production',
            module: {
                rules: [
                /* style and css loader */
                {
                    test: /\.css$/,
                    use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                    ]
                },
                
                /* babel loader */
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                    {
                        loader: 'babel-loader',
                        options: {
                        presets: ['@babel/preset-env']
                        }
                    }
                    ]
                }
                ]
            }
        }

    Ketika menerapkan rule untuk berkas .js, jangan lupa untuk menetapkan properti exclude dengan nilai “/node_modules/”. Apa artinya? Dengan menetapkan properti exclude artinya kita mengecualikan webpack untuk memproses seluruh berkas .js yang berada di folder “node_modules”. Hal ini dapat meminimalisir proses yang tidak diperlukan sehingga mempercepat proses build pada proyek kita.

    Lalu pada penerapan babel-loader juga kita menggunakan properti options dengan menetapkan properti presets di dalamnya. Pada properti presets kita tetapkan preset (dalam bentuk array literas) yang sudah kita pasang menggunakan npm, yaitu @babel/preset-env.

    Setelah menggunakan babel loader pada webpack configuration, mari kita coba build dan buka kembali berkas bundle.js. Maka kode yang kita tuliskan dalam ES6 akan diubah dalam sintaks yang dapat diterima oleh seluruh browser.

    