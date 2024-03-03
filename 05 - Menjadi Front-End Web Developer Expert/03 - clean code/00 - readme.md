meinstall eslint
    npm install eslint --save-dev

memasang eslint
    npx eslint --init

    lalu menjawab oertanyaan

mengaudit kode
    "lint": "eslint ./src"

variable
    Prinsip Membuat Variabel
        - Jangan membuat remeh pembuatan variabel dalam proyek. Meskipun ini merupakan bagian terkecil dari suatu program, ia akan sulit dikelola jika ada banyak sekali.

    Ada beberapa hal yang perlu kita perhatikan dalam membuat variabel.
        - Memiliki makna yang jelas terhadap nilai yang akan disimpan.
        - Mudah diingat dan diucap.
        - Mudah dicari dan jelas maknanya.
        - Memiliki makna yang eksplisit agar terhindar dari mental mapping.
        - Menghindari penamaan yang berulang jika sudah jelas maknanya.
        - Memiliki default argument pada sebuah parameter function/method.
        - Prinsip Pembuatan Function
        - Ketika membuat program, kita tentu banyak menuliskan sebuah logika. Agar mudah mengorganisasi kumpulan-kumpulan logika yang ada, biasanya logika dikelompokkan dalam sebuah fungsi.Selain variabel, function pun ada prinsip-prinsipnya juga dalam pembuatannya.

function
    Prinsip yang baik.
        - Membatasi jumlah argumen/parameter.
        - Tidak mengerjakan banyak hal alias fokus pada hal yang paling spesifik.
        - Memiliki nama yang merepresentasikan tujuan tugasnya.
        - Memanfaatkan functional programming daripada imperative programming.
        - Melakukan enkapsulasi terhadap kode kondisional.
        - Menghindari negasi kondisional.
        - Mengurangi kode percabangan dalam sebuah function.
        - prinsip yang perlu dihindari.

    prinsip yang dihindari
        - Melakukan duplikasi kode.
        - Melakukan flagging terhadap parameter.
        - Memiliki efek samping terhadap kode di luar. Biasanya, ini terjadi pada global variable.
        - Melakukan pembuatan/penambahan method terhadap object yang telah ada (built-in object).