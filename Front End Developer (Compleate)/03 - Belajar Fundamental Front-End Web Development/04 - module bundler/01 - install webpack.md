- install web pack

    gunakan perintah:

        npm install webpack --save-dev
        npm install webpack-cli --save-dev

    Atau kita dapat menyingkat perintah tersebut dalam penulisan satu baris seperti ini:

        npm install webpack webpack-cli --save-dev

    Setelah berhasil memasang package webpack dan webpack-cli, maka kita dapat melihat kedua package tersebut pada devDependencies di berkas package.json.

    - Package webpack merupakan package inti dari webpack itu sendiri
    - package webpack-cli merupakan package yang digunakan untuk membantu kita menjalankan webpack melalui sebuah perintah (Command Line Interface)
    - Pada CLI kita juga dapat memberikan argumen seperti menetapkan berkas webpack config atau mode dalam proses build.

    Untuk menjalankan webpack kita perlu menambahkan script dengan perintah webpack pada package.json seperti ini:

        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "http-server .",
            "build": "webpack"
        },

        jika mau test build aja kita bisa hapus test, dab start

    Lalu, untuk menjalankan script build, kita gunakan perintah berikut:

        npm run build

    Dari pesan berikut, kita dapat menyimpulkan bahwa ketika kita tidak/belum menetapkan webpack configuration, nilai entry standar-nya akan berlokasi pada src -> index.js. 

    Karena kita sudah menggunakan webpack untuk membundel module. Kita dapat menggunakan perintah import pada src -> index.js dalam menggunakan package npm.

        import $ from "jquery";
        import moment from "moment";

        const displayTime = () => {
        moment.locale("id");
            $(".time").text(moment().format("LTS"));
            $(".date").text(moment().format("LL"));
        };

        const updateTime = () => {
            displayTime();
            setTimeout(updateTime, 1000);
        };

        updateTime();

    
