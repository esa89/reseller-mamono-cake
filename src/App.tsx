import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';  
import CakeDetailPage from './pages/CakeDetailPage';  
import OrderListPage from './pages/OrderListPage';  
import TrackingPage from './pages/TrackingPage';  

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />  {/* Redirect dari "/" ke "/home" */}
        <Route path="/home" element={<HomePage />} />  {/* Halaman Home sebagai halaman default */}
        <Route path="/login" element={<LoginForm />} />  {/* Route untuk login */}
        <Route path="/order-list" element={<OrderListPage />} />  {/* Halaman Order List */}
        <Route path="/tracking" element={<TrackingPage />} />  {/* Halaman Tracking */}
        <Route path="/cake-details" element={<CakeDetailPage />} />  {/* Halaman Detail Produk */}
      </Routes>
    </Router>
  );
};

export default App;
