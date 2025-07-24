import NavBar from "./NavBar";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const StartJourney = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-6 dark:bg-gray-900 dark:text-gray-200 sm:px-6 lg:px-8">
      <IoCheckmarkCircleSharp className="text-7xl text-green-600 mb-5 dark:text-green-400 sm:text-7xl lg:text-8xl" />
      <h1 className="text-3xl font-bold text-green-800 mb-4 dark:text-green-300 sm:text-3xl lg:text-5xl">
        Buddy Verified!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-2 sm:text-lg lg:text-xl">
        You're all set.
      </p>
      <br />
      <p className="text-gray-700 dark:text-gray-300 mb-2 sm:text-base lg:text-xl">
        You've officially verified your walking buddy.
      </p>
      <br />
      <p className="text-gray-700 dark:text-gray-300 mb-2 sm:text-base lg:text-xl">
        {" "}
        Now it's time to start stepping together!
      </p>
      <NavBar />
    </div>
  );
};

export default StartJourney;
