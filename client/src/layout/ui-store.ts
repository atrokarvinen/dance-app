import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

type UiState = {
  lightMode: PaletteMode;
  contentScroll: Record<string, number>;
  openFavorites: string[];
  isDanceEditMode: boolean;
  isDancePatternEditMode: boolean;
};

type ScrollPayload = {
  path: string;
  scroll: number;
};

const initialState: UiState = {
  lightMode: "light",
  contentScroll: {},
  openFavorites: [],
  isDanceEditMode: false,
  isDancePatternEditMode: false,
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
    onOpenFavorite: (state, action: PayloadAction<string>) => {
      state.openFavorites.push(action.payload);
    },
    onCloseFavorite: (state, action: PayloadAction<string>) => {
      state.openFavorites = state.openFavorites.filter(
        (id) => id !== action.payload
      );
    },
    onSetDanceEditMode: (state, action: PayloadAction<boolean>) => {
      state.isDanceEditMode = action.payload;
    },
    onSetDancePatternEditMode: (state, action: PayloadAction<boolean>) => {
      state.isDancePatternEditMode = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setContentScroll,
  onCloseFavorite,
  onOpenFavorite,
  onSetDanceEditMode,
  onSetDancePatternEditMode,
} = uiStyleSlice.actions;

export const selectIsDarkMode = (state: RootState) =>
  state.ui.lightMode === "dark";
export const selectLightMode = (state: RootState) => state.ui.lightMode;
export const selectContentScroll = (state: RootState) => state.ui.contentScroll;
export const selectContentScrollOfPage = (path: string) => (state: RootState) =>
  state.ui.contentScroll[path];
export const selectOpenFavorites = (state: RootState) => state.ui.openFavorites;
export const selectIsDanceEditMode = (state: RootState) =>
  state.ui.isDanceEditMode;
export const selectIsDancePatternEditMode = (state: RootState) =>
  state.ui.isDancePatternEditMode;

export const uiStyleReducer = uiStyleSlice.reducer;
