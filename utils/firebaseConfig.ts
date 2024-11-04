// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNW9H7Kr8nEpAHk-PwFmmC0wruWvy5y0k",
  authDomain: "wordle-clone-7e663.firebaseapp.com",
  projectId: "wordle-clone-7e663",
  storageBucket: "wordle-clone-7e663.firebasestorage.app",
  messagingSenderId: "368864090438",
  appId: "1:368864090438:web:40db729643ed0917626d47",
  measurementId: "G-GJ2Z886LRD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FIRESTORE_DB = getFirestore(app);
