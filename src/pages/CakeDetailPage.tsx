import React from 'react';
import { useLocation } from 'react-router-dom';  // Mengambil data produk dari state
import FooterMenu from '../components/FooterMenu';

// Definisikan tipe Product di sini juga
interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
}

const CakeDetailPage: React.FC = () => {
  const location = useLocation();
  const { product } = location.state as { product: Product };  // Definisikan tipe untuk state produk





  return (
    <div className="min-h-screen bg-pink-200 p-4">
      {/* Header */}
      <div className="text-center py-4 text-2xl font-bold text-pink-800">CAKE DETAILS</div>

      {/* Gambar Produk */}
      <div className="flex justify-center mb-4">
        <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-lg" />
      </div>

      {/* Detail Produk */}
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold text-pink-800">{product.name}</h3>
        <p className="text-gray-700">{product.description}</p>

        {/* Harga dan Kuantitas */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-pink-800 text-xl font-bold">Price: {product.price}</div>
          <div className="flex items-center">
            <button className="text-pink-800 font-bold px-2">-</button>
            <input type="text" className="w-10 text-center border border-gray-300 rounded-md" defaultValue="1" />
            <button className="text-pink-800 font-bold px-2">+</button>
          </div>
        </div>

        {/* Tombol Tambah ke Keranjang */}
        <div className="mt-6">
          <button className="w-full bg-pink-800 text-white py-2 rounded-lg font-bold">Add to Cart</button>
        </div>
        {/* Footer Menu */}
        <FooterMenu />
      </div>
    </div>
  );
};

export default CakeDetailPage;
