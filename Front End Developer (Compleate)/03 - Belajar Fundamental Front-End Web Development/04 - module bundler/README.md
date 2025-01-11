module bundler / web pack => memudahkan developer dalam developer menggunakan module

web pack => merupakan salah satu module bundler untuk aplikasi JavaScript modern
    Ketika webpack dijalankan pada proyek, webpack akan mengobservasi module apa saja yang kita digunakan dan membuat modul-modul tersebut dibungkus menjadi satu berkas (atau lebih) di belakang layar

    Webpack akan menggabungkan seluruh module yang digunakan baik itu modul yang kita tuliskan sendiri atau module yang kita dapatkan melalui NPM menjadi static assets yang siap digunakan pada tahap produksi

core concepts => 
    webpack membaca setiap entry point dan menganalisa setiap modul digunakan dengan (it's depencies)
    webpack membundle entry point dan setiap module yang digunakan menjadi satu berkas static (output) yang siap digunakan pada tahap produksi

    - Entry : Titik awal di mana webpack akan menganalisa berkas dan membentuk dependency graph.
    - Output : Berkas bundel yang dihasilkan dari berkas-berkas yang dianalisis webpack berdasarkan entry point.
    - Loaders :  Transformation tools pada webpack, yang akan memproses setiap berkas selain JavaScript atau JSON yang kita impor menjadi format yang dapat digunakan ke tahap produksi.
    - Plugin :  Digunakan untuk melakukan tugas seperti optimasi bundel, management aset dan sebagainya.
    - Mode : Kondisi yang digunakan webpack sebagai acuan optimasi apa saja yang harus diterapkan dalam melakukan tugasnya. Dalam mode kita dapat menetapkan nilai production, development atau pun none.

1. Entry atau entry point => merupakan modul pertama yang akan dianalisa oleh webpack ketika ia dijalankan
    Melalui entry point inilah webpack akan membentuk dependency graph. Webpack akan mencari tahu modul lain yang digunakan pada entry point dan menggabungkannya menjadi satu static assets.

    Pada standarnya, nilai entry point akan ditempatkan pada ./src/index.js. Namun kita dapat menetapkan lokasi yang berbeda dengan mengatur properti entry pada berkas webpack configuration (webpack.config.js). Contohnya:

        module.exports = {
            entry: './path/to/my/entry/file.js'
        };

        atau

        module.exports = {
            entry: {
                app: './src/app.js',
                adminApp: './src/adminApp.js'
            }
        };

2. output => berfungsi untuk memberitahu webpack di mana dan bagaimana lokasi static assets yang telah dibundel harus disimpan dan diberi nama
    Standarnya lokasi penyimpanannya berada pada dist -> main.js.

        ```
        const path = require('path');

        module.exports = {
            entry: './path/to/my/entry/file.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'my-first-webpack.bundle.js'
            }
        };
    ```

    Jika kita menetapkan lebih dari satu entry point, kita perlu menggunakan substitution untuk memastikan berkas yang dihasilkan webpack memiliki nama unik.

        ```
        module.exports = {
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist'
        }
        };
        
        // webpack akan menghasilkan: ./dist/app.js, ./dist/search.js
        ```

3. loaders =>  Webpack dapat memproses berkas berformat lain seperti css, sass, pug, jsx, atau yang lainnya.
    sebuah transformation tools pada Webpack yang akan memproses setiap berkas selain JavaScript atau JSON yang kita impor menjadi format yang dapat digunakan ke tahap produksi. 

    untuk menggunakanya
        module.rules pada webpack configuration (webpack.config.js). Di dalamnya terdapat dua high level properties yaitu test, dan use. Berikut penjelasan singkatnya:

        - Properti test merupakan tipe berkas yang akan ditransformasikan.
        - Properti use merupakan loader mana yang akan digunakan untuk mentransformasikan berkas terkait.

        module.exports = {
            module: {
                rules: [
                    { test: /\.css$/, use: 'css-loader' }
                ]
            }
        };

    Konfigurasi di atas memiliki properti module.rules dan menetapkan properti test dan use di dalamnya

    Konfigurasi seperti ini layaknya kita memberitahu “Hey webpack compiler! Ketika Anda bertemu dengan berkas .css yang dihubungkan menggunakan import atau require statement, gunakanlah css-loader untuk mengubahnya sebelum membungkusnya ke dalam bundle.”

        npm install css-loader --save-dev

        module.exports = {
            module: {
                rules: [
                {
                    test: /\.css$/,
                    use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                    ]
                }
                ]
            }
        }

    Dengan menuliskan loader secara eksplisit seperti ini, kita juga dapat dengan mudah menambahkan konfigurasi pada loader yang digunakan melalui properti options. Contohnya:
    
        module.exports = {
            module: {
                rules: [
                {
                    test: /\.css$/,
                    use: [
                    {
                        loader: "style-loader",
                        options: {
                        // memasukkan style dengan tag <style> di bawah dari element <body> 
                        insert: "body"
                        }
                    },
                    {
                        loader: "css-loader"
                    }
                    ]
                }
                ]
            }
        }

