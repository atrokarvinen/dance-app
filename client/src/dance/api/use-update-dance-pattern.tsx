import { updateDancePattern as updateDancePatternRequest } from "./api";

export type UpdateDancePatternPayload = {
  id: number;
  name: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  danceId: number;
};

export const useUpdateDancePattern = () => {
  const updateDancePattern = (values: UpdateDancePatternPayload) => {
    return updateDancePatternRequest(values);
  };

  return { updateDancePattern };
};
