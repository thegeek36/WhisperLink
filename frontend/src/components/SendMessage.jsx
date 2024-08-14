import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SendMessage() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const { uniqueLink } = useParams();
  const [placeholder, setPlaceholder] = useState('');

  const funnyPlaceholders = [
    "Spill the beans, but don't make a mess...",
    "Whisper your secrets to the void (and maybe a friend)...",
    "Tell them what you really think, we won't judge (much)...",
    "Unleash your inner gossip, anonymously of course...",
    "Confess your love for pineapple on pizza, we won't tell..."
  ];

  useEffect(() => {
    // Fetch the username associated with the uniqueLink
    const fetchUsername = async () => {
      try {
        const response = await fetch(`https://whisperlink-gf99.onrender.com/api/user/${uniqueLink}`);
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
    setPlaceholder(funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]);
  }, [uniqueLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://whisperlink-gf99.onrender.com/api/${uniqueLink}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        alert('Message sent successfully! Your secret is safe with us... maybe.');
        setMessage('');
        setPlaceholder(funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. The cosmic rays must be interfering again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-2">Psst... Got a secret?</h2>
        <p className="mb-6 text-gray-300">Send an anonymous message to {username}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder={placeholder}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Send Secret Message
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-2">Want your own secret inbox?</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up now and join the gossip train! 🚂💨
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
