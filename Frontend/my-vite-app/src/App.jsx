import "./App.css";
import CreateNewAccount from "./Components/CreateNewAccount";
import Homepage from "./Components/Homepage";
import SignInPage from "./Components/SignInPage";
import Profilepage from "./Components/Profilepage";
import BuddyFindingPage from "./Components/BuddyFindingPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [profile, setProfile] = useState([])
  return (
    <div>
      <Routes>
        <Route path="/" className="signInPage" element={<SignInPage />} />
        <Route path="/signup" element={<CreateNewAccount />} />
        <Route path="/profile" element={<Profilepage setProfile={setProfile} profile={profile}/>} />
        <Route path="/home" element={<Homepage profile={profile}/>} />
        <Route path="/buddy" element={<BuddyFindingPage />} />
      </Routes>
    </div>
  );
}

export default App;
