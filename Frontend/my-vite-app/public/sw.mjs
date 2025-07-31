importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js"
);
const fcmApiKey = import.meta.env.VITE_FCM_API_KEY;
const firebaseConfig = {
  apiKey: fcmApiKey,
  authDomain: "capstone-project-ef714.firebaseapp.com",
  projectId: "capstone-project-ef714",
  storageBucket: "capstone-project-ef714.firebasestorage.app",
  messagingSenderId: "573306703898",
  appId: "1:573306703898:web:47f462dbbe411aca0801a3",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.info("Background message", payload);
  const notificationTitle =
    payload.notification?.title || "Background Message Title";
  const notificationOptions = {
    body: payload.notification?.body || "Background Message body",
    icon: "/assets/icons/90A7FB37-0786-4422-ACAC-30B953902EA8_1_201_a.jpeg",
    requireInteraction: true,
  };

  console.info("Showing notification:", notificationTitle, notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});
