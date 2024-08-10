import useSWR from "swr";
import api from "../instance";
import { IProjectTask } from "../models/ProjectTask";
const endpoint = "/project_tasks";

const getByProjectID = async (project_id: string) => {
  return (await api.get<IProjectTask[]>(`${endpoint}/project/${project_id}`))
    .data;
};

export const useProjectTasks = () => {
  return {
    getByProjectID: (id: string) =>
      useSWR(`project-tasks-${id}`, () => getByProjectID(id)),
  };
};

export const projectTasksAPI = {
  getByProjectID,
};
