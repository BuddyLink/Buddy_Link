import { Link } from "react-router-dom";
import { login, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const signInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-10 sm:px-6 lg:px-8">
      <div className=" w-full  dark:bg-gray-800 dark:text-gray-200 max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 mt-15 mr-3 ml-3 ">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold text-emerald-600 mb-2 flex flex-row items-center gap-2  items-center justify-center dark:text-emerald-500">
            <strong className="flex flex-row">
              <MdLocationPin /> Buddy Link
            </strong>
          </h1>
          <p className="text-l md:text-xl items-center justify-center font-semibold text-gray-700 mb-6 flex flex-row dark:text-gray-300">
            <FaWalking />
            WALK.TALK.REPEAT
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center tracking-wide">
            Sign In
          </h1>
          <div className="space-y-4">
            <label className="block text-left justify-left text-m font-medium text-gray-700 mb-1.5 dark:text-gray-200">
              Email{" "}
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-400 dark:placeholder-gray-400"
            />
            <label className="block text-left justify-left text-m font-medium text-gray-600 mb-1.5 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-400 dark:placeholder-gray-400 pr-16"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 my-auto text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
            <button
              className="w-full mt-4 bg-emerald-500 py-2 px-6 rounded-md mt-6 text-center text-m text-gray-700 trasition-transform hover:scale-90 justify-center dark:bg-emerald-500 dark:text-gray-900"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <div className="flex flex-row items-center justify-center ">
              <p className="mr-3 text-gray-600 dark:text-gray-300">
                Not a Member?{" "}
              </p>
              <Link to="/signup">
                <button className="text-emerald-700 dark:text-emerald-400 hover:underline ">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signInPage;
