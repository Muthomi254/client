import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import registerImage from '../images/register-image.jpg'; // Import the image

const Register = () => {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one special character and one uppercase letter
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+])(?=.*[A-Z])[\w!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Phone number validation: More than 10 and less than 14 characters
    return phoneNumber.length > 10 && phoneNumber.length < 14;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { username, email, phone_number, password, confirm_password } =
        formData;

      // Validate email and phone number
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (!validatePhoneNumber(phone_number)) {
        throw new Error(
          'Phone number must be between 10 and 14 characters long.'
        );
      }

      if (!validatePassword(password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one special character and one uppercase letter.'
        );
      }

      if (password !== confirm_password) {
        throw new Error('Passwords do not match.');
      }

      // Optionally, convert the username to uppercase
      const uppercaseUsername = username.toUpperCase();

      await authFetch('/register', 'POST', {
        ...formData,
        username: uppercaseUsername,
      });
      console.log('Registration successful!');
      // Redirect or perform additional actions after successful registration
    } catch (error) {
      setError(error.message);
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-500 blur opacity-50"></div>
      <div className="flex justify-center items-center h-screen">
        <form
          className="max-w-xl w-full bg-blue-200 p-8 rounded-md shadow-md mt-10 flex relative z-10"
          onSubmit={handleRegister}
        >
          <div className="flex items-center justify-center mr-8">
            <img
              src={registerImage}
              alt="Register"
              className="h-64 rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-semibold mb-6">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      className="h-6 w-6 text-gray-700 hover:text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-gray-700 hover:text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 19a7 7 0 01-7-7m14 0a7 7 0 00-7-7m7 7a7 7 0 00-7 7m7 7a7 7 0 01-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              className="bg-white text-blue-500 hover:text-white text-sm font-bold py-2 px-4 
       rounded hover:bg-blue-600 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <Link
              to="/login"
              className="block text-center py-4 text-sm mt-6 text-blue-900 hover:text-blue-600"
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
