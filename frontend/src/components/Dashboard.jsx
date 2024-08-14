import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchMessages();
  }, [currentPage]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const messagesData = await response.json();
      setMessages(messagesData);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const userLink = user ? `${window.location.origin}/${user.uniqueLink}` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userLink).then(
      () => {
        alert('Link copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-white">Error: {error}</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-white">No user data available</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">WhisperLink</h1>
          <button onClick={handleLogout} className="text-white hover:text-gray-300 transition duration-300">
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Welcome, {user.username}!</h2>
          <h3 className="text-xl font-semibold text-center text-gray-300 mb-4">Your Unique Link</h3>
          <p className="text-center text-gray-400 mb-4">Share this link to receive anonymous messages:</p>
          <div className="bg-gray-700 p-3 rounded text-center mb-4 break-all text-white">{userLink}</div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-purple-600 text-white p-3 rounded-lg text-lg font-semibold mt-4 hover:bg-purple-700 transition duration-300"
          >
            Copy Link
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-center text-white mb-6">Your Messages</h3>
          {currentMessages.length === 0 ? (
            <p className="text-center text-gray-400">No messages yet. Share your link to start receiving anonymous messages!</p>
          ) : (
            <ul className="space-y-4">
              {currentMessages.map((message) => (
                <li key={message._id} className="flex items-start space-x-3">
                  <div className="bg-blue-800 text-white p-4 rounded-lg shadow flex-1">
                    <p className="text-lg">{message.message}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(messages.length / messagesPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                } transition duration-300`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
