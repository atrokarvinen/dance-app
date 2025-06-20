import { useMutation } from "@tanstack/react-query";
import { useApiError } from "../../common/api/use-api-error";
import { useToast } from "../../common/toast/use-toast";
import type { DanceFormValues } from "../edit-dance/dance-form-type";
import { addDance as addDanceRequest } from "./api";

export const useAddDance = () => {
  const { getError } = useApiError();
  const { showErrorToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: DanceFormValues) => {
      const created = await addDanceRequest(values);
      return created;
    },
    onSuccess: (data) => {
      console.log("Dance added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding dance:", error);
      const message = getError(error) || "Failed to add dance.";
      showErrorToast(message);
    },
  });

  const addDance = async (values: DanceFormValues) => {
    const respo = await mutation.mutateAsync(values);
    return respo.data;
  };

  return { addDance };
};
