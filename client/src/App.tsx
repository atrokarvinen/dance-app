import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./auth/use-auth";
import { LayoutDesktop } from "./layout/layout-desktop";

export const App = () => {
  const { initialLogin } = useAuth();

  useEffect(() => {
    initialLogin();
  }, []);

  return (
    <LayoutDesktop>
      <Outlet />
    </LayoutDesktop>
  );
};
