import { useAppDispatch } from "../redux/store";
import { login as reduxLogin, logout as reduxLogout } from "./auth-store";
import { LOCALSTORE_TOKEN } from "./constants";

export const useAuth = () => {
  const dispatch = useAppDispatch();

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
    dispatch(reduxLogout());
  };

  return { login, initialLogin, logout };
};
