import { IUser } from "./user.interface";

export interface IMessage {
  id: number;
  roomId: string;
  user: IUser;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDto {
  roomId: string;
  userId: number | undefined;
  message: string;
}
