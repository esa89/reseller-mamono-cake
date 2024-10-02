import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate untuk navigasi
import Button from './Button';
import Input from './Input';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // Deklarasi useNavigate

  const handleLogin = async () => {
    if (username === 'esa' && password === 'esa') {  // Validasi login dengan username dan password
      // Jika login berhasil
      navigate('/home');  // Arahkan pengguna ke halaman home
    } else {
      setError('Login gagal. Cek username atau kata sandi.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-pink-500 text-2xl font-bold text-center mb-6">Mamono Cake Reseller</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <Input
        label="Nama Pengguna"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Masukkan nama pengguna"
      />
      <Input
        label="Kata Sandi"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan kata sandi"
      />
      <div className="flex justify-between text-pink-500 mb-6">
        <span>Lupa Kata Sandi</span>
      </div>
      <Button text="Masuk" onClick={handleLogin} />
      <div className="mt-6 text-center text-pink-500">
        <p>Masuk dengan cara lain</p>
        <div className="flex justify-center space-x-4 mt-4">
          {/* Ikon media sosial */}
          <i className="fab fa-qq fa-2x"></i>
          <i className="fab fa-weixin fa-2x"></i>
          <i className="fab fa-weibo fa-2x"></i>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
