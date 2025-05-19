import { addDance as addDanceRequest } from "./api";

export const useAddDance = () => {
  const addDance = async (values: any) => {
    const response = await addDanceRequest(values);
    return response.data;
  };

  return { addDance };
};
