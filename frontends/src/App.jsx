import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelDetails from './pages/HotelDetails';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import BookingDetails from './pages/BookingDetails';
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <SocketProvider>
            <div className="min-h-screen bg-gray-900">
              <Navbar />
              <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route
              path="/booking-confirmation"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
          </SocketProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
export default App;
