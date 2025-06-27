import { Link } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";

const MatchPage = () => {
  return (
    <div>
      <section>
        <h1>Match Page</h1>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Buddy Img"
        />
        <h2>Name</h2>
        <p>WalkCount</p>
        <p>Preffered Contact</p>
      </section>
      <section>
        <h3>Meeting Point: </h3>
        <h3>Destination: </h3>
        <p>Time: </p>
      </section>
      <section>
        <Link to="/security">
          <button><RiShieldUserFill />Sefety</button>
        </Link>
        <Link to="/verify">
        <button><MdVerifiedUser />Verification</button>
         </Link>
      </section>
    </div>
  );
};

export default MatchPage;
