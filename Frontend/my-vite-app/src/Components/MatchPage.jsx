import { Link, useLocation } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const matchPage = () => {
  const location = useLocation();
  const selected = location.state;

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      scalar: 1.5,
      colors: ["#16a34a", "#34d399", "#bbf7d0"],
    });
  }, []);

  return (
    <div className="flex justify-center bg-gradient-to-br from-emerald-400 to-green-100  items-center min-h-screen bg-gray-100 px-4 dark:from-gray-900 dark:to-gray-800 ">
      {selected && (
        <div className="bg-gradient-to-b from-emerald-100 via-emerald-200 to-green-100 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-500 rounded-lg shadow-lg p-6 w-full max-w-md lg:px-15 lg:py-15  dark:text-gray-200">
          <h1 className="text-2xl lg:text-4xl lg:mb-3 font-bold text-center text-green-700  mb-2 dark:text-gray-100">
            {" "}
            Buddy Match{" "}
          </h1>
          <article className="relative bg-white lg:h-110 dark:bg-gray-800 rounded-3xl shadow-md hover:scale-105 transition overflow-hidden ring-1 ring-emerald-50 dark:ring-gray-700 mt-9">
            <div className="relative h-20 md:h-25 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 dark:from-emerald-700 dark:via-emerald-600 dark:to-green-500" />
            <div className=" absolute -top-0 mt-5 left-6 flex justify-center text-center lg:ml-13 lg:mt-5 ml-10  ">
              <img
                src={selected.profilePic}
                alt="Buddy Img"
                className="w-32 h-32 lg:w-45 lg:h-45 rounded-full object-cover"
                loading="lazy"
                style={{
                  maxWidth: "160px",
                  maxHeight: "160px",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
            <div className=" text-left space-y-1 text-gray-700 dark:text-gray-300 lg:text-l mt-25 ml-4">
              <p>
                <span className="font-semibold"> Name: </span> {selected.name}{" "}
                {selected.surname}
              </p>
              <p>
                <span className="font-semibold">WalkCount: </span>{" "}
                {selected.walkCount}
              </p>
              <p>
                <span className="font-semibold">Preferred Contact: </span>{" "}
                {selected.preferredContact}
              </p>
              <p>
                <span className="font-semibold">Details: </span>{" "}
                {selected.email || selected.phone}
              </p>
              <p>
                <span className="font-semibold">Meeting Time: </span>{" "}
                {new Date(selected.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "UTC",
                })}
              </p>
            </div>
            <div className="mt-4 flex justify-center gap-5 lg:mb-5 mb-3">
              <Link to="/security">
                <button className="flex items-center gap-1 bg-gray-300 text-black px-3 py-1 lg:px-4 lg:py-2 rounded hover:bg-gray-700 transition dark:bg-gray-400 dark:gray-200 lg:text-xl">
                  <RiShieldUserFill />
                  Safety
                </button>
              </Link>
              <Link to="/verify">
                <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 lg:px-4 lg:py-2 rounded hover:bg-green-700 transition dark:bg-emerald-500 dark:hover:bg-emerald-700 lg:text-xl">
                  <MdVerifiedUser />
                  Verify
                </button>
              </Link>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default matchPage;
