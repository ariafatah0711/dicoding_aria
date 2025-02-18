# Pemeliharaan Sistem
## iostat
```bash
sudo apt install sysstat

iostat

cat /proc/stat # memuat statistik sistem.
cat /proc/uptime # memuat uptime (waktu aktif) sistem.
cat /proc/diskstats # memuat statistik disk.
/sys # memuat statistik perangkat block (disk).
cat /proc/self/mounststats # memuat statistik untuk network filesystem.
cat /dev/disk # memuat nama-nama perangkat disk yang persisten.

iostat -c
iostat -dx
iostat -dx /dev/sda
iostat -dx /dev/sda -m
iostat -c 10 3
```

## ss
```bash
ss
ss -s # status
ss -l # listen
ss -t # tcp
ss -ua # udp
ss -lu # udp listen
ss -ltp # process PID
ss -4 # socket ipv4
ss -6 # socker ipv6
ss -at '( dport = :22 or sport = :22 )'
```

## bmon
```bash
sudo apt install bmon

bmon
bmon -p eth0
bmon
- d
- l
- shift ?
```

/var/log/syslog: menyimpan informasi umum tentang keseluruhan aktivitas pada sistem.
/var/log/auth.log: menyimpan informasi tentang aksi keamanan (login, logout, aktivitas user root, dll).
/var/log/kern.log: menyimpan informasi tentang event (kejadian) yang berasal dari Linux kernel.
/var/log/boot.log: menyimpan informasi atau pesan startup pada sistem.
/var/log/dmesg: menyimpan informasi terkait device driver.
/var/log/faillog: menyimpan informasi terkait kegagalan login. Log ini akan sangat bermanfaat ketika dalam kasus menyelidiki upaya pelanggaran keamanan.

```bash
who -H # utmp
last # /var/log/wtmp
lastb # /var/log/btmp
# /var/log/utmp: melacak pengguna yang saat ini masuk ke sistem.
# /var/log/wtmp: melacak pengguna yang sebelumnya pernah masuk. Ini berisi data lama dari utmp.
# /var/log/btmp: melacak upaya kegagalan login ke sistem.

timedatectl
journalctl
timedatectl list-timezones
sudo timedatectl set-timezone Asia/Jakarta
sudo timedatectl set-ntp true

sudo journalctl -b # only log sejak boot
sudo journalctl --list-boots # Menampilkan Entri Log dari Boot Sebelumnya
journalctl -b -2
journalctl -b boot_id

sudo journalctl --since "2022-08-28 08:12:00" # waktu tertentu
sudo journalctl --since "yesterday"
sudo journalctl --since 02:00 --until "1 hour ago"

# unit service
journalctl -u ssh.service
journalctl -u ssh.service --since "yesterday"

sudo journalctl -f # interaktif
sudo journalctl --no-pager # jika ingin seperti cat

sudo journalctl -b -u ssh -o json
sudo journalctl -b -u ssh -o json-pretty

top
# shift + o
# COMMAND=nginx

htop
# fn2 setup
# fn3 search
# fn4 filter
# fn5 

ps -o pid,%mem,%cpu,cmd -C nginx --forest
```