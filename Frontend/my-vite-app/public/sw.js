importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA-u_TIvRbN6FAQmGsb9xbgqaAtsDmT2OI",
  authDomain: "capstone-project-ef714.firebaseapp.com",
  projectId: "capstone-project-ef714",
  storageBucket: "capstone-project-ef714.firebasestorage.app",
  messagingSenderId: "573306703898",
  appId: "1:573306703898:web:47f462dbbe411aca0801a3",
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.info("Background message", payload);
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Bodyground Message body",
    icon: "/firebase-logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
