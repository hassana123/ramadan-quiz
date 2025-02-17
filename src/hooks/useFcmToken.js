import { useEffect, useRef, useState } from "react";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "../../firebase"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 

async function subscribeToTopic(token) {
    if (!localStorage.getItem("subscribedToTopic")) {
        try {
            await fetch("https://ramadan-quiz-backend.vercel.app/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            console.log("Subscribed to Ramadan updates!");
            localStorage.setItem("subscribedToTopic", "true");
        } catch (error) {
            console.error("Subscription failed:", error);
        }
    }
}

async function getNotificationPermissionAndToken() {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notifications.");
    return null;
  }

  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  console.log("Notification permission not granted.");
  return null;
}

async function fetchToken() {
  try {
    const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey: "BGf717ZumEktI_rmuHzzhezh2AbYKye5CFVCDfYvaMHUz5q41QYVolCdS0m46BjocPlpaYOuEum-c-xF8IFarRI",
      serviceWorkerRegistration: swRegistration,
    });

    if (token) {
      localStorage.setItem("FCMToken", token);
      console.log("FCM Token:", token);
      await subscribeToTopic(token);
      return token;
    } else {
      console.warn("No FCM token received.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    return null;
  }
}
// localStorage.clear()
// console.log(localStorage.getItem("FCM Token"));

const useFcmToken = () => {
  const navigate = useNavigate();
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("FCMToken"));
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const tokon = (await getNotificationPermissionAndToken()) || localStorage.getItem("fcmToken");

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    if (!tokon) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load FCM token. Please refresh your browser.");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("Error retrieving FCM token. Retrying...");
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(tokon);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      console.log(`Listening for FCM messages with token ${token}`);
      const unsubscribe = onMessage(messaging, (payload) => {
        if (Notification.permission !== "granted") return;

        console.log("Foreground push notification received:", payload);
        const link = payload.fcmOptions?.link || payload.data?.link;

        // ✅ Display only using toast (Remove `new Notification(...)`)
        toast(`${payload.notification?.title}: ${payload.notification?.body}`, {
          description: payload.notification?.body,
          action: link
            ? {
                label: "Visit",
                onClick: () => {
                  window.open(link, "_blank");
                },
              }
            : undefined,
          duration: 10000, // Stay visible for 10 seconds
        });
      });

      return unsubscribe;
    };

    let unsubscribe = null;
    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [token, navigate]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
