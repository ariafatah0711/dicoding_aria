"""
TODO:
 1. Buatlah variabel a bertipe data integer yang bernilai 4 untuk menyimpan nilai suku pertama.
 2. Buatlah variabel r bertipe data integer yang bernilai 3 untuk menyimpan nilai rasio antar suku.
 3. Buatlah perintah untuk meminta masukan pengguna yang bertipe data integer dan simpan pada variabel n sebagai nilai suku yang ingin diketahui.
 4. Lakukan perulangan mulai dari 1 hingga n+1 dengan
    4.1. state i;
    4.2. menghitung suku ke-n berdasarkan state i dan simpan pada variabel Un; dan
    4.3. mencetak setiap variabel Un menggunakan perintah print dan parameter end.
 5. Lakukan pemberhentian mencetak teks dengan perintah print tanpa isi.
"""

# Tulis kode Anda di bawah ini
a: int = 4
r: int = 3

n: int = int(input("masukan nilai suku(n) :"))

for i in range(1, n+1):
    Un = a * (r ** (i-1))
    print(Un, end=' ')

print()