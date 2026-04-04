import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage     from './pages/HomePage';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard    from './pages/Dashboard';
import Generator    from './pages/Generator';
import Trending     from './pages/Trending';
import Analyzer     from './pages/Analyzer';
import Scheduler    from './pages/Scheduler';
import Layout       from './components/Layout/Layout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#060912', color:'#fff' }}>Loading...</div>;
  return user ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/"         element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
      <Route path="/login"    element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard"  element={<Dashboard />} />
        <Route path="generator"  element={<Generator />} />
        <Route path="trending"   element={<Trending />} />
        <Route path="analyzer"   element={<Analyzer />} />
        <Route path="scheduler"  element={<Scheduler />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ style: { background:'#1a1f2e', color:'#e5e7eb', border:'1px solid rgba(255,255,255,0.1)' } }} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
