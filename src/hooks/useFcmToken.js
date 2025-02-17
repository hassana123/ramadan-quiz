import { useEffect, useRef, useState } from "react";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "../../firebase"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 
import logo from "../../public/moon.svg";

async function subscribeToTopic(token) {
    try {
      await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      console.log("Subscribed to Ramadan updates!");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  }
async function getNotificationPermissionAndToken() {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notifications.");
    alert("No support for notifications.");
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
      localStorage.setItem("fcmToken", token);
      console.log("FCM Token:", token);
      await subscribeToTopic(token)
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

const useFcmToken = () => {
  const navigate = useNavigate();
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("fcmToken"));
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const tokon = (await getNotificationPermissionAndToken()) || localStorage.getItem("fcmToken");

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info("Push Notifications issue - permission denied.");
      isLoading.current = false;
      return;
    }

    if (!tokon) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load FCM token. Please refresh your browser.");
        console.info("Push Notifications issue - unable to load token after 3 retries.");
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

        const n = new Notification(payload.notification?.title || "New message", {
          body: payload.notification?.body || "This is a new message",
          icon: logo,
          data: link ? { url: link } : undefined,
        });

        n.onclick = (event) => {
          event.preventDefault();
          const link = event.target.data?.url;
          if (link) {
            navigate(link);
          } else {
            console.log("No link found in the notification payload.");
          }
        };

        console.log(n);
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
  }, [token, navigate, toast]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
