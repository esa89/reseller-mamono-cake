import React, { useState } from 'react';
import Slider from 'react-slick';
import ProductList from '../components/ProductList';
import FooterMenu from '../components/FooterMenu';
import WhatsappButton from '../components/WhatsappButton';
import ProductDetailModal from '../components/ProductDetailModal';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (quantity: number) => {
    if (selectedProduct) {
      const cartItem: CartItem = { product: selectedProduct, quantity };
      setCart([...cart, cartItem]);
      setSelectedProduct(null); 
    }
  };

  return (
    <div className="min-h-screen bg-pink-200">
      {/* Search Bar */}
      <div className="bg-white p-4">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Cari produk, kategori, atau kode produk"
        />
      </div>

      {/* Katalog */}
      <div className="bg-white p-4 mt-6 mx-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-2">Kategori</h2>
          <button className="text-purple-600 text-sm font-bold">Lihat Semua</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36qkTwhYVRrnrq-Uc_gKmAH7X4a2r6NKk_Q&s"
              alt="Kue Panggang"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-sm">Kue Panggang</p>
          </div>
          <div className="text-center">
            <img
              src="data:image/jpeg;base64,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"
              alt="Kue Kukus"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-sm">Kue Kukus</p>
          </div>
          <div className="text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgS_OGimU47bLx_CvEN4oOeHnShA4abp-ajQ&s"
              alt="Kue Goreng"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-sm">Kue Goreng</p>
          </div>
          <div className="text-center">
            <img
              src="https://cdn0-production-images-kly.akamaized.net/TWUnXkr1Qzy_u-pif9cwQks2i6E=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2802599/original/092026000_1557558557-iStock-1035053764.jpg"
              alt="Kue Kering"
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-sm">Kue Kering</p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="mt-4">
        <ProductList onProductClick={handleProductClick} />
      </div>

      {/* Floating whatsapp Button */}
      <WhatsappButton/>

      {/* Footer Menu */}
      <FooterMenu />

      {/* Modal Product Detail */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default HomePage;
