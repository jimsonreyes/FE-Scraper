import axios from 'axios'

const baseURL = 'http://localhost:5000';

export const apiClient = () => {
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
      Accept: '*/*'
    }
  });

  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    return Promise.reject(error);
  });
  return instance;
};