import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data;
    const apiError = new Error(responseData?.message || 'Unable to complete the request. Please try again.');

    apiError.status = error.response?.status;
    apiError.details = responseData?.errors || [];

    return Promise.reject(apiError);
  }
);

export default apiClient;
