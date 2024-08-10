import { IBaseModel } from "./Base";

export interface IDocument extends IBaseModel {
  title: string;
  filename: string;
  html: string;
}
