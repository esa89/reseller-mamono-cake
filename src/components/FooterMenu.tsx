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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
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

        {/* Tombol untuk Tracking menggunakan gambar ikon dengan animasi hover */}
        <button
          className="flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110 hover:opacity-80 "
          onClick={() => navigate('/tracking')}
        >
          <img 
            src="/assets/icon/tracking.png" 
            alt="Tracking" 
            className="w-8 h-8"
          />
        </button>
      </div>
    </div>
  );
};

export default FooterMenu;
