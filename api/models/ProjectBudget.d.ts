import { IBaseModel } from "./Base";

export interface IProjectBudget extends IBaseModel {
  project_id: string;
  budget: number;
  credit_limit: number;
}
