// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "inmonteriahouse.firebaseapp.com",
  projectId: "inmonteriahouse",
  storageBucket: "inmonteriahouse.appspot.com",
  messagingSenderId: "16606551171",
  appId: "1:16606551171:web:b0bc8f24d3b70566690fb6",
};

export const app = initializeApp(firebaseConfig);
