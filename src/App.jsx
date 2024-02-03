// src/App.jsx
import React from 'react';
import Register from './components/Register';
// import Login from './components/Login';
// import Logout from './components/Logout';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Register />
        {/* <Login />
        <Logout /> */}
      </div>
    </AuthProvider>
  );
};

