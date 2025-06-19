import { deleteDancePattern as deleteDancePatternRequest } from "./api";

export const useDeleteDancePattern = () => {
  const deleteDancePattern = (dancePatternId: number) => {
    return deleteDancePatternRequest(dancePatternId);
  };

  return { deleteDancePattern };
};
