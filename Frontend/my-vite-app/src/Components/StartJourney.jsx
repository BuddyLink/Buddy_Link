import NavBar from "./NavBar";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Map from "./Map";
import { useState, useEffect } from "react";
import { getLocations } from "./fetchingData";

const StartJourney = () => {
  const [locations, setLocations] = useState([]);
  const [start, setStart] = useState(null);
  const [destination, setDestination] = useState(null);
  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await getLocations();

      setLocations(fetchedLocations);
    };
    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-6 dark:bg-gray-900 dark:text-gray-200 sm:px-6 lg:px-8">
      <IoCheckmarkCircleSharp className="text-7xl text-green-600 mb-5 dark:text-green-400 sm:text-7xl lg:text-8xl" />
      <h1 className="text-3xl font-bold text-green-800 mb-4 dark:text-green-300 sm:text-3xl lg:text-5xl">
        Buddy Verified!
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-2 sm:text-base lg:text-xl">
        {" "}
        Now it's time to start stepping together!
      </p>
      <div className="w-full max-w-4xl mb-15 mx-auto bg-emerald-50 dark:bg-gray-800 rounded-3xl shadow-xl px-6 py-8 sm:p-8 md:mt-5 md:pt-15 md:pb-15">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 md:text-xl md:font-normal text-left ml-2">
            Starting Point{" "}
          </label>
          <select
            required
            className="appearance-none w-full p-2 rounded-md sm:p-3 border border-gray-400 bg-[#f1fff3] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => {
              const loc = locations.find(
                (l) => l.id === parseInt(e.target.value)
              );
              setStart(loc);
            }}
          >
            <option className="hover: bg-green-100" value="">
              Select a Starting Point
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 mt-2 md:text-xl md:font-normal text-left ml-2">
            Destination{" "}
          </label>
          <select
            required
            className="appearance-none w-full p-2 rounded-md sm:p-3 border border-gray-400 bg-[#f1fff3] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => {
              const loc = locations.find(
                (l) => l.id === parseInt(e.target.value)
              );
              setDestination(loc);
            }}
          >
            <option className="hover: bg-green-100" value="">
              Select a Destination
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        {start && destination && (
          <Map start={start} destination={destination} />
        )}
        <NavBar />
      </div>
    </div>
  );
};

export default StartJourney;
