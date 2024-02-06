import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../images/logo.png'; // Import your logo image

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  // Define the theme color
  const themeColor = 'bg-blue-200';

  return (
    <nav className={`${themeColor} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-16 mr-4" />
          <span className="text-white text-lg font-bold">Simba</span>
        </Link>

        <div className="space-x-4">
          {isAuthenticated() ? (
            <>
              <Link
                to="/profile"
                className="text-grey hover:text-white hover:underline hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-grey hover:text-white hover:underline hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-grey text-md font-bold hover:text-white hover:underline hover:text-blue-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-grey text-md font-bold hover:text-white hover:underline hover:text-blue-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
