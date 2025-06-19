import { updateDancePattern as updateDancePatternRequest } from "./api";

export const useUpdateDancePattern = () => {
  const updateDancePattern = (values: any) => {
    return updateDancePatternRequest(values);
  };

  return { updateDancePattern };
};
