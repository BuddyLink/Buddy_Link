import "./Homepage.css";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";


const Homepage = ({profile}) => {
  return (
    <div className="homePage">
      <Header />
      <NavBar />
      <div className= "homePageContent">
      <h1>Hey {profile.name}, time to roam !</h1>
      <form>
        <label>Destination: </label>
        <input type="text" placeholder="Where to?  " />
        <label>Date: </label>
        <input type="date" />
        <label>Time: </label>
        <input type="time" />
        <label>Meeting Point: </label>
        <input type="text" placeholder="Where to meet?  " />
        <Link to="/buddy">
        <button>Find a Buddy!!</button>
        </Link>
      </form>
      </div>
      <Footer />
    </div>
  );
};
export default Homepage;
