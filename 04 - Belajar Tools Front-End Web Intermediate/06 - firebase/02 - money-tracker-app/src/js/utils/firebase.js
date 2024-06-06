// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKqnhe-SEmnh9ZQosrgf-MpRH7-f2CRtA',
  authDomain: 'money-tracker-app-59f88.firebaseapp.com',
  projectId: 'money-tracker-app-59f88',
  storageBucket: 'money-tracker-app-59f88.appspot.com',
  messagingSenderId: '484297306976',
  appId: '1:484297306976:web:5f6c58da0e0249635d2405',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };
