import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com',
});

(function setupAxiosInterceptors(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config: any) => {
      if (!config?.headers?.Authorization && config?.headers) {
        const token = localStorage.getItem('jwToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
      }

      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );
})(axiosInstance);

export default axiosInstance;
