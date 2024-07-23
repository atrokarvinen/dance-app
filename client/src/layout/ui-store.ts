import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

type UiState = {
  lightMode: PaletteMode;
  contentScroll: Record<string, number>;
};

type ScrollPayload = {
  path: string;
  scroll: number;
};

const initialState: UiState = {
  lightMode: "light",
  contentScroll: {},
};

const uiStyleSlice = createSlice({
  name: "uiStyle",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<PaletteMode>) => {
      state.lightMode = action.payload;
    },
    setContentScroll: (state, action: PayloadAction<ScrollPayload>) => {
      const { path, scroll } = action.payload;
      state.contentScroll[path] = scroll;
    },
  },
});

export const { setDarkMode, setContentScroll } = uiStyleSlice.actions;

export const selectIsDarkMode = (state: RootState) =>
  state.ui.lightMode === "dark";
export const selectLightMode = (state: RootState) => state.ui.lightMode;
export const selectContentScroll = (state: RootState) => state.ui.contentScroll;
export const selectContentScrollOfPage = (path: string) => (state: RootState) =>
  state.ui.contentScroll[path];

export const uiStyleReducer = uiStyleSlice.reducer;
