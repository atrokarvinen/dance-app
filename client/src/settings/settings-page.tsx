import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAuth } from "../auth/use-auth";
import { DarkModeButton } from "../layout/dark-mode-button";
import { useAppSelector } from "../redux/store";

export const SettingsPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { logout } = useAuth();

  const username = localStorage.getItem("username");

  return (
    <Stack direction="column" spacing={5} marginTop={5} alignItems="center">
      <Typography variant="h4">Settings</Typography>
      {isAuthenticated && (
        <Typography>
          Logged in as <strong>{username}</strong>
        </Typography>
      )}
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
