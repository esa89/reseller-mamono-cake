import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';  // Import halaman Home
import CakeDetailPage from './pages/CakeDetailPage';  // Halaman Detail Produk
import OrderListPage from './pages/OrderListPage';  // Import halaman Order List
import TrackingPage from './pages/TrackingPage';  
import TrackingFormByProduct from './components/TrackingFormByProduct';  

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />  {/* Halaman login */}
        <Route path="/home" element={<HomePage />} />  {/* Halaman Home sebagai halaman default */}
        <Route path="/login" element={<LoginForm />} />  {/* Route untuk login */}
        <Route path="/order-list" element={<OrderListPage />} />  {/* Halaman Order List */}
        <Route path="/tracking" element={<TrackingFormByProduct />} />  {/* Halaman Tracking */}
        <Route path="/tracking-progres" element={<TrackingPage />} />  {/* Halaman Tracking */}
        <Route path="/cake-details" element={<CakeDetailPage />} />  {/* Halaman Detail Produk */}
      </Routes>
    </Router>
  );
};

export default App;
