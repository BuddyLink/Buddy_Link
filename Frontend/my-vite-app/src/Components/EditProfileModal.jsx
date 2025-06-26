import { useState } from "react";
import "./EditProfileModal.css";
import { editProfile } from "./fetchingData";

const EditProfileModal = ({onClose,profile}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [classification, setClassification] = useState("");
  const [major, setMajor] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const edtiData = {
      name,
      surname,
      classification,
      major,
      profilePicture,
      preferredContact,
      phone,
    };
    const data ={}
    for (const key in edtiData) {
      if (edtiData[key]) {
        data[key] = edtiData[key];
      }
    }
    await editProfile(data);
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <form className="style" onSubmit={handleSubmit}>
          <div className="formGroup">
            <h1> Edit Profile </h1>
            <label>Name: </label>
            <input
              type="text"
              placeholder= {profile.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Surname: </label>
            <input
              type="text"
              placeholder= {profile.surname}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label>Major: </label>
            <input
              type="text"
              placeholder= {profile.major}
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
            <label>ProfilePictureUrl: </label>
            <input
              type="text"
              placeholder= {profile.profilePicture}
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
            <label>Phone: </label>
            <input
              type="text"
              placeholder={profile.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" className="editProfile">
              Save Changes
            </button>
            <button className="close" onClick={onClose}>
                Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
