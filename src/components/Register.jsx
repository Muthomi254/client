// components/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await authFetch('/register', 'POST', formData);
      console.log('Registration successful!');
      // Redirect or perform additional actions after successful registration
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-skyblue p-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
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
          value={formData.confirm_password}
          onChange={handleInputChange}
          className="appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleRegister}
        className="bg-white text-skyblue hover:bg-skyblue text-sm font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
