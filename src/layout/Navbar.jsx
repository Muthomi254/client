import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  // Define the theme color
  const themeColor = 'bg-skyblue';

  return (
    <nav className={`${themeColor} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>

        <div className="space-x-4">
          {isAuthenticated() ? (
            <>
              <Link to="/profile" className="text-white">
                Profile
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-grey">
                Register
              </Link>
              <Link to="/login" className="text-grey">
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
