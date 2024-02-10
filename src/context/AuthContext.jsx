// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);

//   const login = (token) => {
//     setAuthToken(token);
//   };

//   const logout = () => {
//     setAuthToken(null);
//   };

//   const isAuthenticated = () => !!authToken;

//   const authFetch = async (url, method = 'GET', data = null, headers = {}) => {
//     const requestOptions = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: authToken ? `Bearer ${authToken}` : '',
//         ...headers,
//       },
//       body: data ? JSON.stringify(data) : undefined,
//     };

//     const response = await fetch(url, requestOptions);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message);
//     }

//     return response.json();
//   };

//   const value = {
//     login,
//     logout,
//     isAuthenticated,
//     authFetch,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  const isAuthenticated = () => !!authToken;

  // Include the database URL in the authFetch function
  const authFetch = async (url, method = 'GET', data = null, headers = {}) => {
    // Append the database URL to the provided URL
    const apiUrl = `http://127.0.0.1:5000${url}`;

    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  };

  const value = {
    login,
    logout,
    isAuthenticated,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
