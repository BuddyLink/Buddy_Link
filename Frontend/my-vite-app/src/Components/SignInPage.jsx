import "./SignInPage.css";
import { Link } from "react-router-dom";
import { login, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MdLocationPin } from "react-icons/md";
import { FaWalking } from "react-icons/fa";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    const result = await login(data);
    if (result?.success) {
      const user = await getMe();
      if (user) {
        navigate("/home");
      }
    } else {
      alert(result.error || "User not found");
    }
  };
  return (
    <div className="SignInPage">
      <Header />
      <div className= "SignInPageContainer">
      <div className="SignInPageBackground">
       <h1 className="icon"><strong><MdLocationPin /> Buddy Link</strong></h1>
             <p className="walk"><FaWalking />WALK.TALK.REPEAT</p>
      <div className="SignInPageContent">
      <h1>Sign In</h1>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="SignUpBtn" onClick={handleLogin}>Sign In</button>
      <div className ="SignUpLink">
      <p>Not a Member? </p>
      <Link to="/signup">
        <button className="link">Sign Up</button>
      </Link>
      </div>
    </div>
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default SignInPage;
