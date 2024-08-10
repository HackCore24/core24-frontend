import { IBaseModel } from "./Base";

export interface IVariable extends IBaseModel {
  title: string;
  document_id: string;
}

export interface IClientVar {
  title: string;
  key: string;
  input: string;
}
