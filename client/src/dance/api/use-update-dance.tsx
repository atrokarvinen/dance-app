import type { DanceFormValues } from "../edit-dance/dance-form-type";
import { updateDance as updateDanceRequest } from "./api";

export const useUpdateDance = () => {
  const updateDance = async (values: DanceFormValues & { id: number }) => {
    const response = await updateDanceRequest(values);
    return response.data;
  };

  return { updateDance };
};
