import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import FooterMenu from '../components/FooterMenu';

interface Product {
  name: string;
  price: string;
  image: string;
  description: string;
}

interface Order {
  orderNumber: string;
  orderDate: string;
  product: Product;
  quantity: number;
  status: string;
}

const products: Product[] = [
  { name: "Lioud Matte Cake", price: "Rp.25.000", image: "/assets/kue1.png", description: "Kue matte dengan tekstur lembut." },
  { name: "West Lime Evelyn", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue lemon dengan rasa segar." },
  { name: "Laneige Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue spesial dengan lapisan lembut." },
  { name: "Milani Smooth Finish", price: "Rp.25.000", image: "/assets/kue2.png", description: "Kue dengan tekstur halus." },
  { name: "Lioud Matte Cake", price: "Rp.75.000", image: "/assets/kue1.png", description: "Kue matte premium." },
];

const orders: Order[] = [
  { orderNumber: "ORD-12345", orderDate: "2024-10-01", product: products[0], quantity: 2, status: "Belum Disetujui" },
  { orderNumber: "ORD-67890", orderDate: "2024-10-15", product: products[1], quantity: 1, status: "Disetujui" },
  { orderNumber: "ORD-11223", orderDate: "2024-10-25", product: products[2], quantity: 3, status: "Delivery" },
  { orderNumber: "ORD-44556", orderDate: "2024-10-28", product: products[3], quantity: 4, status: "Pesanan Selesai" },
  { orderNumber: "ORD-99887", orderDate: "2024-10-20", product: products[4], quantity: 2, status: "Tidak Disetujui" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Belum Disetujui": return "bg-yellow-300 text-yellow-800";
    case "Disetujui": return "bg-blue-300 text-blue-800";
    case "Tidak Disetujui": return "bg-red-300 text-red-800";
    case "Delivery": return "bg-orange-300 text-orange-800";
    case "Pesanan Selesai": return "bg-green-300 text-green-800";
    default: return "";
  }
};

const TrackingFormByProduct: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const handleCheckTracking = (order: Order) => {
    navigate('/tracking-progres', { state: { order } });
  };

  const statusOptions = [
    "Belum Disetujui",
    "Disetujui",
    "Tidak Disetujui",
    "Delivery",
    "Pesanan Selesai",
  ];

  return (
    <div className="min-h-screen bg-pink-200 p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Tracking Pesanan</h1>

      {/* Input Search dan Filter */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        {/* Input Search */}
        <input
          type="text"
          placeholder="Cari produk atau nomor pesanan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 flex-grow border border-gray-300 rounded-lg"
        />

        {/* Button Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaFilter size={20} />
          </button>

          {/* Dropdown Filter Status */}
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(selectedStatus === status ? null : status);
                    setShowFilterDropdown(false);
                  }}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
                    selectedStatus === status ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daftar Pesanan */}
      <div className="max-w-2xl mx-auto">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} className="mb-6 bg-white rounded-lg shadow-lg p-4 relative">
              <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}>
                {order.status}
              </div>
              <br></br>
              <p className="text-lg font-semibold">Nomor Order: {order.orderNumber}</p>
              <p className="text-gray-600">Tanggal Pesanan: {order.orderDate}</p>
              <div className="flex items-center mt-4">
                <img src={order.product.image} alt={order.product.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <p className="font-semibold">Nama Produk: {order.product.name}</p>
                  <p>Jumlah: {order.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleCheckTracking(order)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mt-4"
              >
                Cek Status Pesanan
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Pesanan tidak ditemukan</p>
        )}
      </div>

      <FooterMenu />
    </div>
  );
};

export default TrackingFormByProduct;
