import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { routes } from "./routes";

export const NavigationDesktop = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          gap={3}
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {routes.map((route) => {
            const { href, label } = route;
            const isActive = location.pathname === href;
            return (
              <Button
                key={href}
                to={href}
                color="inherit"
                component={ReactLink}
                sx={{
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: isActive ? "success.main" : "transparent",
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
