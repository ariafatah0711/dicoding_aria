Latihan Implementasi Service Mesh dengan Istio: Menerapkan Request Routing

Sekarang, kita akan menggunakan fungsionalitas utama dari Istio, yakni merutekan traffic. Latihan ini akan menunjukkan cara merutekan request secara dinamis ke beberapa versi services untuk aplikasi Bookinfo.

## Virtual Service dan Destination Rule

Virtual service dan destination rule merupakan komponen utama dari fungsionalitas Istio traffic routing. Virtual service memungkinkan Anda untuk mengonfigurasi pengalihan request ke services dalam Istio service mesh.

Setiap virtual service terdiri dari seperangkat routing rules (aturan perutean) yang dievaluasi secara berurutan yang memudahkan Istio untuk mencocokkan setiap request yang diberikan ke virtual service ke service tertentu di dalam service mesh.

Anda bisa menggunakan beberapa virtual service atau tidak sama sekali di dalam service mesh tergantung kebutuhan.

Anda dapat menganggap virtual service sebagai cara untuk merutekan traffic ke tujuan tertentu, lalu Anda menggunakan destination rule untuk mengonfigurasi apa yang terjadi pada traffic untuk tujuan tersebut. Destination rule akan diterapkan setelah virtual service routing rules dievaluasi.

Pada praktiknya, destination rule digunakan untuk menentukan subsets, yakni sejumlah services yang dikelompokkan menurut versi. Kemudian, Anda dapat menggunakan service subsets ini di virtual service routing rules guna mengontrol traffic ke berbagai services untuk aplikasi Anda.

Destination rule juga memungkinkan Anda untuk menyesuaikan Envoy traffic policies saat mengarahkan traffic ke tujuan, seperti model load balancing, mode keamanan TLS, atau pengaturan circuit breaker.

Oke, cukup intronya. Sekarang mari kita fokus kembali ke aplikasi Bookinfo.

## Bedah Aplikasi Bookinfo

Seperti yang Anda ketahui, aplikasi Bookinfo terdiri dari 4 services: `details`, `ratings`, `reviews`, dan `productpage`; di mana `reviews` service memiliki tiga versi berbeda dan ketiganya telah di-deploy dan berjalan secara bersamaan.

Cobalah akses aplikasi Bookinfo di browser dan refresh beberapa kali, Anda akan mendapatkan tampilan Book Reviews yang berbeda. Terkadang tampil tanpa bintang, di lain waktu muncul rating bintang berwarna hitam, dan sesekali rating bintang warna merah.

Mengapa bisa begitu? Karena `reviews` service memiliki tiga versi berbeda, berikut penjelasannya:

- **Versi v1** tidak berkomunikasi dengan `ratings` service.
- **Versi v2** berkomunikasi dengan `ratings` service dan menampilkan rating 1-5 dalam bentuk bintang berwarna hitam.
- **Versi v3** berkomunikasi dengan `ratings` service dan menampilkan rating 1-5 dalam bentuk bintang berwarna merah.

Selain itu, hal ini juga disebabkan karena kita men-deploy ketiga versi tersebut bersamaan dan belum menentukan default service version untuk dirutekan. Oleh karena itu, Istio akan mengirimkan request ke semua versi yang tersedia dalam mode _round robin_, sehingga semua versi tampil secara acak.

Dalam kasus nyata, tentu Anda tak mau seperti ini. Anda pasti menginginkan aplikasi hanya menampilkan versi tertentu secara konsisten untuk menyeragamkan pengalaman pengguna.

Masalah ini bisa kita atasi dengan Istio melalui fungsionalitas request routing.

## Deploy Destination Rule

Buat berkas `destination-rule-all.yaml` dan isi dengan konfigurasi berikut:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: productpage
spec:
  host: productpage
  subsets:
  - name: v1
    labels:
      version: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
  - name: v3
    labels:
      version: v3
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: ratings
spec:
  host: ratings
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
  - name: v2-mysql
    labels:
      version: v2-mysql
  - name: v2-mysql-vm
    labels:
      version: v2-mysql-vm
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: details
spec:
  host: details
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

Lalu jalankan:

```bash
kubectl apply -f bookinfo/destination-rule-all.yaml
```

Output:
```
destinationrule.networking.istio.io/productpage created
destinationrule.networking.istio.io/reviews created
destinationrule.networking.istio.io/ratings created
destinationrule.networking.istio.io/details created
```

Verifikasi dengan:

```bash
kubectl get destinationrules
```

## Konfigurasi Virtual Service

Sekarang kita akan merutekan semua traffic hanya ke versi v1. Buat berkas `virtual-service-all-v1.yaml` dan isi dengan konfigurasi berikut:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: productpage
spec:
  hosts:
  - productpage
  http:
  - route:
    - destination:
        host: productpage
        subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - route:
    - destination:
        host: ratings
        subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
spec:
  hosts:
  - details
  http:
  - route:
    - destination:
        host: details
        subset: v1
```

Deploy konfigurasi tersebut:

```bash
kubectl apply -f bookinfo/virtual-service-all-v1.yaml
```

Output:
```
virtualservice.networking.istio.io/productpage created
virtualservice.networking.istio.io/reviews created
virtualservice.networking.istio.io/ratings created
virtualservice.networking.istio.io/details created
```

Nice! Anda sukses mengonfigurasi Istio untuk merutekan semua traffic hanya ke versi 1 pada aplikasi Bookinfo, terutama `reviews` v1 service. Coba akses kembali aplikasi Bookinfo di browser, dan perhatikan bahwa sekarang hanya versi 1 yang tampil, tanpa rating bintang dari `ratings` service.

