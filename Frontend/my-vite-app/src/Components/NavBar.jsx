import { logout } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { GiPlayerPrevious } from "react-icons/gi";

const navBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-100 gap-0 text-emerald-700 py-2 px-1 flex justify-around items-center shadow-md z-50 dark:bg-gray-900 dark:text-emerald-400">
      <Link to="/home" className="relative group">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <IoHome className="text-2xl " />
          <p className="text-xs">Home</p>
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2  whitespace-nowrap  px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 dark:text-white border border-green-700 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700 z-50">
          Home
        </div>
      </Link>

      <Link to="/profile" className="relative group">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <IoPersonCircleOutline className="text-2xl" />
          <p className="text-xs">Profile</p>
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2  whitespace-nowrap  px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 dark:text-white border border-green-700 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700 z-50">
          Profile
        </div>
      </Link>
      <Link to="/past" className="relative group">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <GiPlayerPrevious className="text-2xl" />
          <p className="text-xs">Activity</p>
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2  whitespace-nowrap  px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 dark:text-white border border-green-700 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700 z-50">
          Activity
        </div>
      </Link>
      <div className="relative group">
        <button
          className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 "
          onClick={handleLogout}
        >
          <GiExitDoor className="text-2xl" />
          <p className="text-xs">LogOut</p>
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2  whitespace-nowrap  px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 dark:text-white border border-green-700 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700 z-50">
          LogOut
        </div>
      </div>
    </div>
  );
};

export default navBar;
