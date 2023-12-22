webpack dev server =>  fitur live-reloading yang dapat mempercepat proses pengembangan menggunakan Webpack Dev Server. 
    Dengan ini kita dapat melihat perubahan secara langsung tanpa harus menjalankan ulang perintah build.

        npm install webpack-dev-server --save-dev

    tambahkan di package.json

        "scripts": {
            "build": "webpack",
            "start-dev": "webpack serve"
        }

    dan jalankan

        npm run start-dev

menyembunyikan warning

    module.exports = {
        /* ..... */
        mode: 'production',
        devServer: {
            client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            },
        },
        /* ..... */
    }

Solusi agar saat compiler menjadi cepat
    yaitu: pisahkan webpack configuration untuk development dan production.