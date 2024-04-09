// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtWxdhhsdmydPldu2g0D3WBuTX4M9UMLE",
  authDomain: "ramadan-quiz-2f92c.firebaseapp.com",
  projectId: "ramadan-quiz-2f92c",
  storageBucket: "ramadan-quiz-2f92c.appspot.com",
  messagingSenderId: "627205917771",
  appId: "1:627205917771:web:5ebf72868fd081cc47d1ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
