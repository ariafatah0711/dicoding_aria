-- deklarasi dan definisi fungsi f
f :: Int -> Int -> Int
f x y = 3*x + 5*y + 2

-- deklarasi dan definisi fungsi g
g :: Int -> Int -> Int
g x y = x^2 + y^2

-- deklarasi dan definisi fungsi h
h :: Int -> Int -> Int
h x y = 16 - (x-3)^2 - (y-2)^2

main :: IO ()
main = print(f 5 4, g 5 3, h 5 2)