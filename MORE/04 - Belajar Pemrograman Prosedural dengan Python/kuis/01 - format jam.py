"""
TODO:
 1. Buatlah variabel startTime bertipe data dictionary sebagai waktu datang dengan kriteria berikut.
    - key "HH" bernilai angka 9
    - key "mm" bernilai angka 23
    - key "ss" bernilai angka 57
 2. Buatlah variabel endTime bertipe data dictionary sebagai waktu pulang dengan kriteria berikut.
    - key "HH" bernilai angka 15
    - key "mm" bernilai angka 25
    - key "ss" bernilai angka 43
"""

# Tulis kode Anda di bawah ini
startTime: dict[str, int] = {
    "HH": 9,
    "mm": 23,
    "ss": 57
}

endTime: dict[str, int] = {
    "HH": 15,
    "mm": 25,
    "ss": 43
}
  
print(startTime)
print(endTime)