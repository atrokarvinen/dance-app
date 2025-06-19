import { useCallback } from "react";
import { useNavigate } from "react-router";
import { removeAuthToken, setAuthToken } from "../common/axios";
import { LOCALSTORE_TOKEN } from "../common/localstore-constants";
import { useAppDispatch } from "../redux/store";
import { login as reduxLogin, logout as reduxLogout } from "./auth-store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem(LOCALSTORE_TOKEN, token);
    setAuthToken(token);
    dispatch(reduxLogin());
  };

  const initialLogin = useCallback(() => {
    const token = localStorage.getItem(LOCALSTORE_TOKEN);
    if (!token) {
      return;
    }
    setAuthToken(token);
    dispatch(reduxLogin());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem(LOCALSTORE_TOKEN);
    localStorage.removeItem("username");
    dispatch(reduxLogout());
    removeAuthToken();
    navigate("/auth");
  };

  return { login, initialLogin, logout };
};
