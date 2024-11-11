import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate untuk navigasi

const FooterMenu: React.FC = () => {
  const navigate = useNavigate();  // Deklarasi useNavigate untuk navigasi

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
      <div className="flex justify-around py-2">
        
        {/* Tombol untuk Home */}
        <button
          className="flex flex-col items-center focus:outline-none hover:text-pink-500 active:text-pink-700 transition duration-300"
          onClick={() => navigate('/home')}
        >
          <i className="fas fa-home text-xl"></i>
          <p className="text-sm">Home</p>
        </button>

        {/* Tombol untuk Order List */}
        <button
          className="flex flex-col items-center focus:outline-none hover:text-pink-500 active:text-pink-700 transition duration-300"
          onClick={() => navigate('/order-list')}
        >
          <i className="fas fa-list-alt text-xl"></i>
          <p className="text-sm">Order List</p>
        </button>

        {/* Tombol untuk Tracking */}
        <button
          className="flex flex-col items-center focus:outline-none hover:text-pink-500 active:text-pink-700 transition duration-300"
          onClick={() => navigate('/tracking')}
        >
          <i className="fas fa-truck text-xl"></i>
          <p className="text-sm">Tracking</p>
        </button>

      </div>
    </div>
  );
};

export default FooterMenu;
