import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";

const Homepage = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-100 flex flex-col justify-between pt-10 pb-28 px-4">
      <div className="w-full max-w-md mx-auto text-center text-white mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MdLocationPin className="text-white text-4xl" />
          <h1 className="text-4xl font-bold">Buddy Link</h1>
        </div>
        <p className="text-l font-medium">
          Hey {profile.name}, time to roam !
        </p>
      </div>
      <div className="w-full max-w-md mx-auto bg-emerald-50 rounded-3xl shadow-xl px-6 py-8">
      <form className="space-y-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Destination:{" "}
        </label>
        <input
          type="text"
          placeholder="Where to?  "
          className="w-full p-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <label className="block text-gray-700 font-semibold mb-1">Date: </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <label className="block text-gray-700 font-semibold mb-1">Time: </label>
        <input
          type="time"
          className="w-full p-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <label className="block text-gray-700 font-semibold mb-1">
          Meeting Point:{" "}
        </label>
        <input
          type="text"
          placeholder="Where to meet?  "
          className="w-full p-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <Link to="/buddy">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 mt-4 rounded-md transition">
            Find a Buddy!!
          </button>
        </Link>
      </form>
      </div>
      <NavBar />
    </div>
  );
};
export default Homepage;
