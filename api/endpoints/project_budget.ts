import useSWR from "swr";
import api from "../instance";
import { IProjectBudget } from "../models/ProjectBudget";
const endpoint = "/project_budget";

const getByProjectID = async (project_id: string) => {
  return (await api.get<IProjectBudget>(`${endpoint}/project/${project_id}`))
    .data;
};

export const useProjectBudget = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`project-budgets-${project_id}`, () => getByProjectID(project_id)),
  };
};
