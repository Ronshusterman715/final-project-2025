import axios from "axios";
import { errorMessage } from "../ui/alert";
import { clearAuth, getToken } from "../storage";

const BASE_URL_API: string = import.meta.env.VITE_BASE_URL_API;

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response && err.response.status === 401) {
      clearAuth();
      errorMessage("Session expired. Please login again");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
