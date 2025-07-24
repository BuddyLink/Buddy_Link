import NavBar from "./NavBar";
import { MdLocationPin } from "react-icons/md";
import { useState, useEffect } from "react";
import { getLocations, createRequest } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import Timer from "./Timer";

const homePage = ({ profile }) => {
  const [destination, setDestination] = useState("");
  const [locations, setLocations] = useState([]);
  const [meetingPoint, setMeetingPoint] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const timeDuration = 60000;
  const timeInterval = 30000;

  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };
    fetchLocations();
  }, []);

  const handleRequest = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      date,
      time,
      destination,
      meetingPoint,
    };
    const response = await createRequest(data);
    if (response.success) {
      let timer = 0;
      if (response.data.matched.length === 0) {
        const searchInterval = async () => {
          try {
            setIsSearching(true);
            const response = await createRequest(data);

            if (response.data.matched.length > 0) {
              setIsSearching(false);
              navigate("/buddy", {
                state: {
                  match: response.data.matched,
                  requestId: response.data.requestId,
                },
              });
            }

            if (timer < timeDuration) {
              setTimeout(searchInterval, timeInterval);
              timer += timeInterval;
            } else {
              setIsSearching(false);
              return navigate("/buddy", {
                state: {
                  match: response.data.matched,
                  requestId: response.data.requestId,
                },
              });
            }
          } catch (error) {
            console.error("Error while searching:", error);
          }
        };
        searchInterval();
      }
      if (response.data.matched.length > 0) {
        navigate("/buddy", {
          state: {
            match: response.data.matched,
            requestId: response.data.requestId,
          },
        });
      }
    } else {
      console.error(response.error);
    }
    setIsLoading(false);
  };
  if (isloading) {
    return (
      <div className="min-h-screen flex items-center text-center justify-center">
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }
  if (isSearching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-100 dark:from-gray-900 dark:to-gray-800 flex flex-col gap-5 items-center text-center justify-center">
        <p className="text-3xl text-white ">Searching for Buddy.....</p>
        <Commet color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
        <Timer duration={timeDuration} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-between pt-10 pb-28 px-4 sm:px-6 md:px-12 md:justify-center lg:px-8">
      <div className="w-full max-w-md mx-auto text-center text-white mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MdLocationPin className="text-white text-4xl md:text-6xl" />
          <h1 className="text-4xl font-bold md:text-6xl">Buddy Link</h1>
        </div>
        <p className="text-l font-medium md:text-2xl">
          Hey {profile.name}, time to roam !
        </p>
      </div>
      <div className="w-full max-w-2xl mx-auto bg-emerald-50 dark:bg-gray-800 rounded-3xl shadow-xl px-6 py-8 sm:p-8 md:mt-5 md:pt-15 md:pb-15">
        <form className="space-y-4" onSubmit={handleRequest}>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 md:text-xl md:font-normal">
            Destination:{" "}
          </label>
          <select
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="block appearance-none w-full h-12 pl-4 pr-10 rounded-md border border-gray-400 bg-[#f1fff3] dark:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  leading-tight text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
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

          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 md:text-xl md:font-normal">
            Date:{" "}
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 md:text-xl md:font-normal">
            Time:{" "}
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2  sm:p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-mb focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1 md:text-xl md:font-normal">
            Meeting Point:{" "}
          </label>
          <select
            required
            value={meetingPoint}
            onChange={(e) => setMeetingPoint(e.target.value)}
            className="appearance-none w-full p-2 rounded-md sm:p-3 border border-gray-400 bg-[#f1fff3] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 text-white font-semibold py-2 px-4 mt-4 rounded-md transition"
          >
            Find a Buddy!!
          </button>
        </form>
      </div>
      <NavBar />
    </div>
  );
};
export default homePage;
