import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BottomNavLink } from "./bottom-nav-link";
import { routes } from "./routes";

export const NavigationMobile = () => {
  const location = useLocation();
  const [value, setValue] = useState<number>();

  useEffect(() => {
    const route = routes.find((route) => route.href === location.pathname);
    if (route) {
      setValue(routes.indexOf(route));
    }
  }, []);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
    >
      {routes.map((route) => {
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
