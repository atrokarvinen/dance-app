import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAppSelector } from "../redux/store";
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
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" width="100%" justifyContent="space-between">
          {visibleRoutes.map((route) => {
            const { href, label, iconActive, iconInactive } = route;
            const isActive = value === visibleRoutes.indexOf(route);
            return (
              <Box key={href} color={isActive ? "inherit" : "lightgray"}>
                <Button color={"inherit"} to={href} component={Link}>
                  <Stack alignItems="center">
                    {isActive ? iconActive : iconInactive}
                    <Typography
                      variant="caption"
                      fontWeight={isActive ? "bold" : undefined}
                    >
                      {label}
                    </Typography>
                  </Stack>
                </Button>
              </Box>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
