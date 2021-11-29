import { initializeApp } from "firebase/app"
import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkplLjXeuu2Vp18vcC_gvz3INvYAwJNRE",
  authDomain: "proxywallet.firebaseapp.com",
  projectId: "proxywallet",
  storageBucket: "proxywallet.appspot.com",
  messagingSenderId: "115952810434",
  appId: "1:115952810434:web:1a0830d1aa2ae44d96be5b",
  measurementId: "G-XRD880GHC3"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();