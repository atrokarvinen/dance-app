import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

type UiStyleState = {
  lightMode: PaletteMode;
};

const initialState: UiStyleState = {
  lightMode: "light",
};

const uiStyleSlice = createSlice({
  name: "uiStyle",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<PaletteMode>) => {
      state.lightMode = action.payload;
    },
  },
});

export const { setDarkMode } = uiStyleSlice.actions;

export const selectIsDarkMode = (state: RootState) =>
  state.ui.lightMode === "dark";
export const selectLightMode = (state: RootState) => state.ui.lightMode;

export const uiStyleReducer = uiStyleSlice.reducer;
