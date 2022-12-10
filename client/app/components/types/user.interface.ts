export interface IUser {
  id: number;
  name: string;
  surname: string;
  nickname: string | undefined;
  status: string | undefined;
  avatarPath: string;
  createdAt: Date;
  updatedAt: Date;
}
