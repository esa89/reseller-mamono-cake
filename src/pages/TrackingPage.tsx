import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  approvedDate?: string;
  deliveryDate?: string;
  completedDate?: string;
}

const TrackingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Data pesanan tidak ditemukan</h1>
        <button
          onClick={() => navigate('/tracking')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    );
  }

  const { product } = order;
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(order.confirmationStatus || '');
  const handleConfirmation = (status: string) => {
    setConfirmationStatus(status);
    order.confirmationStatus = status;
    setIsDialogOpen(false);
  };

  // Fungsi untuk menambahkan 1 hari ke tanggal yang diberikan
  const getNextDate = (date: string): string => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0];
  };

  // Menetapkan tanggal status secara otomatis jika belum ada
  const approvedDate = order.approvedDate || getNextDate(order.orderDate);
  const deliveryDate = order.deliveryDate || getNextDate(approvedDate);
  const completedDate = order.completedDate || getNextDate(deliveryDate);

  // Membuat array `steps` berdasarkan status pesanan
  const steps = [
    {
      step: 1,
      label: 'Belum Disetujui',
      description: `Pesanan ${product.name} Anda belum disetujui.`,
      details: 'Menunggu konfirmasi dari penjual.',
    },
    {
      step: 2,
      label: 'Disetujui',
      description: `Pesanan ${product.name} Anda telah disetujui.`,
      details: 'Pesanan akan segera diproses.',
      date: approvedDate,
    },
    {
      step: 2,
      label: 'Tidak Disetujui',
      description: `Pesanan ${product.name} Anda tidak disetujui.`,
      details: 'Hubungi penjual untuk detail lebih lanjut.',
    },
    {
      step: 3,
      label: 'Delivery',
      // description: `Pesanan ${product.name} akan dikirim, tolong konfimasi metoder pengirimannya`,
      // details: 'Pesanan sedang dalam perjalanan ke alamat Anda.',
      date: deliveryDate,
    },
    {
      step: 4,
      label: 'Pesanan Selesai',
      description: `Pesanan ${product.name} telah selesai.`,
      details: 'Terima kasih telah berbelanja dengan kami!',
      date: completedDate,
    },
  ];

  // Memfilter langkah-langkah berdasarkan status pesanan menggunakan if
  const filteredSteps = steps.filter((step) => {
    if (order.status === 'Belum Disetujui') {
      return step.step === 1 || step.step === 1;
    }

    if (order.status === 'Disetujui') {
      return step.step === 1 || step.label === 'Disetujui';
    }

    if (order.status === 'Tidak Disetujui') {
      return step.step === 1 || step.label === 'Tidak Disetujui';
    }

    if (order.status === 'Delivery') {
      return step.step === 1 || step.label === 'Disetujui' || step.step === 3;
    }

    if (order.status === 'Pesanan Selesai') {
      return step.step === 1 || step.label === 'Disetujui' || step.step === 3 || step.step === 4; // Tampilkan semua langkah
    }

    return false; // Jika status tidak dikenal, jangan tampilkan langkah
  });


  const toggleStep = (step: number) => {
    setActiveStep((prevStep) => (prevStep === step ? null : step));
  };

  return (
    <div className="min-h-screen bg-pink-200 p-4">
      <h1 className="text-center text-2xl font-bold mb-8">Tracking Pesanan</h1>
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Stepper */}
        <ol className="space-y-8">
          {filteredSteps.map((step, index) => (
            <li key={index} className="relative flex-1">
              {/* Step Header */}
              <div
                className="flex items-start font-medium w-full cursor-pointer"
                onClick={() => toggleStep(step.step)}
              >
                {/* Step Number */}
                <span
                  className={`w-8 h-8 aspect-square ${
                    activeStep >= step.step ? 'bg-indigo-600' : 'bg-gray-300'
                  } rounded-full flex justify-center items-center mr-3 text-sm text-white`}
                >
                  {step.step}
                </span>
                {/* Step Label & Description */}
                <div>
                  <h4
                    className={`text-base ${
                      activeStep >= step.step ? 'text-indigo-600' : 'text-gray-600'
                    } mb-2`}
                  >
                    {step.label}
                  </h4>
                  {/* Step Content */}
                  {activeStep === step.step && (
                    <div
                      className={`overflow-hidden transition-all ease-in-out duration-300 ${
                        activeStep === step.step ? 'max-h-screen' : 'max-h-0'
                      }`}
                    >
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <p className="text-sm font-bold text-gray-600">{step.details}</p>

                      {/* Konten tambahan yang diminta */}
                      <div className="mt-4">
                        <p className="text-lg font-semibold">Nomor Order: {order.orderNumber}</p>
                        <p className="text-gray-600">Tanggal Pesanan: {order.orderDate}</p>
                        {/* Tampilkan tanggal jika ada */}
                        {step.date && (
                          <p className="text-gray-600">
                            Tanggal status {step.label} : {step.date}
                          </p>
                        )}
                        <div className="flex items-center mt-4">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="w-24 h-24 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <p className="font-semibold">Nama Produk: {order.product.name}</p>
                            <p>Jumlah: {order.quantity}</p>
                          </div>
                        </div>
                        {/* Tambahan Dialog Konfirmasi */}
                        {step.label === 'Delivery' && !confirmationStatus && (
                          <>
                            {/* Teks keterangan sebelum tombol konfirmasi */}
                            <p className="text-sm text-gray-600">
                              <br></br>
                              Catatan :<br></br>
                              <p className="text-sm text-red-600">Pesanan {product.name} akan dikirim, tolong konfirmasi metode pengirimannya</p>
                            </p>
                            
                            {/* Tombol Konfirmasi Pengiriman */}
                            <button
                              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                              onClick={() => setIsDialogOpen(true)}
                            >
                              Konfirmasi Pengiriman
                            </button>
                          </>
                        )}

                        {/* Menampilkan Konten Berdasarkan Konfirmasi */}
                          {step.label === 'Delivery' && confirmationStatus && (
                            <>
                              {confirmationStatus === 'Diambil Sendiri' && (
                                <div className="mt-4">
                                  {/* Pesan konfirmasi pengambilan sendiri */}
                                  <p className="text-green-600 font-semibold">
                                    Pesanan {order.product.name} akan {confirmationStatus}. Silakan ambil pesanan di toko kami.
                                  </p>

                                  {/* Embed Google Maps (tanpa API key) */}
                                  <div className="mt-4">
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63370.06727066581!2d107.8234697!3d-7.2274336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bbf26ebefb5d%3A0x8bb0f02f4f5ccaf3!2sMamono%20cake%202!5e0!3m2!1sid!2sid!4v1699999999999!5m2!1sid!2sid"
                                      width="100%"
                                      height="300"
                                      style={{ border: 0 }}
                                      allowFullScreen
                                      loading="lazy"
                                      className="rounded-lg shadow"
                                      title="Lokasi Mamono Cake 2"
                                    ></iframe>
                                  </div>

                                  {/* Link alternatif ke Google Maps */}
                                  <a 
                                    href="https://www.google.com/maps/place/Mamono+cake+2/@-7.2274336,107.8234697,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68bbf26ebefb5d:0x8bb0f02f4f5ccaf3!8m2!3d-7.2274336!4d107.8234697!16s%2Fg%2F11nx3c0rg7?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline mt-4 block"
                                  >
                                    Buka di Google Maps
                                  </a>
                                </div>
                              )}

                              {confirmationStatus === 'Dikirim Kurir' && (
                                <div className="mt-4">
                                  <p className="text-green-600 font-semibold">
                                    Pesanan {order.product.name} sedang {confirmationStatus} dan dalam perjalanan ke alamat Anda.
                                  </p>
                                  {/* Tambahan Nomor Resi */}
                                  <p className="text-gray-600 font-bold mt-2">
                                    Nomor Resi Pengiriman: {order.trackingNumber || 'JNE12345'}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Garis vertikal */}
              {index < filteredSteps.length - 1 && (
                <div
                  className={`absolute left-4 top-12 h-full w-0.5 ${
                    activeStep > step.step ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </li>
          ))}
        </ol>
        {/* Dialog Konfirmasi */}
          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="relative bg-white p-8 rounded-lg">
                {/* Tombol Close di pojok kanan atas */}
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsDialogOpen(false)}
                >
                  &#x2715; {/* Icon X */}
                </button>
                <h2 className="text-xl font-semibold mb-4">Pilih Metode Pengambilan</h2>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
                  onClick={() => handleConfirmation('Diambil Sendiri')}
                >
                  Diambil Sendiri
                </button>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={() => handleConfirmation('Dikirim Kurir')}
                >
                  Dikirim Kurir
                </button>
              </div>
            </div>
          )}
      </div>
      <FooterMenu />
    </div>
  );
};

export default TrackingPage;
