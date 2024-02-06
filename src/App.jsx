// // src/App.jsx
// import React from 'react';
// // import Register from './components/Register';
// import Login from './components/Login';
// // import Logout from './components/Logout';
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       {' '}
//       {/* Wrap the app with AuthProvider */}
//       <div >

//         {/* <Register /> */}
//         <Login />
//         {/* <Logout />  */}
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

// import React from 'react';
// import Login from './components/Login'; // Import the Login component
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       {/* Wrap the app with AuthProvider */}
//       <div>
//         {/* Render the Login component */}
//         <Login />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add more routes here for other pages */}
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
