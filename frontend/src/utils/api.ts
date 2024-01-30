import axios from "axios";
import { CONFIG } from "../consts";
export const api = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: CONFIG.BASE_URL,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    function (response: any) {
      return response;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default api;
