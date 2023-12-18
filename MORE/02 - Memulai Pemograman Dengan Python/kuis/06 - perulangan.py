"""
TODO:
Buatlah sebuah variabel bertipe list bernama "evenNumber" dengan ketentuan:
- variabel tersebut menampung bilangan genap dari 0 hingga 500 (ingat 0 dan 500 termasuk).

Tips:
Anda bisa menggunakan loop dan if atau list comprehension untuk memudahkan.
"""

# TODO: Silakan buat kode Anda di bawah ini.
# n = 2
# evenNumber =[]
# while (n < 500):
  # evenNumber.append(n)
  # n += 2
    
# print(evenNumber)

evenNumber = [x for x in range(0, 501, 2)]
print(evenNumber)