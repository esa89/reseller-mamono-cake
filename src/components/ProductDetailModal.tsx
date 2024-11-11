import React, { useState } from 'react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void; 
  product: {
    name: string;
    description: string;
    price: string;
    image: string;
  };
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, onAddToCart, product }) => {
  const [quantity, setQuantity] = useState(1); 

  if (!isOpen) return null;

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity((prevQuantity) =>
      type === 'increase' ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-3/4 md:w-1/2 lg:w-1/3">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">X</button>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
        <h2 className="text-xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-purple-600 font-bold mt-2">{product.price}</p>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => handleQuantityChange('decrease')}
            className="bg-gray-200 px-3 py-1 rounded-l"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => handleQuantityChange('increase')}
            className="bg-gray-200 px-3 py-1 rounded-r"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onAddToCart(quantity)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-4 mx-auto block"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
