import { initializeApp } from "firebase/app"
import { getAuth , GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

let firebaseConfig = {
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


// Utilizar emulador
connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, 'localhost', 8080);
