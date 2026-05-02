import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroAnimation from './components/IntroAnimation';
import Home from './pages/Home';
import Watch from './pages/Watch';
import CustomerLogin from './pages/auth/CustomerLogin';
import StaffLogin from './pages/auth/StaffLogin';
import AdminLogin from './pages/auth/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [introSeen, setIntroSeen] = useState(
    sessionStorage.getItem('ns_intro_seen') === 'true'
  );

  const handleIntroComplete = () => {
    sessionStorage.setItem('ns_intro_seen', 'true');
    setIntroSeen(true);
  };

  return (
    <>
      {!introSeen && <IntroAnimation onComplete={handleIntroComplete} />}
      
      {introSeen && (
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<CustomerLogin />} />
              <Route path="/staff/login" element={<StaffLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Routes - Customer & above */}
              <Route path="/home" element={
                <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/watch/:videoId" element={
                <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
                  <Watch />
                </ProtectedRoute>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
