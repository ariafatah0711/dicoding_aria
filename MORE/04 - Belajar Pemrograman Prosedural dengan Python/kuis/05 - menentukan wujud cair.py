"""
TODO:
 1. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel temperature.
 2. Ada pengecekan variabel temperature sesuai dengan kebutuhan.
    2.1. Jika temperature lebih dari 100 akan mencetak teks "Air berubah menjadi gas."
    2.2. Jika temperature di antara 0 dan 100 akan mencetak teks "Air tetap berupa cairan."
    2.3. Jika temperature kurang dari 0 akan mencetak teks "Air berubah menjadi padat."
"""

# Tulis kode Anda di bawah ini
temperature: float = float(input('masukan jumlah '))
  
if temperature > 100 :
  print("Air berubah menjadi gas.")
elif 0 <= temperature <= 100 :
  print("Air tetap berupa cairan.")
else :
  print("Air berubah menjadi padat.")