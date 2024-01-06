 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcetLyk52EjxQ8SD8hFCI6ydq9zDiE_SE",
  authDomain: "blogging-app-65b67.firebaseapp.com",
  projectId: "blogging-app-65b67",
  storageBucket: "blogging-app-65b67.appspot.com",
  messagingSenderId: "361721031309",
  appId: "1:361721031309:web:bb44db5c374d39db2a10c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);