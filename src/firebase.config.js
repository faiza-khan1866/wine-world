// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnwe4KKz3N-RYklZ0mbFA_i_DfVqynJ_c",
  authDomain: "royalspirit-8c2dc.firebaseapp.com",
  projectId: "royalspirit-8c2dc",
  storageBucket: "royalspirit-8c2dc.appspot.com",
  messagingSenderId: "666273697600",
  appId: "1:666273697600:web:829a8faaa10a06ef06f4a5",
  measurementId: "G-1231C8KN2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
