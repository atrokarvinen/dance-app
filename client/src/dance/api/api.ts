import { axios } from "../../common/axios";
import type { Dance } from "../dance";
import type { DancePatternDetailsType } from "../dance-pattern-details/models/dance-pattern-details-type";
import type { DanceFormValues } from "../edit-dance/dance-form-type";
import type { AddDancePatternPayload } from "./use-add-dance-pattern";
import type { UpdateDancePatternPayload } from "./use-update-dance-pattern";

export const getDances = () => {
  return axios.get<Dance[]>("/dances");
};

export const getDance = (id: number) => {
  return axios.get<Dance>(`/dances/${id}`);
};

export const addDance = (data: DanceFormValues) => {
  return axios.post<Dance>("/dances", data);
};

export const updateDance = (data: DanceFormValues & { id: number }) => {
  return axios.put<Dance>(`/dances/${data.id}`, data);
};

export const deleteDance = (id: number) => {
  return axios.delete(`/dances/${id}`);
};

// Dance patterns
export const getDancePattern = (id: number) => {
  return axios.get<DancePatternDetailsType>(`dance-patterns/${id}/details`);
};

export const addDancePattern = (data: AddDancePatternPayload) => {
  return axios.post("dance-patterns", data);
};

export const updateDancePattern = (data: UpdateDancePatternPayload) => {
  return axios.put(`dance-patterns/${data.id}`, data);
};

export const deleteDancePattern = (id: number) => {
  return axios.delete(`dance-patterns/${id}`);
};
