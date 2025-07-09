import NavBar from "./NavBar";
import { MdLocationPin } from "react-icons/md";
import { useState, useEffect } from "react";
import { getLocations, createRequest } from "./fetchingData";
import { useNavigate } from "react-router-dom";

const Homepage = ({ profile, setMatch }) => {
  const [destination, setDestination] = useState("");
  const [locations, setLocations] = useState([]);
  const [meetingPoint, setMeetingPoint] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };
    fetchLocations();
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    const data = {
      date,
      time,
      destination,
      meetingPoint,
    };
    const response = await createRequest(data);
    if (response.success) {
      setMatch(response.data.matched);
      navigate("/buddy");
    } else {
      console.error(response.error);
    }
  };
  if (isloading) {
    return <p>Loading.......</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-100 flex flex-col justify-between pt-10 pb-28 px-4 sm:px-6 md:px-12 md:justify-center lg:px-8">
      <div className="w-full max-w-md mx-auto text-center text-white mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MdLocationPin className="text-white text-4xl md:text-6xl" />
          <h1 className="text-4xl font-bold md:text-6xl">Buddy Link</h1>
        </div>
        <p className="text-l font-medium md:text-2xl">
          Hey {profile.name}, time to roam !
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto bg-emerald-50 rounded-3xl shadow-xl px-6 py-8 sm:p-8 md:mt-5 md:pt-15 md:pb-15">
        <form className="space-y-4" onSubmit={handleRequest}>
          <label className="block text-gray-700 font-semibold mb-1 md:text-xl md:font-normal">
            Destination:{" "}
          </label>
          <select
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="block appearance-none w-full h-12 pl-4 pr-10 rounded-md border border-gray-400 bg-[#f1fff3] leading-tight text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
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

          <label className="block text-gray-700 font-semibold mb-1 md:text-xl md:font-normal">
            Date:{" "}
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label className="block text-gray-700 font-semibold mb-1 md:text-xl md:font-normal">
            Time:{" "}
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2  sm:p-3 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label className="block text-gray-700 font-semibold mb-1 md:text-xl md:font-normal">
            Meeting Point:{" "}
          </label>
          <select
            required
            value={meetingPoint}
            onChange={(e) => setMeetingPoint(e.target.value)}
            className="w-full p-2 rounded-md sm:p-3 border border-gray-400 bg-[#f1fff3] text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option className="hover: bg-green-100" value="">
              Select a Meeting Point
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 mt-4 rounded-md transition"
          >
            Find a Buddy!!
          </button>
        </form>
      </div>
      <NavBar />
    </div>
  );
};
export default Homepage;
