- List hanya dapat berisi elemen dengan tipe data yang sama alias homogen, entah itu angka saja ataupun karakter saja. Sementara itu, tuple dapat berisi komponen dengan kombinasi dari beberapa tipe data.
- List memungkinkan kita untuk hanya memiliki satu buah elemen atau bahkan angka yang tak terbatas. Sementara itu, tuple digunakan ketika Anda tahu persis berapa banyak nilai yang Anda inginkan.

list = []
tuple = ()

    main = do
        print((1,'a')) --(1,'a')
        print((8,11),(4,5)) --((8,11),(4,5))
        print(("Christopher", "Walken", 55)) --("Christopher","Walken",55)
        print(((2,3), [2,3])) --((2,3),[2,3])
        print([(1,2),(8,11),(4,5)]) --[(1,2),(8,11),(4,5)]

operator tuple
    fst => mengambil pair (tuple dengan dua komponen) dan mengembalikan komponen pertamanya.
    main = do
        print(fst (12,42)) --12
        print(fst ("Wow", False)) --"wow"

    snd => mengambil pair dan mengembalikan komponen keduanya.
    main = do
        print(snd (12,42))
        print(snd ("Wow", False))

    zip => fungsi yang dapat menghasilkan sebuah list berisi pair.(memasangkan list)
    main = do
        print(zip [1,2,3,4,5] [5,5,5,5,5]) --[(1,5),(2,5),(3,5),(4,5),(5,5)]
        print(zip [1 .. 5] ["one", "two", "three", "four", "five"]) --[(1,"one"),(2,"two"),(3,"three"),(4,"four"),(5,"five")]

    main = print(zip [5,3,2,6,2,7,2,5,4,6,6] ["im","a","turtle"]) --[(5,"im"),(3,"a"),(2,"turtle")]

    
    