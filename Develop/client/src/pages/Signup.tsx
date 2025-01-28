import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface SignupResponse {
  message: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<SignupResponse>(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setErrorMessage(error.response?.data?.message || 'Signup failed.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white font-sans">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Sign Up
        </button>
        <p className="mt-4 text-gray-400 text-center">
          Already have an account? <a href="/" className="text-blue-500">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
