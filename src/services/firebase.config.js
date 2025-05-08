// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc8QS-IzlsEW_eTruYM5xO0pG4W1ZA1KU",
  authDomain: "job-hunt-sync.firebaseapp.com",
  projectId: "job-hunt-sync",
  storageBucket: "job-hunt-sync.firebasestorage.app",
  messagingSenderId: "513857745342",
  appId: "1:513857745342:web:5132e357e9ec23e9f1c9ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);