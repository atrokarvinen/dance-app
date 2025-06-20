import { useAppDispatch } from "../../redux/store";
import { addMessage } from "./toast-store";

export const useToast = () => {
  const dispatch = useAppDispatch();

  const addToast = (
    message: string,
    type: "info" | "success" | "warning" | "error"
  ) => {
    dispatch(addMessage({ message, type }));
  };

  const showSuccessToast = (message: string) => {
    addToast(message, "success");
  };

  const showErrorToast = (message: string) => {
    addToast(message, "error");
  };

  const showInfoToast = (message: string) => {
    addToast(message, "info");
  };

  const showWarningToast = (message: string) => {
    addToast(message, "warning");
  };

  return { showSuccessToast, showErrorToast, showInfoToast, showWarningToast };
};
