import apiClient from './axiosConfig';

// Fungsi untuk login ke backend
export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
    });

    // Simpan token ke localStorage atau state global
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error(error)
    throw new Error('Login gagal. Periksa kredensial Anda.');
  }
};

// Fungsi untuk logout
export const logout = () => {
  // Hapus token dari localStorage atau state global
  localStorage.removeItem('token');
};
