import { IBaseModel } from "./Base";
import { IFile } from "./File";

export interface IUser extends IBaseModel {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  avatar?: IFile?;
  telegram_id?: string;
}

export interface IUserRegister {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  role: "user";
}
