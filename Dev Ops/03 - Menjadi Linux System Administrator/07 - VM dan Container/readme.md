# kvm
## latihan kvm
```bash
# install
sudo apt -y install bridge-utils cpu-checker libvirt-clients libvirt-daemon qemu qemu-kvm virt-manager libosinfo-bin

# check the system
kvm-ok

sudo libvirtd &
sudo virtlogd &

sudo systemctl start libvirtd virtlogd
sudo systemctl status libvirtd virtlogd 
```

## remove kvm
```bash
sudo systemctl stop libvirtd virtlogd
sudo systemctl disable libvirtd virtlogd

sudo apt remove --purge -y bridge-utils cpu-checker libvirt-clients libvirt-daemon qemu qemu-kvm virt-manager libosinfo-bin
sudo rm -rf /etc/libvirt/ /var/lib/libvirt/ ~/.config/libvirt/ ~/.cache/libvirt/

sudo apt autoremove -y
sudo apt autoclean

lsmod | grep kvm
```

# FireCracekr
## Latihan Membuat Virtual Machine dengan Firecracker

## remove

---
# container
## Container Tools di Linux
### LXC
- Linux Container Project (LXC) adalah platform container open source yang menyediakan seperangkat tools, template, library, dan language bindings. LXC memiliki command line interface (CLI) sederhana yang dapat meningkatkan pengalaman pengguna saat mulai menggunakan container.

### Containerd
- Containerd adalah high-level container runtime alias container manager. Sederhananya, Containerd merupakan sebuah daemon yang mengelola siklus hidup container lengkap pada sebuah host, seperti membuat, memulai, dan menghentikan container; mengunduh (pull) dan menyimpan image; serta mengonfigurasi terkait mount dan network antara container dengan host.
- Containerd dirancang agar mudah disematkan ke dalam sistem yang lebih besar. Docker sejatinya menggunakan Containerd pada basisnya untuk menjalankan container. Bahkan, Kubernetes (container orchestrator) juga dapat menggunakan Containerd melalui CRI (Container Runtime Interface) untuk mengelola container pada satu node.

### Docker
- Setelah beberapa kali disebutkan pada pembahasan LXC dan Containerd, kini kita akan bahas Docker secara mendetail. 
- Docker merupakan perangkat lunak open source yang dapat menyederhanakan proses dalam membangun, menjalankan, mengelola, dan mendistribusikan aplikasi dengan cara membungkusnya melalui container.