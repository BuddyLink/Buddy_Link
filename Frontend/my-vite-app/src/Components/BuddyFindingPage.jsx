import NavBar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { MdEmojiPeople } from "react-icons/md";
import { createMatch } from "./fetchingData";

const BuddyFindingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state.match;

  const handleClick = async (person) => {
    navigate("/match", { state: person });
    const data = {
      buddyPair: person.id,
    };
    const response = await createMatch(data);
  };
  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 lg:bg-gradient-to-br from-green-100 to-green-50 lg:text-l dark:bg-gray-900 dark:text-white mb-15 dark:bg-gray-900 dark:lg:bg-gradient-to-br dark:lg:from-gray-900 dark:lg:to-gray-800">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-2 lg:text-4xl lg:mt-4 dark:text-green-300 dark:text-emerald-400">
        Pick a Buddy
      </h1>
      <p className="text-center text-gray-600 mb-6 lg:text-xl lg:mt-4 dark:text-gray-300">
        One Step close to your destination !
      </p>
      <ul className="space-y-6 max-w-md mx-auto lg:w-200">
        {match && match.length > 0 ? (
          match.map((person, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 dark:bg-gray-800"
            >
              <img
                src={person.profilePic}
                alt="Buddy profile"
                className="w-23 h-23 rounded-full object-cover border-2 border-green-500"
                loading="lazy"
                style={{
                  maxWidth: "92px",
                  maxHeight: "92px",
                  width: "auto",
                  height: "auto",
                }}
              />
              <div className="flex-1 ml-5 lg:text-m">
                <p className="font-semibold text-gray-800 dark:text-gray-300">
                  {person.name} {person.surname}
                </p>
                <p className="text-sm text-gray-600 lg:text-m dark:text-gray-300">
                  {person.major}
                </p>
                <p className="text-sm text-gray-600 lg:text-m dark:text-gray-300">
                  {person.classification}
                </p>
                <p className="text-sm text-gray-600 lg:text-m dark:text-gray-300">
                  Walk Count: {person.walkCount}
                </p>
                <div className="flex  justify-center gap-3 mt-3">
                  <button
                    onClick={() => handleClick(person)}
                    className="items-center flex ml-15 gap-1 bg-green-600 dark:bg-emerald-600 text-white px-2 py-2 rounded hover:bg-green-700 transition lg:text-m"
                  >
                    <MdEmojiPeople />
                    BuddyUp
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 justify-center text-semibold mt-20 text-3xl">
            {" "}
            No Buddies Found
          </p>
        )}
      </ul>
      <NavBar />
    </div>
  );
};

export default BuddyFindingPage;
