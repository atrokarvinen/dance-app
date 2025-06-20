import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { useRoutes } from "./routes";

export const NavigationDesktop = () => {
  const { routes } = useRoutes();
  const { pathname } = useLocation();
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          gap={3}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          {routes.map((route) => {
            const { href, label } = route;
            const isActive = pathname === href;
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
