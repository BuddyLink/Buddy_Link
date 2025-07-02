import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProfile } from './fetchingData'
import NavBar from './NavBar'
import EditProfileModal from './EditProfileModal'
import { LiaUserEditSolid } from 'react-icons/lia'
const Profilepage = ({ setProfile, profile }) => {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile(id)
      setProfile(fetchedProfile)
    }
    fetchProfile()
  }, [setProfile, id])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const defaultAvatar = '/assets/_500W_500H.jpg'
  return (
    <div className="profilePage">
      <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col itens-center justify-start p-8">
        <div className="relative w-full max-w-md mt-10 text-center">
          <button
            onClick={openModal}
            className="absolute top-4 left-4 z-50 text-green-900 hover:scale-150 transiton-transform"
          >
            <LiaUserEditSolid size={30} />
          </button>
          {isModalOpen && (
            <EditProfileModal profile={profile} onClose={closeModal} />
          )}
          <h2 className="text-2xl font-bond text-green-900 mt-13 mb-10">
            {profile.name}
            {'  '}
            {profile.surname}
          </h2>
          <img
            src={profile.profilePicture}
            alt="profile pic"
            className="w-50 h-50 rounded-full mx-auto mt-4 object-cover border border-green-300"
            onError={(e) => {
              (e.target.onerror = null), (e.target.src = defaultAvatar)
            }}
          />
        </div>
        <div className="mt-6 text-left text-green-900 space-y-2">
          <h3 className="text-lg">
            <span className="font-bold">Major: </span>
            {profile.major}
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">Classification: </span>
            {profile.classification}
          </h3>
          <h3 className="text-lg">
            <span className="font-bold">Walk Count: </span>
            {profile.walkCount}
          </h3>
        </div>
      </div>
      <NavBar />
    </div>
  )
}
export default Profilepage
