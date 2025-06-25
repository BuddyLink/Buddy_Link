import "./CreateNewAccount.css";
import { useState } from "react";
import { createNewAccount, getMe } from "./fetchingData";
import { useNavigate } from "react-router-dom";

const CreateNewAccount = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [classification, setClassification] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

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
      phone: Number(phone),
      walkCount: Number(0),
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
    <div className="CreateNewAccount">
      <h1>Create New Account</h1>
      <form className="user-form" onSubmit={handleSubmit}>
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password (atleast 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <div className="form-group">
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
        <div className="form-group">
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
        <button type="submit">Create New Account</button>
      </form>
    </div>
  );
};
export default CreateNewAccount;
