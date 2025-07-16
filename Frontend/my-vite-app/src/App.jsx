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

function App() {
  const [profile, setProfile] = useState([]);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js",{scope: "/"}).then(
      (registration) => {
        console.info("Service worker registratiom succeeded:", registration);
      },
      (error) => {
        console.error(`service worker registration failed: ${error}`);
      }
    );
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
