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

const checkStatus = async (project_id: string, status_id: string) => {
  return (await api.post(`${endpoint}/reach/${status_id}/${project_id}`)).data;
};

export const useProjectStatuses = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`project-statuses-${project_id}`, () =>
        getByProjectID(project_id)
      ),
  };
};

const projectStatusesAPI = {
  checkStatus,
  getByProjectID,
};

export default projectStatusesAPI;
