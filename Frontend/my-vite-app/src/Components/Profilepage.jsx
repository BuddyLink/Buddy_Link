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
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-start p-8 sm:px-6 lg:px-20 lg:justify-center ">
      <div className="relative w-full max-w-5xl mt-10 text-center lg:border lg:border-green-300 lg:rounded-md">
        <div className="flex flex-col items-center text-center space-y-4">
          <button
            onClick={openModal}
            className="absolute top-4 left-4 z-50 text-green-900 hover:scale-150 transiton-transform md:text-3xl lg:items-center lg:top-15 lg:left-15 lg:scale-150 lg:hover:scale-200"
          >
            <LiaUserEditSolid size={30} />
          </button>
          {isModalOpen && (
            <EditProfileModal profile={profile} onClose={closeModal} />
          )}
          <h2 className="text-2xl font-bond text-green-900 mt-13 mb-10 sm:text-2xl md:text-4xl ">
            {profile.name}
            {'  '}
            {profile.surname}
          </h2>
          <img
            src={profile.profilePicture}
            alt="profile pic"r
            className="w-50 h-50 sm:w-65 sm:h-65 rounded-full mx-auto mt-4 object-cover border border-green-300"
            onError={(e) => {
              (e.target.onerror = null), (e.target.src = defaultAvatar)
            }}
          />
        </div>
        <div className="mt-6 text-green-900 space-y-2 lg:mb-6 lg:mt-9 ">
          <h3 className="text-lg lg:text-xl">
            <span className="font-bold">Major: </span>
            {profile.major}
          </h3>
          <h3 className="text-lg lg:text-xl">
            <span className="font-bold">Classification: </span>
            {profile.classification}
          </h3>
          <h3 className="text-lg lg:text-xl">
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
