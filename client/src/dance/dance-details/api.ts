import { axios } from "../../common/axios";
import { DanceDetailsType } from "./models/dance-details-type";

export const getDanceDetails = (id: number) => {
  return axios.get<DanceDetailsType>(`/dances/${id}/details`);
};
