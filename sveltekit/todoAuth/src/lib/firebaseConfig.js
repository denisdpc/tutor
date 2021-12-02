import { initializeApp } from "firebase/app"
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_QPdfm0Acsxv-n7F5KeAN7Jrj6mUHGoU",
  authDomain: "tutorialtestes.firebaseapp.com",
  projectId: "tutorialtestes",
  storageBucket: "tutorialtestes.appspot.com",
  messagingSenderId: "639678447354",
  appId: "1:639678447354:web:781d833cce74016997d343",
  measurementId: "G-ZVEP4CM131"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();