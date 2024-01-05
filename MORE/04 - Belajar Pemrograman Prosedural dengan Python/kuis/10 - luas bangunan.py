"""
TODO:
 1. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel landArea.
 2. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel width.
 3. Buatlah perintah untuk meminta masukan pengguna yang bertipe data float dan simpan pada variabel length.
 4. Buatlah fungsi bernama checkArea yang memiliki parameter landArea, width, dan length.
    4.1. Hitung luas bangunan dengan mengalikan variabel width dan length serta simpan pada variabel buildingArea.
    4.2. Periksa nilai buildingArea dan landArea dengan kriteria berikut.
         4.2.1. Apabila nilai buildingArea lebih besar dari landArea, kembalikan nilai False.
         4.2.2. Apabila nilai buildingArea kurang dari atau sama dengan landArea, kembalikan nilai True.
    4.3. Fungsi ini mengembalikan nilai boolean yang menyatakan bisa atau tidak bangunan dibangun berdasarkan ketiga nilai tersebut.
    4.4. Simpan hasil fungsi pada variabel check.
 5. Buatlah pengondisian dari variabel check dengan kriteria berikut.
    5.1. Apabila bernilai False, cetaklah teks "Rumah tidak dapat dibangun berdasarkan ketiga nilai tersebut."
    5.2. Apabila bernilai True, cetaklah teks "Rumah dapat dibangun berdasarkan ketiga nilai tersebut."
"""

# Tulis kode Anda di bawah ini
landArea: float = float(input("masukan landArea : \n"))
width: float = float(input("masukan width : \n"))
length: float = float(input("masukan length : \n"))

def checkArea(landArea: float, width: float, length: float) -> bool :
    buildingArea = width * length
    if buildingArea > landArea:
        return False
    else:
        return True
    
check: bool = checkArea(landArea, width, length)

if check:
    print("Rumah dapat dibangun berdasarkan ketiga nilai tersebut.")
else:
    print("Rumah tidak dapat dibangun berdasarkan ketiga nilai tersebut.")