import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ProductListProps {
  onProductClick: (product: Product) => void;
}

const products: Product[] = [
  { name: "Lioud Matte Cake", price: "Rp.25.000", image: "/assets/kue1.png", description: "Kue matte dengan tekstur lembut dan rasa manis yang pas." },
  { name: "West Lime Evelyn", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue lemon dengan rasa segar, dibuat dari bahan berkualitas." },
  { name: "Laneige Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue spesial dengan lapisan lembut dan krim manis." },
  { name: "Milani Smooth Finish", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue dengan tekstur halus dan cita rasa premium." },
  { name: "Lioud Matte Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue matte premium untuk acara spesial." },
  { name: "Milani Smooth Finish", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue dengan tekstur halus dan cita rasa premium." },
  { name: "Lioud Matte Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue matte premium untuk acara spesial." },
];

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    onProductClick(product);  
  };

  return (
    <div className="p-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white rounded-lg shadow-lg p-2 mb-2 cursor-pointer"
          onClick={() => handleProductClick(product)}
        >
          <div className="flex items-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
            <div>
              <h3 className="text-lg font-semibold" style={{ fontSize: '15px' }}>{product.name}</h3>
              <p className="text-gray-500" style={{ fontSize: '11px' }}>{product.description}</p>
            </div>
          </div>
          <div className="bg-purple-800 text-white rounded-full px-2 py-1 font-semibold" style={{ fontSize: '12px' }}>
            {product.price}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
