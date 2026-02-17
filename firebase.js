// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
const messaging = getMessaging(app);

export { auth, firestore, messaging };
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const swRegistration = await navigator.serviceWorker.register("./firebase-messaging-sw.js");

      const token = await getToken(messaging, {
        vapidKey: "BGf717ZumEktI_rmuHzzhezh2AbYKye5CFVCDfYvaMHUz5q41QYVolCdS0m46BjocPlpaYOuEum-c-xF8IFarRI",
        serviceWorkerRegistration: swRegistration,
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
};

// Handle foreground messages
// onMessage(messaging, (payload) => {
//   console.log("Message received:", payload);
// });