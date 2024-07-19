import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./auth/use-auth";
import { ToastProvider } from "./common/toast/toast-provider";
import { LayoutDesktop } from "./layout/layout-desktop";
import { LayoutMobile } from "./layout/layout-mobile";
import { useBreakpoint } from "./layout/use-breakpoint";

export const App = () => {
  const { initialLogin } = useAuth();
  const isSm = useBreakpoint("sm");

  useEffect(() => {
    initialLogin();
  }, []);

  if (isSm) {
    return (
      <LayoutMobile>
        <ToastProvider />
        <Outlet />
      </LayoutMobile>
    );
  }
  return (
    <LayoutDesktop>
      <ToastProvider />
      <Outlet />
    </LayoutDesktop>
  );
};
