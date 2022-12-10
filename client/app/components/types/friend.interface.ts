import { IUser } from "./user.interface";

export type DesicionType = 0 | 1;

export interface IFriend {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  decision: DesicionType;
  fromUser: IUser;
}
