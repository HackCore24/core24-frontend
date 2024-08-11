import useSWR from "swr";
import api from "../instance";
import { IDocument } from "../models/Document";
import { IClientVar } from "../models/Variable";
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

const generate = async (
  doc_id: string,
  vars: IClientVar[],
  filename?: string
) => {
  const r = await api.post(`${endpoint}/generate`, vars, {
    params: {
      document_id: doc_id,
    },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([r.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename || "Документ"}.docx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  return "ok";
};

const documentsAPI = {
  getAll,
  getByProjectID,
  getByID,
  generate,
};

export const useDocuments = () => {
  return {
    getByProjectID: (project_id: string) =>
      useSWR(`docs-${project_id}`, () => getByProjectID(project_id)),
    getByID: (doc_id: string) => useSWR(`doc-${doc_id}`, () => getByID(doc_id)),
  };
};

export default documentsAPI;
