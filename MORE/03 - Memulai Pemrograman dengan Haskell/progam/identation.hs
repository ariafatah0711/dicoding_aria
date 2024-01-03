main :: IO ()
main = do
    let
     x = 5
     y = 10
    
    print(x, y)

--Bisa Anda perhatikan, persamaan x = 10 dan y = 5 sebenarnya masih merupakan bagian dari ekspresi let. Hal itu ditandai karena adanya indentasi pada kedua persamaan tersebut yang lebih dalam (berupa satu spasi) dari awal penulisan kata kunci let

main2 :: IO ()
main2 = do
    let x = 10
        y = 5
    
    print(x, y)

tambah2 x = 
        x + 2

main3 :: IO ()
main3 = do putStrLn "What is 2 + 2?"
           x <- readLn
           if x == 4
               then putStrLn "You're right!"
               else putStrLn "You're wrong!"
main4 :: IO ()
main4 = do {
putStrLn "What is 2 + 2?";
x <- readLn;
if x == 4
then putStrLn "You're right!"
else putStrLn "You're wrong!"
}

main5 :: IO (); main5 = do { putStrLn "What is 2 + 2?"; x <- readLn; if x == 4; then putStrLn "You're right!"; else putStrLn "You're wrong!";}

main6 :: IO ()
main6 = do  
    putStrLn "Hello, what's your name?"  
    name <- getLine  
    putStrLn ("Hey " ++ name ++ ", welcome!")

main7 :: IO ()
main7 = do let x = 10
               y = 5
           print(x,y)