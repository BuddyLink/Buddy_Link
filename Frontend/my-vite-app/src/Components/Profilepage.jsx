import "./Profilepage.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {getProfile} from "./fetchingData"
import NavBar from "./NavBar"
import EditProfileModal from "./EditProfileModal";
import Header from "./Header";
import Footer from "./Footer";
import { LiaUserEditSolid } from "react-icons/lia";


const Profilepage = ({setProfile, profile}) => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const fetchProfile = async () => {
        const fetchedProfile = await getProfile(id);
        setProfile(fetchedProfile);
      };
      fetchProfile();
    }, [setProfile, id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="profilePage">
            <Header />
            <NavBar/>
            <div className="profilePageContainer">
            <div className="profilePageContent">
            <div className="editProfileButton">
            <button onClick={openModal} className="iconBtn"><LiaUserEditSolid /></button>
            {isModalOpen && <EditProfileModal profile={profile} onClose={closeModal}/>}
            </div>
            <h1 className="page">Profile Page</h1>
            <div className="profilePageContentDetails">
            <img src={profile.profilePicture} alt="profile pic" className="profilePic" />
            <h2>{profile.name}{'  '}{profile.surname}</h2>
            <h3>Major: {profile.major}</h3>
            <h3>Classification: {profile.classification}</h3>
            <h3>Walk Count: {profile.walkCount}</h3>
            </div>
            </div>
            </div>
            <Footer />
        </div>)
}
export default Profilepage
