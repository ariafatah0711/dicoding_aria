JSON(JavaScript Object Notation eruJSON) => merupakan format yang sering digunakan dalam pertukaran data.
    Saat ini, JSON banyak diandalkan karena formatnya berbasis teks dan relatif mudah dibaca.

    Pada JSON, kita dapat menetapkan value dengan berbagai tipe data, di antaranya:

    String
    Number
    Object
    Array
    Boolean
    Null

    JSON.parse() => digunakan untuk mengubah JSON dari string menjadi JavaScript Object

        const jsonString = `{
            "error": false,
            "message": "success",
            "books": [
                {
                "id": 1,
                "title": "Laskar Pelangi",
                "author": "Andrea Hirata"
                },
                {
                "id": 2,
                "title": "Filosofi Kopi",
                "author": "Dewi Lestari"
                },
                {
                "id": 3,
                "title": "Clean Code",
                "author": "Robert C Martin"
                }
            ]
        }`;
        
        const data = JSON.parse(jsonString);
        
        data.books.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} (${book.author})`);
        });
        
        /* Output:
        Daftar Buku:
        1. Laskar Pelangi (Andrea Hirata)
        2. Filosofi Kopi (Dewi Lestari)
        3. Clean Code (Robert C Martin)
        */

    Lalu, method JSON.stringify() memiliki fungsi sebaliknya, yaitu mengubah JSON dari JavaScript Object menjadi string.

        const data = {
            error: false,
            message: 'success',
            books: [
                {
                'id': 1,
                'title': 'Laskar Pelangi',
                'author': 'Andrea Hirata'
                },
                {
                'id': 2,
                'title': 'Filosofi Kopi',
                'author': 'Dewi Lestari'
                },
                {
                'id': 3,
                'title': 'Clean Code',
                'author': 'Robert C Martin'
                }
            ]
        };
        
        const jsonString = JSON.stringify(data);
        console.log(jsonString);
        
        /* Output:
        {"error":false,"message":"success","books":[{"id":1,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":2,"title":"Filosofi Kopi","author":"Dewi Lestari"},{"id":3,"title":"Clean Code","author":"Robert C Martin"}]}
        */