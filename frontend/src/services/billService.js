import apiClient from './apiClient';

const createBill = async (bill) => {
  const response = await apiClient.post('/bills', bill);
  return response.data.data;
};

const getBills = async ({ page = 1, limit = 10, search = '' } = {}) => {
  const response = await apiClient.get('/bills', { params: { page, limit, search } });
  return response.data.data;
};

const getBillById = async (id) => {
  const response = await apiClient.get(`/bills/${id}`);
  return response.data.data;
};

const deleteBill = async (id) => {
  await apiClient.delete(`/bills/${id}`);
};

export { createBill, deleteBill, getBillById, getBills };
