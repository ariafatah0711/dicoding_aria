- int (angka)
    x :: Int
    x = 5

- Integer (angka lebih besar)
    x :: Integer
    x = 50239103910391039203492

- float (32 bit / 7 digit)
    x, y, pi :: float

    x = 10
    y = 1.5
    pi = 3.141592653589793238462643383279502884197

    input> putStrLn pi
    output> 1415927

- double
    pi :: Double

    pi = 3.141592653589793238462643383279502884197

    input> putStrLn pi
    output> 3.141592653589793

- char (merepresentasikan sebuah karakter. Semua yang berada dalam single quote atau tanda kutip tunggal (‘...’) 
    akan dianggap sebagai sebuah Char)

    skor, karakter, simbol, ascii :: Char

    skor = 'A'
    karakter = 'q'
    simbol = '!'
    ascii = '\67'

    main = print(skor, karakter, simbol, ascii)

    output> ('A','q','!','C')

- string
    x :: String

    x = "string text"
    
    bisa juga string untuk list seperti ini
    namaString = "Haskell"
    namaListofChar = ['H','a','s','k','e','l','l']

    main = print(namaString == namaListofChar)

- bool
    x, y :: Bool

    x = True
    y = False

    main = print(x == y)

    output> false