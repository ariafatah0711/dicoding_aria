# Linux Services
## Pengenalan Linux Services
Service dalam sistem operasi Linux adalah program yang berjalan di latar belakang (background) secara otomatis tanpa interaksi langsung dari pengguna. Beberapa service sudah terpasang bersama sistem operasi saat instalasi.

Karakteristik utama dari service pada server berbasis Linux:
1. Tidak memiliki antarmuka grafis dan dikelola melalui CLI.
2. Service bawaan sistem dijalankan otomatis saat booting, sedangkan service pihak ketiga dapat dikonfigurasi.
3. Berjalan di background dan menunggu sinyal untuk melakukan tugas tertentu.
4. Dikenal sebagai daemon, sering diberi akhiran "d" (contoh: sshd untuk SSH daemon).

## Proses Booting Linux hingga Service Berjalan
1. **UEFI/BIOS**:
   - UEFI menentukan konfigurasi boot yang tersimpan di NVRAM.
   - BIOS (pada sistem lama) melakukan pemeriksaan perangkat keras sebelum melanjutkan ke Boot Loader.

2. **Boot Loader**:
   - Bertugas mengelola dan menjalankan urutan boot sistem.
   - Mengambil informasi kernel dan memuatnya ke memori utama.
   - Contoh Boot Loader: GRUB 1, GRUB 2, LILO, rEFInd, systemd-boot, SYSLINUX.

3. **Kernel Linux**:
   - Berada di /boot dalam bentuk terkompresi.
   - Diekstrak dan menjalankan inisiasi sistem, filesystem, driver, serta mounting filesystem.
   
4. **Init System**:
   - Proses init bertugas menjalankan service dan daemon.
   - Memiliki Process ID (PID) = 1 dan terus berjalan hingga komputer dimatikan.
   - Mengelola orphaned process.
   
5. **Menjalankan Environment User**:
   - CLI: Menjalankan terminal, shell, dan environment terkait.
   - GUI: Menjalankan display manager, graphical server, dan desktop environment.
   
## Service Management dengan systemd
Systemd adalah init system yang umum digunakan pada mayoritas distro Linux saat ini. Systemd menggunakan unit untuk mengelola berbagai objek, antara lain:

1. **Unit Service (.service)**:
   - Mewakili service sistem seperti web server dan database.

2. **Unit Socket (.socket)**:
   - Mewakili socket komunikasi antarproses (IPC) untuk mengaktifkan service sesuai permintaan.

3. **Unit Path (.path)**:
   - Mengaktifkan service berdasarkan perubahan pada filesystem tertentu.

Untuk mengelola unit systemd, gunakan perintah `systemctl`. Contoh:
```bash
$ systemctl -t help
```
Output:
```
Available unit types:
service
mount
swap
socket
target
device
automount
timer
path
slice
scope
```

**Network Services dan Konfigurasi Netplan di Linux**

### **Apa itu Network Services?**
Network services adalah layanan yang berjalan di background pada sistem operasi Linux untuk mendukung aktivitas berbasis jaringan. Layanan ini mencakup koneksi internet, transfer file, serta komunikasi antar perangkat dalam jaringan.

### **Tools Konfigurasi Jaringan di Ubuntu**
Pada Ubuntu 18.04 LTS dan versi lebih baru, terdapat beberapa tools untuk mengelola jaringan, seperti:
- **network-manager**: Untuk mengatur koneksi jaringan secara grafis maupun CLI.
- **systemd-networkd**: Untuk mengelola jaringan berbasis systemd.
- **netplan**: Sebuah framework berbasis YAML untuk konfigurasi jaringan.
- **net-tools**: Digunakan untuk menjalankan perintah klasik seperti `ifconfig` dan `route`, tetapi tidak terpasang secara default di Ubuntu 18.04+ dan harus diinstal secara manual dengan:
  ```bash
  sudo apt install net-tools
  ```

### **Penggunaan Netplan untuk Konfigurasi Jaringan**
Ubuntu modern menggunakan **Netplan** untuk mengelola jaringan. Sebagai pengganti `ifconfig` dan `route`, kita dapat menggunakan perintah berikut:

