Project name: Submission Front-End Web Developer

## Project Summary
- Kode yang tidak pernah digunakan baik itu Class, method, ataupun variable jika tidak digunakan sebaiknya dihapus. Kamu bisa memanfaatkan **Analyze - Code Cleanup** untuk melakukannya dengan cepat.
- Selalu perhatikan resources yang tidak pernah digunakan di dalam project karena akan mempengaruhi size APK nantinya. Kamu bisa memanfaatkan fitur **Remove Unused Resource** untuk menghapus resources yang tidak pernah digunakan.
- ....
- ....
- ....

## Error Notes
Pada project yang diperiksa terjadi sebuah error saat …. dan Saya mengatasinya dengan cara…..

## Code Review

```jsx
ext.kotlin_version = '1.3.72'
```

> Selalu gunakan versi terbaru dari Kotlin Plugin agar kode yang Anda tuliskan sesuai dengan best practice yang disarankan. Saat ini versi terbaru dari Kotlin Plugin adalah **1.4.10**. Silahkan update pada file **build.gradle** level root atau project.
>

```jsx
object DataDummy { }
```​

Kelas yang tidak pernah digunakan sebaiknya langsung dihapus.