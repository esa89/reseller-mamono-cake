import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate untuk navigasi

// Definisikan tipe Product
interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  { name: "Lioud Matte Cake", price: 25000, image: "/assets/kue1.png", description: "Kue matte dengan tekstur lembut dan rasa manis yang pas." },
  { name: "West Lime Evelyn", price: 25000, image: "/assets/kue2.png", description: "Kue lemon dengan rasa segar, dibuat dari bahan berkualitas." },
  { name: "Laneige Cake", price: 75000, image: "/assets/kue1.png", description: "Kue spesial dengan lapisan lembut dan krim manis." },
  { name: "Milani Smooth Finish", price: 25000, image: "/assets/kue2.png", description: "Kue dengan tekstur halus dan cita rasa premium." },
  { name: "Lioud Matte Cake", price: 75000, image: "/assets/kue1.png", description: "Kue matte premium untuk acara spesial." },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();  // useNavigate untuk navigasi ke halaman detail

  // Gunakan tipe Product untuk parameter produk
  const handleProductClick = (product: Product) => {
    navigate(`/cake-details`, { state: { product } });  // Kirim data produk ke halaman detail
  };

  return (
    <div className="p-4">
      {products.map((product, index) => (
        <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4 mb-4 cursor-pointer"
          onClick={() => handleProductClick(product)}>
          <div className="flex items-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.description}</p>
            </div>
          </div>
          <div className="bg-purple-800 text-white rounded-full px-4 py-2 text-lg font-semibold">
            {product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
