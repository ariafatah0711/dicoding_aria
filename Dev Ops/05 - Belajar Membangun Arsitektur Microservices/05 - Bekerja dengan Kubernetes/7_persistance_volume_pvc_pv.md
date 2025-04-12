Berinteraksi dengan Kubernetes Object: Volume dan Persistent Volume

Container di dalam sebuah Pod sejatinya berbagi network stack (teknologi jaringan, seperti IP address) yang sama, tetapi masing-masing memiliki filesystem sendiri. Ini mungkin berguna untuk membagikan data di antara container di dalam Pod yang sama. Namun, perlu Anda ketahui bahwa filesystem tersebut sangatlah erat dengan masa hidup container. Jadi, jika container Anda terkendala atau bahkan down sehingga harus dimulai ulang, semua data di dalamnya juga turut hilang.

Untuk itulah pada materi ini kita akan belajar tentang beberapa solusi dari Kubernetes yang bisa memungkinkan kita untuk menyimpan data, yakni dengan Volume dan Persistent Volume. Kita juga akan belajar bagaimana cara deploy stateful application (aplikasi yang menyimpan data) menggunakan Persistent Volume hingga akhirnya data yang disimpan dapat bertahan (di luar masa hidup Pod). Oke, mari kita mulai pembahasannya.

Pada dasarnya, Kubernetes menawarkan dua jenis penyimpanan data, yakni Volume dan Persistent Volume. Kedua opsi ini digunakan dengan cara mount (memasang) sebuah directory pada satu atau lebih container di Pod yang sama. Suatu Pod dapat menggunakan lebih dari satu Volume dan/atau Persistent Volume. 

Perbedaan antara Volume dan Persistent Volume adalah pada masa hidup mereka dikelola. 

Volume
Volume melekat pada sebuah Pod. Karena melekat pada Pod (bukan pada container), data akan tetap bertahan meski container restart. Umumnya, Volume digunakan untuk berbagi data di antara container dalam Pod yang sama.

Volume memiliki beberapa tipe. Meskipun Anda dapat mengonfigurasi Volume untuk menggunakan jenis penyimpanan yang durable (Volume bertahan meski Pod dihapus), tetapi sebaiknya gunakanlah Volume untuk keperluan penyimpanan data yang bersifat sementara (ephemeral) dan sebagai non-durable storage (Volume ikut terhapus saat Pod dihapus).

Volume memiliki tipe default, yakni emptyDir. Tipe ini akan membuat sebuah directory kosong pada Node yang menjalankan Pod untuk mendukung penyimpanan yang digunakan oleh Volume. Semua data yang ditulis ke directory tersebut akan tetap ada meski sebuah container di dalam Pod di-restart. Namun, bila Pod dihapus, data di dalam Volume turut terhapus. Karena data disimpan pada Node tertentu, ini membuat data yang tersimpan di dalam Volume akan hilang jika sebuah Pod diluncurkan ulang ke Node yang berbeda.

Bila Anda memiliki data berharga yang ingin dijaga, kami sarankan untuk mempertimbangkan Persistent Volume.

Persistent Volume
Persistent Volume tidak melekat pada Pod. Ia memiliki masa hidup yang tidak tergantung pada Pod dan dikelola secara terpisah oleh Kubernetes. Oleh karenanya, meski Pod dihapus, data Anda akan tetap bertahan.

Cara kerjanya pun agak sedikit berbeda dari Volume. Untuk dapat menggunakan Persistent Volume, Pod perlu melakukan claim terlebih dahulu.

Berbeda dengan Volume, Persistent Volume dapat di-mount oleh beberapa Pod pada Node yang berbeda (jika penyimpanan yang mendasarinya mendukung). Jauh lebih powerful, bukan?

Kita dapat membuat Persistent Volume melalui dua cara, secara statis (dibuatkan oleh cluster admin) dan dinamis (untuk kasus penggunaan mandiri yang jauh lebih fleksibel).

Sebagaimana yang tadi disebutkan, Pod mesti membuat request atau claim terlebih dahulu sebelum dapat menggunakan Persistent Volume. Request tersebut dapat dibuat menggunakan Persistent Volume Claim atau PVC.

Dengan PVC, kita mendefinisikan jumlah penyimpanan yang dibutuhkan Pod, jenis Persistent Volume yang digunakan, dan access mode yang dipakai. Access mode menjelaskan bagaimana mode akses dari Persistent Volume.

Ada tiga access mode yang didukung: 
- read-only many (volume dapat dipasang read-only oleh banyak node)
- read-write once (volume dapat dipasang sebagai read-write oleh satu node)
- read-write many (volume dapat dipasang sebagai read-write oleh banyak node)

Jika tidak ada Persistent Volume yang tersedia untuk memenuhi claim tersebut dan dynamic provisioning tidak diaktifkan, claim tersebut akan tetap dalam status pending (tertunda) hingga Persistent Volume siap dipakai.

Agar dapat mengakses Persistent Volume, kita hubungkan PVC ke suatu Pod dengan menggunakan Volume dengan tipe persistentVolumeClaim.

#
bash
```
kubectl apply -f stateful-ns.yaml

kubectl apply -f mysql-pv-pvc.yaml -n stateful-ns
kubectl apply -f mysql-svc-deploy.yaml -n stateful-ns

kubectl describe deployment mysql -n stateful-ns
kubectl describe pvc mysql-pv-claim -n stateful-ns
kubectl describe pv mysql-pv-volume -n stateful-ns
kubectl run -it --rm --image=mysql:5.6 --restart=Never --namespace=stateful-ns mysql-client -- mysql -h mysql -ppassword

mysql> CREATE DATABASE my_database;
mysql> USE my_database;
mysql> CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20), species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
mysql> SHOW TABLES;
mysql> DESCRIBE pet;
mysql> INSERT INTO pet VALUES ('Oyen', 'Budi', 'Kucing', 'J', '1945-08-17', NULL);
exit

kubectl get pod -n stateful-ns
kubectl delete pod mysql-79c846684f-c5r8k -n stateful-ns
kubectl get pod -n stateful-ns

kubectl run -it --rm --image=mysql:5.6 --restart=Never --namespace=stateful-ns mysql-client -- mysql -h mysql -ppassword
SHOW DATABASES;
mysql> USE my_database;
mysql> SHOW TABLES;
mysql> SELECT * FROM pet;
```