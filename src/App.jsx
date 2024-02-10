import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import ProfilePage from './components/Profile';
import Logout from './components/Logout'; // Import the Logout component
import ResetPasswordPage from './components/ResetPassword';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Add more routes here for other pages */}
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
