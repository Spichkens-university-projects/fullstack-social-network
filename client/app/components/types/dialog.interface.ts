import { IUser } from "./user.interface";

export interface IDialog {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  roomId: string;
  user: IUser;
  withUser: IUser;
}
