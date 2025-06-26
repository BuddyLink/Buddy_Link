import "./App.css";
import CreateNewAccount from "./Components/CreateNewAccount";
import Homepage from "./Components/Homepage";
import SignInPage from "./Components/SignInPage";
import Profilepage from "./Components/Profilepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" className="signInPage" element={<SignInPage />} />
        <Route path="/signup" element={<CreateNewAccount />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
