npm => node packet manager

npm -v / npm --version => checking version
npm help => list command npm
npm <command> -h => checking help command 

npm install <package-name> => install package
    // bisa juga pake as (add, i, in, ins, inst, insta, instal, isnt, isnta, isntal, isntall)

------------------------------------------------------------------------------------------------

npm init => Membuat berkas package.json pada proyek
    [--force|-f|--yes|-y|--scope]

npm Install <package-name> => Memasang dan mendaftarkan package pada berkas package.json
    [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]

npm run <command> => Menjalankan perintah yang terdapat pada objek scripts yang terdapat di berkas package.json.
    [--silent] [-- <args>...]

npm uninstall <package-name> => Menghapus dan mengeluarkan package dari berkas package.json.
    [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]

-------------------------------------------------------------------------------------------------
object package =>
    1. 0bjek dependencies => merupakan objek yang menampung package yang kita gunakan untuk membuat aplikasi.
        Biasanya package yang didaftarkan pada dependencies merupakan sebuah framework seperti React, Angular, Vue, jQuery atau framework lainnya
        npm install <package-name> 

    2. objek devDependecies => digunakan untuk mendaftarkan package yang digunakan hanya selama pengembangan saja.
        Contohnya package yang berfungsi sebagai web server lokal seperti http-server, atau package yang berfungsi untuk membundel JavaScript seperti webpack.

        npm install <package-name> --save-dev

        Jadi jika kita ingin memasang package http-server sebagai devDependencies, kita bisa menuliskan perintah berikut:

        npm install http-server --save-dev

        "dependencies": {
            "jquery": "^3.4.1",
            "moment": "^2.24.0"
        },
        "devDependencies": {
            "http-server": "^0.12.1"
        }

-------------------------------------------------------------------------------------------------
kode ini akan jalan ketika
    kita melakukan perintah npm run test
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "http-server ." // ini untuk menjalankan local server
    },

--------------------------------------------------------------------------------------------------
pacakge pada cakupan global =>
    memasang package pada cakupan global tidak akan menambahkan apapun pada berkas package.json proyek lokal

    Pada Windows, lokasi default dari global modules adalah C -> Program Files -> nodejs -> node_modules

    npm list -g

    C:\Users\ariaf\AppData\Roaming\npm
    └── http-server@14.1.1