import { useMutation } from "@tanstack/react-query";
import { useApiError } from "../../common/api/use-api-error";
import { axios } from "../../common/axios";
import { addMessage } from "../../common/toast/toast-store";
import { useAppDispatch } from "../../redux/store";

export const useAddDancePattern = () => {
  const dispatch = useAppDispatch();
  const { getError } = useApiError();

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const created = await axios.post("/dance-patterns", values);
      return created;
    },
    onError: (error) => {
      const message = getError(error) || "Failed to add dance pattern.";
      dispatch(addMessage({ message, type: "error" }));
    },
  });

  const addDancePattern = (payload: any) => {
    return mutation.mutateAsync(payload);
  };

  return { addDancePattern };
};
