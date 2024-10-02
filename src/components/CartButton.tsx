import React from 'react';

const CartButton: React.FC = () => {
  return (
    <button className="fixed bottom-16 right-4 bg-purple-800 text-white p-4 rounded-full shadow-lg focus:outline-none">
      <i className="fas fa-shopping-cart"></i>
      <span className="absolute top-0 right-0 bg-red-500 rounded-full text-white px-2 text-xs">2</span>
    </button>
  );
};

export default CartButton;
