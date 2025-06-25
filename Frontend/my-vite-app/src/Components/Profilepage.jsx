import "./Profilepage.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {getProfile} from "./fetchingData"
import NavBar from "./NavBar"


const Profilepage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
      const fetchProfile = async () => {
        const fetchedProfile = await getProfile(id);
        setProfile(fetchedProfile);
      };
      fetchProfile();
    }, [id]);
    return (
        <div className="profilePage">
            <NavBar />
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
