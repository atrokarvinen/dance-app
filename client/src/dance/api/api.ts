import { axios } from "../../common/axios";
import type { Dance } from "../dance";
import type { DancePatternDetailsType } from "../dance-pattern-details/models/dance-pattern-details-type";

export const getDances = () => {
  return axios.get<Dance[]>("/dances");
};

export const getDance = (id: number) => {
  return axios.get<Dance>(`/dances/${id}`);
};

export const addDance = (data: Dance) => {
  return axios.post<Dance>("/dances", data);
};

export const updateDance = (data: Dance) => {
  return axios.put<Dance>(`/dances/${data.id}`, data);
};

export const deleteDance = (id: number) => {
  return axios.delete(`/dances/${id}`);
};

// Dance patterns
export const getDancePattern = (id: number) => {
  return axios.get<DancePatternDetailsType>(`dance-patterns/${id}/details`);
};

export const addDancePattern = (data: any) => {
  return axios.post("dance-patterns", data);
};

export const updateDancePattern = (data: any) => {
  return axios.put(`dance-patterns/${data.id}`, data);
};

export const deleteDancePattern = (id: number) => {
  return axios.delete(`dance-patterns/${id}`);
};
