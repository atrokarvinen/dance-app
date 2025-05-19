import { deleteDance as deleteDanceRequest } from "./api";

export const useDeleteDance = () => {
  const deleteDance = async (danceId: number) => {
    await deleteDanceRequest(danceId);
  };

  return { deleteDance };
};
