import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, PaletteMode } from "@mui/material";
import { LOCALSTORE_LIGHT_MODE } from "../common/localstore-constants";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectIsDarkMode, setDarkMode } from "./ui-style-store";

export const DarkModeButton = () => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();

  const nextMode: PaletteMode = isDarkMode ? "light" : "dark";

  const onChangeDarkMode = () => {
    dispatch(setDarkMode(nextMode));
    localStorage.setItem(LOCALSTORE_LIGHT_MODE, nextMode);
  };

  return (
    <IconButton onClick={onChangeDarkMode}>
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
