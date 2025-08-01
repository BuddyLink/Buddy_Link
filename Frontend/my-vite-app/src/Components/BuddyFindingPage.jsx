import NavBar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { MdEmojiPeople } from "react-icons/md";
import { createMatch, deleteRequest } from "./fetchingData";
import { LuSearchX } from "react-icons/lu";
import { PiSmileySad } from "react-icons/pi";

const BuddyFindingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state.match;
  const requestId = location.state.requestId;

  const handleClick = async (person) => {
    navigate("/match", { state: person });
    const data = {
      buddyPair: person.id,
    };
    const response = await createMatch(data);
  };

  const handleDelete = async () => {
    const data = {
      id: requestId,
    };
    await deleteRequest(data);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 lg:bg-gradient-to-br from-green-100 to-green-50 lg:text-l dark:bg-gray-900 dark:text-white mb-15 dark:bg-gray-900 dark:lg:bg-gradient-to-br dark:lg:from-gray-900 dark:lg:to-gray-800">
      <div className="relative group">
        <button
          onClick={() => handleDelete()}
          className="items-center flex gap-1 bg-green-600 dark:bg-emerald-600 text-white px-2 py-2 rounded hover:bg-green-700 transition lg:text-m"
        >
          Cancel
        </button>
        <div className="absolute z-10 px-3 py-2 text-sm font-medium bg-gray-100 mt-1 text-gray-900 border border-green-700 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700">
          Clicking will cancel your request.
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-2 lg:text-5xl lg:mt-4 dark:text-green-300 dark:text-emerald-400">
          Pick a Buddy
        </h1>
        <p className= "text-center text-gray-600 mb-6 lg:text-2xl lg:mt-4 dark:text-gray-300" >
          One Step close to your destination !
        </p>
        <ul className={`mt-8 w-full ${ match.length ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto ": "grid min-h-[30vh] place-content-center"}`}>
          {match && match.length > 0 ? (
            match.map((person, index) => (
              <li key={index} className="h-full">
                <article className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:scale-105 transition overflow-hidden ring-1 ring-emerald-50 dark:ring-gray-700">
                  <div className="relative h-16 md:h-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-500" />
                  <div className=" absolute -top-0 mt-5 left-6 flex justify-center">
                    <img
                      src={person.profilePic}
                      alt="Buddy profile"
                      className="w-16 h-16 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-green-500"
                      loading="lazy"
                      style={{
                        maxWidth: "92px",
                        maxHeight: "92px",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="md:pt-6 md:pb-3  lg:text-m px-6  pt-2 text-left ml-28 leading-normal">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-xl leading-normal">
                      {person.name} {person.surname}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 lg:text-l dark:text-gray-300 lg:text-l">
                      {person.major}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 lg:text-l dark:text-gray-300 lg:text-l">
                      {person.classification}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 lg:text-l dark:text-gray-300 lg:text-l">
                      Walk Count: {person.walkCount}
                    </p>
                  </div>
                  <div className=" flex justify-center gap-3 mt-1 mb-2 items ml-50 lg:ml-65 lg:mt-0">
                    <button
                      onClick={() => handleClick(person)}
                      className="text-xs lg:text-l items-center flex ml-1 gap-1 bg-green-600 dark:bg-emerald-600 text-white px-1.5 py-1.5 lg:py-2 lg:px-2 rounded hover:bg-green-700 transition "
                    >
                      <MdEmojiPeople />
                      BuddyUp
                    </button>
                  </div>
                </article>
              </li>
            ))
          ) : (
            <div className="block text-center">
              <div className="text-center text-gray-500 justify-center text-semibold mt-20 text-3xl lg:text-4xl border boder-green-400 shadow-lg rounded-full pt-8 lg:px-18 lg:py-7 hover:shadow-lg px-6 py-3">
                <div className="flex flex-col">
                  <LuSearchX size={50} className="mb-0 ml-3 mt-1 lg:ml-0" />{" "}
                  <span className="ml-2 lg:ml-12 font-semibold lg:text-4xl">No Buddies Found</span>
                  <PiSmileySad
                    size={65}
                    className="text-center justify-center ml-25 lg:ml-34 mt-4"
                  />
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
      <NavBar />
    </div>
  );
};

export default BuddyFindingPage;
