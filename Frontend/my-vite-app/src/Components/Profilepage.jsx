import "./Profilepage.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {getProfile} from "./fetchingData"
import NavBar from "./NavBar"
import EditProfileModal from "./EditProfileModal";


const Profilepage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const fetchProfile = async () => {
        const fetchedProfile = await getProfile(id);
        setProfile(fetchedProfile);
      };
      fetchProfile();
    }, [id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="profilePage">
            <NavBar />
            <div className="editProfileButton">
            <button onClick={openModal}>Edit Profile</button>
            {isModalOpen && <EditProfileModal profile={profile} onClose={closeModal}/>}
            </div>
            <h1>Profile Page</h1>
            <div className="profilePageContent">
            <img src={profile.profilePicture} alt="profile pic" className="profilePic" />
            <h2>{profile.name}{'  '}{profile.surname}</h2>
            <h3>{profile.major}</h3>
            <h3>{profile.classification}</h3>
            <h3>{profile.walkCount}</h3>
            </div>
        </div>)
}
export default Profilepage
