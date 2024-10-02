import React from 'react';
import ProductList from '../components/ProductList';  // Import ProductList
import FooterMenu from '../components/FooterMenu';  // Import FooterMenu
import CartButton from '../components/CartButton';  // Import CartButton

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-200">
      {/* Header */}
      <div className="bg-purple-800 text-white text-center py-4 text-xl font-bold">Product List</div>
      
      {/* Product List */}
      <ProductList />

      {/* Floating Cart Button */}
      <CartButton />

      {/* Footer Menu */}
      <FooterMenu />
    </div>
  );
};

export default HomePage;
