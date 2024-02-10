import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Swal from 'sweetalert2';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'You will be redirected to the login page',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        // Additional actions after logout if needed
      }
    });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default Logout;
