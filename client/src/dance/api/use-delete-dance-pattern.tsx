import { axios } from "../../common/axios";

export const useDeleteDancePattern = () => {
  const deleteDancePattern = (dancePatternId: number) => {
    return axios.delete(`/dance-patterns/${dancePatternId}`);
  };

  return { deleteDancePattern };
};
