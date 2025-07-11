import { LiaUserShieldSolid } from 'react-icons/lia';
import { FaPeopleRobbery } from 'react-icons/fa6';
import { FaStreetView } from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';
import { MdEmergencyShare } from 'react-icons/md';
import NavBar from './NavBar';

const securityPage = () => {
  return (
    <div className="min-h-screen md:bg-green-100 sm:bg-green-300 px-4 sm:px-8 py-10">
      <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md mb-4 sm:p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 text-green-800">
          Security Page
        </h1>
        <section className="mb-6 md:ml-9">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <LiaUserShieldSolid className="text-green-600" />
            General Security Tips
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
            <li>Always let someone know your walking plans.</li>
            <li>Stay alert; avoid distractions like texting while walking.</li>
            <li>Avoid using headphones at high volume.</li>
            <li>Avoid isolated or shady areas like alleys or empty lots.</li>
          </ul>
        </section>
        <section className="mb-6 md:ml-9">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <FaPeopleRobbery className="text-green-600" />
            Verify Your Buddy
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
            <li>Check their profile and match photos before meeting.</li>
            <li>Confirm their identify with the verification code.</li>
            <li>Do not share your verification code with anyone.</li>
          </ul>
        </section>
        <section className="mb-6 md:ml-9">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <FaStreetView className="text-green-600" />
            Meeting Locations
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
            <li>Use a public place to meet.</li>
            <li>Avoid secluded or low-visiblity spots.</li>
            <li>Stay where there's foot traffic and lighting.</li>
          </ul>
        </section>
        <section className="mb-6 md:ml-9">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <AiFillAlert className="text-green-600" />
            If You Feel Unsafe
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
            <li>Call 911 or your local emergency services.</li>
            <li>Leave the area immediately.</li>
            <li>Use phone's SOS feature to alert others.</li>
          </ul>
        </section>
        <section className="mb-6 md:ml-9">
          <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-700 mb-2">
            <MdEmergencyShare className="text-green-600" />
            U.S. Emergency Numbers
          </h2>
          <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
            <li>911 - Emergency Services</li>
            <li>988 - Mental Health Crisis Line</li>
            <li>211 - Local Human Services</li>
            <li>311 - Local Non-Emergencies </li>
          </ul>
        </section>
      </div>
      <NavBar />
    </div>
  );
};

export default securityPage;
