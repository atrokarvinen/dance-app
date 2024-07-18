import { PaletteMode } from "@mui/material";
import { useEffect } from "react";
import { LOCALSTORE_LIGHT_MODE } from "../common/localstore-constants";
import { useAppDispatch } from "../redux/store";
import { setDarkMode } from "./ui-style-store";

export const useCheckPrefersDark = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uiDefault = localStorage.getItem(LOCALSTORE_LIGHT_MODE) as
      | PaletteMode
      | undefined;
    const browserDefault = window.matchMedia("(prefers-color-scheme: dark)");
    const lightMode = uiDefault || (browserDefault.matches ? "dark" : "light");
    dispatch(setDarkMode(lightMode));

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
    };
  }, []);

  const listener = (e: MediaQueryListEvent) => {
    dispatch(setDarkMode(e.matches ? "dark" : "light"));
  };
};
