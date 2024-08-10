import { IBaseModel } from "./Base";

export interface IProjectDocumentation extends IBaseModel {
  project_id: string;
  file_link?: string;
  electronic_signature?: string;
}
