import apiClient from './apiClient';

const register = async (formData) => {
  const response = await apiClient.post('/auth/register', formData);
  return response.data.data;
};

const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data.data;
};

const logout = async () => {
  await apiClient.post('/auth/logout');
};

const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data.data;
};

export { getCurrentUser, login, logout, register };
