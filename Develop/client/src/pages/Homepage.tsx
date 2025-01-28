import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
}

const Homepage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'friends' | 'settings' | 'home' | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>(() => {
    const savedFriends = localStorage.getItem('friends');
    return savedFriends ? JSON.parse(savedFriends) : [];
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeScreen === 'friends') {
      fetchUsers();
    }
  }, [activeScreen]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });      
      const fetchedUsers = Array.isArray(response.data) ? response.data : [];
      console.log('Fetched users:', fetchedUsers); // Debug log
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again later.');
    }
  };
  
  

  const addFriend = (user: User) => {
    if (!friends.some((friend) => friend.id === user.id)) {
      const updatedFriends = [...friends, user];
      setFriends(updatedFriends);
      localStorage.setItem('friends', JSON.stringify(updatedFriends));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
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
              <button onClick={() => setActiveScreen('home')} className="w-full text-left">Home</button>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <button onClick={() => setActiveScreen('friends')} className="w-full text-left">Friends</button>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <button onClick={() => setActiveScreen('settings')} className="w-full text-left">Settings</button>
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
          {activeScreen === 'home' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Welcome Home!</h2>
              <p>Explore the features of Game Find Me.</p>
            </div>
          )}

          {activeScreen === 'friends' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Friends</h2>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">All Users</h3>
                <ul className="space-y-2">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <li key={user.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                        <span>{user.username}</span>
                        <button
                          onClick={() => addFriend(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                        >
                          Add Friend
                        </button>
                      </li>
                    ))
                  ) : (
                    <p>Loading users...</p>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Friends</h3>
                <ul className="space-y-2">
                  {friends.map((friend) => (
                    <li key={friend.id} className="bg-gray-700 p-2 rounded">
                      {friend.username}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeScreen === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                  />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {!activeScreen && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Welcome to Game Find Me!</h2>
              <p>Select an option from the menu to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
