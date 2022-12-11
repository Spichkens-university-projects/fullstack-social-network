import { IUser } from "./user.interface";

export interface ILike {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface IReply {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  replyBody: string;
  user: IUser;
}

export interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  commentBody: string;
  user: IUser;
  replies: IReply[];
  post: IPost;
}

export interface IPost {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  mediaPath: string;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
}
