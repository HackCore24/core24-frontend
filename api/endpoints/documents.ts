import useSWR from "swr";
import api from "../instance";
import { IDocument } from "../models/Document";
const endpoint = "/documents";

const getAll = async () => {
  return (await api.get<IDocument[]>(`${endpoint}`)).data;
};

const getByProjectID = async (project_id: string) => {
  return (await api.get<IDocument[]>(`${endpoint}/relate/${project_id}`)).data;
};

const getByID = async (doc_id: string) => {
  return (await api.get<IDocument>(`${endpoint}/${doc_id}`)).data;
};

const documentsAPI = {
  getAll,
  getByProjectID,
  getByID,
};

export const useDocuments = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`docs-${project_id}`, () => getByProjectID(project_id)),
    getByID: (doc_id: string) => useSWR(`doc-${doc_id}`, () => getByID(doc_id)),
  };
};

export default documentsAPI;
