import React from 'react';
import FooterMenu from '../components/FooterMenu';

const TrackingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-200 p-4">
      <h1 className="text-center text-2xl font-bold">Tracking</h1>
      {/* Isi dengan informasi pelacakan */}
      <FooterMenu />  {/* Tambahkan FooterMenu */}
    </div>
  );
};

export default TrackingPage;
