import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../redux/store";
import { theme as baseTheme } from "../theme";
import { selectLightMode } from "./ui-style-store";
import { useCheckPrefersDark } from "./use-check-prefers-dark";

type Props = {
  children: ReactNode;
};

export const MuiStyleProvider = ({ children }: Props) => {
  useCheckPrefersDark();
  const colorMode = useAppSelector(selectLightMode);
  const theme: Theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode: colorMode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
