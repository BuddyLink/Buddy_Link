import { getPastBuddies } from "./fetchingData";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const pastBuddies = () => {
  const { id } = useParams();
  const [pastBuddy, setPastBuddy] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const fetchPastBuddies = async () => {
      const fetchedPastBuddies = await getPastBuddies(id);
      setPastBuddy(fetchedPastBuddies);

      const initialLikes = {};
      fetchedPastBuddies.forEach((buddy) => {
        const likedKey = `${buddy.id}_${new Date(buddy.matchedAt).getTime()}`;
        initialLikes[likedKey] = false;
      });
      setLiked(initialLikes);
    };
    fetchPastBuddies();
  }, [id]);

  const toggleLike = (likedKey) => {
    setLiked((prev) => ({
      ...prev,
      [likedKey]: !prev[likedKey],
    }));
  };

  return (
    <div className="min-h-screen bg-green-50 py-6 px-4 lg:bg-gradient-to-br from-green-100 to-green-50 lg:text-l mb-15">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-2 lg:text-4xl lg:mt-4">
        Past Buddies
      </h1>
      <ul className="space-y-6 max-w-md mx-auto lg:w-200">
        {pastBuddy && pastBuddy.length > 0 ? (
          pastBuddy.map((buddy, index) => {
            const likedKey = `${buddy.id}_${new Date(
              buddy.matchedAt
            ).getTime()}`;
            return (
              <li
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 "
              >
                <img
                  src={buddy.profilePic}
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
                  <p className="font-semibold text-gray-800 ">
                    {buddy.name} {buddy.surname}
                  </p>
                  <p className="text-sm text-gray-600 lg:text-m">
                    {buddy.major}
                  </p>
                  <p className="text-sm text-gray-600 lg:text-m">
                    {buddy.classification}
                  </p>
                  <p className="text-sm text-gray-600 lg:text-m">
                    Walk Count: {buddy.walkCount}
                  </p>
                  <p className="text-sm text-gray-600 lg:text-m">
                    {new Date(buddy.matchedAt).toLocaleDateString("en-US")}
                    {"   @"}
                    {new Date(buddy.matchedAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "America/Los_Angeles",
                    })}
                  </p>
                  <div className="flex justify-center gap-3 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(likedKey);
                      }}
                      className={`text-2xl transition ${
                        liked[likedKey] ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      {liked[likedKey] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-500 justify-center text-semibold mt-20 text-3xl">
            {" "}
            No Past Buddies Found
          </p>
        )}
      </ul>
      <NavBar />
    </div>
  );
};

export default pastBuddies;
