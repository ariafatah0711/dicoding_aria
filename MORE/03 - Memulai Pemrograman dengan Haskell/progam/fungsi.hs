main = do
    print(succ 8) --n + 1
    print(min 9 10)
    print(min 3.4 3.2)
    print(max 100 101)

{-
Nama fungsi dan parameter mesti diawali huruf kecil, kemudian boleh diikuti oleh huruf lain (besar atau kecil), angka (1, 2, 3, dst), underscore (_), atau single quote (‘).
Nama fungsi dan parameter tidak boleh menggunakan keywordantara lain:
case class data default deriving do else if import in infix infixl infixr instance let module newtype of then type where

contoh salah
FungsiKuadrat x = x*x
2Kuadrat x = x*x
default x = x*x

contoh benar
fungsiKuadrat x = x*x
duaKuadrat x = x*x
fungsiKuadrat’ x = x*x
fungsiKuadrat_ x = x*x
tambah5 x = x+5
ambil_2 list = take 2 list
-}