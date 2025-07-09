import CreateNewAccount from './Components/CreateNewAccount';
import Homepage from './Components/Homepage';
import SignInPage from './Components/SignInPage';
import Profilepage from './Components/Profilepage';
import BuddyFindingPage from './Components/BuddyFindingPage';
import VerificationCodePage from './Components/VerificationCodePage';
import SecurityPage from './Components/SecurityPage';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MatchPage from './Components/MatchPage';
import { useLocalStorage } from 'usehooks-ts'

function App() {
  const [profile, setProfile] = useState([]);
  const [match, setMatch] = useLocalStorage('match',[]);
  return (
    <div>
      <Routes>
        <Route path="/" className="signInPage" element={<SignInPage />} />
        <Route path="/signup" element={<CreateNewAccount />} />
        <Route
          path="/profile"
          element={<Profilepage setProfile={setProfile} profile={profile} />}
        />
        <Route path="/home" element={<Homepage profile={profile} setMatch={setMatch} />} />
        <Route path="/buddy" element={<BuddyFindingPage match= {match}/>} />
        <Route path="/verify" element={<VerificationCodePage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </div>
  );
}

export default App;
