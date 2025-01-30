import React, { useState } from 'react';

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const playerName = new URLSearchParams(window.location.search).get('player') || 'Chat Room';

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-900 text-white font-sans h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
        <img
          src="/assets/finalgamelogo.png"
           alt="Game Find Me Logo"
          className="h-auto w-24 max-w-full object-contain mr-4"
          />

          <h1 className="text-3xl font-bold">Chat with {playerName}</h1>
        </div>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Homepage
        </button>
      </header>
      <div className="max-w-3xl mx-auto mt-10 bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-700">
          <h2 className="text-lg font-semibold">Chat Room</h2>
        </div>
        <div className="p-4 h-80 overflow-y-scroll bg-gray-900">
          {messages.map((msg, idx) => (
            <div key={idx} className="p-2 mb-2 bg-blue-500 text-white rounded">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex p-4 bg-gray-700">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
          <button
            onClick={handleSend}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
