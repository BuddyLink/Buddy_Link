import { Link, useLocation } from "react-router-dom";
import { RiShieldUserFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";

const matchPage = () => {
  const location = useLocation();
  const selected = location.state;

  return (
    <div className="flex justify-center bg-gradient-to-br from-emerald-400 to-green-100  items-center min-h-screen bg-gray-100 px-4">
      {selected && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md lg:px-10 lg:py-10">
          <h1 className="text-2xl lg:text-4xl lg:mb-3 font-bold text-center text-green-700 mb-2">
            {" "}
            Buddy Match{" "}
          </h1>
          <div className="flex justify-center mb-4">
            <img
              src={selected.profilePic}
              alt="Buddy Img"
              className="w-32 h-32 lg:w-40 h-40 rounded-full object-cover"
              loading="lazy"
              style={{
                maxWidth: "160px",
                maxHeight: "160px",
                width: "auto",
                height: "auto",
              }}
            />
          </div>
          <div className=" text-left space-y-1 text-gray-700">
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
          <div className="mt-4 flex justify-center gap-5">
            <Link to="/security">
              <button className="flex items-center gap-1 bg-gray-300 text-black px-4 py-2 rounded hover:bg-green-700 transition ">
                <RiShieldUserFill />
                Sefety
              </button>
            </Link>
            <Link to="/verify">
              <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                <MdVerifiedUser />
                Verify
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default matchPage;
