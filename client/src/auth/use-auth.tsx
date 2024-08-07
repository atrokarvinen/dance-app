import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router";
import { LOCALSTORE_TOKEN } from "../common/localstore-constants";
import { useAppDispatch } from "../redux/store";
import { login as reduxLogin, logout as reduxLogout } from "./auth-store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();

  const login = (token: string) => {
    localStorage.setItem(LOCALSTORE_TOKEN, token);
    dispatch(reduxLogin());
  };

  const initialLogin = () => {
    const token = localStorage.getItem(LOCALSTORE_TOKEN);
    if (!token) {
      return;
    }
    dispatch(reduxLogin());
  };

  const logout = () => {
    localStorage.removeItem(LOCALSTORE_TOKEN);
    localStorage.removeItem("username");
    dispatch(reduxLogout());
    client.clearStore();
    navigate("/auth");
  };

  return { login, initialLogin, logout };
};