- **Melihat IP Address**
  ```bash
  ip a
  ```
  Contoh output:
  ```
  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
      inet 127.0.0.1/8 scope host lo
      inet6 ::1/128 scope host
  2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500
      inet 192.168.1.66/24 brd 192.168.1.255 scope global dynamic eth0
      inet6 fe80::215:5dff:fe01:802/64 scope link
  ```

- **Melihat informasi pada satu interface tertentu**
  ```bash
  ip addr show eth0
  ```

- **Melihat tabel routing IPv4**
  ```bash
  ip route
  ```
  Contoh output:
  ```
  default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.66 metric 100
  192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.66
  ```
  Penjelasan:
  - Semua paket ke **192.168.1.1** dikirim melalui **eth0**.
  - Semua paket ke **192.168.1.0/24** juga dikirim melalui **eth0**.
  - Paket lainnya dikirim ke router default **192.168.1.1**.

- **Melihat tabel routing IPv6**
  ```bash
  ip -6 route
  ```

### **Penamaan Interface di Linux**
Pada sistem Linux, nama interface jaringan bisa berbeda tergantung sistem, seperti:
- **eno1**: Berdasarkan nomor indeks dari BIOS/Firmware.
- **ens1**: Berdasarkan PCI Express Hotplug.
- **enp2s0**: Berdasarkan lokasi fisik perangkat keras.
- **enx78e7d1ea46da**: Berdasarkan MAC address.
- **eth0, eth1, dll.**: Skema penamaan tradisional kernel.

### **Kesimpulan**
Netplan adalah tool utama di Ubuntu untuk konfigurasi jaringan modern. Kita bisa menggunakan perintah `ip a` untuk melihat IP, `ip route` untuk melihat routing, dan mengenali penamaan interface yang digunakan oleh sistem. Dengan memahami dasar-dasar ini, kita bisa lebih mudah mengelola jaringan di Linux.

## Encryption dan Decryption

Dalam keseharian sebagai seorang Linux System Administrator, tentunya tidak akan terlepas dari kegiatan transfer file, baik melalui jaringan maupun sarana fisik seperti flashdisk atau hard disk. Data atau file yang kita transfer pastinya ada yang bersifat sensitif sehingga butuh keamanan ekstra. Salah satu metode terbaik adalah dengan mengenkripsi file tersebut. Orang lain yang tidak tahu kunci enkripsinya tidak akan bisa membuka file tersebut.

### Tipe Enkripsi
Umumnya, ada dua tipe enkripsi:

1. **Secret key atau kunci rahasia** (dengan passphrase atau password) disebut enkripsi **simetris**.
2. **Public key atau kunci publik** disebut enkripsi **asimetris**.

Pada dasarnya, enkripsi simetris memakai kunci yang sama untuk enkripsi (encryption) dan dekripsi (decryption), sementara enkripsi asimetris menggunakan kunci yang berbeda untuk enkripsi dan dekripsi. Masing-masing metode memiliki kelebihan dan kekurangan:

- Enkripsi simetris dikenal lebih cepat.
- Enkripsi asimetris terbukti lebih aman.

Berikut adalah beberapa tools yang dapat digunakan untuk implementasi enkripsi dan dekripsi dalam Linux.

### GnuPG (GPG)
Salah satu tools yang bisa kita pakai untuk mengenkripsi file dengan metode simetris adalah **GnuPG** (GPG), singkatan dari **GNU Privacy Guard**. Tools ini dapat mengenkripsi dan mendekripsi data serta membuat tanda tangan digital berbasiskan kunci **PGP/GPG** (Pretty Good Privacy/GNU Privacy Guard).

GnuPG dalam beberapa distro Linux sudah terpasang secara default. Namun, jika belum terpasang, kita bisa memasangnya sendiri dengan package manager masing-masing distro. Jika menggunakan distribusi berbasis **Debian** atau **Ubuntu**, gunakan perintah berikut:

```bash
sudo apt install gnupg
```

### OpenSSL
**Public-key encryption** atau enkripsi kunci publik menggunakan dua set kunci yang disebut **key pair** (pasangan kunci):

1. **Public key (kunci publik):** Bisa dibagikan secara bebas dengan siapa pun yang ingin berkomunikasi secara aman.
2. **Private key (kunci privat):** Wajib dijaga kerahasiaannya dan tidak boleh dibagikan ke pihak lain.

