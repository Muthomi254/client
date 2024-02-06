import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our App</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Started
        </Link>
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
