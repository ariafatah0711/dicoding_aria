"""
TODO:
 1. Buatlah variabel chocolateBarPrice bertipe data integer yang bernilai 3500.
 2. Tambahkan perintah untuk meminta masukan pengguna yang bertipe data integer dan simpan pada variabel chocolateBarCount.
 3. Gunakan ekspresi yang tepat untuk menghitung total harga snack dan simpan pada variabel chocolateBarTotalPrice bertipe data integer.
 4. Tampilkan hasil perhitungan pada console dengan teks "Harga yang harus dibayar adalah {chocolateBarTotalPrice} rupiah."
"""

# Tulis kode Anda di bawah ini
chocolateBarPrice: int = 3500
chocolateBarCount: int = int(input("masukan cokelat yang dibeli : \n"))
chocolateBarTotalPrice: int = chocolateBarPrice * chocolateBarCount
  
print(f"Harga yang harus dibayar adalah {chocolateBarTotalPrice} rupiah.")