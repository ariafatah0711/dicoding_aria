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

<!-- deploy -->
npm install -g firebase-tools
firebase login
? Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? Yes

firebase init
>( ) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
Use an existing project
Money Tracker App
dist
N
N

npm run build:prod
firebase deploy