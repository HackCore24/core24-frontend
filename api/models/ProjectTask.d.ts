import { IBaseModel } from "./Base";

export interface IProjectTask extends IBaseModel {
  project_id: string;
  deadline: Date;
  priority: number;
  responsible_user_id: string;
  plan: string;
  necessary_resources: string;
  desired_result?: string;
  comments?: string;
  status: "pending" | "in progress" | "completed";
}
