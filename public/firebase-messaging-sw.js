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

// ✅ Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationBody = payload.notification?.body || "You have a new message.";
  const notificationIcon = "./moon.svg";
  const url = payload.data?.link || "https://hallaly.vercel.app/"; // ✅ Default to PWA link

  const notificationOptions = {
    body: notificationBody,
    icon: notificationIcon,
    data: { url: url }, 
    actions: [{ action: "open", title: "Open App" }],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification click event correctly
self.addEventListener("notificationclick", async (event) => {
  console.log("Notification clicked: ", event.notification);

  event.notification.close(); // ✅ Close the notification

  const url = event.notification.data?.url || "https://hallaly.vercel.app/"; // ✅ Ensure URL is available

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus(); // ✅ If PWA is open, focus it
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url); // ✅ Open PWA or Chrome if not already open
      }
    })
  );
});
