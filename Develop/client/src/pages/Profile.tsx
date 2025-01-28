import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('Player1');
  const [bio, setBio] = useState('Hello! I love gaming.');

  const handleSaveChanges = () => {
    console.log('Saved changes:', { username, bio });
    // Replace with API call to save profile data
  };

  return (
    <div className="bg-gray-900 text-white font-sans h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/assets/finalgamelogo.png" alt="Game Find Me Logo" className="w-16 h-16 mr-4" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Homepage
        </button>
      </header>
      <div className="p-6">
        <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            ></textarea>
          </div>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
