// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAYkkyMxwRQ4uUc8gPd7d-_90oHAGI794",
  authDomain: "fir-socialmedia-b5ddf.firebaseapp.com",
  projectId: "fir-socialmedia-b5ddf",
  storageBucket: "fir-socialmedia-b5ddf.appspot.com",
  messagingSenderId: "579142541550",
  appId: "1:579142541550:web:dcd47bd57cef0f3f3553ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
