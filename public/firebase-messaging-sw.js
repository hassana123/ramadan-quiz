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

// ✅ Handle background messages properly
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationBody = payload.notification?.body || "You have a new message.";
  const notificationIcon = "./moon.svg";
  const url = payload.data?.link || "https://hallaly.vercel.app/"; // ✅ Ensure link is present

  const notificationOptions = {
    body: notificationBody,
    icon: notificationIcon,
    data: { url: url }, 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification click event to open the link
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked: ", event.notification);

  event.notification.close();

  const notificationData = event.notification.data;
  if (notificationData && notificationData.url) {
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === notificationData.url && "focus" in client) {
              return client.focus();
            }
          }
          return clients.openWindow(notificationData.url);
        })
    );
  }
});
