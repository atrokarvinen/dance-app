import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./auth/use-auth";
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
        <Outlet />
      </LayoutMobile>
    );
  }
  return (
    <LayoutDesktop>
      <Outlet />
    </LayoutDesktop>
  );
};
