import { MdVerifiedUser } from "react-icons/md";
import NavBar from "./NavBar";

const VerificationCodePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 to-green-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <MdVerifiedUser className="text-5xl text-green-600 mx-auto mb-2" />
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Verify Your Buddy
        </h1>
        <p className="text-gray-600 mb-4 text-sm">Enter Verification Code: </p>
        <div className="flex justify-center gap-2 mb-6">
          <input
            type="tel"
            maxLength="1"
            inputMode="numeric"
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            maxLength="1"
            inputMode="numeric"
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            maxLength="1"
            inputMode="numeric"
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            maxLength="1"
            inputMode="numeric"
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            maxLength="1"
            inputMode="numeric"
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounde-md hover:bg-green-700 transition">
          Verify
        </button>
      </div>
      <NavBar />
    </div>
  );
};

export default VerificationCodePage;
