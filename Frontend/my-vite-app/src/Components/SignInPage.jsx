import "./SignInPage.css";
import { Link } from "react-router-dom";
import { login, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      <h1>Sign In</h1>
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign In</button>
      <p>Not a Member? </p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default SignInPage;
