import { Link } from 'react-router-dom'

const BuddyFindingPage = () => {
  return (
    <div className="min-h-screen bg-gradient py-6 px-4">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-2">
        Pick a Buddy
      </h1>
      <p className="text-center text-gray-600 mb-6">
        One Step close to your destination !
      </p>
      <ul className="space-y-6 max-w-md mx-auto">
        <li className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/300"
            alt="Buddy profile"
            className="w-23 h-23 rounded-full object-cover border-2 border-green-500"
          />
          <div className="flex-1 ml-5">
            <p className="font-semibold text-gray-800 ">Tom Peter</p>
            <p className="text-sm text-gray-600"> Chemistry</p>
            <p className="text-sm text-gray-600">Senior</p>
            <p className="text-sm text-gray-600">Walk Count: 12</p>
            <div className="flex  justify-center gap-3 mt-3">
              <Link to="/match">
                <button className="bg-green-600 text-white px-4 py-0 rounded-md hover:bg-green-700 transition text-sm font-medium">
                  Send Request
                </button>
              </Link>
              <button className="bg-green-600 text-white px-4 py-0 rounded-md hover:bg-green-700 transition text-sm font-medium">
                Cancel Request
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default BuddyFindingPage
