importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCtWxdhhsdmydPldu2g0D3WBuTX4M9UMLE",
  authDomain: "ramadan-quiz-2f92c.firebaseapp.com",
  projectId: "ramadan-quiz-2f92c",
  storageBucket: "ramadan-quiz-2f92c.appspot.com",
  messagingSenderId: "627205917771",
  appId: "1:627205917771:web:5ebf72868fd081cc47d1ce",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/moon.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
