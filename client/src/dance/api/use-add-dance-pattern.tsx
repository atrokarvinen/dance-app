import { useMutation } from "@tanstack/react-query";
import { useApiError } from "../../common/api/use-api-error";
import { useToast } from "../../common/toast/use-toast";
import { addDancePattern as addDancePatternRequest } from "./api";

export const useAddDancePattern = () => {
  const { getError } = useApiError();
  const { showErrorToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const created = await addDancePatternRequest(values);
      return created;
    },
    onError: (error) => {
      const message = getError(error) || "Failed to add dance pattern.";
      showErrorToast(message);
    },
  });

  const addDancePattern = (payload: any) => {
    return mutation.mutateAsync(payload);
  };

  return { addDancePattern };
};
