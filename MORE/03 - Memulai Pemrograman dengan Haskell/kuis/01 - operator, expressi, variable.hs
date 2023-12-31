main = do
    let nilaiSiswa = 75
    
    if nilaiSiswa >= 80
       then putStrLn "A"
    else if nilaiSiswa >= 60 && nilaiSiswa < 80
       then putStrLn "B"
    else if nilaiSiswa >= 40 && nilaiSiswa < 60
       then putStrLn "C"
    else if nilaiSiswa >= 20 && nilaiSiswa < 40
       then putStrLn "D"
    else putStrLn "E"