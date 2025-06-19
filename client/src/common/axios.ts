import base from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL_REST;

export const axios = base.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};
