import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  removeMessage,
  selectToastMessages,
  ToastMessage,
} from "./toast-store";

export const ToastProvider = () => {
  const messages = useAppSelector(selectToastMessages);
  const dispatch = useAppDispatch();

  const handleClose = (message: ToastMessage) => {
    dispatch(removeMessage(message));
  };

  return messages.map((message) => {
    return (
      <Snackbar
        key={message.id}
        open={messages.map((x) => x.id).includes(message.id)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => handleClose(message)}
        autoHideDuration={5000}
        sx={{ width: "calc(100% - 16px)" }}
      >
        <Alert
          variant="filled"
          severity={message.type}
          onClose={() => handleClose(message)}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    );
  });
};
