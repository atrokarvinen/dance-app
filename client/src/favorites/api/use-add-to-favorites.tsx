import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../common/axios";
import { useToast } from "../../common/toast/use-toast";

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (dancePatternId: number) => {
      return await axios.post("/favorites", { dancePatternId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["dancePattern"] });
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
      showErrorToast("Error adding to favorites");
    },
  });

  const addToFavorites = async (dancePatternId: number) => {
    await mutation.mutateAsync(dancePatternId);
  };

  return { addToFavorites };
};
