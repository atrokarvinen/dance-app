import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { selectIsAuthenticated } from "../auth/auth-store";
import { useAuth } from "../auth/use-auth";
import { DarkModeButton } from "../layout/dark-mode-button";
import { useAppSelector } from "../redux/store";
import { LanguageSelection } from "./language-selection";

export const SettingsPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { logout } = useAuth();

  const username = localStorage.getItem("username");

  return (
    <Stack direction="column" spacing={5} marginTop={5} alignItems="center">
      <Typography variant="h4">{t("Settings")}</Typography>
      {isAuthenticated && (
        <Typography>
          {t("Logged in as")} <strong>{username}</strong>
        </Typography>
      )}
      {isAuthenticated && (
        <Button variant="contained" onClick={logout}>
          {t("Logout")}
        </Button>
      )}
      <Stack direction="row" alignItems="center">
        <Typography>{t("Dark mode")}</Typography>
        <DarkModeButton />
      </Stack>
      <LanguageSelection />
    </Stack>
  );
};