4. plugin => digunakan untuk melakukan tugas seperti optimasi bundel, management aset, dan sebagainya
    Dengan adanya plugin ini, webpack menjadi lebih fleksibel
    Plugin merupakan tulang punggung dari webpack

    - Webpack Plugin merupakan sebuah JavaScript objek yang dibangun menggunakan JavaScript class yang di dalamnya terdapat method apply dengan satu argument bernama compiler

        const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

        class ConsoleLogOnBuildWebpackPlugin {
            constructor(options) {
                this.options = options;
            }
            
            apply(compiler) {
                compiler.hooks.run.tap(pluginName, compilation => {
                    console.log(this.options.message);
                    });
                }
        }
        
        module.exports = ConsoleLogOnBuildWebpackPlugin;

    - Untuk saat ini jangan terfokus pada cara membuat plugin di webpack. Alih-alih, fokuslah pada bagaimana ia digunakan pada webpack configuration

        const ConsoleLogOnBuildWebpackPlugin = require('./console-log-on-build-webpack-plugin.js');

        module.exports = {
            plugins: [
                new ConsoleLogOnBuildWebpackPlugin({
                message: 'The webpack build process is starting!'
                })
            ]
        }

    - kita dapat mengaksesnya melalui objek webpack seperti ini

        const webpack = require('webpack'); // dibutuhkan untuk mengakses built-in plugins

        module.exports = {
            plugins: [
                new webpack.ProgressPlugin()
            ]
        }

    plugin yang banyak digunakan untuk membuat berkas HTML pada webpack adalah html-webpack-plugin

        npm install html-webpack-plugin --save-dev

    Setelah memasangnya kita dapat menggunakannya pada webpack configuration seperti ini:

        const HtmlWebpackPlugin = require('html-webpack-plugin'); //dipasang via npm

        module.exports = {
            plugins: [
                new HtmlWebpackPlugin({
                    template: './src/index.html',
                    filename: 'index.html'
                })
            ]
        };

5. mode => memberikan mode dengan nilai development, production, atau none, kita dapat melakukan optimasi pada webpack berdasarkan mode yang kita kehendaki

    Jika kita tidak menetapkan nilai pada properti mode, secara default akan bernilai production

        module.exports = {
            mode: 'production'
        };

    Nilai mode juga dapat kita tetapkan melalui CLI argument seperti berikut:

        webpack --mode development

    Misalkan, jika kita menggunakan mode development, kita dapat menggunakan properti devtool, cache, atau properti development lainnya pada webpack configuration.

        module.exports = {
            mode: 'development',
            devtool: 'eval',
            cache: 'true'
        }

    Jika kita ingin mengubah perilaku webpack berdasarkan nilai mode di dalam webpack.config.js, ubahlah module.exports dari obyek ke fungsi.

        const config = {
            entry: './app.js'
            //...
        };
        
        module.exports = (env, argv) => {
            if (argv.mode === 'development') {
                config.devtool = 'source-map';
            }
            
            if (argv.mode === 'production') {
                //...
            }
            
            return config;
        };

    Selain itu, kita dapat menggunakan flag --config pada scripts berkas package.json untuk menetapkan berkas webpack configuration yang berbeda pada tiap modenya.

        "scripts": {
            "build:prod": "webpack --config webpack.prod.js",
            "build:dev": "webpack --config webpack.dev.js"
        }
