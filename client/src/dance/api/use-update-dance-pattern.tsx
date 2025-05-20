import { axios } from "../../common/axios";

export const useUpdateDancePattern = () => {
  const updateDancePattern = (values: any) => {
    return axios.put(`/dance-patterns/${values.id}`, values);
  };

  return { updateDancePattern };
};
