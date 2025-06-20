import { useQueryClient } from "@tanstack/react-query";
import { axios } from "../../common/axios";

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  const removeFromFavorites = async (id: number) => {
    await axios.delete(`/favorites/${id}`);
    await queryClient.invalidateQueries({ queryKey: ["favorites"] });
    await queryClient.invalidateQueries({ queryKey: ["dancePattern"] });
  };

  return { removeFromFavorites };
};
