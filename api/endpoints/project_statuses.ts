import useSWR from "swr";
import api from "../instance";
import { IProjectStatusByProject } from "../models/ProjectStatus";
const endpoint = "/project_statuses";

const getByProjectID = async (project_id: string) => {
  return (
    await api.get<IProjectStatusByProject[]>(
      `${endpoint}/project/${project_id}`
    )
  ).data;
};

export const useProjectStatuses = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`project-statuses-${project_id}`, () =>
        getByProjectID(project_id)
      ),
  };
};
