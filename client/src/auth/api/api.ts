import { axios } from "../../common/axios";

export const signupRequest = (payload: any) => {
  return axios.post("/auth/signup", payload);
};

export const loginRequest = (payload: any) => {
  return axios.post("/auth/login", payload);
};
