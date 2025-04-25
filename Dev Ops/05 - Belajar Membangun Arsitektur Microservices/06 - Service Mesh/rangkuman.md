## Rangkuman Service Mesh

### Pengenalan Service Mesh
Service mesh adalah konsep penting dalam arsitektur microservices yang membantu dalam hal observability, traffic management, dan security antar services.

### Pengertian Service Mesh
Service mesh adalah lapisan infrastruktur khusus untuk:
- Observability
- Traffic management
- Security

Fitur kompleks yang didukung:
- A/B testing
- Canary deployment
- Rate limiting
- Access control
- Encryption
- Authentication

Service mesh mempermudah pengelolaan komunikasi antar services, dengan cara memanfaatkan sidecar proxy yang berfungsi mengatur traffic.

### Keunggulan Service Mesh
- Interoperabilitas meningkat
- Keandalan sistem lebih baik
- Penemuan service otomatis
- Load balancing fleksibel
- Aturan routing yang kaya
- Monitoring & analitik real-time
- Observability tinggi
- Automasi kuat
- Keamanan meningkat
- Deployment lebih aman

### Tantangan Service Mesh
- Kompleksitas bertambah
- Konsumsi resource lebih besar
- Celah keamanan potensial
- Debugging lebih lambat

### Cara Kerja Service Mesh
Service mesh mengabstraksikan logika komunikasi antar service dan menggantinya dengan jaringan proxy (sidecar proxy) yang berjalan berdampingan di tiap service.

### Arsitektur Service Mesh
Terdiri dari dua komponen utama:
- **Data Plane**: Menangani routing traffic, terdiri dari services dan sidecar proxy.
- **Control Plane**: Mengelola konfigurasi dan koordinasi sidecar proxy di seluruh services.

### Opsi Service Mesh
1. **Linkerd**
   - Open source, CNCF project
   - Fokus pada observability, reliability, security

2. **Consul Connect**
   - Dari Hashicorp
   - Mendukung mTLS, otorisasi, service discovery

3. **Istio**
   - Didukung oleh Google, IBM, Lyft
   - Gunakan Envoy dan Jaeger
   - Fitur: TLS, load balancing otomatis, routing rules kompleks, access control, trace/log otomatis

Service mesh mempermudah pengelolaan aplikasi berbasis microservices dengan cara yang lebih aman, handal, dan mudah diawasi.

