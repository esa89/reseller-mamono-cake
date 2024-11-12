import React from 'react';
import FooterMenu from '../components/FooterMenu';
import OrderList from '../components/OrderList';



const OrderListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-200">
      {/* menu keranjang */}
        <OrderList /> 
      
      {/* Footer Menu */}
      <FooterMenu />
    </div>
  );
};

export default OrderListPage;
