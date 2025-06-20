import { type Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useBreakpoint = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(breakpoint));

  return matches;
};
