npm install firebase
```
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
 
// Konfigurasi proyek Firebase Anda
const firebaseConfig = { /* ... */ };
 
// Inisialisasi proyek Firebase
const app = initializeApp(firebaseConfig);
 
// Inisialisasi Firebase Authentication
const auth = getAuth(app);
```

```
import { getAuth, deleteUser } from 'firebase/auth';
 
// Mendapatkan object reference dari autentikasi Firebase
const auth = getAuth();
// Mendapatkan user saat ini yang sedang login
const user = auth.currentUser;
 
// Memproses hapus user account dengan memasukkan object user yang sedang login
deleteUser(user)
  .then(() => { /* ... */ })
  .catch((error) => { /* ... */ });
```

```
// Inisialisasi Cloud Firestore
const firestore = getFirestore(app);
```

npm install firebase-tools --global
firebase --version
firebase init
firebase deploy