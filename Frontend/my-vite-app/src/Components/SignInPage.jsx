import { Link } from "react-router-dom";
import { login, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-green-100 flex items-center justify-center py-10">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm mt-15 mr-3 ml-3 ">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2 flex flex-row items-center gap-2  items-center justify-center">
            <strong className="flex flex-row">
              <MdLocationPin /> Buddy Link
            </strong>
          </h1>
          <p className="text-l items-center justify-center font-semibold text-gray-700 mb-6 flex flex-row">
            <FaWalking />
            WALK.TALK.REPEAT
          </p>
          <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center tracking-wide">Sign In</h1>
          <div className="space-y-4">
            <label className="block text-left justify-left text-m font-medium text-gray-700 mb-1.5 ">Email </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               className="w-full mt-1 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <label className="block text-left justify-left text-m font-medium text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button className="w-full mt-4 bg-emerald-500 py-2 px-6 rounded-md mt-6 text-center text-m text-gray-700 trasition-transform hover:scale-90 justify-center" onClick={handleLogin}>
              Sign In
            </button>
            <div className="flex flex-row items-center justify-center ">
              <p className="mr-3 text-gray-600">Not a Member? </p>
              <Link to="/signup">
                <button className="text-emerald-700 hover:underline">Sign Up</button>
              </Link>
            </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
