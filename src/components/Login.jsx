import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginImage from '../images/login-image.png'; // Import the image

const Login = () => {
  const { login, authFetch } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one special character and one uppercase letter
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+])(?=.*[A-Z])[\w!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uppercaseUsername = username.toUpperCase();

    try {
      if (!validatePassword(password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one special character and one uppercase letter.'
        );
      }

      const response = await authFetch('/login', 'POST', {
        username: uppercaseUsername,
        password,
      });
      const { access_token } = response;
      login(access_token);
      // Redirect or perform any other action upon successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-500 blur opacity-50"></div>
      <div className="flex justify-center items-center h-screen">
        <form
          className="max-w-lg mx-auto bg-blue-200 p-8 rounded-md shadow-md mt-10 flex relative z-10"
          onSubmit={handleSubmit}
        >
          <div className="mr-8">
            <img src={loginImage} alt="Login" className="h-64 rounded-lg" />{' '}
            {/* Add the image */}
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-semibold mb-6">Welcome Back!</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border border-gray-300 rounded w-full py-3 px-4 text-lg"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-gray-300 rounded w-full py-3 px-4 text-lg"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white text-lg font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4"
              type="submit"
            >
              Login
            </button>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-900 hover:text-blue-600 font-bold"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              className="block text-center py-4 text-lg mt-6 text-blue-900 hover:text-blue-600"
            >
              Register for a new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
