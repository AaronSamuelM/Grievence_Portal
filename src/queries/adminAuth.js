import axios from "axios";
const { VITE_APP_API_URL } = import.meta.env;

export const useAdminLoginStart = (args) => {
  return axios.post(VITE_APP_API_URL + "/api/auth/admin/login", { ...args });
};

export const useAdminLoginVerify = (args) => {
  return axios.post(VITE_APP_API_URL + "/api/auth/admin/verify", { ...args });
};
