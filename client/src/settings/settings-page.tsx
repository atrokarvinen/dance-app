import { Button, Stack, Typography } from "@mui/material";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAuth } from "../auth/use-auth";
import { DarkModeButton } from "../layout/dark-mode-button";
import { useAppSelector } from "../redux/store";

export const SettingsPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { logout } = useAuth();

  return (
    <Stack direction="column" spacing={5} marginTop={5} alignItems="center">
      {isAuthenticated && (
        <Button variant="contained" onClick={logout}>
          Logout
        </Button>
      )}
      <Stack direction="row" alignItems="center">
        <Typography>Dark mode:</Typography>
        <DarkModeButton />
      </Stack>
    </Stack>
  );
};
