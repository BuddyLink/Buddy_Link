import { useState } from "react";
import { createNewAccount, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";

const createNewUserAccount = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [classification, setClassification] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [distancePreferences, setDistancePreferences] = useState("");
  const [majorPreferences, setMajorPreferences] = useState("");
  const [classificationPreferences, setClassificationPreferences] =
    useState("");
  const navigate = useNavigate();

  const handleProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let preferences = {};
  preferences["distance"] = distancePreferences;
  preferences["major"] = majorPreferences;
  preferences["classification"] = classificationPreferences;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      name,
      surname,
      classification,
      major,
      profilePicture,
      preferredContact,
      phone,
      walkCount: Number(0),
      passwordConfirmation,
      preferences,
    };
    const result = await createNewAccount(data);
    if (result?.success) {
      const user = await getMe();
      if (user) {
        navigate("/");
      }
    } else {
      alert(result.error || "User not created");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-[#f1fff3]  dark:bg-gray-800 rounded-2xl shadow-md p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl sm:p-10 mt-3 mb-3 dark:text-gray-600">
        <h2 className="text-2xl lg:text-4xl font-semibold text-green-800 mb-4 text-center dark:text-emerald-600">
          Create New Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
            <input
              type="text"
              required
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>
          <input
            type="text"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
          />
          <input
            type="password"
            required
            placeholder="Password (atleast 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
          />
          <input
            type="password"
            required
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
          />
          <input
            type="text"
            required
            placeholder="Major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
          />
          <select
            name="classification"
            required
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
          >
            <option className="hover: bg-green-100" value="">
              Select a Classification
            </option>
            <option className="hover: bg-green-100" value="Freshman">
              Freshman
            </option>
            <option className="hover: bg-green-100" value="Sophomore">
              Sophomore
            </option>
            <option className="hover: bg-green-100" value="Junior">
              Junior
            </option>
            <option className="hover: bg-green-100" value="Senior">
              Senior
            </option>
          </select>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-800 dark:text-gray-300">
              Upload Profile Picture :
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleProfile}
              className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:file:text-gray-300 dark:file:bg-gray-600 dark:hover:file:bg-gray-800"
            />
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-300"
                />
              </div>
            )}
          </div>
          <select
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            placeholder="Preferred Contact"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
          >
            <option className="hover: bg-green-100" value="">
              Preferred Contact Method
            </option>
            <option className="hover: bg-green-100" value="email">
              Email
            </option>
            <option className="hover: bg-green-100" value="phone">
              Phone
            </option>
          </select>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            maxLength="15"
          />
          <div className="flex items-center gap-2 mb-2 lg:gap-52">
            <h2 className="font-semibold text-green-800 dark:text-emerald-600">
              Set your pairing preferences below {" "}
            </h2>
            <div className="relative group">
              <CiCircleInfo
                size={21}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 cursor-help focus:outline-none font-semibold"
                tabIndex={0}
                aria-describedby="pref-tip"
              />
              <div
                id="pref-tip"
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-xs rounded-md px-3 py-2 text-xs leading-snug bg-[#f1fff3]  font-semibold text-emerald-900 border border-green-600 shadow-lg  opacity-0  pointer-events-none transition-opacity duration-200n group-hover:opacity-100 group-focus-within:opacity-100"
              >
                Slide each slider to show how strongly you value that preference
                for matching.
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-gray-900 text-[#f1fff3]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <label className="block text-sm font-medium text-green-800 dark:text-gray-300">
            Distance Preference :
          </label>
          <div>
            <input
              type="range"
              required
              id="distancePreference"
              min="1"
              max="100"
              value={distancePreferences}
              onChange={(e) => setDistancePreferences(e.target.value)}
              className="w-full rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>
          <label className="block text-sm font-medium text-green-800 dark:text-gray-300">
            Major Preference :
          </label>
          <div>
            <input
              type="range"
              required
              id="majorPreference"
              min="1"
              max="100"
              value={majorPreferences}
              onChange={(e) => setMajorPreferences(e.target.value)}
              className="w-full rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>
          <label className="block text-sm font-medium text-green-800 dark:text-gray-300">
            Classification Preference :
          </label>
          <div>
            <input
              type="range"
              required
              id="classificationPreference"
              min="1"
              max="100"
              value={classificationPreferences}
              onChange={(e) => setClassificationPreferences(e.target.value)}
              className="w-full rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-2 hover:bg-green-800 dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:text-gray-100"
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default createNewUserAccount;
