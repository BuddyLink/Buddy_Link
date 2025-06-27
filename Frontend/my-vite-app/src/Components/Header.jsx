import "./Header.css"
import { MdLocationPin } from "react-icons/md";

const Header = () => {
  return (
    <div className="header">
      <h1><strong><MdLocationPin  className="pin"/> Buddy Link</strong></h1>
    </div>
  );
};

export default Header;