Jika seseorang ingin bertukar informasi sensitif dengan kita, maka kita dapat mengirimkan **public key** kepada mereka. Orang tersebut akan menggunakan kunci publik untuk mengenkripsi pesan atau file sebelum mengirimkannya kepada kita. Satu-satunya cara untuk mendekripsi pesan tersebut adalah dengan menggunakan **private key** milik kita.

#### Analogi
Bayangkan **public key** sebagai **gembok**, dan **private key** sebagai **anak kunci**:
- Jika seseorang ingin mengirim paket yang hanya bisa dibuka oleh kita, mereka akan **menggunakan gembok (public key) milik kita** untuk menyegel paket.
- Setelah paket dikirim, **hanya kita yang memiliki anak kunci (private key) yang cocok** untuk membuka gembok tersebut.

### Instalasi OpenSSL
OpenSSL adalah salah satu tools yang dapat digunakan untuk enkripsi asimetris. Secara default, OpenSSL sudah terinstal pada mayoritas distro Linux. Jika belum ada, kita bisa memasangnya secara manual.

Jika menggunakan distro berbasis **Debian** (seperti Ubuntu atau Linux Mint), jalankan perintah berikut:

```bash
sudo apt install openssl
```

Jika menggunakan distro berbasis **RHEL** (seperti Fedora atau CentOS), gunakan perintah berikut:

```bash
sudo yum install openssl
```

**Package Management**

Istilah software artinya adalah semua aplikasi atau perangkat lunak yang diinstal di suatu komputer. Setiap aplikasi yang diinstal dalam sistem membutuhkan paket-paket pendukung, seperti library yang berbeda satu sama lain.

Untuk mengelola paket-paket tersebut digunakanlah package manager. Beberapa distro Linux memiliki package manager-nya sendiri-sendiri. Misalnya, Ubuntu yang merupakan keturunan Debian menggunakan dpkg, apt-get, atau apt. Sementara Fedora dan CentOS yang merupakan turunan RedHat menggunakan dnf atau yum.

---

**Pengenalan Repository**

Linux repository adalah lokasi penyimpanan tempat sistem operasi Linux mengambil dan menginstal pembaruan sistem atau aplikasi. Setiap repository adalah kumpulan perangkat lunak yang di-hosting pada remote server. Saat menjalankan perintah seperti `sudo apt update` atau `sudo apt upgrade`, sistem menarik informasi dan pembaruan paket dari repository.

Repository berisi ribuan program dan umumnya memiliki tingkat keamanan tinggi. Perangkat lunak dalam repository telah diuji secara menyeluruh untuk kompatibilitas dengan distribusi tertentu.

Pada Ubuntu, daftar repository disimpan dalam `/etc/apt/sources.list` dan `/etc/apt/sources.list.d/`. Sementara pada Fedora, disimpan di `/etc/yum.repos.d/`.

Contoh format repository pada Ubuntu:

```
deb http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu/ focal-security main restricted universe multiverse
```

Untuk menerapkan perubahan pada repository, gunakan perintah berikut:
```
sudo apt update
```

Untuk melihat daftar paket yang dapat diperbarui:
```
sudo apt list --upgradable
```

Repository yang tidak digunakan dapat dihapus atau dikomentari dengan tanda `#`.

---

**Automation**

Di dunia IT, banyak tugas manual yang dapat menguras tenaga dan membuang waktu, seperti konfigurasi server. Oleh karena itu, mekanisme otomatisasi sangat diperlukan untuk menjadwalkan tugas berulang secara otomatis.

Sebagai contoh, kita bisa menjadwalkan pencadangan harian, pengarsipan log bulanan, atau penghapusan file mingguan agar disk tidak penuh.

**Cron**

Cron adalah utilitas penjadwalan pekerjaan di sistem operasi Unix-like seperti Linux. Daemon cron (`crond`) menjalankan fungsionalitas cron di background. Cara kerjanya, cron membaca crontab (cron table) dan menjalankan script yang telah ditentukan.

Cron job dapat digunakan untuk menjadwalkan script atau perintah lain agar berjalan secara otomatis per jam, harian, bulanan, atau tahunan.