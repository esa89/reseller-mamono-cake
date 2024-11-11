import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate untuk navigasi

const FooterMenu: React.FC = () => {
  const navigate = useNavigate();
  // Deklarasi useNavigate untuk navigasi

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
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
