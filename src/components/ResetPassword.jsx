import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext'; // Correct import statement
import ResetImage from '../images/reset-image.png'; // Import ResetImage

const ResetPassword = () => {
  const { authFetch } = useAuth(); // Destructure authFetch from useAuth
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    new_password: '',
    confirm_new_password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    // Password validation function
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { username, email, new_password, confirm_new_password } = formData;

      // Convert username to uppercase
      const uppercaseUsername = username.toUpperCase();

      // Validate password
      if (!validatePassword(new_password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one special character, one number, and one uppercase letter.'
        );
      }

      // Confirm passwords match
      if (new_password !== confirm_new_password) {
        throw new Error('Passwords do not match.');
      }

      // If all validations pass, proceed with password reset
      await authFetch(
        '/reset-password',
        'POST',
        { ...formData, username: uppercaseUsername }, // Converted username
        {
          'Content-Type': 'application/json',
        }
      );

      // Use SweetAlert to show a success message
      Swal.fire({
        icon: 'success',
        title: 'Password reset successful!',
        text: 'You can now login with your new password.',
      });

      // Clear form data
      setFormData({
        username: '',
        email: '',
        new_password: '',
        confirm_new_password: '',
      });
    } catch (error) {
      // Use SweetAlert to show an error message
      Swal.fire({
        icon: 'error',
        title: 'Password reset failed',
        text: error.message,
      });
      console.error('Password reset failed:', error.message);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <div className="absolute inset-0 bg-gray-500 blur opacity-50"></div>
      <form
        className="max-w-md w-full bg-blue-200 p-8 rounded-md shadow-md mt-8 relative z-10"
        onSubmit={handleSubmit}
      >
        {/* <h2 className="text-3xl font-semibold mb-6 text-center">
         Reset Password
       </h2> */}
        {error && (
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-red-500 mr-2"
            />
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {error === 'Password reset successful!' && (
          <div className="flex items-center mb-4">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 mr-2"
            />
            <p className="text-green-500">{error}</p>
          </div>
        )}
        {/* ResetImage */}
        <div className="mb-4 flex justify-center">
          <img src={ResetImage} alt="Reset Image" className="w-22 h-20" />
        </div>
        {/* ResetImage End */}
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
            htmlFor="new_password"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new_password"
              name="new_password"
              placeholder="Enter your new password"
              value={formData.new_password}
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
            htmlFor="confirm_new_password"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm_new_password"
            name="confirm_new_password"
            placeholder="Confirm your new password"
            value={formData.confirm_new_password}
            onChange={handleInputChange}
            className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          className="bg-white text-blue-500 hover:text-white text-sm font-bold py-2 px-4 
          rounded hover:bg-blue-600 rounded-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Reset Password
        </button>
        <Link
          to="/login"
          className="block text-center py-4 text-sm mt-6 text-blue-900 hover:text-blue-600"
        >
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
