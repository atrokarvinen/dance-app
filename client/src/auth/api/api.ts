import { axios } from "../../common/axios";
import type { LoginFormType } from "../models/login-form-type";
import type { SignupFormType } from "../models/signup-form-type";

export const signupRequest = (payload: SignupFormType) => {
  return axios.post("/auth/signup", payload);
};

export const loginRequest = (payload: LoginFormType) => {
  return axios.post("/auth/login", payload);
};
