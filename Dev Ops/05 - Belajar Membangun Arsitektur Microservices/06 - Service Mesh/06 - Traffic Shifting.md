# Latihan Implementasi Service Mesh dengan Istio: Menerapkan Traffic Shifting

Anda telah mengonfigurasi Istio agar merutekan semua traffic untuk `reviews` service ke versi `v1`. Karena versi ini tidak berkomunikasi dengan `ratings` service, aplikasi Bookinfo tidak menampilkan rating bintang sama sekali pada bagian Book Reviews.

Anggaplah pengguna aplikasi Bookinfo memberikan masukan untuk menampilkan rating bintang pada bagian Book Reviews. Melihat hal ini, Anda kemudian men-deploy `reviews:v2` service yang mampu menampilkan rating bintang.

Namun, Anda ingin mengatur traffic demi mengimplementasikan *canary deployment*. Artinya, Anda ingin agar `reviews:v2` service ini hanya diperkenalkan ke sebagian kecil pengguna terlebih dahulu untuk menguji apakah fitur tersebut berjalan dengan baik dan disukai pengguna atau tidak. Kemudian, bila semuanya berjalan mulus, Anda ingin meningkatkan persentase traffic untuk `reviews:v2` service secara bertahap seraya menghapus `reviews:v1` perlahan.

Nah, untungnya kasus seperti ini bisa ditangani oleh Istio. Ia mampu menyediakan kontrol yang diperlukan untuk mengimplementasikan *canary deployment*. Maka dari itu, latihan kali ini akan menunjukkan kepada Anda bagaimana cara *traffic shifting* (mengalihkan lalu lintas jaringan) dari satu versi untuk suatu service ke versi lainnya.

Di Istio, kita bisa menerapkan *traffic shifting* dengan mengonfigurasi *virtual service routing rules* yang dapat mengalihkan persentase traffic dari satu tujuan ke tujuan lain. Sudah tidak sabar? Yuk langsung saja kita mulai berlatih.

## Routing 90% ke reviews:v1 dan 10% ke reviews:v2

Pada latihan sebelumnya, kita sudah mengonfigurasi *virtual service* untuk merutekan semua traffic ke `reviews:v1` service. Tak beda jauh dari itu, kita juga akan mengonfigurasi *virtual service*, tetapi kali ini untuk merutekan 90% traffic ke `reviews:v1` dan 10% ke `reviews:v2`. Untuk itu, silakan jalankan perintah berikut untuk menyalin baris kode di bawah ini ke berkas manifest bernama `virtual-service-reviews-90-10.yaml`.

```yaml
cat <<EOF > virtual-service-reviews-90-10.yaml
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
      weight: 90
    - destination:
        host: reviews
        subset: v2
      weight: 10
EOF
```

Setelah itu, deploy berkas manifest tersebut:

```bash
kubectl apply -f bookinfo/virtual-service-reviews-90-10.yaml
```

Output:
```bash
virtualservice.networking.istio.io/reviews configured
```

Nice! Coba sekarang akses aplikasi Bookinfo (lihat materi *Latihan Implementasi Service Mesh dengan Istio: Memasang Istio Ingress Gateway*) dan refresh beberapa kali. Anda akan lebih sering mendapatkan `reviews:v1` (tanpa rating bintang) dan `reviews:v2` (rating bintang warna hitam) hanya tampak sesekali. Hal ini terjadi karena `reviews:v2` berkomunikasi dengan `ratings` service, sedangkan `reviews:v1` tidak.

## Routing 100% ke reviews:v2

Oke, katakanlah fitur ini berjalan mulus dan pengguna menyukainya. Anda pun memutuskan untuk merutekan semua traffic pengguna ke `reviews:v2`. Bagaimana caranya? Simpel. Silakan jalankan perintah berikut untuk menyalin baris kode di bawah ini ke berkas manifest bernama `virtual-service-reviews-v2.yaml`.

```yaml
cat <<EOF > virtual-service-reviews-v2.yaml
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
        subset: v2
EOF
```

Langsung saja deploy berkas manifest tersebut:

```bash
kubectl apply -f bookinfo/virtual-service-reviews-v2.yaml
```

Output:
```bash
virtualservice.networking.istio.io/reviews configured
```

Akses kembali aplikasi Bookinfo dan refresh beberapa kali. Kini Anda hanya akan mendapatkan `reviews:v2` (rating bintang warna hitam). Menarik, kan?

## Routing 100% ke reviews:v3

Sekarang, katakanlah Anda sudah mengembangkan versi 3 dari `reviews` service (yakni rating bintang warna merah) dan telah men-deploy-nya ke Kubernetes cluster. Berbeda dengan sebelumnya, kali ini Anda yakin dengan fitur tersebut dan ingin agar semua pengguna merasakannya sekaligus tanpa melalui proses *canary deployment*. Yakin deh, pasti Anda sudah tahu kan caranya?

Gas! Pertama, salin baris kode di bawah ini untuk menyimpannya ke berkas `virtual-service-reviews-v3.yaml`.

```yaml
cat <<EOF > virtual-service-reviews-v3.yaml
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
        subset: v3
EOF
```

Lanjut, deploy berkas manifest tersebut:

```bash
kubectl apply -f bookinfo/virtual-service-reviews-v3.yaml
```

Output:
```bash
virtualservice.networking.istio.io/reviews configured
```

Akses kembali aplikasi Bookinfo dan refresh beberapa kali. Niscaya Anda hanya akan mendapatkan `reviews:v3` (rating bintang warna merah). *Break a leg!*

---

**What an achievement!** Sampai di sini, Anda sudah mengerti konsep *service mesh*, mengetahui keunggulan dan tantangan dari *service mesh*, memahami cara kerja *service mesh*, melihat berbagai opsi *service mesh*, bahkan hingga menggunakan Istio untuk merutekan traffic.

Pastikan Anda masih semangat ya karena perjalanan kita belum berakhir. *Come on!*

