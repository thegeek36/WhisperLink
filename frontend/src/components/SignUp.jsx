import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const isDarkMode = localStorage.getItem('darkMode') === 'true';
  //   setDarkMode(isDarkMode);
  // }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const userData = {
      email,
      username,
      password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Sign up successful', data);
        alert('Sign up successful! Please log in.');
        // Redirect to login page here
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sign up failed: An unexpected error occurred');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-600 via-pink-500 to-red-500'}`}>
      <div className={`bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-end mb-4">
          {/* <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
          >
            {darkMode ? '🌞' : '🌙'}
          </button> */}
        </div>
        <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Join WhisperLink</h2>
        <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Create your account and start receiving anonymous messages</p>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={`w-full p-3 border rounded-md mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'}`}
              required 
            />
          </div>
          <div className="mb-4">
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className={`w-full p-3 border rounded-md mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'}`}
              required 
            />
          </div>
          <div className="mb-6">
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={`w-full p-3 border rounded-md mt-1 focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'}`}
              required 
            />
          </div>
          <button 
            type="submit" 
            className={`w-full p-3 rounded-md text-white font-semibold transition-colors duration-300 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-500'}`}>
              Log in
            </Link>
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            By signing up, you agree to our{' '}
            <a href="#" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-500'}`}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-500'}`}>Privacy Policy</a>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            🔒 Your data is safe and secure with us. We prioritize your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;