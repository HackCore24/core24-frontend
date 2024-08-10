import useSWR from "swr";
import api from "../instance";
import { IProjectDocumentation } from "../models/ProjectDocumentation";
const endpoint = "/project_documentation";

const getByProjectID = async (project_id: string) => {
  return (
    await api.get<IProjectDocumentation[]>(`${endpoint}/project/${project_id}`)
  ).data;
};

export const useProjectDocuments = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`project-docs-${project_id}`, () => getByProjectID(project_id)),
  };
};

export const projectDocumentationAPI = {
  getByProjectID,
};

export default projectDocumentationAPI;
