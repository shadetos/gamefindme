import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
}

interface Game {
  appid: number;
  name: string;
}

const Homepage: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'friends' | 'settings' | 'home' | 'favorites' | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>(() => {
    const savedFriends = localStorage.getItem('friends');
    return savedFriends ? JSON.parse(savedFriends) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeScreen === 'friends') {
      fetchUsers();
      fetchFriends();
    }
  }, [activeScreen]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };
  
  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/friends`, {
        params: { userId: localStorage.getItem('userId') },
      });
      if (Array.isArray(response.data)) {
        setFriends(response.data); // Update state with friends from backend
        localStorage.setItem('friends', JSON.stringify(response.data));
      } else {
        console.error('Invalid response format:', response.data);
        setFriends([]);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
      setFriends([]);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/steam/games`);

      if (!response.data || !Array.isArray(response.data.games)) {
        console.error('Unexpected response format:', response.data);
        setError('Invalid data received from Steam API.');
        return;
      }

      setGames(response.data.games);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to fetch games.');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (game: Game) => {
    if (!favorites.some((fav) => fav.appid === game.appid)) {
      const updatedFavorites = [...favorites, game];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const addFriend = async (user: User) => {
    try {
      if (!friends.some((friend) => friend.id === user.id)) {
        const updatedFriends = [...friends, user];
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));
  
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/add-friend`, {
          userId: localStorage.getItem('userId'),
          friendId: user.id,
        });
  
        console.log(`Friend added: ${user.username}`);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  const removeFriend = async (friend: User) => {
    try {
      const updatedFriends = friends.filter((f) => f.id !== friend.id);
      setFriends(updatedFriends);
      localStorage.setItem('friends', JSON.stringify(updatedFriends));
  
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/remove-friend`, {
        userId: localStorage.getItem('userId'),
        friendId: friend.id,
      });
  
      console.log(`Friend removed: ${friend.username}`);
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return (
    <div className="bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Game Find Me</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </header>
      <div className="flex">
        <div className="bg-gray-800 w-64 h-screen p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <ul className="space-y-2">
            <li className={`p-2 rounded ${activeScreen === 'home' ? 'bg-blue-700' : 'hover:bg-gray-700'}`}>
              <button onClick={() => setActiveScreen('home')} className="w-full text-left">Home</button>
            </li>
            <li className={`p-2 rounded ${activeScreen === 'friends' ? 'bg-blue-700' : 'hover:bg-gray-700'}`}>
              <button onClick={() => setActiveScreen('friends')} className="w-full text-left">Friends</button>
            </li>
            <li className={`p-2 rounded ${activeScreen === 'favorites' ? 'bg-blue-700' : 'hover:bg-gray-700'}`}>
              <button onClick={() => setActiveScreen('favorites')} className="w-full text-left">Favorites</button>
            </li>
          </ul>

        </div>
        <div className="flex-1 p-6">
                  {activeScreen === 'favorites' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Favorite Games</h2>
              {favorites.length === 0 ? (
                <p className="text-gray-400">No favorites added yet.</p>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {favorites.map((game) => (
                    <li key={game.appid} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                      <span>{game.name}</span>
                      <button
                        onClick={() => {
                          const updatedFavorites = favorites.filter((fav) => fav.appid !== game.appid);
                          setFavorites(updatedFavorites);
                          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeScreen === 'home' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Steam Games</h2>
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              />
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-400">Loading games...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : games.length === 0 ? (
                  <p className="text-gray-400">No games found.</p>
                ) : (
                  games
                    .filter((game) => game.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((game) => (
                      <li key={game.appid} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                        <span>{game.name}</span>
                        <button
                          onClick={() => addFavorite(game)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                        >
                          Favorite
                        </button>
                      </li>
                    ))
                )}
              </ul>
            </div>
          )}

            {activeScreen === 'friends' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Find Friends</h2>
                <ul className="space-y-2">
                  {users.length === 0 ? (
                    <p className="text-gray-400">No other users for now.</p>
                  ) : (
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
                  )}
                </ul>

                <h2 className="text-xl font-semibold mt-6">Current Friends</h2>
                <ul className="space-y-2">
                  {friends.length === 0 ? (
                    <p className="text-gray-400">No friends added yet.</p>
                  ) : (
                    friends.map((friend) => (
                      <li key={friend.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                        <span>{friend.username}</span>
                        <button
                          onClick={() => removeFriend(friend)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
