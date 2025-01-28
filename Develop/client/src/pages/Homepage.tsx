import React from 'react';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
    const handleLogout = () => {
      console.log('Logged out');
    };
  
    return (
      <div className="bg-gray-900 text-white font-sans">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/assets/finalgamelogo.png" alt="Game Find Me Logo" className="w-24 h-24 mr-4" />
            <h1 className="text-3xl font-bold">Game Find Me</h1>
          </div>
        </header>
        <div className="flex">
          <div className="bg-gray-800 w-64 h-screen p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li className="p-2 bg-blue-700 rounded">
                <Link to="/home">Home</Link>
              </li>
              <li className="p-2 rounded hover:bg-gray-700">
                <Link to="/friends">Friends</Link>
              </li>
              <li className="p-2 rounded hover:bg-gray-700">
                <Link to="/settings">Settings</Link>
              </li>
              <li
                onClick={handleLogout}
                className="p-2 rounded hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Online Friends</h2>
              {/* Add dynamic list rendering */}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Find Players</h2>
              {/* Add dynamic list rendering */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Homepage;
