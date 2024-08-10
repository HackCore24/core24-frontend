import { IBaseModel } from "./Base";

export interface IProject extends IBaseModel {
  title: string;
  company_name: string;
  caver?: string;
}
