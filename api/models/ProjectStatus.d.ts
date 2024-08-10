import { IBaseModel } from "./Base";

export interface IProjectStatus extends IBaseModel {
  title: string;
  order: number;
}

export interface IProjectStatusByProject extends IProjectStatus {
  is_passed: boolean;
  date_reach: Date;
}
