import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export type ToastMessage = {
  id?: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
};

type ToastState = {
  messages: ToastMessage[];
};

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  initialState,
  name: "toast",
  reducers: {
    addMessage(state, action: PayloadAction<ToastMessage>) {
      action.payload.id = Math.random().toString();
      state.messages.push(action.payload);
    },
    removeMessage(state, action: PayloadAction<ToastMessage>) {
      state.messages = state.messages.filter((m) => m.id !== action.payload.id);
    },
  },
});

export const { addMessage, removeMessage } = toastSlice.actions;

export const selectToastMessages = (state: RootState) => state.toast.messages;

export const toastReducer = toastSlice.reducer;
