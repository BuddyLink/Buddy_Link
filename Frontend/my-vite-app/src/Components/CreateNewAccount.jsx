import { useState } from 'react'
import { createNewAccount, getMe } from './fetchingData'
import { useNavigate } from 'react-router-dom'

const CreateNewAccount = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [major, setMajor] = useState('')
  const [classification, setClassification] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [preferredContact, setPreferredContact] = useState('')
  const [phone, setPhone] = useState('')
  const [passwordConfirmation,setPasswordConfirmation] = useState('')
  const navigate = useNavigate()

  const handleProfile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setProfilePicture(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    }
    const result = await createNewAccount(data)
    if (result?.success) {
      const user = await getMe()
      if (user) {
        navigate('/')
      }
    } else {
      alert(result.error || 'User not created')
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-[#f1fff3] rounded-2xl shadow-md p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl sm:p-10 mt-3 mb-3 ">
        <h2 className="text-2xl lg:text-4xl font-semibold text-green-800 mb-4 text-center">
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
              className="p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
            />
            <input
              type="text"
              required
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
            />
          </div>
          <input
            type="text"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
          />
          <input
            type="password"
            required
            placeholder="Password (atleast 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
          />
          <input
            type="password"
            required
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
          />
          <input
            type="text"
            required
            placeholder="Major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
          />
          <select
            name="classification"
            required
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <label className="block text-sm font-medium text-green-800">
              Upload Profile Picture :
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleProfile}
              className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
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
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] text-gray-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Preferred Contact"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value)}
          >
            <option className="hover: bg-green-100" value="">
              Select a Preferred Contact
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
            className="w-full p-2 rounded-md border border-gray-400 bg-[#f1fff3] placeholder-gray-500"
            maxLength="15"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md mt-2 hover:bg-green-800"
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewAccount
