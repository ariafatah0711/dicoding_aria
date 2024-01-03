-- deklarasi dan definisi fungsi luasSegitiga
luasSegitiga :: Int -> Int -> Float
luasSegitiga x y = 0.5 * fromIntegral x * fromIntegral y


-- deklarasi dan definisi fungsi volumePrismaSegitiga
volumePrismaSegitiga :: Int -> Int -> Int -> Float
volumePrismaSegitiga x y z = luasSegitiga x y * fromIntegral z

main :: IO ()
main = print(volumePrismaSegitiga 3 4 10)