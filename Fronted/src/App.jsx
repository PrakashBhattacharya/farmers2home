import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Fruits from './pages/Fruits';
import Vegetables from './pages/Vegetables';
import Grains from './pages/Grains';
import FarmerDashboard from './pages/FarmerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import OrderHistory from './pages/OrderHistory';
import FarmerOrders from './pages/Farmer.Order';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/category/fruits" element={<Fruits />} />
          <Route path="/category/vegetables" element={<Vegetables />} />
          <Route path="/category/grains" element={<Grains />} />

          {/* Farmer Routes */}
          <Route
            path="/FarmerDashboard"
            element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FarmerOrders"
            element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerOrders />
              </ProtectedRoute>
            }
          />

          {/* Customer Routes */}
          <Route
            path="/CustomerDashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderHistory"
            element={
              <ProtectedRoute requiredRole="customer">
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;