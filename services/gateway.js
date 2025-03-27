import axios from 'axios';
import { maya } from './urls';
const API_URL = import.meta.env.VITE_API_URL;

export const publicGateway = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

publicGateway.interceptors.request.use(
  (config) => {
      console.log('Request sent:', config.url);
      return config;
  },
  (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
  }
);

publicGateway.interceptors.response.use(
  (response) => {
      console.log('Response received:', response.config.url);
      return response;
  },
  (error) => {
      console.error('Response error:', error.response?.data);
      return Promise.reject(error);
  }
);
export const privateGateway = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateGateway.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

privateGateway.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      try {
        const response = await publicGateway.post(maya.refresh, {
            refreshToken: localStorage.getItem('refresh_token'),
        });
        localStorage.setItem('access_token', response.data.accessToken);
        const { config } = error;
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return await new Promise((resolve, reject) => {
          privateGateway
            .request(config)
            .then((response_1) => {
              resolve(response_1);
            })
            .catch((error_1) => {
              reject(error_1);
            });
        });
      } catch (error_2) {
        console.error('Your session has expired. Please login again.');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/';
        }, 2000);
        return Promise.reject(error_2);
      }
    } else {
      return Promise.reject(error);
    }
  },
);