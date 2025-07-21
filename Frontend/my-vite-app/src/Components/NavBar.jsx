import { logout } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";

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
    <div className="fixed bottom-0 left-0 right-0 bg-green-100  text-emerald-700 py-2 px-6 flex justify-around items-center shadow-md z-50 ">
      <Link to="/home">
        <button className="text-2xl flex flex-col">
          <IoHome />
          <p className="text-l">Home</p>
        </button>
      </Link>

      <Link to="/profile">
        <button className="text-2xl flex flex-col">
          <IoPersonCircleOutline />
          <p className="text-l">Profile</p>
        </button>
      </Link>
      <Link to="/past">
        <button className="text-2xl flex flex-col">
          <IoBookmarksOutline />
          <p className=" block text-l">Activity</p>
        </button>
      </Link>
      <button className="text-2xl flex flex-col" onClick={handleLogout}>
        <GiExitDoor />
        <p className="text-l">LogOut</p>
      </button>
    </div>
  );
};

export default navBar;
