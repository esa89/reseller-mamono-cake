import React from 'react';

const phoneNumber = "6285900405885"; 
const message = "Hello, I would like to inquire about your products.";

const WhatsappButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-4 bg-green-500 p-3 rounded-full shadow-lg flex items-center justify-center"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default WhatsappButton;
