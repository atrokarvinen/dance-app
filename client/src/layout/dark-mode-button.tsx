import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, PaletteMode } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectIsDarkMode, setDarkMode } from "./ui-style-store";

export const DarkModeButton = () => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();

  const nextMode: PaletteMode = isDarkMode ? "light" : "dark";

  return (
    <IconButton onClick={() => dispatch(setDarkMode(nextMode))}>
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
