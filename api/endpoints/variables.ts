import useSWR from "swr";
import api from "../instance";
import { IVariable } from "../models/Variable";
const endpoint = "/variables";

const getAll = async () => {
  return (await api.get<IVariable[]>(`${endpoint}/`)).data;
};

const getByProjectID = async (project_id: string) => {
  return (await api.get<IVariable[]>(`${endpoint}/document/${project_id}`))
    .data;
};

const variablesAPI = {
  getAll,
  getByProjectID,
};

export const useVariables = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`project-vars-${project_id}`, () => getByProjectID(project_id)),
    getAll: () => useSWR(`project-vars`, () => getAll()),
  };
};
