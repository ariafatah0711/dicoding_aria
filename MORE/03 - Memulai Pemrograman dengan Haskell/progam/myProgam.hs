main :: IO () --mendeklarasikan tipe data dari main
{-
    ini adalah teks comment
-}
main = putStrLn "hello world"


--contoh progam do yang benar
{-
do
  first thing
  second thing
  third thing

do first thing
   second thing
   third thing

        do
first thing
second thing
third thing
-}

--contoh progam do yang salah
{-
do first thing
second thing
third thing

do first thing
 second thing
 third thing
-}


--contoh salah
{-
if foo
   then do first thing
        second thing
        third thing
   else do something_else
-}

--contoh benar
{-
if foo
   then do first thing
           second thing
           third thing
   else do something_else
-}

--Intinya, ini bukan tentang notasi do. Ini semua tentang bagaimana menyusun semua item berada pada level yang sama di dalam blok do. 

