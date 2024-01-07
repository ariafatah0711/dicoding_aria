"""
TODO:
 1. Buatlah perintah untuk meminta masukan pengguna yang bertipe data integer dan simpan pada variabel n.
 2. Buatlah fungsi rekursif bernama hitung_faktorial yang memiliki parameter n untuk mendapatkan hasil akhir perhitungan faktorial.
    2.1. Gunakan jenis linear, direct, dan tail recursion untuk membuat fungsi rekursif.
    2.2. Terapkan konsep decrement atau pengurangan satu demi satu setiap memanggil fungsi rekursif.
    2.3. Jika nilai n bernilai 0, hentikan proses rekursif dengan mengembalikan nilai 1.
    2.4. Selain itu, kembalikan nilai n dikali dengan fungsi rekursif dengan nilai decrement n.
    2.5. Simpan hasil fungsi pada variabel hasil_hitung_faktorial.
 3. Cetak pada akhir program dengan format "{n}! = {hasil_hitung_faktorial}".
"""

# Tulis kode Anda di bawah ini
n: int = int(input("masukan n : \n"))

def hitung_faktorial(n: int) -> int:
    if n == 0:
        return 1
    else:
        return n * hitung_faktorial(n-1)

hasil_hitung_faktorial: int = hitung_faktorial(n)
print(f"{n}! = {hasil_hitung_faktorial}.")