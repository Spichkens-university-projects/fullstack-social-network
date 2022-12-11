import { IUser } from "./user.interface";

export type DecisionType = 0 | 1;

export interface IFriend {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  decision: DecisionType;
  fromUser: IUser;
  toUser: IUser;
}
