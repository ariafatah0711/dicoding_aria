<!-- solusi -->
    npm init

Selanjutnya kita pasang package yang akan kita gunakan melalui NPM. Berikut daftar package yang akan digunakan:
@babel/core
@babel/preset-env
babel-loader
css-loader
html-webpack-plugin
style-loader
webpack
webpack-cli
webpack-dev-server
webpack-merge

    npm install @babel/core @babel/preset-env babel-loader css-loader html-webpack-plugin style-loader webpack webpack-cli webpack-dev-server webpack-merge --save-dev

selanjutnya kita buat tiga berkas webpack configuration, yakni webpack.common.js, webpack.dev.js, dan webpack.prod.js.

webpack.common.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path');
    
    module.exports = {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "bundle.js"
        },
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
        },
        plugins: [
            new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
            })
        ]
    }

webpack.dev.js
    const { merge } = require('webpack-merge');
    const common = require('./webpack.common');
    
    module.exports = merge(common, {
        mode: 'development'
    })

webpack.prod.js
    const { merge } = require('webpack-merge');
    const common = require('./webpack.common');
    
    module.exports = merge(common, {
        mode: 'production',
        module: {
            rules: [
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
    })

Karena pada konfigurasi kita menentukan endpoint pada lokasi src -> app.js dan HTML template pada lokasi src ->  index.html, maka pindahkan kedua berkas tersebut ke dalam folder src.

    Selanjutnya buka berkas index.html lalu hapus kode:

    <link rel="stylesheet" href="src/styles/style.css">
    Dan juga kode:

    <script src="app.js" type="module"></script>
    Karena kita sudah tidak memerlukan impor CSS dan JS melalui berkas HTML. 

    Sebagai gantinya kita perlu impor berkas CSS dan sesuaikan kembali lokasi impor dari app-bar.js dan main.js pada entry point yaitu app.js.

Karena kita sudah tidak memerlukan impor CSS dan JS melalui berkas HTML. 

    Sebagai gantinya kita perlu impor berkas CSS dan sesuaikan kembali lokasi impor dari app-bar.js dan main.js pada entry point yaitu app.js.

    import './styles/style.css';
    import './script/component/app-bar.js';
    import main from './script/view/main.js';
    
    document.addEventListener('DOMContentLoaded', main);

Terakhir kita ubah scripts yang berada pada package.json untuk menjalankan proyek Club Finder.

    "scripts": {
        "start-dev": "webpack serve --config webpack.dev.js",
        "build": "webpack --config webpack.prod.js"
    },

sekarang tinggal build dan run http

    npm run build

    npm run start-dev

jika pada kode Anda terdapat async/await dan menerapkan babel-loader pada webpack seperti instruksi yang sudah diajarkan,
    maka proyek Club Finder akan mengalami eror

        npm install regenerator-runtime

    Kemudian import package tersebut pada entry point dengan menggunakan sintaks:
    tambahkan ini di app.js
    
        import 'regenerator-runtime';