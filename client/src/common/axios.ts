import base from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL_REST;

console.log("baseUrl", baseUrl);

export const axios = base.create({
  baseURL: baseUrl,
  withCredentials: true,
});
