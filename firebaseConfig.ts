// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pinterest-clone-410209.firebaseapp.com",
  projectId: "pinterest-clone-410209",
  storageBucket: "pinterest-clone-410209.appspot.com",
  messagingSenderId: "244638109142",
  appId: "1:244638109142:web:2844ef7b33ee95b0252877",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
