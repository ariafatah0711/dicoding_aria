// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClRsdsWdEDLgZxGwZd96HuEahbdw67JZY",
  authDomain: "dicoding-4.firebaseapp.com",
  projectId: "dicoding-4",
  storageBucket: "dicoding-4.appspot.com",
  messagingSenderId: "130623249879",
  appId: "1:130623249879:web:b8a0bb49ddca526aaf3f92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
