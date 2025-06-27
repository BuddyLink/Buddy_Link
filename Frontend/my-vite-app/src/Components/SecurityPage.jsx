import { LiaUserShieldSolid } from "react-icons/lia";
import { FaPeopleRobbery } from "react-icons/fa6";
import { FaStreetView } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { MdEmergencyShare } from "react-icons/md";

const SecurityPage = () => {
  return (
    <div>
      <h1>Security Page</h1>
      <ul>
      <h2>
        <LiaUserShieldSolid />
        General Security Tips
      </h2>
        <li>Always let someone know your walking plans.</li>
        <li>Stay alert; avoid distractions like texting while walking.</li>
        <li>Avoid using headphones at high volume.</li>
        <li>Avoid isolated or shady areas like alleys or empty lots.</li>
      </ul>
      <ul>
      <h2>
        <FaPeopleRobbery />
        Verify Your Buddy
        </h2>
        <li>Check their profile and match photos before meeting.</li>
        <li>Confirm their identify with the verification code.</li>
        <li>Do not share your verification code with anyone.</li>
      </ul>
       <ul>
        <h2>
          <FaStreetView />
          Meeting Locations
        </h2>
        <li>Use a public place to meet.</li>
        <li>Avoid secluded or low-visiblity spots.</li>
        <li>Stay where there's foot traffic and lighting.</li>
      </ul>
      <ul>
        <h2>
          <AiFillAlert />
          If You Feel Unsafe
        </h2>
        <li>Call 911 or your local emergency services.</li>
        <li>Leave the area immediately.</li>
        <li>Use phone's SOS feature to alert others.</li>
      </ul>
      <ul>
        <h2>
          <MdEmergencyShare />
          U.S. Emergency Numbers
        </h2>
        <li>911 - Emergency Services</li>
        <li>988 - Mental Health Crisis Line</li>
        <li>211 - Local Human Services</li>
        <li>311 - Local Non-Emergencies </li>
      </ul>
    </div>
  );
};

export default SecurityPage;
