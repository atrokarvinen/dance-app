import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
import { BottomNavLink } from "./bottom-nav-link";
import { routes, RouteVisibility } from "./routes";

export const NavigationMobile = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const visibleRoutes = routes.filter((route) => {
    switch (route.visibility) {
      case RouteVisibility.ALWAYS:
        return true;
      case RouteVisibility.AUTH:
        return isAuthenticated;
      case RouteVisibility.UNAUTH:
        return !isAuthenticated;
      default:
        return false;
    }
  });

  useEffect(() => {
    const route = visibleRoutes.find((route) => {
      const isExactMatch = route.href === location.pathname;
      const isChildMatch = route.children.some((child) =>
        location.pathname.startsWith(child)
      );
      return isExactMatch || isChildMatch;
    });
    if (route) {
      setValue(visibleRoutes.indexOf(route));
    }
  }, [visibleRoutes, location.pathname]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
    >
      {visibleRoutes.map((route) => {
        const { href, label, icon } = route;
        return (
          <BottomNavigationAction
            key={href}
            label={label}
            icon={icon}
            href={href}
            LinkComponent={BottomNavLink}
          />
        );
      })}
    </BottomNavigation>
  );
};
