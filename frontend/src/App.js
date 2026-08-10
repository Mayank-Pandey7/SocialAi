import React from 'react';
// Main App router configuration with clean HMR module resolution
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage     from './pages/HomePage';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard    from './pages/Dashboard';
import Generator    from './pages/Generator';
import Trending     from './pages/Trending';
import Analyzer     from './pages/Analyzer';
import Scheduler    from './pages/Scheduler';
import Layout       from './components/Layout/Layout';

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000000', color: '#fff' }}>
        Loading...
      </div>
    );
  }
  return user ? <Layout /> : <Navigate to="/" replace />;
};

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  // Modal routes — these overlay on top of HomePage without unmounting it
  const isAuthModal = location.pathname === "/login" || location.pathname === "/register";

  if (user) {
    return (
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="dashboard"  element={<Dashboard />} />
          <Route path="generator"  element={<Generator />} />
          <Route path="trending"   element={<Trending />} />
          <Route path="analyzer"   element={<Analyzer />} />
          <Route path="scheduler"  element={<Scheduler />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  return (
    <>
      {/* HomePage always stays mounted — never unmounts during auth modal navigation */}
      <HomePage />

      {/* Auth modal overlaid on top of the live scrolled homepage */}
      {isAuthModal && (
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{ style: { background: '#1a1f2e', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.1)' } }} />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}