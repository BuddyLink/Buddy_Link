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
      <Link to="/home">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <IoHome className="text-2xl " />
          <p className="text-xs">Home</p>
        </button>
      </Link>

      <Link to="/profile">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <IoPersonCircleOutline className="text-2xl" />
          <p className="text-xs">Profile</p>
        </button>
      </Link>
      <Link to="/past">
        <button className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 ">
          <GiPlayerPrevious className="text-2xl" />
          <p className="text-xs">Activity</p>
        </button>
      </Link>
      <button
        className="flex flex-col items-center hover:text-green-600 hover:scale-110 transform transition-colors duration-200 dark:hover:text-emerald-600 "
        onClick={handleLogout}
      >
        <GiExitDoor className="text-2xl" />
        <p className="text-xs">LogOut</p>
      </button>
    </div>
  );
};

export default navBar;
