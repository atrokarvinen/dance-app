import { useMutation } from "@tanstack/react-query";
import { useApiError } from "../../common/api/use-api-error";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";
import type { Dance } from "../dance";
import { addDance as addDanceRequest } from "./api";

export const useAddDance = () => {
  const dispatch = useAppDispatch();
  const { getError } = useApiError();

  const mutation = useMutation({
    mutationFn: async (values: Dance) => {
      const created = await addDanceRequest(values);
      return created;
    },
    onSuccess: (data) => {
      console.log("Dance added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding dance:", error);
      const message = getError(error) || "Failed to add dance.";
      dispatch(addMessage({ message, type: "error" }));
    },
  });

  const addDance = async (values: any) => {
    const respo = await mutation.mutateAsync(values);
    return respo.data;
  };

  return { addDance };
};
