# Deploy Aplikasi Bookinfo
```bash
kubectl apply -f ./bookinfo/bookinfo.yaml
kubectl get svc
kubectl get pod

kubectl exec "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl -sS productpage:9080/productpage
kubectl exec "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl -sS productpage:9080/productpage | grep -o "<title>.*</title>"
```

# Latihan Implementasi Service Mesh dengan Istio: Memasang Istio Ingress Gateway

### Langkah-langkah:

#### 1. Deploy Aplikasi Bookinfo
Aplikasi Bookinfo sudah berhasil di-deploy, namun belum bisa diakses dari luar cluster.

#### 2. Buat Istio Ingress Gateway
Salin konfigurasi ke dalam `bookinfo-gateway.yaml`, kemudian jalankan:
```bash
kubectl apply -f bookinfo-gateway.yaml
```
Output:
```
gateway.networking.istio.io/bookinfo-gateway created
virtualservice.networking.istio.io/bookinfo created
```

#### 3. Validasi Konfigurasi Istio
```bash
istioctl analyze
```
Output:
```
✔ No validation issues found when analyzing namespace: default.
```

#### 4. Jalankan Minikube Tunnel
Buka terminal baru:
```bash
minikube tunnel
```
Pastikan proses tetap berjalan agar tunnel tetap aktif.

#### 5. Simpan Nilai Environment Variable
Kembali ke terminal utama, jalankan:
```bash
export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')
```
Verifikasi:
```bash
echo "$INGRESS_HOST" "$INGRESS_PORT" "$SECURE_INGRESS_PORT"
```
Contoh hasil:
```
127.0.0.1 80 443
```

#### 6. Tentukan GATEWAY_URL
```bash
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo "$GATEWAY_URL"
```
Contoh hasil:
```
127.0.0.1:80
```

#### 7. Akses Aplikasi Bookinfo
```bash
echo "http://$GATEWAY_URL/productpage"
```
Buka URL hasil output di browser untuk memastikan aplikasi dapat diakses.

### Kesimpulan
Aplikasi Bookinfo berhasil diakses dari luar cluster menggunakan Istio Ingress Gateway. Tahap selanjutnya adalah mengakses dashboard untuk analisis lebih lanjut terhadap service mesh.

