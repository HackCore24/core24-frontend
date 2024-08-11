import useSWR from "swr";
import api from "../instance";
import { IProject } from "../models/Project";
const endpoint = "/projects";

export const getAll = async () => {
  return (await api.get<IProject[]>(`${endpoint}/user`)).data;
};

export const getByID = async (id: string) => {
  return (await api.get<IProject>(`${endpoint}/${id}`)).data;
};

export const getRelated = async (project_id: string) => {
  return (
    await api.get<IProject[]>(`${endpoint}/relate`, {
      params: {
        project_id,
      },
    })
  ).data;
};

export const useProjects = () => {
  return {
    GetAll: () => useSWR("allProjects", getAll),
    getByID: (id: string) => useSWR(`project-${id}`, () => getByID(id)),
    getRelated: (project_id: string) =>
      useSWR(`relatedProjects-${project_id}`, () => getRelated(project_id)),
  };
};

const projectsAPI = {
  getAll,
  getByID,
};

export default projectsAPI;
