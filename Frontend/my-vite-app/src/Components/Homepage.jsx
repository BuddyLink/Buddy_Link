import "./Homepage.css";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";


const Homepage = () => {
  return (
    <div className="homePage">
      <Header />
      <NavBar />
      <div className= "homePageContent">
      <h1>Homepage</h1>
      </div>
      <Footer />
    </div>
  );
};
export default Homepage;
