import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';


// Definisikan tipe Product
interface Product {
  name: string;
  price: string;  // Sesuaikan menjadi string karena data harga menggunakan format "Rp. xx.xxx"
  image: string;
  description: string;
}

// Definisikan data products
const products: Product[] = [
  { name: "Lioud Matte Cake", price: "Rp.25.000", image: "/assets/kue1.png", description: "Kue matte dengan tekstur lembut dan rasa manis yang pas." },
  { name: "West Lime Evelyn", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue lemon dengan rasa segar, dibuat dari bahan berkualitas." },
  { name: "Laneige Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue spesial dengan lapisan lembut dan krim manis." },
  { name: "Milani Smooth Finish", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue dengan tekstur halus dan cita rasa premium." },
  { name: "Lioud Matte Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue matte premium untuk acara spesial." },
];

const TrackingForm: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);  // Mengatur produk yang dipilih
  const [quantity, setQuantity] = useState<number>(1);  // State untuk kuantitas
  const navigate = useNavigate();

  // Fungsi untuk menghitung total harga berdasarkan kuantitas
  const calculateTotalPrice = (): string => {
    if (selectedProduct) {
      const price = Number(selectedProduct.price.replace(/[^0-9.-]+/g, "")); // Ubah format harga string menjadi angka
      return (price * quantity).toLocaleString(); // Kembalikan harga dalam format string dengan pemisah ribuan
    }
    return "0";
  };

  // Fungsi untuk navigasi ke halaman tracking page
  const handleCheckTracking = () => {
    if (selectedProduct) {
      navigate('/tracking-progres', { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Pilih Produk:</h1>

      <ul>
        {products.map((product, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className={`w-full text-left p-2 border rounded-lg ${selectedProduct === product ? 'border-blue-500' : 'border-gray-300'}`}
            >
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <>
          {/* Input untuk kuantitas */}
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Total harga */}
          <div className="mt-4">
            <span className="text-lg font-semibold">Total Harga: Rp. {calculateTotalPrice()}</span>
          </div>

          {/* Tombol untuk mengecek tracking */}
          <div className="mt-4">
            <button
              onClick={handleCheckTracking}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Cek Tracking Pesanan
            </button>
          </div>
        </>
      )}

      {!selectedProduct && <p className="mt-4 text-red-500">Tidak ada produk yang dipilih.</p>}
      <FooterMenu />
    </div>
  );
};

export default TrackingForm;