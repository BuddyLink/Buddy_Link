import CreateNewAccount from "./Components/CreateNewAccount";
import Homepage from "./Components/Homepage";
import SignInPage from "./Components/SignInPage";
import Profilepage from "./Components/Profilepage";
import BuddyFindingPage from "./Components/BuddyFindingPage";
import VerificationCodePage from "./Components/VerificationCodePage";
import SecurityPage from "./Components/SecurityPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MatchPage from "./Components/MatchPage";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { createToken } from "./Components/fetchingData";
const vapidKey = import.meta.env.VITE_VAPID_KEY;

function App() {
  const [profile, setProfile] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyA-u_TIvRbN6FAQmGsb9xbgqaAtsDmT2OI",
    authDomain: "capstone-project-ef714.firebaseapp.com",
    projectId: "capstone-project-ef714",
    storageBucket: "capstone-project-ef714.firebasestorage.app",
    messagingSenderId: "573306703898",
    appId: "1:573306703898:web:47f462dbbe411aca0801a3",
  };
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  onMessage(messaging, (payload) => {
    console.info("Message received. ", payload);
  });
  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.info("Notification permission granted.");
      } else {
        console.info("Permission request denied");
      }
    });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(
        (registration) => {
          requestPermission();
          return getToken(messaging, {
            vapidKey: vapidKey,
            serviceWorkerRegistration: registration,
          });
        },
        (error) => {
          console.error(`service worker registration failed: ${error}`);
        }
      )
      .then(async (token) => {
        if (token) {
          const data = {
            fcmToken: token,
          };
          const response = await createToken(data);
        } else {
          console.info("No registration token available");
        }
      });
  } else {
    console.error("Service worker not supported");
  }

  return (
    <div>
      <Routes>
        <Route path="/" className="signInPage" element={<SignInPage />} />
        <Route path="/signup" element={<CreateNewAccount />} />
        <Route
          path="/profile"
          element={<Profilepage setProfile={setProfile} profile={profile} />}
        />

        <Route path="/home" element={<Homepage profile={profile} />} />
        <Route path="/buddy" element={<BuddyFindingPage />} />
        <Route path="/verify" element={<VerificationCodePage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </div>
  );
}

export default App;
