import { useState } from "react";
import { editProfile } from "./fetchingData";

const editProfileModal = ({ onClose, profile }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [classification, setClassification] = useState("");
  const [major, setMajor] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editData = {
      name,
      surname,
      classification,
      major,
      profilePicture,
      preferredContact,
      phone,
    };
    const data = {};
    for (const key in editData) {
      if (editData[key]) {
        data[key] = editData[key];
      }
    }
    await editProfile(data);
    onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 top-0 left-0 w-full h-full flex flex-col items-center justify-center z-[1000] backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-green-50 dark:bg-gray-800 text-[#2e7d32] dark:text-gray-200 p-8 rounded-[12px] shadow-[0_6px_16px_rgba(0,0,0,0.2)] w-[90%] max-w-[550px] h-[75vh] overflow-y-auto scrollbar-thin text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="style" onSubmit={handleSubmit}>
          <div className="formGroup">
            <h1 className="text-3xl font-bond text-green-900 text-center mb-3 dark:text-emerald-600 ">
              {" "}
              Edit Profile{" "}
            </h1>
            <label>Name: </label>
            <input
              type="text"
              placeholder={profile.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
            />
            <label>Surname: </label>
            <input
              type="text"
              placeholder={profile.surname}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
            />
            <label>Major: </label>
            <input
              type="text"
              placeholder={profile.major}
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
            />
            <div className="formGroupC">
              <label> Classification: </label>
              <select
                name="classification"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
              >
                <option value="">Select a Classification</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <label>Upload Profile Picture :</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfile}
              className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:text-gray-300 dark:file:bg-gray-600 dark:hover:file:bg-gray-800"
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
            <div className="formGroupP">
              <label> Preferred Contact: </label>
              <select
                className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
                placeholder="Preferred Contact"
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value)}
              >
                <option value="">Select a Preferred Contact</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <label>Phone Number: </label>
            <input
              type="text"
              placeholder={profile.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border border-gray-400 bg-[#f1fff3] dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-2 hover:bg-green-800 dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:text-gray-200"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-2 hover:bg-green-800 dark:bg-emerald-500 dark:hover:bg-emerald-800 dark:text-gray-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editProfileModal;
