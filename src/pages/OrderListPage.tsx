import React from 'react';
import FooterMenu from '../components/FooterMenu';

const OrderListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-200 p-4">
      <h1 className="text-center text-2xl font-bold">Order List</h1>
      {/* Isi dengan daftar pesanan */}
      <FooterMenu />  {/* Tambahkan FooterMenu */}
    </div>
  );
};

export default OrderListPage;
