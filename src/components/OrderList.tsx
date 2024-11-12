import React, { useEffect, useState } from 'react';

interface listOrder{
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialListOrder: listOrder[] = [
  { name: "Lioud Matte Cake", price: 25000, image: "/assets/kue1.png", quantity : 1 },
  { name: "West Lime Evelyn", price: 75000, image: "/assets/kue2.png", quantity : 2 },
  { name: "Laneige Cake", price: 55000, image: "/assets/kue1.png", quantity : 2 },
  { name: "Milani Smooth Finish", price: 25000, image: "/assets/kue2.png",  quantity : 1 },
  { name: "Lioud Matte Cake", price: 45000, image: "/assets/kue1.png", quantity : 2 },
];


const OrderList: React.FC = () => {
  const [listOrder, setListOrder] = useState<listOrder[]>(initialListOrder);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const userID = 234



  const increaseQuantity = (index: number) => {
    setListOrder(prevListOrder =>
      prevListOrder.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index: number) => {
    setListOrder(prevListOrder =>
      prevListOrder.map((item, i) =>
        i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  }

  const handleDelete = () => {
    const confirmed = window.confirm('apakah anda yakin ingin menghapus produk ini?');
    if (confirmed) {
      alert('data berhasil terhapus')
    }
  }

  const handleSelectedOrder = (index:number) => {
    setSelectedOrders(prevSelected =>
      prevSelected.includes(index)
      ? prevSelected.filter(i=>i !== index)
      : [...prevSelected, index]
    )
  }

  const getTotal = () => {
    return selectedOrders.reduce((total,index) =>{
      const item = listOrder[index]
      return total + item.price *item.quantity
    },0)
  }

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.slice(0, length) + '...'; 
    }
    return text;
  };

  const handleCheckout = () => {
    if(selectedOrders.length < 1){
      alert('silahkan pilih produk terlebih dahulu')
      return
    }

    const confirmed = window.confirm("apakah anda yakin ingin Checkout barang ini?")

    if(confirmed){
      alert('barang sudah di checkout silahkan lihat di tracking')
    }
  }

  useEffect(() => {
    const setCart = localStorage.getItem(`cart_${userID}`);

    if(setCart){
      setListOrder(JSON.parse(setCart))
    }
  },[])

  
  return (
    <div className="mb-10">
      <div className="sticky top-0 z-10 w-full bg-white p-4 shadow-md mb-4">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-lg font-bold">Keranjang Saya {listOrder.length < 1 ? "":`(${listOrder.length})`}</h1>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-lg font-bold text-gray-800">
            Total: {formatRupiah(getTotal())}
          </div>
          <button
            onClick={() => handleCheckout()}
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-purple-700 transition duration-200"
          >
            Checkout {selectedOrders.length < 1 ? " " : `[${selectedOrders.length}]`}
          </button>
        </div>
      </div>

      
      {listOrder.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-center text-lg text-gray-600">Keranjang masih kosong</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mx-4 justify-items-center">
          {listOrder.map((order, index) => (
            <div key={index} className="flex items-start bg-white rounded-xl shadow-lg p-4 w-full max-w-md">
              <div className="flex mt-6 items-center mr-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 focus:ring-2 focus:ring-opacity-50 mt-1" 
                  checked={selectedOrders.includes(index)}
                  onChange={() => handleSelectedOrder(index)}
                  />
              </div>
              <img
                src={order.image}
                alt={order.name}
                className="w-20 h-20 object-cover rounded-md shadow-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-md font-semibold text-gray-800 mb-1">{truncateText(order.name,16)}</h3>
                <p className="text-sm font-bold text-gray-900 mb-1">{formatRupiah(order.price)}</p>
                <div className="flex items-center">
                  <div className="flex items-center border border-gray-300 rounded-lg px-2">
                    <button onClick={() => decreaseQuantity(index)} className="text-gray-500">-</button>
                    <input
                      type="text"
                      value={order.quantity}
                      readOnly
                      className="w-8 text-center mx-1 bg-white"
                    />
                    <button onClick={() => increaseQuantity(index)} className="text-gray-500">+</button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={()=>handleDelete()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9L14.394 18m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;