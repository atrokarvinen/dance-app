import { useMediaQuery } from "@mui/material";
import { Breakpoint, useTheme } from "@mui/material/styles";

export const useBreakpoint = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(breakpoint));

  return matches;
};
