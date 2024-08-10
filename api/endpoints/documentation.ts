import useSWR from "swr";
import api from "../instance";
import { IProjectDocumentation } from "../models/ProjectDocumentation";
const endpoint = "/project_documentation";

const getByProjectID = async (project_id: string) => {
  return (
    await api.get<IProjectDocumentation[]>(`${endpoint}/project/${project_id}`)
  ).data;
};

const getByID = async (doc_id: string) => {
  return (await api.get<IProjectDocumentation>(`${endpoint}/${doc_id}`)).data;
};

export const useProjectDocuments = () => {
  return {
    getByID: (doc_id: string) =>
      useSWR(`project-doc-${doc_id}`, () => getByID(doc_id)),
    getByProjectID: (project_id: string) =>
      useSWR(`project-docs-${project_id}`, () => getByProjectID(project_id)),
  };
};

export const projectDocumentationAPI = {
  getByProjectID,
  getByID,
};

export default projectDocumentationAPI;
