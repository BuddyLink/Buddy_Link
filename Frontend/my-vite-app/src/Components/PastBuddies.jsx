import { getPastBuddies } from "./fetchingData";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuSearchX } from "react-icons/lu";
import { PiSmileySad } from "react-icons/pi";


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
    <div className="min-h-screen bg-green-50 lg:bg-gradient-to-br from-green-100 to-green-50 lg:text-l lg:px-8 lg:py-5 lg:mt-5 mb-15 dark:bg-gray-900 dark:lg:bg-gradient-to-br dark:lg:from-gray-900 dark:lg:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8 lg:text-5xl lg:mt-4 dark:text-emerald-400">
          Walk History
        </h1>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto ">
          {pastBuddy && pastBuddy.length > 0 ? (
            pastBuddy.map((buddy, index) => {
              const likedKey = `${buddy.id}_${new Date(
                buddy.matchedAt
              ).getTime()}`;
              return (
                <li key={index} className="h-full">
                  <article className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:scale-105 transition overflow-hidden ring-1 ring-emerald-50 dark:ring-gray-700">
                    <div className="relative h-16 md:h-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-500" />
                    <div className=" absolute -top-0 mt-5 left-6 flex justify-center">
                      <img
                        src={buddy.profilePic}
                        alt="Buddy profile"
                        className=" w-16 h-16 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-green-500"
                        loading="lazy"
                        style={{
                          maxWidth: "92px",
                          maxHeight: "92px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div className="md:pt-10 md:pb-3  lg:text-m px-6  pt-2 text-left ml-28 leading-normal">
                      <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 lg:text-xl leading-normal">
                        {buddy.name} {buddy.surname}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 lg:text-l dark:text-gray-300 lg:text-l">
                        {buddy.major}
                      </p>
                      <p className="text-xs md:text-sm  text-gray-600 lg:text-l dark:text-gray-300">
                        {buddy.classification}
                      </p>
                      <p className=" text-xs md:text-sm  text-gray-600 lg:text-l dark:text-gray-300">
                        <span className="font-semibold">Walk Count: </span>
                        {buddy.walkCount}
                      </p>
                      <p className="text-xs md:text-sm  text-gray-600 lg:text-l dark:text-gray-300">
                        {new Date(buddy.matchedAt).toLocaleDateString("en-US")}
                        {"     @"}
                        {new Date(buddy.matchedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        })}
                      </p>
                    </div>
                    <div className="flex justify-center gap-3 mt-0 mb-2 items ml-63 lg:ml-65">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(likedKey);
                        }}
                        className={`text-2xl lg:text-3xl transition ${
                          liked[likedKey] ? "text-green-500" : "text-gray-400"
                        }`}
                      >
                        {liked[likedKey] ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })
          ) : (
            <div className="block text-center">
              <div className="text-center text-gray-500 justify-center text-semibold mt-20 text-3xl lg:text-4xl border boder-green-400 shadow-lg rounded-full pt-8 px-2 py-2">
                <div className="flex flex-col">
                  <LuSearchX size={50} className="mb-0 ml-3 mt-1" />{" "}
                  <span className="ml-2">No Walk History Found</span>
                  <PiSmileySad
                    size={70}
                    className="text-center justify-center ml-40 mt-4"
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

export default pastBuddies;
