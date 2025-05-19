import { updateDance as updateDanceRequest } from "./api";

export const useUpdateDance = () => {
  const updateDance = async (values: any) => {
    const response = await updateDanceRequest(values);
    return response.data;
  };

  return { updateDance };
};
