"""
TODO:
 1. Buatlah variabel isSick bertipe data boolean yang bernilai False untuk menyimpan status sakit.
 2. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel temperature.
 3. Ada pengecekan variabel temperature sesuai dengan kebutuhan.
    3.1. Jika temperature 38 ke atas akan mencetak teks "Anda mengalami sakit demam." dan ubahlah status isSick menjadi True.
    3.2. Jika temperature di antara 35 dan 38 akan mencetak teks "Suhu tubuh Anda normal."
    3.3. Jika temperature kurang dari atau sama dengan 35 akan mencetak teks "Anda terjangkit sakit hipotermia." dan ubahlah status isSick menjadi True.
 4. Ada pemberian saran apabila sedang mengalami sakit.
    4.1. Gunakan variabel isSick untuk memeriksa sedang sakit atau tidak.
    4.2. Jika mengalami sakit, program akan mencetak teks "Anda disarankan istirahat atau kunjungi dokter secepatnya."
"""

# Tulis kode Anda di bawah ini
isSick: bool = False
temperature: float = float(input("masukan suhu: "))
  
if temperature >= 38 :
  print("Anda mengalami sakit demam.")
  isSick = True
elif 35 < temperature < 38 :
  print("Suhu tubuh Anda normal.")
else :
  print("Anda terjangkit sakit hipotermia.")
  isSick = True

if isSick :
  print("Anda disarankan istirahat atau kunjungi dokter secepatnya.")