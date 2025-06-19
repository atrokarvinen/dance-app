import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "../auth/auth-store";
import { toastReducer } from "../common/toast/toast-store";
import { uiStyleReducer } from "../layout/ui-store";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiStyleReducer,
  toast: toastReducer,
});
export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
