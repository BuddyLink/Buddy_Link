import "./NavBar.css";
import { logout } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
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
    <div className="navBar">
      <button className="navButton" onClick={handleLogout}>
        LogOut
      </button>
      <Link to="/profile">
      <button>Profile</button>
      </Link>
      <Link to="/home">
      <button>Home</button>
      </Link>
    </div>
  );
};

export default NavBar;
