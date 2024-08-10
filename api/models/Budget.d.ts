import { IBaseModel } from "./Base";

export interface IBudget extends IBaseModel {
  project_id: string;
  budget: number;
  credit_limit: number;
}
