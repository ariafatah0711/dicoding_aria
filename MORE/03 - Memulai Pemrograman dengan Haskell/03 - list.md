- tipe data list bukan lah array
- tipe data list hanya bisa menggunakan 1 tipe data

Operator Konkatenasi => berfungsi untuk menggabungkan dua list yang berbeda.
    main = do
        
        print([1, 2, 3, 4] ++ [5, 6, 7, 8])
        print("Dicoding" ++ " " ++ "Indonesia")
        print(['H', 'a', 's'] ++ ['k', 'e', 'l', 'l'] )

Operator Cons => menggabungkan dua list menjadi satu
    main = do

        print('A':" SMALL CAT")
        print(1:[2,3,4,5])

Operator Indeks => berfungsi untuk mendapatkan nilai elemen dari suatu list
    namaPerusahaan = "Dicoding"
    tinggiBadanKaryawan = [165.4, 173.2, 158.9, 181.3, 168.5]

    main = do
        print(namaPerusahaan !! 6) -- 'n'
        print(tinggiBadanKaryawan !! 1) -- 173.2

Operator Komparasi => operator komparasi untuk membandingkan sesama list.
    main = do
        print([3,2,1] > [2,10,100]) -- true -- haskel hanya membandingkan angka 3 dan 2 karena mereka true
        print([3,2,1] >= [3,2,2]) -- false -- hasekl akan terus jalan sampai ke 1 dan 2
        print([2,4,2] < [3,4]) -- true
        print([3,4,2] <= [3,4]) -- false

        print([3,4,2] == [3,4,2]) -- true -- kalo ini baru memabanginkan semua nya
        print([3,2,1] == [3,2,2]) -- false

Operator Range => Ranges bisa kita gunakan untuk membuat list berisi deret aritmetika dari elemen yang dapat dihitung, 
    seperti angka (1, 2, 3, dst) dan karakter (alfabet merupakan pencacahan karakter dari A sampai Z). 

    main = do 
        print([5..30]) -- [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
        print(['a'..'z'])
        print(['K'..'Z'])

    main = do 
        print([2,4..20]) -- [2,4,6,8,10,12,14,16,18,20]
        print([3,6..20])

    main = print([20,19..1])

Operator Lainnya
    reverse => mengubah urutan pada list,
        main = print(reverse [1,2,3,4,5])

    head -> mengambil list sebagai input dan mengembalikan elemen head, yakni elemen pertama pada list tersebut.
    tail -> mengambil list sebagai input dan mengembalikan elemen tail, yakni semua elemen pada list tersebut kecuali elemen head.
    last -> mengambil list sebagai input dan mengembalikan elemen terakhir list tersebut.
    init -> mengambil list sebagai input dan mengembalikan semua elemen kecuali elemen terakhir.
    main = do
        print(head [5,4,3,2,1]) -- 5
        print(tail [5,4,3,2,1]) -- [4,3,2,1]
        print(last [5,4,3,2,1]) -- 1
        print(init [5,4,3,2,1]) -- [5,4,3,2]

    length → mengambil list sebagai input dan mengembalikan ukuran panjangnya.
    null → memeriksa apakah suatu list kosong. Jika kosong, ia akan mengembalikan True. Jika tidak, ia akan mengembalikan False.
    take → mengambil dua nilai sebagai input (yakni angka dan list), kemudian mengekstrak sejumlah elemen dari awal list berdasarkan angka yang Anda tentukan. Bila kita memberikan angka di atas jumlah list, Haskell akan mengembalikan list apa adanya. Bila kita memberikan angka 0, Haskell akan memberikan list kosong.
    drop → mengambil dua nilai sebagai input (yakni angka dan list), kemudian mengeliminasi sejumlah elemen dari awal list berdasarkan angka yang Anda tentukan. 
    maximum → mengambil list sebagai input dan mengembalikan elemen terbesar dari list tersebut.
    minimum → mengambil list sebagai input dan mengembalikan elemen terkecil dari list tersebut.
    sum → mengambil list yang berisi angka sebagai input dan mengembalikan jumlahnya (hasil penjumlahan) dari list tersebut.
    product → mengambil list yang berisi angka sebagai input dan mengembalikan product (hasil kali) dari list tersebut.
    elem → mengambil nilai apa pun yang diberikan dan sebuah list sebagai input, lalu memberi tahu apakah nilai tersebut merupakan elemen dari list. Operator atau fungsi ini bisa ditulis di awal atau di tengah operasi (infix function diapit tanda backtick `...`).

    main = do
        -- length
        print(length [5,4,3,2,1])
        -- null
        print(null [1,2,3])
        print(null [])
        -- take
        print(take 3 [5,4,3,2,1])
        print(take 1 [3,9,3])
        print(take 5 [1,2])
        print(take 5 [1,2])
        -- drop
        print(drop 3 [8,4,2,1,5,6])
        print(drop 0 [1,2,3,4])
        print(drop 100 [1,2,3,4])
        -- maximum
        print(maximum [1,9,2,3,4])
        --minimum
        print(minimum [8,4,2,1,5,6])
        -- sum
        print(sum [5,2,1,6,3,2,5,7])
        -- product
        print(product [6,2,1,2])
        print(product [1,2,5,6,7,9,2,0])
        -- elem
        print(elem 4 [3,4,5,6])
        print(10 `elem` [3,4,5,6])`

List dalam List
    [ ] artinya sebuah list kosong.
    [ [ ] ] artinya sebuah list yang berisi satu list kosong.
    [ [ ], [ ], [ ] ] artinya list yang berisi tiga list kosong.

    x = [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]] 

    main = do
        print(x) -- [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
        print(x ++ [[1,1,1,1]]) -- [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3],[1,1,1,1]]
        print([6,6,6]:x) -- [[6,6,6],[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]
        print(x !! 2) -- [1,2,2,3,4]