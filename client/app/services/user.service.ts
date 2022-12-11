import { axiosClassic } from "../api/axios";
import { IUser } from "../components/types/user.interface";

export const UserService = {
  async getUserById(id: number) {
    const response = await axiosClassic.get<IUser>(`/user/byId/${id}`);
    return response.data;
  },

  async getAllUsers() {
    const response = await axiosClassic.get<IUser[]>(`/user/all`);
    return response.data;
  },
};
