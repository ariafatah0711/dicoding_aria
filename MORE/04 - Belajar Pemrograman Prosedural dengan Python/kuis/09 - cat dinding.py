"""
TODO:
 1. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel panjangRuang.
 2. Buatlah perintah untuk meminta masukan pengguna yang berdtipe data float dan simpan pada variabel lebarRuang.
 3. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel tinggiRuang.
 4. Buatlah fungsi bernama hitungCat yang memiliki parameter panjangRuang, lebarRuang, dan tinggiRuang.
    4.1. Hitung keliling ruangan dengan rumus keliling persegi panjang dan simpan pada variabel kelilingRuang.
    4.2. Hitung jumlah liter cat yang akan dipakai dengan rumus di atas.
    4.3. Fungsi ini mengembalikan nilai float yang menyatakan jumlah liter cat berdasarkan ketiga nilai tersebut.
    4.4. Simpan hasil fungsi pada variabel jumlahLiter.
 5. Cetak nilai jumlahLiter pada teks "Jumlah cat yang Anda perlukan adalah {jumlahLiter} liter."
"""

# Tulis kode Anda di bawah ini
panjangRuang: float = float(input("masukan panjang ruang : \n"))
lebarRuang: float = float(input("masukan lebar ruang : \n"))
tinggiRuang: float = float(input("masukan tingi ruang : \n"))

def hitungCat(panjangRuang: float, lebarRuang: float, tinggiRuang: float) -> float:
    kelilingRuang = 2 * (panjangRuang + lebarRuang)
    jumlahLiter = kelilingRuang * tinggiRuang / 12
    return jumlahLiter

jumlahLiter: float = hitungCat(panjangRuang, lebarRuang, tinggiRuang)
print(f"Jumlah cat yang Anda perlukan adalah {jumlahLiter} liter.")