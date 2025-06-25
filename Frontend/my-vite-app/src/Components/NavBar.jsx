import "./NavBar.css"
import {logout} from "./fetchingData"
import {useNavigate} from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try{
      await logout()
      navigate("/")
    }catch(error){
        console.error("Error logging out: ", error)
    }
}
  return (
    <div className="nav-bar">
        <button className="nav-button" onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default NavBar
