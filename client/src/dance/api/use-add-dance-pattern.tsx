import { useMutation } from "@tanstack/react-query";
import { useApiError } from "../../common/api/use-api-error";
import { useToast } from "../../common/toast/use-toast";
import { addDancePattern as addDancePatternRequest } from "./api";

export type AddDancePatternPayload = {
  name: string;
  description?: string;
  videoUrl?: string;
  danceId: number;
};

export const useAddDancePattern = () => {
  const { getError } = useApiError();
  const { showErrorToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: AddDancePatternPayload) => {
      const created = await addDancePatternRequest(values);
      return created;
    },
    onError: (error) => {
      const message = getError(error) || "Failed to add dance pattern.";
      showErrorToast(message);
    },
  });

  const addDancePattern = (payload: AddDancePatternPayload) => {
    return mutation.mutateAsync(payload);
  };

  return { addDancePattern };
};
