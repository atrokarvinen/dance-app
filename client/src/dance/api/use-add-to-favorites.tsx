import { useQueryClient } from "@tanstack/react-query";
import { axios } from "../../common/axios";

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  const addToFavorites = async (dancePatternId: number) => {
    await axios.post("/favorites", { dancePatternId });
    await queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  return { addToFavorites };
};
