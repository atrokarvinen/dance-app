import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

type AuthState = {
  authenticated: boolean;
};

const initialState: AuthState = {
  authenticated: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state) {
      state.authenticated = true;
    },
    logout(state) {
      state.authenticated = false;
    },
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
