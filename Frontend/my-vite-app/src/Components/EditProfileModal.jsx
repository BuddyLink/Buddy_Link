import { useState } from "react";
import "./EditProfileModal.css";
import { editProfile } from "./fetchingData";

const EditProfileModal = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [classification, setClassification] = useState("");
  const [major, setMajor] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      surname,
      classification,
      major,
      profilePicture,
      preferredContact,
      phone,
    };
    await editProfile(data);
    //   onClose();
  };

  return (
    <div className="modal">
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <form className="style" onSubmit={handleSubmit}>
          <div className="formGroup">
            <h1> Edit Profile </h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
            <div className="formGroup">
              <label> Classification: </label>
              <select
                className="classification"
                name="classification"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
              >
                <option value="">Select a Classification</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Profile picture url"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
            <div className="formGroup">
              <label> Preferred Contact: </label>
              <select
                className="preferredContact"
                placeholder="Preferred Contact"
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value)}
              >
                <option value="">Select a Preferred Contact</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" className="editProfile">
              Save Changes
            </button>
            <button className="close">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
