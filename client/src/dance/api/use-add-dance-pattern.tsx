import { axios } from "../../common/axios";

export const useAddDancePattern = () => {
  const addDancePattern = (payload: any) => {
    return axios.post("/dance-patterns", payload);
  };

  return { addDancePattern };
};
